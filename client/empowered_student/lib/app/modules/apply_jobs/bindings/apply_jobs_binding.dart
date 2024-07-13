import 'package:get/get.dart';

import '../controllers/apply_jobs_controller.dart';

class ApplyJobsBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<ApplyJobsController>(
      () => ApplyJobsController(),
    );
  }
}
