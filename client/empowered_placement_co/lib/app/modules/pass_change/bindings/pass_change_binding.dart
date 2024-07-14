import 'package:get/get.dart';

import '../controllers/pass_change_controller.dart';

class PassChangeBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<PassChangeController>(
      () => PassChangeController(),
    );
  }
}
