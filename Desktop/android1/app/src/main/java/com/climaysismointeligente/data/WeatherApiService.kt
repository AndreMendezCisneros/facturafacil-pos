package com.climaysismointeligente.data

import retrofit2.http.GET
import retrofit2.http.Query

interface WeatherApiService {
    @GET("v1/current.json")
    suspend fun getWeatherByCity(
        @Query("key") apiKey: String,
        @Query("q") city: String,
        @Query("lang") lang: String = "es"
    ): WeatherApiResponse
} 