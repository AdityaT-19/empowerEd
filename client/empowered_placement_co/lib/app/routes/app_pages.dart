import 'package:get/get.dart';

import '../modules/add_comp/bindings/add_comp_binding.dart';
import '../modules/add_comp/views/add_comp_view.dart';
import '../modules/dashboard/views/dashboard.dart';
import '../modules/home/bindings/home_binding.dart';
import '../modules/home/views/home_view.dart';
import '../modules/job_list/bindings/job_list_binding.dart';
import '../modules/job_list/views/job_list_view.dart';
import '../modules/login/bindings/login_bindings.dart';
import '../modules/login/views/login_screen.dart';
import '../modules/pass_change/bindings/pass_change_binding.dart';
import '../modules/pass_change/bindings/pass_change_binding.dart';
import '../modules/pass_change/views/pass_change_view.dart';
import '../modules/pass_change/views/pass_change_view.dart';
import '../modules/schedule/bindings/schedule_binding.dart';
import '../modules/schedule/views/schedule_view.dart';
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
      name: _Paths.ADD_COMP,
      page: () => AddCompView(),
      binding: AddCompBinding(),
    ),
    GetPage(
      name: _Paths.JOB_LIST,
      page: () => JobListView(),
      binding: JobListBinding(),
    ),
    GetPage(
      name: _Paths.SCHEDULE,
      page: () => ScheduleView(cid: Get.arguments['cid']),
      binding: ScheduleBinding(),
    ),
    GetPage(
      name: _Paths.PASS_CHANGE,
      page: () => PassChangeView(),
      binding: PassChangeBinding(),
    ),
  ];
}
