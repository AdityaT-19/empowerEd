import 'dart:convert';

import 'package:get/get.dart';
import 'package:http/http.dart' as http;

class JobListController extends GetxController {
  final isLoading = false.obs;
  final List<Map<String, dynamic>> companies = [
    {
      'name': 'Google',
      'role': 'Software Engineer',
      'ctc': '30 LPA',
      'location': 'Mountain View, CA',
      'technicalExpertise': 'Flutter, Dart, Firebase'
    },
    {
      'name': 'Amazon',
      'role': 'Data Scientist',
      'ctc': '28 LPA',
      'location': 'Seattle, WA',
      'technicalExpertise': 'Python, ML, AWS'
    },
    {
      'name': 'Microsoft',
      'role': 'Product Manager',
      'ctc': '25 LPA',
      'location': 'Redmond, WA',
      'technicalExpertise': 'Agile, Scrum, UX'
    },
    {
      'name': 'Apple',
      'role': 'Hardware Engineer',
      'ctc': '27 LPA',
      'location': 'Cupertino, CA',
      'technicalExpertise': 'Verilog, VHDL, PCB Design'
    },
    {
      'name': 'Facebook',
      'role': 'UI/UX Designer',
      'ctc': '22 LPA',
      'location': 'Menlo Park, CA',
      'technicalExpertise': 'Sketch, Figma, Adobe XD'
    },
    {
      'name': 'Netflix',
      'role': 'Machine Learning Engineer',
      'ctc': '32 LPA',
      'location': 'Los Gatos, CA',
      'technicalExpertise': 'Python, TensorFlow, Keras'
    },
  ];
  //TODO: Implement JobListController

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
