import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:excel/excel.dart';

class BulkUpdateView extends StatefulWidget {
  @override
  _BulkUpdateViewState createState() => _BulkUpdateViewState();
}

class _BulkUpdateViewState extends State<BulkUpdateView> {
  void _pickFile() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['xlsx'],
    );

    if (result != null) {
      var fileBytes = result.files.first.bytes;
      var excel = Excel.decodeBytes(fileBytes!);

      // Process the excel file if needed
      // ...
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(excel.tables.keys.toString())),
      );

      // Show success message
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Excel file uploaded successfully!')),
      );
    } else {
      // User canceled the picker
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Upload Excel File'),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Adding a logo or image
              Image.asset(
                'assets/images/excel_logo.png', // Make sure to add an appropriate Excel logo image in your assets
                height: 150,
              ),
              SizedBox(height: 20),
              Text(
                'Upload Your Excel File',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.purple,
                ),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _pickFile,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.deepPurple, // Background color
                  foregroundColor: Colors.white, // Text color
                  padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                  textStyle: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
                child: Text('Upload Excel File'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
