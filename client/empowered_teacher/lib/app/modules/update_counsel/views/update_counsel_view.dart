import 'package:flutter/material.dart';

class UpdateCounselView extends StatefulWidget {
  final String courseCode;
  final String section;

  UpdateCounselView({required this.courseCode, required this.section});

  @override
  _UpdateCounselViewState createState() => _UpdateCounselViewState();
}

class _UpdateCounselViewState extends State<UpdateCounselView> {
  String? selectedUsn;
  final TextEditingController summaryController = TextEditingController();

  final List<String> dummyUsns = [
    '12345ABC',
    '67890XYZ',
    '11223DEF',
    '44556GHI',
    '77889JKL',
  ];

  void _submitSummary() {
    if (selectedUsn == null || summaryController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Please select a USN and enter a summary.'),
          duration: Duration(seconds: 2),
        ),
      );
      return;
    }
    // Perform submission logic here
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Counseling summary submitted for $selectedUsn'),
        duration: Duration(seconds: 2),
      ),
    );
  }

  @override
  void dispose() {
    summaryController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${widget.courseCode} - Section ${widget.section}'),
        backgroundColor: Colors.deepPurple, // Adjust app bar color
        foregroundColor: Colors.white, // Adjust app bar text color
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            DropdownButtonFormField<String>(
              value: selectedUsn,
              hint: Text('Select USN'),
              onChanged: (String? newValue) {
                setState(() {
                  selectedUsn = newValue;
                });
              },
              items: dummyUsns.map((usn) {
                return DropdownMenuItem<String>(
                  value: usn,
                  child: Text(usn),
                );
              }).toList(),
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                filled: true,
                fillColor: Colors.grey[200], // Adjust dropdown background color
              ),
            ),
            SizedBox(height: 16.0),
            TextFormField(
              controller: summaryController,
              decoration: InputDecoration(
                hintText: 'Enter counseling summary',
                border: OutlineInputBorder(),
                filled: true,
                fillColor:
                    Colors.grey[200], // Adjust text field background color
              ),
              maxLines: 5,
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: _submitSummary,
              child: Text('Submit'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.deepPurple, // Adjust button color
                foregroundColor: Colors.white, // Adjust text color
              ),
            ),
          ],
        ),
      ),
    );
  }
}
