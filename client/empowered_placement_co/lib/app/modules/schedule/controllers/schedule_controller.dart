import 'dart:convert';

import 'package:get/get.dart';
import 'package:http/http.dart' as http;

class ScheduleController extends GetxController {
  final isLoading = false.obs;

  final List<String> dummyUsns = [
    'USN001',
  ];
  //TODO: Implement ScheduleController

  @override
  void onInit() async {
    print(Get.arguments['cid']);
    super.onInit();
    await getUsns();
  }

  Future<void> getUsns() async {
    isLoading.value = true;
    final cid = Get.arguments['cid'];
    final url = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/placement/getStudentsByCompany/$cid');
    final res = await http.get(url);
    final body = jsonDecode(res.body)['data'];
    dummyUsns.clear();
    body.forEach((usn) {
      dummyUsns.add(usn['usn']);
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
