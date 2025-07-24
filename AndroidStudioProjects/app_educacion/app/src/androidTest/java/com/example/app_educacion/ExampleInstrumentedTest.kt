package com.example.app_educacion

import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.ext.junit.runners.AndroidJUnit4

import org.junit.Test
import org.junit.runner.RunWith

import org.junit.Assert.*
import org.junit.Rule
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.click
import androidx.test.espresso.intent.Intents
import androidx.test.espresso.intent.matcher.IntentMatchers.hasComponent
import androidx.test.espresso.matcher.ViewMatchers.withId
import androidx.test.ext.junit.rules.ActivityScenarioRule
import com.google.firebase.auth.FirebaseAuth

/**
 * Instrumented test, which will execute on an Android device.
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
@RunWith(AndroidJUnit4::class)
class ExampleInstrumentedTest {

    @get:Rule
    val activityRule = ActivityScenarioRule(MainActivity::class.java)
    private lateinit var auth: FirebaseAuth


    @Test
    fun testImageButton1Click() {
        Intents.init()
        try {
            onView(withId(R.id.imageButton1)).perform(click())
            Intents.intended(hasComponent(MainActivity2::class.java.name))
        } finally {
            Intents.release()
        }
    }

    @Test
    fun testImageButton2Click() {
        Intents.init()
        try {
            onView(withId(R.id.imageButton2)).perform(click())
            Intents.intended(hasComponent(MainActivity2::class.java.name))
        } finally {
            Intents.release()
        }
    }

    @Test
    fun testImageButton3Click() {
        Intents.init()
        try {
            onView(withId(R.id.imageButton3)).perform(click())
            Intents.intended(hasComponent(MainActivity2::class.java.name))
        } finally {
            Intents.release()
        }
    }

    @Test
    fun testImageButton4Click() {
        Intents.init()
        try {
            onView(withId(R.id.imageButton4)).perform(click())
            Intents.intended(hasComponent(MainActivity2::class.java.name))
        } finally {
            Intents.release()
        }
    }

    @Test
    fun testLoginSuccess() {
        val testEmail = "witman1231@gmail.com"
        val testPassword = "123Wibike"

        auth = FirebaseAuth.getInstance()

        auth.signInWithEmailAndPassword(testEmail, testPassword)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    // Si la autenticación es exitosa
                    val user = auth.currentUser
                    assertEquals(testEmail, user?.email)
                    println("Inicio de sesión exitoso: ${user?.email}")
                    Intents.init()
                    onView(withId(R.id.loginButton)).perform(click())
                    Intents.intended(hasComponent(MainActivity::class.java.name))
                    Intents.release()
                } else {
                    println("Autenticación fallida: ${task.exception?.message}")
                }
            }
    }

}