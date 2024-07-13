import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;

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
      var request = http.MultipartRequest(
        'POST',
        Uri.parse('https://empowered-py.render.com/processCieData'),
      );
      request.files.add(
        http.MultipartFile.fromBytes(
          'file',
          fileBytes!,
          filename: 'uploaded_file.xlsx',
        ),
      );
      request.headers.addAll(<String, String>{
        'Content-Type': 'multipart/form-data',
      });
      final response = await request.send();
      final responseString = await response.stream.bytesToString();
      print(response.statusCode);
      print(responseString);

      if (response.statusCode == 200) {
        Get.snackbar(
          'Success',
          'File uploaded successfully',
          snackPosition: SnackPosition.BOTTOM,
        );
      } else {
        Get.snackbar(
          'Error',
          'Error: ${response.statusCode}',
          messageText: Text(
            'Error: $responseString',
            style: TextStyle(color: Colors.white),
          ),
          snackPosition: SnackPosition.BOTTOM,
        );
      }
    } else {
      Get.snackbar(
        'Error',
        'File picker canceled',
        snackPosition: SnackPosition.BOTTOM,
      );
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
