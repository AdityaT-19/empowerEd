import 'package:get/get.dart';

import '../controllers/cie_controller.dart';

class CieBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<CieController>(
      () => CieController(),
    );
  }
}
