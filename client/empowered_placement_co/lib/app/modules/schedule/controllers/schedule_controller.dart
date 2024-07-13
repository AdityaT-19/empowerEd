import 'package:get/get.dart';

class ScheduleController extends GetxController {
  static final List<String> dummyUsns = [
    'USN001',
    'USN002',
    'USN003',
    'USN004',
    'USN005'
  ];
  //TODO: Implement ScheduleController

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
