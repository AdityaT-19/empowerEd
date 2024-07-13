import 'package:get/get.dart';

class Report {
  String title;
  String details;
  Report({required this.title, required this.details});
}

final List<Report> counsel_data = [
  Report(
      title: 'Report 1',
      details:
          'This report summarizes the initial counseling session. The student showed great improvement in stress management and is making positive progress.'),
  Report(
      title: 'Report 2',
      details:
          'In this session, we discussed academic challenges. The student has developed effective study habits and is on track for better performance.'),
  Report(
      title: 'Report 3',
      details:
          'The focus of this counseling was career planning. The student has identified potential career paths and is working on relevant skills development.'),
];

class CounselController extends GetxController {
  //TODO: Implement CounselController

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
