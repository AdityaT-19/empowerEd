import 'package:empowered_teacher/app/modules/update_counsel/controllers/update_counsel_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

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
  final TextEditingController achieveController = TextEditingController();

  void _submitSummary() async {
    if (selectedUsn == null ||
        summaryController.text.isEmpty ||
        achieveController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content:
              Text('Please select a USN and enter a summary and achievement'),
          duration: Duration(seconds: 2),
        ),
      );
      return;
    }

    final gurl = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/teacher/studentReports/$selectedUsn');

    final res = await http.get(gurl);
    final data = jsonDecode(res.body)['data'][0];

    final cou = data['counsel_rep'];
    final ach = data['achievements'];
    print(cou);
    print(ach);

    final newData = {
      'usn': selectedUsn,
      'counsel_rep': [...cou, summaryController.text],
      'achievements': [...ach, achieveController.text],
    };
    print(newData);
    final body = jsonEncode(newData);

    final url = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/teacher/updateStudentReports');

    final headers = {
      'Content-Type': 'application/json',
    };

    final response = await http.patch(url, headers: headers, body: body);

    print(response.body);

    if (response.statusCode == 201) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Counseling summary submitted for $selectedUsn'),
          duration: Duration(seconds: 2),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to submit counseling summary for $selectedUsn'),
          duration: Duration(seconds: 2),
        ),
      );
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
    achieveController.dispose();
    super.dispose();
  }

  final updateCounselController = Get.find<UpdateCounselController>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${widget.courseCode} - Section ${widget.section}'),
        backgroundColor: Colors.deepPurple, // Adjust app bar color
        foregroundColor: Colors.white, // Adjust app bar text color
      ),
      body: Obx(
        () => updateCounselController.isLoading.value
            ? Center(child: CircularProgressIndicator())
            : Padding(
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
                      items: updateCounselController.dummyUsns.map((usn) {
                        return DropdownMenuItem<String>(
                          value: usn,
                          child: Text(usn),
                        );
                      }).toList(),
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        filled: true,
                        fillColor: Colors
                            .grey[200], // Adjust dropdown background color
                      ),
                    ),
                    SizedBox(height: 16.0),
                    TextFormField(
                      controller: summaryController,
                      decoration: InputDecoration(
                        hintText: 'Enter counseling summary',
                        border: OutlineInputBorder(),
                        filled: true,
                        fillColor: Colors
                            .grey[200], // Adjust text field background color
                      ),
                      maxLines: 5,
                    ),
                    SizedBox(height: 16.0),
                    TextFormField(
                      controller: achieveController,
                      decoration: InputDecoration(
                        hintText: 'Enter Achievement summary',
                        border: OutlineInputBorder(),
                        filled: true,
                        fillColor: Colors
                            .grey[200], // Adjust text field background color
                      ),
                      maxLines: 5,
                    ),
                    SizedBox(height: 16.0),
                    ElevatedButton(
                      onPressed: _submitSummary,
                      child: Text('Submit'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor:
                            Colors.deepPurple, // Adjust button color
                        foregroundColor: Colors.white, // Adjust text color
                      ),
                    ),
                  ],
                ),
              ),
      ),
    );
  }
}
