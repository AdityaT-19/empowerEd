import 'package:flutter/material.dart';

class AddCompView extends StatefulWidget {
  @override
  _AddCompViewState createState() => _AddCompViewState();
}

class _AddCompViewState extends State<AddCompView> {
  final TextEditingController _companyNameController = TextEditingController();
  final TextEditingController _salaryController = TextEditingController();
  final TextEditingController _roleController = TextEditingController();
  final TextEditingController _jobLocationController = TextEditingController();

  final List<Map<String, String>> _companies = [];

  void _createCompanyCard() {
    if (_companyNameController.text.isNotEmpty &&
        _salaryController.text.isNotEmpty &&
        _roleController.text.isNotEmpty &&
        _jobLocationController.text.isNotEmpty) {
      setState(() {
        _companies.add({
          'companyName': _companyNameController.text,
          'salary': _salaryController.text,
          'role': _roleController.text,
          'jobLocation': _jobLocationController.text,
        });
      });

      _companyNameController.clear();
      _salaryController.clear();
      _roleController.clear();
      _jobLocationController.clear();
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
            Expanded(
              child: ListView.builder(
                itemCount: _companies.length,
                itemBuilder: (context, index) {
                  final company = _companies[index];
                  return Card(
                    elevation: 3,
                    margin: EdgeInsets.symmetric(vertical: 8),
                    child: ListTile(
                      contentPadding: EdgeInsets.all(15),
                      title: Text(
                        company['companyName']!,
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(height: 5),
                          Text('Salary: ${company['salary']}'),
                          Text('Role: ${company['role']}'),
                          Text('Job Location: ${company['jobLocation']}'),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
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
