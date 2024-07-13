import 'dart:convert';

import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class AttendanceController extends GetxController {
  RxBool isLoading = true.obs;
  final List<Map<String, dynamic>> courses = [];
  //TODO: Implement AttendanceController

  final count = 0.obs;
  @override
  void onInit() async {
    print('init called');
    await getAttendance();
    print('init done');
    super.onInit();
  }

  Future<void> getAttendance() async {
    isLoading.value = true;
    final prefs = await SharedPreferences.getInstance();
    final usn = prefs.getString('usn')!;
    print(usn);
    final url = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/parent/getStudentsMarksAndAttendance/$usn');
    final response = await http.get(url);
    final resData = jsonDecode(response.body);
    var data = resData['data'] as List;
    print(data);
    final semRes = jsonDecode((await http.get(Uri.parse(
            'https://empowered-dw0m.onrender.com/api/v1/student/$usn')))
        .body)['data'][0];
    print(semRes);
    final sem = semRes['sem'];

    data = data.where((element) => element['semester'] == sem).toList();
    data.forEach((course) {
      courses.add({
        'name': course['name'],
        'attendance': course['attPer'],
      });
    });
    print(courses);
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

  void increment() => count.value++;
}
