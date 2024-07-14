import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'package:flutter/material.dart';

class PassChangeController extends GetxController {
  var currentPassword = ''.obs;
  var newPassword = ''.obs;
  var confirmPassword = ''.obs;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  void updateCurrentPassword(String value) {
    currentPassword.value = value;
  }

  void updateNewPassword(String value) {
    newPassword.value = value;
  }

  void updateConfirmPassword(String value) {
    confirmPassword.value = value;
  }

  bool validatePasswords() {
    return newPassword.value == confirmPassword.value;
  }

  Future<void> changePassword() async {
    if (validatePasswords()) {
      try {
        User? user = _auth.currentUser;
        String email = user?.email ?? '';

        // Reauthenticate user
        AuthCredential credential = EmailAuthProvider.credential(
          email: email,
          password: currentPassword.value,
        );

        await user?.reauthenticateWithCredential(credential);

        // Update password
        await user?.updatePassword(newPassword.value);
        Get.snackbar('Success', 'Password changed successfully!',
            snackPosition: SnackPosition.BOTTOM);
      } catch (e) {
        Get.snackbar('Error', 'Failed to change password. ${e.toString()}',
            snackPosition: SnackPosition.BOTTOM, backgroundColor: Colors.red);
      }
    } else {
      Get.snackbar('Error', 'Passwords do not match!',
          snackPosition: SnackPosition.BOTTOM, backgroundColor: Colors.red);
    }
  }
}
