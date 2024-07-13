import 'package:get/get.dart';

class AttendanceController extends GetxController {
  static final List<Map<String, dynamic>> courses = [
    {'name': 'Mathematics', 'attendance': 75},
    {'name': 'Physics', 'attendance': 85},
    {'name': 'Chemistry', 'attendance': 90},
    {'name': 'Biology', 'attendance': 70},
    {'name': 'Computer Science', 'attendance': 95},
  ];
  //TODO: Implement AttendanceController

  final count = 0.obs;
  @override
  void onInit() {
    super.onInit();
  }

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {
    super.onClose();
  }

  void increment() => count.value++;
}
