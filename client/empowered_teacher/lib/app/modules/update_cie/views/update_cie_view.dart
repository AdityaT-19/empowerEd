import 'dart:convert';

import 'package:empowered_teacher/app/modules/update_cie/controllers/update_cie_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;

class UpdateCieView extends StatefulWidget {
  final String courseCode;
  final String section;

  UpdateCieView({required this.courseCode, required this.section});

  @override
  _UpdateCieViewState createState() => _UpdateCieViewState();
}

class _UpdateCieViewState extends State<UpdateCieView> {
  // Mock data for students and initial IA marks
  final updateCieController = Get.find<UpdateCieController>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Course Details',
            style: TextStyle(fontWeight: FontWeight.bold)),
        foregroundColor: Colors.white,
        backgroundColor: Colors.deepPurple,
      ),
      body: Obx(
        () => updateCieController.isLoading.value
            ? Center(child: CircularProgressIndicator())
            : Padding(
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
                    Expanded(
                      child: ListView.builder(
                        itemCount: updateCieController.students.length,
                        itemBuilder: (context, index) {
                          return StudentCard(
                            student: updateCieController.students[index],
                            onUpdate: (StudentModel updatedStudent) async {
                              final cid = widget.courseCode;
                              final usn = updatedStudent.usn;
                              final ia1 = updatedStudent.ia1;
                              final ia2 = updatedStudent.ia2;
                              final ia3 = updatedStudent.ia3;

                              final body = jsonEncode({
                                'cid': cid,
                                'usn': usn,
                                'ia1': ia1,
                                'ia2': ia2,
                                'ia3': ia3,
                              });

                              final headers = {
                                'Content-Type': 'application/json',
                              };

                              final url = Uri.parse(
                                  'https://empowered-dw0m.onrender.com/api/v1/teacher/updateMarks');

                              final response = await http.patch(url,
                                  headers: headers, body: body);

                              print(response.body);
                              if (response.statusCode == 201) {
                                setState(() {
                                  // Update the student model in the list
                                  updateCieController.students[index] =
                                      updatedStudent;
                                });
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content:
                                        Text('Marks updated successfully '),
                                    duration: Duration(seconds: 2),
                                    backgroundColor: Colors.purpleAccent,
                                  ),
                                );
                              }
                            },
                          );
                        },
                      ),
                    ),
                    SizedBox(height: 16.0),
                  ],
                ),
              ),
      ),
    );
  }
}

class StudentCard extends StatefulWidget {
  final StudentModel student;
  final Function(StudentModel) onUpdate;

  StudentCard({required this.student, required this.onUpdate});

  @override
  _StudentCardState createState() => _StudentCardState();
}

class _StudentCardState extends State<StudentCard> {
  late StudentModel _editedStudent;

  @override
  void initState() {
    super.initState();
    // Initialize edited student with current student details
    _editedStudent = StudentModel(
      name: widget.student.name,
      usn: widget.student.usn,
      ia1: widget.student.ia1,
      ia2: widget.student.ia2,
      ia3: widget.student.ia3,
    );
  }

  void _updateMarks() async {
    // Call onUpdate function with updated student model

    await widget.onUpdate(_editedStudent);
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 8.0),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15.0),
      ),
      elevation: 4,
      child: ExpansionTile(
        backgroundColor: Colors.deepPurple[50],
        title: Text(widget.student.name,
            style: TextStyle(
                fontWeight: FontWeight.bold, color: Colors.deepPurple)),
        subtitle: Text(widget.student.usn,
            style: TextStyle(color: Colors.deepPurple[300])),
        childrenPadding: EdgeInsets.all(16.0),
        expandedCrossAxisAlignment: CrossAxisAlignment.start,
        children: [
          buildMarkField('IA1', _editedStudent.ia1, (value) {
            _editedStudent.ia1 = int.tryParse(value) ?? 0;
          }),
          SizedBox(height: 8.0),
          buildMarkField('IA2', _editedStudent.ia2, (value) {
            _editedStudent.ia2 = int.tryParse(value) ?? 0;
          }),
          SizedBox(height: 8.0),
          buildMarkField('IA3', _editedStudent.ia3, (value) {
            _editedStudent.ia3 = int.tryParse(value) ?? 0;
          }),
          SizedBox(height: 16.0),
          Center(
            child: ElevatedButton(
              onPressed: _updateMarks,
              child: Text('Update Marks',
                  style: TextStyle(fontWeight: FontWeight.bold)),
              style: ElevatedButton.styleFrom(
                padding: EdgeInsets.symmetric(vertical: 12.0, horizontal: 24.0),
                backgroundColor: Colors.deepPurple,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0),
                ),
                elevation: 4,
                shadowColor: Colors.deepPurple.withOpacity(0.4),
                textStyle: TextStyle(fontSize: 16.0),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget buildMarkField(
      String label, int initialValue, ValueChanged<String> onChanged) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label,
            style: TextStyle(
                color: Colors.deepPurple, fontWeight: FontWeight.bold)),
        SizedBox(width: 8.0),
        Expanded(
          child: TextFormField(
            initialValue: initialValue.toString(),
            keyboardType: TextInputType.number,
            onChanged: onChanged,
            decoration: InputDecoration(
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10.0),
              ),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Colors.deepPurple, width: 2.0),
                borderRadius: BorderRadius.circular(10.0),
              ),
            ),
            style: TextStyle(color: Colors.deepPurple),
          ),
        ),
      ],
    );
  }
}
