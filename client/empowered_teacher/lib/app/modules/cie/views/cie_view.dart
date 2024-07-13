import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../controllers/cie_controller.dart';

class CieView extends GetView<CieController> {
  const CieView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('CieView'),
        centerTitle: true,
      ),
      body: const Center(
        child: Text(
          'CieView is working',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
