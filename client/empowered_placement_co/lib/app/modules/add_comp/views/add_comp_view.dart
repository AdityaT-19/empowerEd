import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AddCompView extends StatefulWidget {
  @override
  _AddCompViewState createState() => _AddCompViewState();
}

class _AddCompViewState extends State<AddCompView> {
  final TextEditingController _companyNameController = TextEditingController();
  final TextEditingController _salaryController = TextEditingController();
  final TextEditingController _roleController = TextEditingController();
  final TextEditingController _jobLocationController = TextEditingController();
  final TextEditingController _skillsController = TextEditingController();

  //final List<Map<String, String>> _companies = [];

  void _createCompanyCard() async {
    if (_companyNameController.text.isNotEmpty &&
        _salaryController.text.isNotEmpty &&
        _roleController.text.isNotEmpty &&
        _skillsController.text.isNotEmpty &&
        _jobLocationController.text.isNotEmpty) {
      final name = _companyNameController.text;
      final ctc = _salaryController.text;
      final jobRole = _roleController.text;
      final jobLocation = _jobLocationController.text;
      final skills = _skillsController.text;

      final url = Uri.parse(
          'https://empowered-dw0m.onrender.com/api/v1/placement/addCompany');
      final response = await http.post(
        url,
        body: {
          'name': name,
          'ctc': ctc,
          'jobRole': jobRole,
          'jobLocation': jobLocation,
          'skills': skills,
        },
      );

      _companyNameController.clear();
      _salaryController.clear();
      _roleController.clear();
      _jobLocationController.clear();
      _skillsController.clear();

      if (response.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Company added successfully')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to add company')),
        );
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Please fill in all fields')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        foregroundColor: Colors.white,
        title: Text('Add Company'),
        backgroundColor: Colors.deepPurple,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Company Details',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.deepPurple,
              ),
            ),
            SizedBox(height: 20),
            _buildTextField(
                _companyNameController, 'Company Name', Icons.business),
            SizedBox(height: 10),
            _buildTextField(_salaryController, 'Salary', Icons.attach_money),
            SizedBox(height: 10),
            _buildTextField(_roleController, 'Role', Icons.work),
            SizedBox(height: 10),
            _buildTextField(
                _jobLocationController, 'Job Location', Icons.location_on),
            SizedBox(height: 10),
            _buildTextField(_skillsController, 'Skills', Icons.star),
            SizedBox(height: 20),
            Center(
              child: ElevatedButton(
                onPressed: _createCompanyCard,
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
                child: Text('Create'),
              ),
            ),
            SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField(
      TextEditingController controller, String label, IconData icon) {
    return TextField(
      controller: controller,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon, color: Colors.deepPurple),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(color: Colors.deepPurple),
        ),
      ),
    );
  }
}
