# Clima y Sismo Inteligente

Aplicación Android desarrollada en Kotlin con Jetpack Compose, enfocada en el monitoreo inteligente de condiciones climáticas extremas (heladas) y sismos recientes en Perú, con funciones avanzadas para control de riego y notificaciones inteligentes.

## Funcionalidades principales

- **Pantalla principal:**
  - Muestra la ciudad fija (Ayacucho, Perú).
  - Temperatura actual y alerta de helada si es menor a 2 °C.
  - Último sismo cercano en Perú (magnitud, ubicación, tiempo).
  - Botones de navegación y control de equipo IoT.
- **Pantalla de detalles:**
  - Información extendida del clima y del último sismo.
- **Pantalla de configuración:**
  - Cambiar umbral de temperatura y activar/desactivar notificaciones.
- **Estado del equipo:**
  - Indica si el dispositivo IoT está conectado y permite conectar/desconectar.
- **Notificaciones inteligentes:**
  - Notificación local automática si la temperatura es menor a 2 °C.
- **Modo offline:**
  - Muestra los últimos datos guardados si no hay conexión.
- **Soporte para modo oscuro y Material Design 3.**

## Tecnologías y dependencias

- **Lenguaje:** Kotlin
- **UI:** Jetpack Compose (Material 3)
- **Navegación:** Navigation Compose
- **Consumo de APIs:** Retrofit + Gson
- **Carga de imágenes:** (opcional) Coil
- **Notificaciones push:** Firebase Cloud Messaging (FCM)
- **Notificaciones locales:** NotificationCompat
- **Persistencia offline:** (puedes usar Room o DataStore para extender)

## APIs utilizadas

- **Clima:** [WeatherAPI](https://www.weatherapi.com/) (requiere API Key gratuita)
- **Sismos:** [USGS Earthquake API](https://earthquake.usgs.gov/fdsnws/event/1/)

## Configuración y ejecución

1. **Clona el repositorio y abre en Android Studio.**
2. **Consigue una API Key gratuita de WeatherAPI:**
   - Regístrate en https://www.weatherapi.com/ y copia tu clave.
   - Pon tu clave en el archivo `MainScreen.kt`:
     ```kotlin
     val weatherApiKey = "TU_API_KEY"
     ```
3. **Configura Firebase Cloud Messaging (opcional):**
   - Crea un proyecto en https://console.firebase.google.com/
   - Descarga el archivo `google-services.json` y colócalo en la carpeta `app/`.
   - Sincroniza el proyecto.
4. **Ejecuta la app en un emulador o dispositivo real.**
5. **La app mostrará datos reales de clima y sismos en Perú.**

## ¿Cómo funciona?

- Al iniciar, la app consulta WeatherAPI para obtener el clima actual de Ayacucho.
- Consulta la API de USGS para obtener los sismos recientes ocurridos en Perú.
- Si la temperatura es menor a 2 °C, lanza una notificación local de alerta de helada.
- Permite navegar entre pantallas y simular el estado de conexión de un equipo IoT.

## Personalización y extensiones

- Puedes cambiar la ciudad modificando la variable `city` en `MainScreen.kt`.
- Puedes extender la lógica para controlar un equipo IoT real.
- Puedes agregar persistencia offline con Room o DataStore.
- Puedes personalizar los umbrales y las notificaciones desde la pantalla de configuración.

## Créditos y licencias

- Clima: [WeatherAPI](https://www.weatherapi.com/)
- Sismos: [USGS Earthquake API](https://earthquake.usgs.gov/fdsnws/event/1/)
- UI: [Jetpack Compose](https://developer.android.com/jetpack/compose)
- Notificaciones: [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)

---

**Desarrollado para monitoreo inteligente y prevención de riesgos climáticos y sísmicos en Perú.** 