import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class InterviewsController extends GetxController {
  final List<Map<String, String>> dummyInterviews = [
    {
      'company': 'Company A',
      'startTime': '10:00 AM',
      'endTime': '11:00 AM',
      'date': '2024-07-20',
      'location': 'Room 101',
    },
    {
      'company': 'Company B',
      'startTime': '2:00 PM',
      'endTime': '3:00 PM',
      'date': '2024-07-22',
      'location': 'Room 202',
    },
  ];
  //TODO: Implement InterviewsController

  final count = 0.obs;
  @override
  void onInit() async {
    super.onInit();
    await fetchInterviews();
  }

  Future<void> fetchInterviews() async {
    final prefs = await SharedPreferences.getInstance();
    final usn = prefs.getString('usn');
    final url = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/student/getSlots/$usn');
    final response = await http.get(url);
    print(response.body);
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
