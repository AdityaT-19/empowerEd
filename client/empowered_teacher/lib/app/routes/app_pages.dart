import 'package:get/get.dart';

import '../modules/attendance/bindings/attendance_binding.dart';
import '../modules/attendance/views/attendance_view.dart';
import '../modules/cie/bindings/cie_binding.dart';
import '../modules/cie/views/cie_view.dart';
import '../modules/counsel/bindings/counsel_binding.dart';
import '../modules/counsel/views/counsel_view.dart';
import '../modules/dashboard/views/dashboard.dart';
import '../modules/home/bindings/home_binding.dart';
import '../modules/home/views/home_view.dart';
import '../modules/login/bindings/login_bindings.dart';
import '../modules/login/views/login_screen.dart';
import '../modules/splash/bindings/splash_bindings.dart';
import '../modules/splash/views/splash.dart';

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
    GetPage(
      name: _Paths.ATTENDANCE,
      page: () => const AttendanceView(),
      binding: AttendanceBinding(),
    ),
    GetPage(
      name: _Paths.CIE,
      page: () => const CieView(),
      binding: CieBinding(),
    ),
    GetPage(
      name: _Paths.COUNSEL,
      page: () => const CounselView(),
      binding: CounselBinding(),
    ),
  ];
}
