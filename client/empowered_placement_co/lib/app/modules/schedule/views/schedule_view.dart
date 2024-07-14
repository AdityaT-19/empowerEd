import 'dart:convert';

import 'package:empowered_placement_co/app/modules/schedule/controllers/schedule_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;

class ScheduleView extends StatefulWidget {
  const ScheduleView({Key? key, required this.cid}) : super(key: key);
  final int cid;
  @override
  _ScheduleViewState createState() => _ScheduleViewState();
}

class _ScheduleViewState extends State<ScheduleView> {
  String? _selectedUsn;
  DateTime _selectedDate = DateTime.now();
  TimeOfDay _startTime = TimeOfDay.now();
  TimeOfDay _endTime =
      TimeOfDay.now().replacing(hour: TimeOfDay.now().hour + 1);
  final TextEditingController _locationController = TextEditingController();
  final ScheduleController scheduleController = Get.find();

  void _pickDate() async {
    DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime.now(),
      lastDate: DateTime(2101),
    );

    if (pickedDate != null && pickedDate != _selectedDate)
      setState(() {
        _selectedDate = pickedDate;
      });
  }

  void _pickStartTime() async {
    TimeOfDay? pickedTime = await showTimePicker(
      context: context,
      initialTime: _startTime,
    );

    if (pickedTime != null && pickedTime != _startTime)
      setState(() {
        _startTime = pickedTime;
      });
  }

  void _pickEndTime() async {
    TimeOfDay? pickedTime = await showTimePicker(
      context: context,
      initialTime: _endTime,
    );

    if (pickedTime != null && pickedTime != _endTime)
      setState(() {
        _endTime = pickedTime;
      });
  }

  void _submit() async {
    if (_selectedUsn == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Please select a USN')),
      );
      return;
    }

    if (_locationController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Please enter a location')),
      );
      return;
    }

    final String formattedDate = DateFormat('yyyy-MM-dd').format(_selectedDate);
    final String formattedStartTime = _startTime.format(context);
    final String formattedEndTime = _endTime.format(context);
    final String location = _locationController.text;

    final String startTimein24HourFormat =
        _startTime.toString().split('(')[1].split(')')[0];
    final String endTimein24HourFormat =
        _endTime.toString().split('(')[1].split(')')[0];

    // Handle submission logic here
    // You can integrate this data with your backend

    /*
    "start_time":"2024-07-12T22:00:00",
    "end_time":"2024-07-12T22:30:00",
    */

    final String startTime = '${formattedDate}T$startTimein24HourFormat:00';
    final String endTime = '${formattedDate}T$endTimein24HourFormat:00';
    print(
        'Interview scheduled for $_selectedUsn on $formattedDate at $location from $startTime to $endTime');

    final url = Uri.parse(
        'https://empowered-dw0m.onrender.com/api/v1/placement/bookSlot');
    // 'https://10.0.2.2:3000/api/v1/placement/bookSlot');

    final body = {
      'compid': widget.cid,
      'usn': _selectedUsn,
      'location': location,
      'start_time': startTime,
      'end_time': endTime,
    };
    final codedBody = jsonEncode(body);
    print(codedBody);
    final headers = {
      'Content-Type': 'application/json',
    };
    final res = await http.post(url, body: codedBody, headers: headers);
    print(res.body);
    if (res.statusCode == 201) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Interview scheduled successfully')),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to schedule interview')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        foregroundColor: Colors.white,
        title: Text('Schedule Interview'),
        backgroundColor: Colors.deepPurple,
      ),
      body: Obx(
        () => scheduleController.isLoading.value
            ? Center(
                child: CircularProgressIndicator(),
              )
            : SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Schedule Details',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.deepPurple,
                        ),
                      ),
                      SizedBox(height: 20),
                      DropdownButtonFormField<String>(
                        value: _selectedUsn,
                        hint: Text('Select USN'),
                        onChanged: (String? newValue) {
                          setState(() {
                            _selectedUsn = newValue;
                          });
                        },
                        items: scheduleController.dummyUsns
                            .map<DropdownMenuItem<String>>((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(value),
                          );
                        }).toList(),
                        decoration: InputDecoration(
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: BorderSide(color: Colors.deepPurple),
                          ),
                        ),
                      ),
                      SizedBox(height: 20),
                      TextButton(
                        onPressed: _pickDate,
                        child: Text(
                          'Select Date: ${DateFormat('yyyy-MM-dd').format(_selectedDate)}',
                          style: TextStyle(color: Colors.deepPurple),
                        ),
                      ),
                      SizedBox(height: 20),
                      TextButton(
                        onPressed: _pickStartTime,
                        child: Text(
                          'Select Start Time: ${_startTime.format(context)}',
                          style: TextStyle(color: Colors.deepPurple),
                        ),
                      ),
                      SizedBox(height: 20),
                      TextButton(
                        onPressed: _pickEndTime,
                        child: Text(
                          'Select End Time: ${_endTime.format(context)}',
                          style: TextStyle(color: Colors.deepPurple),
                        ),
                      ),
                      SizedBox(height: 20),
                      TextField(
                        controller: _locationController,
                        decoration: InputDecoration(
                          labelText: 'Location',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: BorderSide(color: Colors.deepPurple),
                          ),
                        ),
                      ),
                      SizedBox(height: 20),
                      Center(
                        child: ElevatedButton(
                          onPressed: _submit,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.deepPurple,
                            foregroundColor: Colors.white,
                            padding: EdgeInsets.symmetric(
                                horizontal: 50, vertical: 15),
                            textStyle: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20),
                            ),
                          ),
                          child: Text('Submit'),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
      ),
    );
  }
}
