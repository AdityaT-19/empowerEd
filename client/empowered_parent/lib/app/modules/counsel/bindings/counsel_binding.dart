import 'package:get/get.dart';

import '../controllers/counsel_controller.dart';

class CounselBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<CounselController>(
      () => CounselController(),
    );
  }
}
