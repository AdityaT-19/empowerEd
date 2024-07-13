import 'dart:convert';

import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class Report {
  String title;
  String details;
  Report({required this.title, required this.details});
}

class CounselController extends GetxController {
  //TODO: Implement CounselController
  final isLoading = true.obs;
  final List<Report> counsel_data = [];
  final List<bool> isExpanded = [];

  final count = 0.obs;
  @override
  void onInit() async {
    super.onInit();
    await getReports();
  }

  Future<void> getReports() async {
    isLoading.value = true;
    final prefs = await SharedPreferences.getInstance();
    final usn = prefs.getString('usn')!;
    print(usn);
    final url = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/parent/getCounsellingReports/$usn');
    final response = await http.get(url);
    final resData = jsonDecode(response.body);
    var data = resData['data'][0]['counsel_rep'];
    print(data);
    for (var i = 0; i < data.length; i++) {
      counsel_data.add(Report(
        title: 'Report ${i + 1}',
        details: data[i],
      ));
      isExpanded.add(false);
    }
    print(counsel_data[0].details);
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
