import 'package:get/get.dart';

class CompaniesController extends GetxController {
  static final List<Map<String, String>> companies = [
    {
      'name': 'Google',
      'role': 'Software Engineer',
      'ctc': '30 LPA',
    },
    {
      'name': 'Amazon',
      'role': 'Data Scientist',
      'ctc': '28 LPA',
    },
    {
      'name': 'Microsoft',
      'role': 'Product Manager',
      'ctc': '25 LPA',
    },
    {
      'name': 'Apple',
      'role': 'Hardware Engineer',
      'ctc': '27 LPA',
    },
    {
      'name': 'Facebook',
      'role': 'UI/UX Designer',
      'ctc': '22 LPA',
    },
    {
      'name': 'Netflix',
      'role': 'Machine Learning Engineer',
      'ctc': '32 LPA',
    },
  ];
  //TODO: Implement CompaniesController

  final count = 0.obs;
  @override
  void onInit() {
    super.onInit();
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
