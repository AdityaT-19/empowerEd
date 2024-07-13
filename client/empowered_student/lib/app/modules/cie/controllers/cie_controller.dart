import 'package:get/get.dart';

class CieController extends GetxController {
  static final List<Map<String, dynamic>> subjects = [
    {
      'name': 'Mathematics',
      'marks': 45,
      'courseId': 'MATH101',
      'semester': 'Semester 1',
      'ia1': 40,
      'ia2': 50,
      'ia3': 45
    },
    {
      'name': 'Physics',
      'marks': 40,
      'courseId': 'PHY101',
      'semester': 'Semester 1',
      'ia1': 35,
      'ia2': 45,
      'ia3': 40
    },
    {
      'name': 'Chemistry',
      'marks': 35,
      'courseId': 'CHEM101',
      'semester': 'Semester 1',
      'ia1': 30,
      'ia2': 40,
      'ia3': 35
    },
    {
      'name': 'Biology',
      'marks': 30,
      'courseId': 'BIO101',
      'semester': 'Semester 1',
      'ia1': 25,
      'ia2': 35,
      'ia3': 30
    },
    {
      'name': 'Computer Science',
      'marks': 50,
      'courseId': 'CS101',
      'semester': 'Semester 1',
      'ia1': 45,
      'ia2': 50,
      'ia3': 50
    },
  ];
  //TODO: Implement CieController

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
