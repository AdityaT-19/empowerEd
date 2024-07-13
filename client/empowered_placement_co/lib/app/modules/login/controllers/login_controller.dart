import 'dart:convert';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class AuthController extends GetxController {
  //TODO: Implement LoginController
  final authInstance = FirebaseAuth.instance;
  RxBool isLogged = true.obs;
  @override
  void onInit() async {
    super.onInit();
    //create a dummy  patient based on the model
  }

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {
    super.onClose();
  }

  void login(String email, String password) async {
    try {
      //Get.offAllNamed('/dashboard');
      await authInstance.signInWithEmailAndPassword(
          email: email, password: password);
      final user = FirebaseAuth.instance.currentUser;
      final res = await http.get(Uri.parse(
          'https://empowered-dw0m.onrender.com/api/v1/placement/getPlacementCoordinators'));
      final body = jsonDecode(res.body)['data'];
      final usns = body.map((e) => e['usn']).toList();
      if (!usns.contains(user?.photoURL)) {
        Get.snackbar('Error', 'You are not a placement coordinator',
            snackPosition: SnackPosition.BOTTOM,
            backgroundColor: Colors.red,
            colorText: Colors.white);
        await authInstance.signOut();
      } else {
        Get.snackbar('Success', 'Login Successful',
            snackPosition: SnackPosition.BOTTOM,
            backgroundColor: Colors.green,
            colorText: Colors.white);
        final sharedPreferences = await SharedPreferences.getInstance();
        sharedPreferences.setString('usn', user?.photoURL ?? '');
        Get.offAllNamed('/dashboard');
      }
      print(user?.displayName);
      print(user?.email);
      print(user?.photoURL);

      //Get.offAllNamed('/dashboard');
      //fetch from custom backend
    } on FirebaseAuthException catch (e) {
      Get.snackbar('Error', e.message!);
    }
  }

  void signOut() async {
    await authInstance.signOut();
  }
}
