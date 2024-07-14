import 'package:empowered_student/app/modules/interviews/controllers/interviews_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class InterviewsView extends StatelessWidget {
  final InterviewsController interviewsController =
      Get.find<InterviewsController>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Pending Interviews'),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      body: Obx(
        () => interviewsController.isLoading.value
            ? Center(child: CircularProgressIndicator())
            : ListView.builder(
                itemCount: interviewsController.dummyInterviews.length,
                itemBuilder: (context, index) {
                  final interview = interviewsController.dummyInterviews[index];
                  return Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15.0),
                    ),
                    margin: EdgeInsets.symmetric(horizontal: 15, vertical: 10),
                    elevation: 5,
                    shadowColor: Colors.deepPurple,
                    child: Padding(
                      padding: EdgeInsets.all(15),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            interview['company']!,
                            style: TextStyle(
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                              color: Colors.deepPurple,
                            ),
                          ),
                          SizedBox(height: 10),
                          Divider(
                            color: Colors.deepPurple,
                            thickness: 1,
                          ),
                          SizedBox(height: 10),
                          Row(
                            children: [
                              Icon(Icons.calendar_today,
                                  color: Colors.deepPurple),
                              SizedBox(width: 10),
                              Text(
                                'Date: ${interview['date']}',
                                style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.grey[700],
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 10),
                          Row(
                            children: [
                              Icon(Icons.access_time, color: Colors.deepPurple),
                              SizedBox(width: 10),
                              Text(
                                'Start Time: ${interview['startTime']}',
                                style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.grey[700],
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 10),
                          Row(
                            children: [
                              Icon(Icons.access_time_filled,
                                  color: Colors.deepPurple),
                              SizedBox(width: 10),
                              Text(
                                'End Time: ${interview['endTime']}',
                                style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.grey[700],
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 10),
                        ],
                      ),
                    ),
                  );
                },
              ),
      ),
    );
  }
}
