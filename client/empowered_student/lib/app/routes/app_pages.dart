import 'package:empowered_student/app/modules/dashboard/views/dashboard.dart';
import 'package:empowered_student/app/modules/login/bindings/login_bindings.dart';
import 'package:empowered_student/app/modules/login/views/login_screen.dart';
import 'package:empowered_student/app/modules/splash/views/splash.dart';
import 'package:empowered_student/app/modules/splash/bindings/splash_bindings.dart';
import 'package:get/get.dart';

import '../modules/home/bindings/home_binding.dart';
import '../modules/home/views/home_view.dart';

part 'app_routes.dart';

class AppPages {
  AppPages._();

  static const INITIAL = Routes.HOME;

  static final routes = [
    GetPage(
      name: _Paths.HOME,
      page: () => const HomeView(),
      binding: HomeBinding(),
    ),
    GetPage(
      name: _Paths.LOGIN,
      page: () => const LoginScreen(),
      binding: LoginBinding(),
    ),
    GetPage(
      name: _Paths.SPLASH,
      page: () => const SplashScreen(),
      binding: SplashBindings(),
    ),
    GetPage(
      name: _Paths.DASHBOARD,
      page: () => DashboardScreen(),
      binding: SplashBindings(),
    ),
  ];
}
