package com.climaysismointeligente.data

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiModule {
    private const val WEATHER_BASE_URL = "https://api.weatherapi.com/"
    private const val USGS_BASE_URL = "https://earthquake.usgs.gov/"

    val weatherApi: WeatherApiService by lazy {
        Retrofit.Builder()
            .baseUrl(WEATHER_BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(WeatherApiService::class.java)
    }

    val usgsApi: UsgsApiService by lazy {
        Retrofit.Builder()
            .baseUrl(USGS_BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(UsgsApiService::class.java)
    }
} 