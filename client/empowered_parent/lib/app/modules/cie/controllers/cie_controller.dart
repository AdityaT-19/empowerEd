import 'dart:convert';

import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class CieController extends GetxController {
  final isLoading = true.obs;
  final List<Map<String, dynamic>> subjects = [];
  //TODO: Implement CieController

  final count = 0.obs;
  @override
  void onInit() async {
    super.onInit();
    await getCie();
  }

  Future<void> getCie() async {
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
      subjects.add({
        'name': course['name'],
        'courseId': course['cid'],
        'semester': course['semester'],
        'ia1': course['ia1'],
        'ia2': course['ia2'],
        'ia3': course['ia3'],
        'marks': (course['ia1'] + course['ia2'] + course['ia3']) / 2,
      });
    });
    print(data);
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
