package com.climaysismointeligente.data

import retrofit2.http.GET
import retrofit2.http.Query

interface UsgsApiService {
    @GET("fdsnws/event/1/query?format=geojson")
    suspend fun getEarthquakesPeru(
        @Query("minlatitude") minLat: Double = -18.0,
        @Query("maxlatitude") maxLat: Double = -0.04,
        @Query("minlongitude") minLon: Double = -81.35,
        @Query("maxlongitude") maxLon: Double = -68.65,
        @Query("orderby") orderBy: String = "time",
        @Query("limit") limit: Int = 10
    ): UsgsResponse
} 