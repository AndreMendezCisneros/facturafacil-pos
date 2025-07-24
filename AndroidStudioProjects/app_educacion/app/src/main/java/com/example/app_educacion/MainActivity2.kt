package com.example.app_educacion

import android.annotation.SuppressLint
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import org.imaginativeworld.whynotimagecarousel.ImageCarousel
import org.imaginativeworld.whynotimagecarousel.model.CarouselItem


class MainActivity2 : AppCompatActivity() {
    var images_place: ArrayList<String>? = ArrayList()
    var details_place: ArrayList<String> ?= ArrayList()

    lateinit var place: TextView
    lateinit var province: TextView
    lateinit var description: TextView
    lateinit var btn_share: Button




    @SuppressLint("UseCompatLoadingForDrawables")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main2)

        btn_share = findViewById(R.id.btn_share)

        images_place = ArrayList()
        images_place = intent.getStringArrayListExtra("images_place")

        details_place = ArrayList()
        details_place = intent.getStringArrayListExtra("details_place")

        val carousel = findViewById<ImageCarousel>(R.id.carousel)
        carousel.registerLifecycle(lifecycle)
        val listCarousel: MutableList<CarouselItem> = ArrayList()


        try {
            place = findViewById(R.id.place_name)
            province = findViewById(R.id.province)
            description = findViewById(R.id.description)

            place.setText(details_place!![0])
            province.setText(details_place!![1])
            description.setText(details_place!![2])
        } catch (e: Exception) {
            Toast.makeText(this@MainActivity2, "Error a setear details_place", Toast.LENGTH_SHORT)
                .show()
        }


        // Image drawable with caption
        listCarousel.add(
            CarouselItem(
                images_place!![0].toInt()
            )
        )

        listCarousel.add(
            CarouselItem(
                images_place!![1].toInt()
            )
        )

        listCarousel.add(
            CarouselItem(
                images_place!![2].toInt()
            )
        )

        carousel.setData(listCarousel)


        btn_share.setOnClickListener(View.OnClickListener {
            val intent = Intent()
            intent.setAction(Intent.ACTION_SEND)
            intent.putExtra(Intent.EXTRA_TEXT, resources.getString(R.string.share_link))
            intent.setType("text/plain")
            intent.setPackage("com.whatsapp")
            try {
                startActivity(intent)
            } catch (e: Exception) {
                val intent1 = Intent()
                intent1.setAction(Intent.ACTION_VIEW)
                intent1.setData(Uri.parse(resources.getString(R.string.share_whatsapp)))
                startActivity(intent1)
            }
        })


    }
}