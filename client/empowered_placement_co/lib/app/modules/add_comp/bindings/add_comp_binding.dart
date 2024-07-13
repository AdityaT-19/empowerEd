import 'package:get/get.dart';

import '../controllers/add_comp_controller.dart';

class AddCompBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<AddCompController>(
      () => AddCompController(),
    );
  }
}
