import 'package:get/get.dart';

class PrevResController extends GetxController {
  static final List<Map<String, dynamic>> semesters = [
    {
      'title': 'Semester 1',
      'courses': [
        {'courseId': 'MATH101', 'grade': 'A'},
        {'courseId': 'PHY101', 'grade': 'B+'},
        {'courseId': 'CHEM101', 'grade': 'A-'},
        {'courseId': 'BIO101', 'grade': 'B'},
        {'courseId': 'CS101', 'grade': 'A+'},
        {'courseId': 'ENG101', 'grade': 'B+'}
      ]
    },
    {
      'title': 'Semester 2',
      'courses': [
        {'courseId': 'MATH102', 'grade': 'B+'},
        {'courseId': 'PHY102', 'grade': 'A'},
        {'courseId': 'CHEM102', 'grade': 'B'},
        {'courseId': 'BIO102', 'grade': 'A-'},
        {'courseId': 'CS102', 'grade': 'A+'},
        {'courseId': 'ENG102', 'grade': 'B'}
      ]
    },
    {
      'title': 'Semester 3',
      'courses': [
        {'courseId': 'MATH201', 'grade': 'A+'},
        {'courseId': 'PHY201', 'grade': 'A'},
        {'courseId': 'CHEM201', 'grade': 'B+'},
        {'courseId': 'BIO201', 'grade': 'A-'},
        {'courseId': 'CS201', 'grade': 'A+'},
        {'courseId': 'ENG201', 'grade': 'B+'}
      ]
    }
  ];
  //TODO: Implement PrevResController

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
