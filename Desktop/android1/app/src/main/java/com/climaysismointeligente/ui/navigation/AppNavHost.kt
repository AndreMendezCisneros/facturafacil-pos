package com.climaysismointeligente.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.climaysismointeligente.ui.screens.MainScreen
import com.climaysismointeligente.ui.screens.DetailScreen
import com.climaysismointeligente.ui.screens.SettingsScreen
import com.climaysismointeligente.ui.screens.DeviceStatusScreen

sealed class Screen(val route: String) {
    object Main : Screen("main")
    object Details : Screen("details")
    object Settings : Screen("settings")
    object DeviceStatus : Screen("device_status")
}

@Composable
fun AppNavHost(navController: NavHostController = rememberNavController()) {
    NavHost(navController = navController, startDestination = Screen.Main.route) {
        composable(Screen.Main.route) { MainScreen(navController) }
        composable(Screen.Details.route) { DetailScreen(navController) }
        composable(Screen.Settings.route) { SettingsScreen(navController) }
        composable(Screen.DeviceStatus.route) { DeviceStatusScreen(navController) }
    }
} 