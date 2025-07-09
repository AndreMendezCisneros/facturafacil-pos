package com.climaysismointeligente.data

data class UsgsResponse(
    val features: List<EarthquakeFeature>
)

data class EarthquakeFeature(
    val properties: EarthquakeProperties,
    val geometry: EarthquakeGeometry
)

data class EarthquakeProperties(
    val mag: Double?,
    val place: String?,
    val time: Long
)

data class EarthquakeGeometry(
    val coordinates: List<Double>
) 