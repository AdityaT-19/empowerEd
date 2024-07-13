import 'package:empowered_teacher/app/routes/app_pages.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CieView extends StatelessWidget {
  final List<Map<String, String>> courses = [
    {'courseCode': 'CSE101', 'section': 'A'},
    {'courseCode': 'ECE202', 'section': 'B'},
    {'courseCode': 'ME303', 'section': 'C'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Update CIE',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        foregroundColor: Colors.white,
        backgroundColor: Colors.deepPurple,
      ),
      body: ListView.builder(
        itemCount: courses.length,
        itemBuilder: (context, index) {
          return CourseCard(
            courseCode: courses[index]['courseCode']!,
            section: courses[index]['section']!,
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
        borderRadius: BorderRadius.circular(15.0),
      ),
      child: ListTile(
        contentPadding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
        title: Text(
          courseCode,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.deepPurple,
            fontSize: 18.0,
          ),
        ),
        subtitle: Text(
          'Section: $section',
          style: TextStyle(
            color: Colors.deepPurple[300],
            fontSize: 16.0,
          ),
        ),
        trailing: Icon(
          Icons.arrow_forward_ios,
          color: Colors.deepPurple,
        ),
        onTap: () {
          Get.toNamed(Routes.UPDATE_CIE,
              parameters: {'courseCode': courseCode, 'section': section});
        },
      ),
    );
  }
}
