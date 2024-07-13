import 'package:empowered_parent/app/modules/counsel/controllers/counsel_controller.dart';
import 'package:flutter/material.dart';

class CounselView extends StatefulWidget {
  @override
  _CounselView createState() => _CounselView();
}

class _CounselView extends State<CounselView> {
  List<bool> _isExpanded = [false, false, false];

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
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          _buildReportCard(0, counsel_data[0].title, counsel_data[0].details),
          SizedBox(height: 20.0),
          _buildReportCard(1, counsel_data[1].title, counsel_data[1].details),
          SizedBox(height: 20.0),
          _buildReportCard(2, counsel_data[2].title, counsel_data[2].details),
        ],
      ),
    );
  }

  Widget _buildReportCard(int index, String title, String details) {
    return Card(
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
              _isExpanded[index] = !_isExpanded[index];
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
              isExpanded: _isExpanded[index],
            ),
          ],
        ),
      ),
    );
  }
}
