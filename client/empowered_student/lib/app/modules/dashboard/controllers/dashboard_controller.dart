import 'package:empowered_student/app/routes/app_pages.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class DashboardController extends GetxController {
  static final List<IconData> icons = [
    Icons.book,
    Icons.bookmark_added_sharp,
    Icons.restore_outlined,
    Icons.shopping_bag_outlined,
    Icons.document_scanner,
    Icons.phone_enabled_rounded,
  ];

  static final List<String> texts = [
    'Attendance',
    'IA Details',
    'Prev. Results',
    'CTC Predictor',
    'Companies',
    'Apply Online',
  ];

  static final List<String> routes = [
    Routes.ATTENDANCE,
    Routes.CIE,
    Routes.PREV_RES,
    Routes.CTC,
    Routes.COMPANIES,
    Routes.APPLY_JOBS,
  ];
}
