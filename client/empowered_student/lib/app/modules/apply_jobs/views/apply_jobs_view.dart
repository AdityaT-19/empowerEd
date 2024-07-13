import 'package:flutter/material.dart';
import 'package:empowered_student/app/modules/apply_jobs/controllers/apply_jobs_controller.dart';

class ApplyJobsView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Apply for Jobs'),
        foregroundColor: Colors.white,
        backgroundColor: Colors.deepPurple,
      ),
      body: ListView.builder(
        itemCount: ApplyJobsController.companies.length,
        itemBuilder: (context, index) {
          final company = ApplyJobsController.companies[index];
          return Padding(
            padding: const EdgeInsets.all(10.0),
            child: Card(
              elevation: 4.0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0),
              ),
              child: ExpansionTile(
                title: Text(
                  company['name'],
                  style: TextStyle(
                    fontSize: 18.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                subtitle: Text(
                  'Role: ${company['role']}',
                  style: TextStyle(
                    fontSize: 14.0,
                    color: Colors.grey[600],
                  ),
                ),
                children: [
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'CTC Offered: ${company['ctc']}',
                          style: TextStyle(
                            fontSize: 16.0,
                          ),
                        ),
                        SizedBox(height: 8.0),
                        Text(
                          'Job Location: ${company['location']}',
                          style: TextStyle(
                            fontSize: 16.0,
                          ),
                        ),
                        SizedBox(height: 8.0),
                        Text(
                          'Skills: ${company['technicalExpertise']}',
                          style: TextStyle(
                            fontSize: 16.0,
                          ),
                        ),
                        SizedBox(height: 24.0),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: () {
                              // Implement apply action here
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content:
                                      Text('Applied to ${company['name']}'),
                                ),
                              );
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.deepPurple,
                              padding: EdgeInsets.symmetric(vertical: 16.0),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10.0),
                              ),
                            ),
                            child: Text(
                              'Apply Now',
                              style: TextStyle(
                                fontSize: 18.0,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
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
    );
  }
}
