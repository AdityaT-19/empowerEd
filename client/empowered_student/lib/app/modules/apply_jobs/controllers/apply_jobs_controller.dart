import 'package:get/get.dart';

class ApplyJobsController extends GetxController {
  //TODO: Implement ApplyJobsController
  static final List<Map<String, dynamic>> companies = [
    {
      'name': 'Google',
      'role': 'Software Engineer',
      'ctc': '30 LPA',
      'location': 'Mountain View, CA',
      'inhand': '25 LPA',
      'technicalExpertise': 'Flutter, Dart, Firebase'
    },
    {
      'name': 'Amazon',
      'role': 'Data Scientist',
      'ctc': '28 LPA',
      'location': 'Seattle, WA',
      'inhand': '23 LPA',
      'technicalExpertise': 'Python, ML, AWS'
    },
    {
      'name': 'Microsoft',
      'role': 'Product Manager',
      'ctc': '25 LPA',
      'location': 'Redmond, WA',
      'inhand': '21 LPA',
      'technicalExpertise': 'Agile, Scrum, UX'
    },
    {
      'name': 'Apple',
      'role': 'Hardware Engineer',
      'ctc': '27 LPA',
      'location': 'Cupertino, CA',
      'inhand': '22 LPA',
      'technicalExpertise': 'Verilog, VHDL, PCB Design'
    },
    {
      'name': 'Facebook',
      'role': 'UI/UX Designer',
      'ctc': '22 LPA',
      'location': 'Menlo Park, CA',
      'inhand': '19 LPA',
      'technicalExpertise': 'Sketch, Figma, Adobe XD'
    },
    {
      'name': 'Netflix',
      'role': 'Machine Learning Engineer',
      'ctc': '32 LPA',
      'location': 'Los Gatos, CA',
      'inhand': '28 LPA',
      'technicalExpertise': 'Python, TensorFlow, Keras'
    },
  ];
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
