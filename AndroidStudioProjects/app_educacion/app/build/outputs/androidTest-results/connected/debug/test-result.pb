
Ü
e
ExampleInstrumentedTestcom.example.app_educaciontestImageButton1Click2«Î˚ªÄ«´K:–Î˚ª¿ö‡a"Û

logcatandroid›
⁄C:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\logcat-com.example.app_educacion.ExampleInstrumentedTest-testImageButton1Click.txt"¥

device-infoandroidô
ñC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\device-info.pb"µ

device-info.meminfoandroidí
èC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\meminfo"µ

device-info.cpuinfoandroidí
èC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\cpuinfoá
f
ExampleInstrumentedTestcom.example.app_educaciontestImageButton2Click2“Î˚ª¿©”::‘Î˚ªÄà≤"Û

logcatandroid›
⁄C:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\logcat-com.example.app_educacion.ExampleInstrumentedTest-testImageButton2Click.txt"¥

device-infoandroidô
ñC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\device-info.pb"µ

device-info.meminfoandroidí
èC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\meminfo"µ

device-info.cpuinfoandroidí
èC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\cpuinfoà
g
ExampleInstrumentedTestcom.example.app_educaciontestImageButton3Click2’Î˚ª¿ÈÈÎ:◊Î˚ª¿€§…"Û

logcatandroid›
⁄C:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\logcat-com.example.app_educacion.ExampleInstrumentedTest-testImageButton3Click.txt"¥

device-infoandroidô
ñC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\device-info.pb"µ

device-info.meminfoandroidí
èC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\meminfo"µ

device-info.cpuinfoandroidí
èC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\cpuinfoè2
g
ExampleInstrumentedTestcom.example.app_educaciontestImageButton4Click2ÿÎ˚ª¿Î≈ÿ:ﬁÎ˚ªÄü¶‹Ñ+
±androidx.test.espresso.PerformException: Error performing 'single click' on view 'Animations or transitions are enabled on the target device.
For more info check: https://developer.android.com/training/testing/espresso/setup#set-up-environment

view.getId() is <2131362055/com.example.app_educacion:id/imageButton4>'.
at androidx.test.espresso.PerformException$Builder.build(PerformException.java:86)
at androidx.test.espresso.base.PerformExceptionHandler.handleSafely(PerformExceptionHandler.java:56)
at androidx.test.espresso.base.PerformExceptionHandler.handleSafely(PerformExceptionHandler.java:31)
at androidx.test.espresso.base.DefaultFailureHandler$TypedFailureHandler.handle(DefaultFailureHandler.java:158)
at androidx.test.espresso.base.DefaultFailureHandler.handle(DefaultFailureHandler.java:120)
at androidx.test.espresso.ViewInteraction.waitForAndHandleInteractionResults(ViewInteraction.java:385)
at androidx.test.espresso.ViewInteraction.desugaredPerform(ViewInteraction.java:212)
at androidx.test.espresso.ViewInteraction.perform(ViewInteraction.java:140)
at com.example.app_educacion.ExampleInstrumentedTest.testImageButton4Click(ExampleInstrumentedTest.kt:69)
... 33 trimmed
Caused by: java.lang.RuntimeException: Action will not be performed because the target view does not match one or more of the following constraints:
(view has effective visibility <VISIBLE> and view.getGlobalVisibleRect() covers at least <90> percent of the view's area)
Target view: "AppCompatImageView{id=2131362055, res-name=imageButton4, visibility=VISIBLE, width=818, height=1147, has-focus=false, has-focusable=false, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=android.widget.RelativeLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=0.0}"
at androidx.test.espresso.ViewInteraction.doPerform(ViewInteraction.java:287)
at androidx.test.espresso.ViewInteraction.access$300(ViewInteraction.java:70)
at androidx.test.espresso.ViewInteraction$1.call(ViewInteraction.java:193)
at androidx.test.espresso.ViewInteraction$1.call(ViewInteraction.java:182)
at java.util.concurrent.FutureTask.run(FutureTask.java:264)
at android.os.Handler.handleCallback(Handler.java:959)
at android.os.Handler.dispatchMessage(Handler.java:100)
at android.os.Looper.loopOnce(Looper.java:232)
at android.os.Looper.loop(Looper.java:317)
at android.app.ActivityThread.main(ActivityThread.java:8705)
at java.lang.reflect.Method.invoke(Native Method)
at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:580)
at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:886)
java.lang.RuntimeException±androidx.test.espresso.PerformException: Error performing 'single click' on view 'Animations or transitions are enabled on the target device.
For more info check: https://developer.android.com/training/testing/espresso/setup#set-up-environment

view.getId() is <2131362055/com.example.app_educacion:id/imageButton4>'.
at androidx.test.espresso.PerformException$Builder.build(PerformException.java:86)
at androidx.test.espresso.base.PerformExceptionHandler.handleSafely(PerformExceptionHandler.java:56)
at androidx.test.espresso.base.PerformExceptionHandler.handleSafely(PerformExceptionHandler.java:31)
at androidx.test.espresso.base.DefaultFailureHandler$TypedFailureHandler.handle(DefaultFailureHandler.java:158)
at androidx.test.espresso.base.DefaultFailureHandler.handle(DefaultFailureHandler.java:120)
at androidx.test.espresso.ViewInteraction.waitForAndHandleInteractionResults(ViewInteraction.java:385)
at androidx.test.espresso.ViewInteraction.desugaredPerform(ViewInteraction.java:212)
at androidx.test.espresso.ViewInteraction.perform(ViewInteraction.java:140)
at com.example.app_educacion.ExampleInstrumentedTest.testImageButton4Click(ExampleInstrumentedTest.kt:69)
... 33 trimmed
Caused by: java.lang.RuntimeException: Action will not be performed because the target view does not match one or more of the following constraints:
(view has effective visibility <VISIBLE> and view.getGlobalVisibleRect() covers at least <90> percent of the view's area)
Target view: "AppCompatImageView{id=2131362055, res-name=imageButton4, visibility=VISIBLE, width=818, height=1147, has-focus=false, has-focusable=false, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=android.widget.RelativeLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=0.0}"
at androidx.test.espresso.ViewInteraction.doPerform(ViewInteraction.java:287)
at androidx.test.espresso.ViewInteraction.access$300(ViewInteraction.java:70)
at androidx.test.espresso.ViewInteraction$1.call(ViewInteraction.java:193)
at androidx.test.espresso.ViewInteraction$1.call(ViewInteraction.java:182)
at java.util.concurrent.FutureTask.run(FutureTask.java:264)
at android.os.Handler.handleCallback(Handler.java:959)
at android.os.Handler.dispatchMessage(Handler.java:100)
at android.os.Looper.loopOnce(Looper.java:232)
at android.os.Looper.loop(Looper.java:317)
at android.app.ActivityThread.main(ActivityThread.java:8705)
at java.lang.reflect.Method.invoke(Native Method)
at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:580)
at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:886)
"Û

logcatandroid›
⁄C:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\logcat-com.example.app_educacion.ExampleInstrumentedTest-testImageButton4Click.txt"¥

device-infoandroidô
ñC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\device-info.pb"µ

device-info.meminfoandroidí
èC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\meminfo"µ

device-info.cpuinfoandroidí
èC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\cpuinfo˛
b
ExampleInstrumentedTestcom.example.app_educaciontestLoginSuccess2ﬁÎ˚ªÄ∫îﬂ:ﬂÎ˚ª¿ˆíÃ"Ó

logcatandroidÿ
’C:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\logcat-com.example.app_educacion.ExampleInstrumentedTest-testLoginSuccess.txt"¥

device-infoandroidô
ñC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\device-info.pb"µ

device-info.meminfoandroidí
èC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\meminfo"µ

device-info.cpuinfoandroidí
èC:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\cpuinfo" *ô
c
test-results.logOcom.google.testing.platform.runtime.android.driver.AndroidInstrumentationDriver£
†C:\Users\USUARIO\AndroidStudioProjects\app_educacion\app\build\outputs\androidTest-results\connected\debug\Pixel_7_Pro_API_35(AVD) - 15\testlog\test-results.log 2
text/plain