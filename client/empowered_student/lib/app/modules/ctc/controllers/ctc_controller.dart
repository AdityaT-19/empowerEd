import 'package:get/get.dart';

class Student {
  final String dept;
  String name;
  final double cgpa;
  Student({required this.dept, required this.name, required this.cgpa});
}

class CtcController extends GetxController {
  //TODO: Implement CtcController

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
