import 'dart:convert';

import 'package:empowered_student/app/modules/ctc/controllers/ctc_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class CtcView extends StatefulWidget {
  @override
  _CtcView createState() => _CtcView();
}

//fields to be taken from the user
/*
  {
  "no_of_dsa": 0,
  "knows_ml": 0,
  "knows_python": 0,
  "knows_dsa": 0,
  "knows_js": 0,
  "knows_html": 0,
  "knows_css": 0,
  "was_coding_club": 0,
  "no_of_backlogs": 0,

}

all are boolean values
*/
class _CtcView extends State<CtcView> {
  final _formKey = GlobalKey<FormState>();
  int noOfDsa = 0;
  bool knowsMl = false;
  bool knowsPython = false;
  bool knowsDsa = false;
  bool knowsJs = false;
  bool knowsHtml = false;
  bool knowsCss = false;
  bool wasCodingClub = false;
  int noOfBacklogs = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'CTC Input',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    'Enter the following details:',
                    style: Get.textTheme.headlineLarge!.copyWith(
                      color: Colors.deepPurple,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                SizedBox(height: Get.height * 0.02),
                buildNumberInputField(
                  'Number of DSA questions solved',
                  (newValue) {
                    noOfDsa = int.parse(newValue!);
                  },
                ),
                buildCheckboxField(
                  'Knows Machine Learning',
                  knowsMl,
                  (newValue) {
                    setState(() {
                      knowsMl = newValue!;
                    });
                  },
                ),
                buildCheckboxField(
                  'Knows Python',
                  knowsPython,
                  (newValue) {
                    setState(() {
                      knowsPython = newValue!;
                    });
                  },
                ),
                buildCheckboxField(
                  'Knows DSA',
                  knowsDsa,
                  (newValue) {
                    setState(() {
                      knowsDsa = newValue!;
                    });
                  },
                ),
                buildCheckboxField(
                  'Knows JavaScript',
                  knowsJs,
                  (newValue) {
                    setState(() {
                      knowsJs = newValue!;
                    });
                  },
                ),
                buildCheckboxField(
                  'Knows HTML',
                  knowsHtml,
                  (newValue) {
                    setState(() {
                      knowsHtml = newValue!;
                    });
                  },
                ),
                buildCheckboxField(
                  'Knows CSS',
                  knowsCss,
                  (newValue) {
                    setState(() {
                      knowsCss = newValue!;
                    });
                  },
                ),
                buildCheckboxField(
                  'Was in Coding Club',
                  wasCodingClub,
                  (newValue) {
                    setState(() {
                      wasCodingClub = newValue!;
                    });
                  },
                ),
                buildNumberInputField(
                  'Number of Backlogs',
                  (newValue) {
                    noOfBacklogs = int.parse(newValue!);
                  },
                ),
                Padding(
                  padding: const EdgeInsets.all(18.0),
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      padding: EdgeInsets.symmetric(
                          vertical: 16.0, horizontal: 32.0),
                      backgroundColor: Colors.deepPurple,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20.0),
                      ),
                      elevation: 4,
                      shadowColor: Colors.deepPurple.withOpacity(0.4),
                      textStyle: TextStyle(
                          fontSize: 18.0, fontWeight: FontWeight.bold),
                    ),
                    onPressed: () async {
                      if (_formKey.currentState!.validate()) {
                        _formKey.currentState!.save();
                        final prefs = await SharedPreferences.getInstance();
                        final usn = prefs.getString('usn');
                        final urls = Uri.parse(
                            'https://empowered-dw0m.onrender.com/api/v1/student/$usn');

                        final responses = await http.get(urls);
                        final bodys = jsonDecode(responses.body);
                        final student = bodys['data'][0];
                        print(student);
                        final int branch = student['dept'] ==
                                'Computer Science And Engineering'
                            ? 0
                            : student['dept'] ==
                                    'Information Science And Engineering'
                                ? 2
                                : student['dept'] == 'Mechanical Engineering'
                                    ? 1
                                    : 3;
                        final data = {
                          'no_of_dsa': noOfDsa,
                          'knows_ml': knowsMl ? 1 : 0,
                          'knows_python': knowsPython ? 1 : 0,
                          'knows_dsa': knowsDsa ? 1 : 0,
                          'knows_js': knowsJs ? 1 : 0,
                          'knows_html': knowsHtml ? 1 : 0,
                          'knows_css': knowsCss ? 1 : 0,
                          'was_coding_club': wasCodingClub ? 1 : 0,
                          'cgpa': student['cgpa'] < 5 ? 5 : student['cgpa'],
                          'branch': branch,
                          'no_of_backlogs': noOfBacklogs,
                        };

                        final Uri url = Uri.parse(
                            'https://empowered-py.onrender.com/predict');
                        final headers = {
                          'Content-Type': 'application/json',
                        };

                        final response = await http.post(
                          url,
                          headers: headers,
                          body: jsonEncode(data),
                        );
                        final body = jsonDecode(response.body);
                        print(body);
                        Get.dialog(
                          AlertDialog(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20.0),
                            ),
                            title: const Text(
                              'Predicted CTC',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Colors.deepPurple,
                              ),
                            ),
                            content: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  'The predicted CTC is',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    color: Colors.black87,
                                    fontSize: 16.0,
                                  ),
                                ),
                                SizedBox(height: 10),
                                Text(
                                  '${(body['ctc'] as double).toStringAsFixed(2)} LPA',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    color: Colors.deepPurple,
                                    fontSize: 24.0,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                            actions: [
                              TextButton(
                                onPressed: () {
                                  Get.back();
                                },
                                child: const Text(
                                  'OK',
                                  style: TextStyle(
                                    color: Colors.deepPurple,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ],
                            actionsAlignment: MainAxisAlignment.center,
                          ),
                        );
                      }
                    },
                    label: const Text('Submit'),
                    icon: Icon(Icons.send),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Padding buildNumberInputField(
      String labelText, FormFieldSetter<String> onSaved) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: TextFormField(
        decoration: InputDecoration(
          labelText: labelText,
          border: OutlineInputBorder(),
          filled: true,
          fillColor: Colors.white,
          labelStyle: TextStyle(color: Colors.deepPurple),
        ),
        keyboardType: TextInputType.number,
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'Please enter the $labelText';
          }
          return null;
        },
        onSaved: onSaved,
      ),
    );
  }

  Padding buildCheckboxField(
      String title, bool value, ValueChanged<bool?> onChanged) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: CheckboxListTile(
        title: Text(
          title,
          style:
              TextStyle(color: Colors.deepPurple, fontWeight: FontWeight.w500),
        ),
        value: value,
        onChanged: onChanged,
        activeColor: Colors.deepPurple,
        checkColor: Colors.white,
      ),
    );
  }
}
