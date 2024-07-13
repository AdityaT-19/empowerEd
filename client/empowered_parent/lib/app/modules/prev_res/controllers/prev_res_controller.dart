import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class PrevResController extends GetxController {
  final isLoading = true.obs;
  final List<Map<String, dynamic>> semesters = [];
  //TODO: Implement PrevResController

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

    data = data.where((element) => element['semester'] != sem).toList();
    final semsters = data.map((e) => e['semester']).toList();
    print(semsters);
    semsters.forEach((element) {
      final semData = data.where((e) => e['semester'] == element).toList();
      final courses = semData.map((e) => e['cid']).toList();
      final grades = semData.map((e) => e['grade']).toList();
      print(courses);
      print(grades);
      final semDataMap = {
        'title': 'Semester $element',
        'courses': List.generate(courses.length, (index) {
          return {
            'courseId': courses[index],
            'grade': grades[index] == '' ? 'NA' : grades[index],
          };
        }),
      };
      semesters.add(semDataMap);
    });
    print(semesters);
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
