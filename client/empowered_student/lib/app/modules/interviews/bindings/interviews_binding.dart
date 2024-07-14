import 'package:get/get.dart';

import '../controllers/interviews_controller.dart';

class InterviewsBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<InterviewsController>(
      () => InterviewsController(),
    );
  }
}
