import 'package:get/get.dart';

import '../controllers/ctc_controller.dart';

class CtcBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<CtcController>(
      () => CtcController(),
    );
  }
}
