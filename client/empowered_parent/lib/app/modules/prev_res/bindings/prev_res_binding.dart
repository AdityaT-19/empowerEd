import 'package:get/get.dart';

import '../controllers/prev_res_controller.dart';

class PrevResBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<PrevResController>(
      () => PrevResController(),
    );
  }
}
