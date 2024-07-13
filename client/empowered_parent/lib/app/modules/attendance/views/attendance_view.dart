import 'package:flutter/material.dart';
import 'package:empowered_parent/app/modules/attendance/controllers/attendance_controller.dart';
import 'package:get/get.dart';

class AttendanceView extends StatelessWidget {
  final AttendanceController attendanceController =
      Get.find<AttendanceController>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        foregroundColor: Colors.white,
        title: Text('Attendance'),
        backgroundColor: Colors.deepPurple,
      ),
      body: Obx(
        () => attendanceController.isLoading.value
            ? Center(child: CircularProgressIndicator())
            : ListView.builder(
                padding: EdgeInsets.all(16.0),
                itemCount: attendanceController.courses.length,
                itemBuilder: (context, index) {
                  final course = attendanceController.courses[index];
                  Color progressBarColor =
                      course['attendance'] > 75 ? Colors.green : Colors.red;

                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                    child: Card(
                      elevation: 4.0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              course['name'],
                              style: TextStyle(
                                fontSize: 18.0,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            SizedBox(height: 12.0),
                            Row(
                              children: [
                                Expanded(
                                  flex: 4,
                                  child: Text(
                                    'Attendance: ${course['attendance']}%',
                                    style: TextStyle(
                                      fontSize: 16.0,
                                    ),
                                  ),
                                ),
                                Expanded(
                                  flex: 6,
                                  child: LinearProgressIndicator(
                                    value: course['attendance'] / 100,
                                    backgroundColor: Colors.grey[300],
                                    valueColor: AlwaysStoppedAnimation<Color>(
                                        progressBarColor),
                                    minHeight: 8.0,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
      ),
    );
  }
}
