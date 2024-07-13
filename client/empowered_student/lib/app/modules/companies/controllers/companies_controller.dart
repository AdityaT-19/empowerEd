import 'dart:convert';

import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class CompaniesController extends GetxController {
  final List<Map<String, String>> companies = [
    {
      'name': 'Google',
      'role': 'Software Engineer',
      'ctc': '30 LPA',
    },
  ];
  //TODO: Implement CompaniesController

  final isLoading = false.obs;
  @override
  void onInit() async {
    super.onInit();
    await getCompanies();
  }

  Future<void> getCompanies() async {
    isLoading.value = true;
    final url = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/student/getCompanies');
    final res = await http.get(url);
    final body = jsonDecode(res.body)['data'];
    companies.clear();
    print(body);
    body.forEach((company) {
      companies.add({
        'name': company['name'],
        'role': company['jobRole'],
        'ctc': company['ctc'],
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
