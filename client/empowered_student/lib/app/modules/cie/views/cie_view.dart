import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:empowered_student/app/modules/cie/controllers/cie_controller.dart';

class CieView extends GetView<CieController> {
  CieView({Key? key}) : super(key: key);

  final CieController cieController = Get.find();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        foregroundColor: Colors.white,
        title: Text(
          'IA Details',
        ),
        backgroundColor: Colors.deepPurple,
      ),
      body: Obx(
        () => cieController.isLoading.value
            ? Center(
                child: CircularProgressIndicator(),
              )
            : ListView.builder(
                itemCount: cieController.subjects.length,
                itemBuilder: (context, index) {
                  final subject = cieController.subjects[index];
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
                          subject['name'],
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 18.0,
                          ),
                        ),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            SizedBox(height: 8.0),
                            Text(
                              'Marks: ${subject['marks']}/40',
                              style: TextStyle(
                                fontSize: 14.0,
                                color: Colors.grey[600],
                              ),
                            ),
                            SizedBox(height: 8.0),
                            LinearProgressIndicator(
                              value: subject['marks'],
                              backgroundColor: Colors.grey[300],
                              color: Colors.deepPurple,
                              minHeight: 8.0,
                            ),
                          ],
                        ),
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Course ID: ${subject['courseId']}',
                                  style: TextStyle(
                                    fontSize: 14.0,
                                    color: Colors.grey[600],
                                  ),
                                ),
                                SizedBox(height: 8.0),
                                Text(
                                  'Semester: ${subject['semester']}',
                                  style: TextStyle(
                                    fontSize: 14.0,
                                    color: Colors.grey[600],
                                  ),
                                ),
                                SizedBox(height: 12.0),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    _buildIAInfo('IA1', subject['ia1']),
                                    _buildIAInfo('IA2', subject['ia2']),
                                    _buildIAInfo('IA3', subject['ia3']),
                                  ],
                                ),
                                SizedBox(height: 12.0),
                                Divider(color: Colors.grey[400]),
                                SizedBox(height: 12.0),
                                Text(
                                  'Average Marks: ${((subject['ia1'] + subject['ia2'] + subject['ia3']) / 3).toStringAsFixed(2)}',
                                  style: TextStyle(
                                    fontSize: 16.0,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
      ),
    );
  }

  Widget _buildIAInfo(String iaName, int marks) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '$iaName Marks',
          style: TextStyle(
            fontSize: 14.0,
            color: Colors.grey[600],
          ),
        ),
        SizedBox(height: 4.0),
        Text(
          iaName == 'IA3' ? '$marks/20' : '$marks/30',
          style: TextStyle(
            fontSize: 16.0,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }
}
