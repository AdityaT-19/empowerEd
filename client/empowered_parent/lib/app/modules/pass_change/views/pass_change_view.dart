import 'package:empowered_parent/app/modules/pass_change/controllers/pass_change_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart'; // Replace with the actual path

class PassChangeView extends StatelessWidget {
  final PassChangeController controller = Get.put(PassChangeController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Change Password'),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Current Password',
                border: OutlineInputBorder(),
              ),
              onChanged: controller.updateCurrentPassword,
            ),
            SizedBox(height: 20),
            TextField(
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'New Password',
                border: OutlineInputBorder(),
              ),
              onChanged: controller.updateNewPassword,
            ),
            SizedBox(height: 20),
            TextField(
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Confirm New Password',
                border: OutlineInputBorder(),
              ),
              onChanged: controller.updateConfirmPassword,
            ),
            SizedBox(height: 30),
            Center(
              child: ElevatedButton(
                onPressed: controller.changePassword,
                style: ElevatedButton.styleFrom(
                  foregroundColor: Colors.white,
                  backgroundColor: Colors.deepPurple,
                  padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                  textStyle: TextStyle(fontSize: 18),
                ),
                child: Text('Change Password'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
