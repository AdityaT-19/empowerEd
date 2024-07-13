import 'package:get/get.dart';

import '../controllers/update_att_controller.dart';

class UpdateAttBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<UpdateAttController>(
      () => UpdateAttController(),
    );
  }
}
