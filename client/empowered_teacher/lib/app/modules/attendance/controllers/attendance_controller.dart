import 'dart:convert';

import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class AttendanceController extends GetxController {
  //TODO: Implement AttendanceController

  final List<Map<String, String>> courses = [];
  final isLoading = true.obs;
  @override
  void onInit() async {
    super.onInit();
    await getCourses();
  }

  Future<void> getCourses() async {
    isLoading.value = true;
    final prefs = await SharedPreferences.getInstance();
    final tid = prefs.getString('tid');
    print(tid);

    // Fetch courses from the database
    final url = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/teacher/courses/$tid');
    final response = await http.get(url);

    final data = jsonDecode(response.body)['data'];
    print(data);
    data.forEach((course) {
      courses.add({
        'courseCode': course['cid'],
        'section': course['section'],
      });
    });
    isLoading.value = false;
  }

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {
    super.onClose();
  }
}
