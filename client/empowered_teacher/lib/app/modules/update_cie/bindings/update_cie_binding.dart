import 'package:get/get.dart';

import '../controllers/update_cie_controller.dart';

class UpdateCieBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<UpdateCieController>(
      () => UpdateCieController(),
    );
  }
}
