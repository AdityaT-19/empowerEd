import 'dart:convert';

import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class StudentModel {
  final String name;
  final String usn;
  int ia1;
  int ia2;
  int ia3;

  StudentModel({
    required this.name,
    required this.usn,
    required this.ia1,
    required this.ia2,
    required this.ia3,
  });
}

class UpdateCieController extends GetxController {
  //TODO: Implement UpdateCieController
  List<StudentModel> students = [
    StudentModel(name: 'John Doe', usn: '12345ABC', ia1: 40, ia2: 35, ia3: 42),
  ];

  final isLoading = true.obs;

  @override
  void onInit() async {
    super.onInit();
    await getStudents();
  }

  Future<void> getStudents() async {
    // Fetch students from the database
    isLoading.value = true;
    final prefs = await SharedPreferences.getInstance();
    final tid = prefs.getString('tid');

    final cid = Get.arguments['courseCode'];
    print(cid);
    final section = Get.arguments['section'];
    print(section);
    final url = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/teacher/fetchStudentCie');

    final body = jsonEncode({
      'tid': tid,
      'cid': cid,
      'section': section,
    });

    final headers = {
      'Content-Type': 'application/json',
    };

    final response = await http.post(url, headers: headers, body: body);
    print(response.body);
    final data = jsonDecode(response.body)['data'];

    students.clear();
    data.forEach((student) {
      students.add(StudentModel(
        name: student['name'],
        usn: student['usn'],
        ia1: student['ia1'],
        ia2: student['ia2'],
        ia3: student['ia3'],
      ));
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
