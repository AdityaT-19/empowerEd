import 'dart:convert';

import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class InterviewsController extends GetxController {
  final isLoading = true.obs;
  final dummyInterviews = [];
  //TODO: Implement InterviewsController

  final count = 0.obs;
  @override
  void onInit() async {
    super.onInit();
    await fetchInterviews();
  }

  Future<void> fetchInterviews() async {
    isLoading.value = true;
    final prefs = await SharedPreferences.getInstance();
    final usn = prefs.getString('usn');
    final url = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/student/getSlots/$usn');
    final response = await http.post(url);

    final curl = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/student/getCompanies');
    final response2 = await http.get(curl);

    //print(response.body);
    final data = jsonDecode(response.body)['data'];
    var data2 = jsonDecode(response2.body)['data'];

    print(data2);
    final comps = {for (var comp in data2) comp['id']: comp['name']};
    print(data2);
    print(data);
    data.forEach((slot) {
      final date = slot['start_time'].split('T')[0];
      final startTime = slot['start_time'].split('T')[1].split('.')[0];
      final endTime = slot['end_time'].split('T')[1].split('.')[0];
      print(date);
      print(startTime);
      print(endTime);
      dummyInterviews.add({
        'company': comps[slot['compid']],
        'date': date,
        'startTime': startTime,
        'endTime': endTime,
      });
    });
    print(dummyInterviews);
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
