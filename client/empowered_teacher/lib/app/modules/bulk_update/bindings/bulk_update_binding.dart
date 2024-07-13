import 'package:get/get.dart';

import '../controllers/bulk_update_controller.dart';

class BulkUpdateBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<BulkUpdateController>(
      () => BulkUpdateController(),
    );
  }
}
