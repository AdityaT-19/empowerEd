import 'package:empowered_parent/app/modules/counsel/controllers/counsel_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CounselView extends StatefulWidget {
  @override
  _CounselView createState() => _CounselView();
}

class _CounselView extends State<CounselView> {
  final counselController = Get.find<CounselController>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        foregroundColor: Colors.white,
        title: Text(
          'Counseling Reports',
          style: TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Colors.deepPurple,
      ),
      body: Obx(
        () => counselController.isLoading.value
            ? Center(
                child: CircularProgressIndicator(),
              )
            : ListView(
                padding: const EdgeInsets.all(16.0),
                children: [
                  for (var i = 0;
                      i < counselController.counsel_data.length;
                      i++)
                    _buildReportCard(
                      i,
                      counselController.counsel_data[i].title,
                      counselController.counsel_data[i].details,
                    ),
                ],
              ),
      ),
    );
  }

  Widget _buildReportCard(int index, String title, String details) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Card(
        elevation: 5,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15.0),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(15.0),
          child: ExpansionPanelList(
            expandedHeaderPadding: EdgeInsets.all(0),
            elevation: 1,
            expansionCallback: (int item, bool status) {
              setState(() {
                counselController.isExpanded[index] =
                    !counselController.isExpanded[index];
              });
            },
            children: [
              ExpansionPanel(
                backgroundColor: Colors.deepPurple.shade50,
                headerBuilder: (BuildContext context, bool isExpanded) {
                  return ListTile(
                    title: Text(
                      title,
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.deepPurple,
                      ),
                    ),
                  );
                },
                body: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Text(
                    details,
                    style: TextStyle(
                      color: Colors.black87,
                    ),
                  ),
                ),
                isExpanded: counselController.isExpanded[index],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
