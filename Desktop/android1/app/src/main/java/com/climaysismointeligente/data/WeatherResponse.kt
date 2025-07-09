package com.climaysismointeligente.data

data class WeatherApiResponse(
    val location: WeatherLocation,
    val current: WeatherCurrent
)

data class WeatherLocation(
    val name: String,
    val country: String
)

data class WeatherCurrent(
    val temp_c: Double,
    val condition: WeatherCondition
)

data class WeatherCondition(
    val text: String,
    val icon: String
) 