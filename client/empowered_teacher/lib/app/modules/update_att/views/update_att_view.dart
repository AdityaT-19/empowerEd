import 'dart:convert';

import 'package:empowered_teacher/app/modules/update_att/controllers/update_att_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class UpdateAttView extends StatefulWidget {
  final String courseCode;
  final String section;

  UpdateAttView({required this.courseCode, required this.section});

  @override
  _UpdateAttViewState createState() => _UpdateAttViewState();
}

class _UpdateAttViewState extends State<UpdateAttView> {
  DateTime? selectedDate;
  TimeOfDay? selectedTime;
  final UpdateAttController updateAttController =
      Get.find<UpdateAttController>();

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
      });
    }
  }

  Future<void> _selectTime(BuildContext context) async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.now(),
    );
    if (picked != null && picked != selectedTime) {
      setState(() {
        selectedTime = picked;
      });
    }
  }

  void _submitAttendance() async {
    if (selectedDate == null || selectedTime == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Please select date and time'),
          duration: Duration(seconds: 2),
          backgroundColor: Colors.redAccent,
        ),
      );
      return;
    }

    final prefs = await SharedPreferences.getInstance();
    final tid = prefs.getString('tid');
    final cid = widget.courseCode;
    final section = widget.section;
    final date = selectedDate!.toLocal().toString().split(' ')[0];
    final time = selectedTime!.toString().split('(')[1].split(')')[0];

    final data = <Map<String, dynamic>>[
      for (int i = 0; i < updateAttController.students.length; i++)
        {
          'usn': updateAttController.students[i]['usn'],
          'present': updateAttController.attendance[i].value,
          'date': date,
          'hour': time,
        }
    ];

    final body = jsonEncode({
      'teacher_course': {
        'tid': tid,
        'cid': cid,
        'section': section,
      },
      'studentList': data,
    });

    final headers = {
      'Content-Type': 'application/json',
    };

    final url = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/teacher/markAttendance');

    final res = await http.post(url, headers: headers, body: body);
    print(res.body);

    if (res.statusCode == 201) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Attendance updated successfully'),
          duration: Duration(seconds: 2),
          backgroundColor: Colors.purpleAccent,
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to update attendance'),
          duration: Duration(seconds: 2),
          backgroundColor: Colors.redAccent,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Course Details',
            style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '${widget.courseCode} - Section ${widget.section}',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.deepPurple,
              ),
            ),
            SizedBox(height: 16.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  selectedDate == null
                      ? 'Select Date'
                      : "${selectedDate!.toLocal()}".split(' ')[0],
                  style: TextStyle(fontSize: 16, color: Colors.deepPurple),
                ),
                ElevatedButton(
                  onPressed: () => _selectDate(context),
                  child: Text('Pick Date'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.deepPurple,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 16.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  selectedTime == null
                      ? 'Select Time'
                      : selectedTime!.format(context),
                  style: TextStyle(fontSize: 16, color: Colors.deepPurple),
                ),
                ElevatedButton(
                  onPressed: () => _selectTime(context),
                  child: Text('Pick Time'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.deepPurple,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 16.0),
            Expanded(
              child: Obx(
                () => updateAttController.isLoading.value
                    ? Center(child: CircularProgressIndicator())
                    : ListView.builder(
                        itemCount: updateAttController.students.length,
                        itemBuilder: (context, index) {
                          return Card(
                            margin: EdgeInsets.all(8.0),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(15.0),
                            ),
                            elevation: 4,
                            child: Padding(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 16.0, vertical: 8.0),
                              child: ListTile(
                                leading: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      updateAttController.students[index]
                                          ['name']!,
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          color: Colors.deepPurple),
                                    ),
                                    Text(
                                        updateAttController.students[index]
                                            ['usn']!,
                                        style: TextStyle(
                                            color: Colors.deepPurple[300])),
                                  ],
                                ),
                                trailing: Obx(() => Checkbox(
                                      value: updateAttController
                                          .attendance[index].value,
                                      onChanged: (bool? value) {
                                        updateAttController
                                            .attendance[index].value = value!;
                                      },
                                      activeColor: Colors.deepPurple,
                                    )),
                              ),
                            ),
                          );
                        },
                      ),
              ),
            ),
            SizedBox(height: 16.0),
            Center(
              child: ElevatedButton(
                onPressed: _submitAttendance,
                child: Text('Submit',
                    style: TextStyle(fontWeight: FontWeight.bold)),
                style: ElevatedButton.styleFrom(
                  padding:
                      EdgeInsets.symmetric(vertical: 16.0, horizontal: 32.0),
                  backgroundColor: Colors.deepPurple,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30.0),
                  ),
                  elevation: 4,
                  shadowColor: Colors.deepPurple.withOpacity(0.4),
                  textStyle: TextStyle(fontSize: 18.0),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
