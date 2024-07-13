import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class ApplyJobsController extends GetxController {
  //TODO: Implement ApplyJobsController
  final isLoading = false.obs;
  final List<Map<String, dynamic>> companies = [
    {
      'cid': 1,
      'name': 'Google',
      'role': 'Software Engineer',
      'ctc': '30 LPA',
      'location': 'Mountain View, CA',
      'technicalExpertise': 'Flutter, Dart, Firebase'
    },
  ];
  final count = 0.obs;
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
        'cid': company['id'],
        'name': company['name'],
        'role': company['jobRole'],
        'ctc': company['ctc'],
        'location': company['jobLocation'],
        'technicalExpertise': company['skills']
      });
    });
    isLoading.value = false;
  }

  Future<void> applyForJob(int cid) async {
    final prefs = await SharedPreferences.getInstance();
    final usn = prefs.getString('usn');
    final curl = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/placement/getStudentsByCompany/$cid');
    final cres = await http.get(curl);
    final cbody = jsonDecode(cres.body)['data'];
    final applied = cbody.any((student) => student['usn'] == usn);

    if (applied) {
      Get.snackbar(
        'Already Applied',
        'You have already applied for this job',
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    } else {
      final url = Uri.parse(
          'https://empowered-dw0m.onrender.com/api/v1/student/applyForCompany');
      final res = await http.post(
        url,
        body: jsonEncode({
          'usn': usn,
          'cid': cid,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      );
      if (res.statusCode == 200) {
        Get.snackbar(
          'Applied Successfully',
          'You have successfully applied for this job',
          snackPosition: SnackPosition.BOTTOM,
          backgroundColor: Colors.green,
          colorText: Colors.white,
        );
      } else {
        Get.snackbar(
          'Failed to Apply',
          'Failed to apply for this job. Please try again later',
          snackPosition: SnackPosition.BOTTOM,
          backgroundColor: Colors.red,
          colorText: Colors.white,
        );
      }
    }
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
