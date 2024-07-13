import 'package:empowered_teacher/app/modules/splash/contoller/splash_controller.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';

class SplashBindings extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<SplashController>(() => SplashController());
  }
}
