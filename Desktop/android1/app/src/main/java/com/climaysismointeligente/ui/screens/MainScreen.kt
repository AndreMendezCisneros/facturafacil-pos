package com.climaysismointeligente.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.climaysismointeligente.R
import com.climaysismointeligente.ui.navigation.Screen
import androidx.compose.runtime.LaunchedEffect
import com.climaysismointeligente.data.ApiModule
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.compose.ui.platform.LocalContext

fun showFrostNotification(context: Context) {
    val channelId = "frost_alert"
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val channel = NotificationChannel(
            channelId,
            "Alertas de Helada",
            NotificationManager.IMPORTANCE_HIGH
        )
        val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        manager.createNotificationChannel(channel)
    }
    val builder = NotificationCompat.Builder(context, channelId)
        .setSmallIcon(android.R.drawable.ic_dialog_alert)
        .setContentTitle("¡Alerta de helada!")
        .setContentText("La temperatura es menor a 2 °C en Ayacucho.")
        .setPriority(NotificationCompat.PRIORITY_HIGH)
    NotificationManagerCompat.from(context).notify(1001, builder.build())
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(navController: NavController) {
    var isConnected by remember { mutableStateOf(false) }
    var weatherTemp by remember { mutableStateOf<Double?>(null) }
    var weatherDesc by remember { mutableStateOf("") }
    var weatherIcon by remember { mutableStateOf("") }
    var sismoMag by remember { mutableStateOf<Double?>(null) }
    var sismoPlace by remember { mutableStateOf("") }
    var sismoTime by remember { mutableStateOf("") }
    var loading by remember { mutableStateOf(true) }
    var error by remember { mutableStateOf<String?>(null) }

    // API Key de OpenWeatherMap (reemplaza por la tuya)
    val weatherApiKey = "b4623b161010489298c194725250907"
    val city = "Ayacucho"

    val context = LocalContext.current

    LaunchedEffect(Unit) {
        loading = true
        error = null
        try {
            val weather = withContext(Dispatchers.IO) {
                ApiModule.weatherApi.getWeatherByCity(weatherApiKey, city)
            }
            weatherTemp = weather.current.temp_c
            weatherDesc = weather.current.condition.text
            weatherIcon = weather.current.condition.icon

            val usgs = withContext(Dispatchers.IO) {
                ApiModule.usgsApi.getEarthquakesPeru()
            }
            // Buscar el sismo más cercano a Ayacucho (lat -13.1588, lon -74.2239)
            val ayacuchoLat = -13.1588
            val ayacuchoLon = -74.2239
            val closest = usgs.features.minByOrNull { feature ->
                val coords = feature.geometry.coordinates
                val eqLon = coords[0]
                val eqLat = coords[1]
                haversine(ayacuchoLat, ayacuchoLon, eqLat, eqLon)
            }
            sismoMag = closest?.properties?.mag
            sismoPlace = closest?.properties?.place ?: ""
            sismoTime = closest?.properties?.time?.let { millisToAgo(it) } ?: ""
        } catch (e: Exception) {
            error = "Error al cargar datos: ${e.localizedMessage}"
        }
        loading = false
    }

    // Lanzar notificación local si la temperatura es menor a 2°C
    LaunchedEffect(weatherTemp) {
        if (weatherTemp != null && weatherTemp!! < 2) {
            showFrostNotification(context)
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            painter = painterResource(id = R.drawable.ic_launcher_foreground),
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary,
                            modifier = Modifier.size(28.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Clima y Sismo\nInteligente", fontWeight = FontWeight.Bold, fontSize = 20.sp)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        },
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    selected = true, onClick = {},
                    icon = { Icon(Icons.Filled.Home, contentDescription = "Inicio") },
                    label = { Text("Inicio") }
                )
                NavigationBarItem(
                    selected = false, onClick = { navController.navigate(Screen.DeviceStatus.route) },
                    icon = { Icon(Icons.Filled.LocationOn, contentDescription = "Ubicación") },
                    label = { Text("Equipo") }
                )
                NavigationBarItem(
                    selected = false, onClick = { navController.navigate(Screen.Settings.route) },
                    icon = { Icon(Icons.Filled.Warning, contentDescription = "Ajustes") },
                    label = { Text("Ajustes") }
                )
            }
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            verticalArrangement = Arrangement.Top,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Ciudad y país
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.LocationOn, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                Spacer(modifier = Modifier.width(4.dp))
                Text("Ayacucho, Perú", fontSize = 16.sp)
            }
            Spacer(modifier = Modifier.height(16.dp))
            // Tarjeta clima
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFF5F5F5)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(Icons.Filled.Info, contentDescription = null, tint = Color(0xFF2196F3), modifier = Modifier.size(36.dp))
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text("${weatherTemp?.toInt() ?: "N/A"} °C", fontWeight = FontWeight.Bold, fontSize = 28.sp)
                        if (weatherDesc.isNotEmpty()) {
                            Text(weatherDesc, fontSize = 14.sp, color = Color.Gray)
                        }
                    }
                }
            }
            Spacer(modifier = Modifier.height(12.dp))
            // Tarjeta sismo
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFF5F5F5)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(Icons.Filled.Info, contentDescription = null, tint = Color(0xFF1976D2), modifier = Modifier.size(36.dp))
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text("Magnitud ${sismoMag ?: "N/A"}", fontWeight = FontWeight.Bold, fontSize = 22.sp)
                        Text(sismoTime, fontSize = 14.sp, color = Color.Gray)
                        if (sismoPlace.isNotEmpty()) {
                            Text(sismoPlace, fontSize = 14.sp, color = Color.Gray)
                        }
                    }
                }
            }
            Spacer(modifier = Modifier.height(20.dp))
            // Funciones avanzadas
            Text("Funciones avanzadas", fontWeight = FontWeight.Bold, fontSize = 18.sp, modifier = Modifier.align(Alignment.Start))
            Spacer(modifier = Modifier.height(8.dp))
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFF5F5F5)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(Icons.Filled.Info, contentDescription = null, tint = Color(0xFF1976D2), modifier = Modifier.size(32.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Icon(
                        if (isConnected) Icons.Filled.Info else Icons.Filled.Warning,
                        contentDescription = null,
                        tint = if (isConnected) Color(0xFF4CAF50) else Color(0xFFD32F2F),
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        if (isConnected) "Conectado" else "Desconectado",
                        color = if (isConnected) Color(0xFF4CAF50) else Color(0xFFD32F2F),
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.weight(1f))
                    Button(
                        onClick = { isConnected = true },
                        shape = RoundedCornerShape(8.dp),
                        colors = ButtonDefaults.outlinedButtonColors(),
                        border = ButtonDefaults.outlinedButtonBorder,
                        enabled = !isConnected
                    ) {
                        Text("Conectar a equipo")
                    }
                }
            }
            Spacer(modifier = Modifier.height(12.dp))
            Button(
                onClick = { /* TODO: Control de riego */ },
                enabled = isConnected,
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(8.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = if (isConnected) MaterialTheme.colorScheme.primary else Color(0xFFE0E0E0),
                    contentColor = if (isConnected) Color.White else Color.Gray
                )
            ) {
                Text("Control de riego")
            }
        }
        if (error != null) {
            Box(modifier = Modifier.fillMaxWidth().padding(8.dp)) {
                Text(
                    text = error ?: "",
                    color = Color.Red,
                    modifier = Modifier.align(Alignment.Center)
                )
            }
        }
    }
}

// Utilidad para calcular distancia entre dos puntos (Haversine)
fun haversine(lat1: Double, lon1: Double, lat2: Double, lon2: Double): Double {
    val R = 6371 // km
    val dLat = Math.toRadians(lat2 - lat1)
    val dLon = Math.toRadians(lon2 - lon1)
    val a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
    val c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

// Utilidad para mostrar tiempo transcurrido
fun millisToAgo(millis: Long): String {
    val now = System.currentTimeMillis()
    val diff = now - millis
    val minutes = diff / 60000
    return if (minutes < 1) "Hace segundos" else "Hace $minutes minutos"
} 