import 'package:get/get.dart';

class UpdateAttController extends GetxController {
  static final List<Map<String, String>> students = [
    {'name': 'John Doe', 'usn': '12345ABC'},
    {'name': 'Jane Smith', 'usn': '67890XYZ'},
    {'name': 'Alice Johnson', 'usn': '11223DEF'},
    {'name': 'Bob Brown', 'usn': '44556GHI'},
    {'name': 'Charlie Davis', 'usn': '77889JKL'},
  ];
  //TODO: Implement UpdateAttController

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
