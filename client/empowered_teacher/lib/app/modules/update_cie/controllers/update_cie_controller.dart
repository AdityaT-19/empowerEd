import 'package:get/get.dart';

class StudentModel {
  final String name;
  final String usn;
  int ia1;
  int ia2;
  int ia3;

  StudentModel({
    required this.name,
    required this.usn,
    required this.ia1,
    required this.ia2,
    required this.ia3,
  });
}

class UpdateCieController extends GetxController {
  //TODO: Implement UpdateCieController

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
