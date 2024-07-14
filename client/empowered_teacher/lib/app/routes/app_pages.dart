import 'package:get/get.dart';

import '../modules/attendance/bindings/attendance_binding.dart';
import '../modules/attendance/views/attendance_view.dart';
import '../modules/bulk_update/bindings/bulk_update_binding.dart';
import '../modules/bulk_update/views/bulk_update_view.dart';
import '../modules/cie/bindings/cie_binding.dart';
import '../modules/cie/views/cie_view.dart';
import '../modules/counsel/bindings/counsel_binding.dart';
import '../modules/counsel/views/counsel_view.dart';
import '../modules/dashboard/views/dashboard.dart';
import '../modules/home/bindings/home_binding.dart';
import '../modules/home/views/home_view.dart';
import '../modules/login/bindings/login_bindings.dart';
import '../modules/login/views/login_screen.dart';
import '../modules/pass_change/bindings/pass_change_binding.dart';
import '../modules/pass_change/bindings/pass_change_binding.dart';
import '../modules/pass_change/views/pass_change_view.dart';
import '../modules/pass_change/views/pass_change_view.dart';
import '../modules/splash/bindings/splash_bindings.dart';
import '../modules/splash/views/splash.dart';
import '../modules/update_att/bindings/update_att_binding.dart';
import '../modules/update_att/views/update_att_view.dart';
import '../modules/update_cie/bindings/update_cie_binding.dart';
import '../modules/update_cie/views/update_cie_view.dart';
import '../modules/update_counsel/bindings/update_counsel_binding.dart';
import '../modules/update_counsel/views/update_counsel_view.dart';

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
      page: () => AttendanceView(),
      binding: AttendanceBinding(),
    ),
    GetPage(
      name: _Paths.CIE,
      page: () => CieView(),
      binding: CieBinding(),
    ),
    GetPage(
      name: _Paths.COUNSEL,
      page: () => CounselView(),
      binding: CounselBinding(),
    ),
    GetPage(
      name: _Paths.UPDATE_ATT,
      page: () => UpdateAttView(
          courseCode: Get.arguments['courseCode'] as String,
          section: Get.arguments['section'] as String),
      binding: UpdateAttBinding(),
    ),
    GetPage(
      name: _Paths.UPDATE_CIE,
      page: () => UpdateCieView(
          courseCode: Get.arguments['courseCode'] as String,
          section: Get.arguments['section'] as String),
      binding: UpdateCieBinding(),
    ),
    GetPage(
      name: _Paths.UPDATE_COUNSEL,
      page: () => UpdateCounselView(
          courseCode: Get.arguments['courseCode'] as String,
          section: Get.arguments['section'] as String),
      binding: UpdateCounselBinding(),
    ),
    GetPage(
      name: _Paths.BULK_UPDATE,
      page: () => BulkUpdateView(),
      binding: BulkUpdateBinding(),
    ),
    GetPage(
      name: _Paths.PASS_CHANGE,
      page: () => PassChangeView(),
      binding: PassChangeBinding(),
      children: [],
    ),
  ];
}
