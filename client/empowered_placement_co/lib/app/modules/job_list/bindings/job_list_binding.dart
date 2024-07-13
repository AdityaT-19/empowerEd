import 'package:get/get.dart';

import '../controllers/job_list_controller.dart';

class JobListBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<JobListController>(
      () => JobListController(),
    );
  }
}
