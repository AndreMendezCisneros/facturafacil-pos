package com.example.app_educacion

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.cardview.widget.CardView
import androidx.drawerlayout.widget.DrawerLayout
import androidx.appcompat.widget.SearchView
import com.google.android.material.navigation.NavigationView
import com.google.firebase.auth.FirebaseAuth

class MainActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var navView: NavigationView
    private lateinit var userEmailTextView: TextView
    private lateinit var auth: FirebaseAuth
    private lateinit var searchView: SearchView

    private val cardViews = mutableListOf<CardView>()
    private val placeNames = mutableListOf<String>()

    var details_place: ArrayList<String> = ArrayList()
    var images_place: ArrayList<String> = ArrayList()

    @RequiresApi(api = Build.VERSION_CODES.N)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Inicializar FirebaseAuth
        auth = FirebaseAuth.getInstance()

        // Referencias de la vista
        drawerLayout = findViewById(R.id.drawer_layout)
        navView = findViewById(R.id.nav_view)

        // Obtener la vista del encabezado y el TextView donde se mostrará el correo
        val headerView = navView.getHeaderView(0)
        userEmailTextView = headerView.findViewById(R.id.nav_header_user_email)

        // Obtener el usuario autenticado
        val currentUser = auth.currentUser
        if (currentUser != null) {
            userEmailTextView.text = currentUser.email
        } else {
            userEmailTextView.text = "Inicia sesión para continuar"
        }

        // Configurar la barra de herramientas y el DrawerLayout
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        val toggle = ActionBarDrawerToggle(
            this, drawerLayout, toolbar,
            R.string.navigation_drawer_open, R.string.navigation_drawer_close
        )
        drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        // Configurar listener para el menú lateral
        navView.setNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.nav_logout -> showLogoutDialog()
            }
            true
        }

        // Inicializar los CardViews y sus listeners
        val Cv1: CardView = findViewById(R.id.id1)
        val Cv2: CardView = findViewById(R.id.id2)
        val Cv3: CardView = findViewById(R.id.id3)
        val Cv4: CardView = findViewById(R.id.id4)
        val Cv5: CardView = findViewById(R.id.id5)
        val Cv6: CardView = findViewById(R.id.id6)

        // Añadir los CardViews y nombres de lugares
        cardViews.addAll(listOf(Cv1, Cv2, Cv3, Cv4, Cv5, Cv6))
        placeNames.addAll(
            listOf(
                "Ayacucho, hora nona",
                "Todas las sangres",
                "Los ríos profundos",
                "El zorro de arriba y el zorro de abajo",
                "La batalla de Ayacucho",
                "Sendero Luminoso en Ayacucho"
            )
        )

        // Definir los listeners de los CardViews
        Cv1.setOnClickListener { formatIntent(R.drawable.ayacuchohoranona, R.drawable.ayacuchohoranona1, R.drawable.ayacuchohoranona2, R.array.place0) }
        Cv2.setOnClickListener { formatIntent(R.drawable.todaslassangres, R.drawable.todaslassangres1, R.drawable.todaslassangres2, R.array.place1) }
        Cv3.setOnClickListener { formatIntent(R.drawable.losriosprofundos, R.drawable.losriosprofundos1, R.drawable.todaslassangres2, R.array.place2) }
        Cv4.setOnClickListener { formatIntent(R.drawable.elzorrodearriba, R.drawable.elzorrodearriba1, R.drawable.todaslassangres2, R.array.place3) }
        Cv5.setOnClickListener { formatIntent(R.drawable.labatalla, R.drawable.labatalla1, R.drawable.labatalla2, R.array.place4) }
        Cv6.setOnClickListener { formatIntent(R.drawable.senderoluminoso, R.drawable.senderoluminoso1, R.drawable.senderoluminoso2, R.array.place5) }

        // Configuración del SearchView
        searchView = findViewById(R.id.searchView)
        searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean {
                return false
            }

            override fun onQueryTextChange(newText: String?): Boolean {
                newText?.let {
                    Log.d("Search", "Texto de búsqueda: $it")
                    filterPlaces(it)
                }
                return true
            }
        })
    }

    // Método para filtrar lugares
    private fun filterPlaces(query: String) {
        val queryLower = query.toLowerCase()

        Log.d("Search", "Filtrando con el texto: $queryLower")

        // Recorremos los nombres de los lugares
        for (i in placeNames.indices) {
            val placeName = placeNames[i].toLowerCase()

            Log.d("Search", "Comparando con: ${placeNames[i]}")

            // Si el nombre del lugar contiene el texto de búsqueda, mostramos el CardView
            if (placeName.contains(queryLower)) {
                cardViews[i].visibility = View.VISIBLE
                Log.d("Search", "Mostrar CardView en índice $i: ${placeNames[i]}")
            } else {
                cardViews[i].visibility = View.GONE
                Log.d("Search", "Ocultar CardView en índice $i: ${placeNames[i]}")
            }
        }
    }

    @SuppressLint("UseCompatLoadingForDrawables")
    fun formatIntent(idImg0: Int, idImg1: Int, idImg2: Int, idPlace: Int) {
        try {
            val intent = Intent(this@MainActivity, MainActivity2::class.java)

            images_place.add(0, idImg0.toString())
            images_place.add(1, idImg1.toString())
            images_place.add(2, idImg2.toString())
            intent.putStringArrayListExtra("images_place", images_place)

            val details = resources.getStringArray(idPlace)
            for (i in details.indices) {
                details_place.add(i, details[i])
            }
            intent.putStringArrayListExtra("details_place", details_place)

            startActivity(intent)
        } catch (e: Exception) {
            Toast.makeText(this@MainActivity, "No sirve", Toast.LENGTH_SHORT).show()
        }
    }

    private fun showLogoutDialog() {
        // Mostrar un diálogo de confirmación antes de cerrar sesión
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Cerrar sesión")
        builder.setMessage("¿Estás seguro de que deseas cerrar sesión?")
        builder.setPositiveButton("Sí") { _, _ ->
            auth.signOut() // Cerrar sesión con Firebase
            redirectToLogin()
        }
        builder.setNegativeButton("Cancelar", null)
        builder.show()
    }

    private fun redirectToLogin() {
        // Redirigir al usuario a la actividad de inicio de sesión
        val intent = Intent(this, LoginActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK
        startActivity(intent)
        finish() // Finalizar MainActivity
    }

    override fun onResume() {
        super.onResume()
        // Verificar el usuario al reanudar la actividad
        val currentUser = auth.currentUser
        if (currentUser != null) {
            userEmailTextView.text = currentUser.email
        } else {
            userEmailTextView.text = "Inicia sesión para continuar"
        }
    }
}
