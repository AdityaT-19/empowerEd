import 'package:get/get.dart';

class UpdateCounselController extends GetxController {
  //TODO: Implement UpdateCounselController
  static final List<String> dummyUsns = [
    '12345ABC',
    '67890XYZ',
    '11223DEF',
    '44556GHI',
    '77889JKL',
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
