import 'package:get/get.dart';

import '../controllers/update_counsel_controller.dart';

class UpdateCounselBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<UpdateCounselController>(
      () => UpdateCounselController(),
    );
  }
}
