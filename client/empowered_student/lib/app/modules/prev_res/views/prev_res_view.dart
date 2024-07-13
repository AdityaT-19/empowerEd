import 'package:flutter/material.dart';
import 'package:empowered_student/app/modules/prev_res/controllers/prev_res_controller.dart';
import 'package:get/get.dart';

class PrevResView extends StatelessWidget {
  final PrevResController prevResController = Get.find<PrevResController>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Previous Sem Results'),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      body: Obx(
        () => prevResController.isLoading.value
            ? Center(
                child: CircularProgressIndicator(),
              )
            : ListView.builder(
                itemCount: prevResController.semesters.length,
                itemBuilder: (context, index) {
                  final semester = prevResController.semesters[index];
                  return Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 16.0, vertical: 8.0),
                    child: Card(
                      elevation: 4.0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      child: ExpansionTile(
                        tilePadding: EdgeInsets.symmetric(
                            horizontal: 16.0, vertical: 8.0),
                        title: Text(
                          semester['title'],
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 18.0,
                          ),
                        ),
                        children: semester['courses'].map<Widget>((course) {
                          return ListTile(
                            title: Text(
                              'Course ID: ${course['courseId']}',
                              style: TextStyle(
                                fontSize: 16.0,
                                fontWeight: FontWeight.normal,
                              ),
                            ),
                            subtitle: Text(
                              'Grade: ${course['grade']}',
                              style: TextStyle(
                                fontSize: 14.0,
                                color: Colors.grey[600],
                              ),
                            ),
                          );
                        }).toList(),
                      ),
                    ),
                  );
                },
              ),
      ),
    );
  }
}
