import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class UpdateCounselController extends GetxController {
  final isLoading = true.obs;
  //TODO: Implement UpdateCounselController
  final List<String> dummyUsns = [
    '12345ABC',
    '67890XYZ',
    '11223DEF',
    '44556GHI',
    '77889JKL',
  ];

  final count = 0.obs;
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
        'https://empowered-dw0m.onrender.com/api/v1/teacher/fetchStudentList');

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
    dummyUsns.clear();
    for (var student in data) {
      dummyUsns.add(student['usn']);
    }
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
