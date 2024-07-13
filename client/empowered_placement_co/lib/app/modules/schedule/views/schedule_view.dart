import 'package:empowered_placement_co/app/modules/schedule/controllers/schedule_controller.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class ScheduleView extends StatefulWidget {
  @override
  _ScheduleViewState createState() => _ScheduleViewState();
}

class _ScheduleViewState extends State<ScheduleView> {
  String? _selectedUsn;
  DateTime _selectedDate = DateTime.now();
  TimeOfDay _startTime = TimeOfDay.now();
  TimeOfDay _endTime = TimeOfDay.now();
  final TextEditingController _locationController = TextEditingController();

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

  void _submit() {
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

    // Handle submission logic here
    // You can integrate this data with your backend

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
          content: Text(
              'Interview scheduled for $_selectedUsn on $formattedDate at $location from $formattedStartTime to $formattedEndTime')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        foregroundColor: Colors.white,
        title: Text('Schedule Interview'),
        backgroundColor: Colors.deepPurple,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: SingleChildScrollView(
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
                items: ScheduleController.dummyUsns
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
                    padding: EdgeInsets.symmetric(horizontal: 50, vertical: 15),
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
    );
  }
}
