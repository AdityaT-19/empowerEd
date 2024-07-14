import 'package:empowered_teacher/app/modules/attendance/controllers/attendance_controller.dart';
import 'package:empowered_teacher/app/routes/app_pages.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AttendanceView extends StatelessWidget {
  final attendanceController = Get.find<AttendanceController>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        foregroundColor: Colors.white,
        title: Text('Update Attendance'),
        backgroundColor: Colors.deepPurple, // Purple app bar
      ),
      body: ListView.builder(
        itemCount: attendanceController.courses.length,
        itemBuilder: (context, index) {
          return CourseCard(
            courseCode: attendanceController.courses[index]['courseCode']!,
            section: attendanceController.courses[index]['section']!,
          );
        },
      ),
    );
  }
}

class CourseCard extends StatelessWidget {
  final String courseCode;
  final String section;

  CourseCard({required this.courseCode, required this.section});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: EdgeInsets.all(8.0),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
      ),
      child: InkWell(
        onTap: () {
          // Navigate to update attendance view on tap
          Get.toNamed(Routes.UPDATE_ATT,
              arguments: {'courseCode': courseCode, 'section': section});
        },
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                courseCode,
                style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.deepPurple), // Purple text color
              ),
              SizedBox(height: 8.0),
              Text(
                'Section: $section',
                style: TextStyle(fontSize: 16, color: Colors.grey[600]),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
