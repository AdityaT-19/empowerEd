import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../controllers/counsel_controller.dart';

class CounselView extends GetView<CounselController> {
  const CounselView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('CounselView'),
        centerTitle: true,
      ),
      body: const Center(
        child: Text(
          'CounselView is working',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
