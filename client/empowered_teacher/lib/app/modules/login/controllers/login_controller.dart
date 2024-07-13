import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';

class AuthController extends GetxController {
  //TODO: Implement LoginController
  final authInstance = FirebaseAuth.instance;
  RxBool isLogged = true.obs;
  @override
  void onInit() async {
    FirebaseAuth.instance.authStateChanges().listen((event) async {
      if (event == null) {
        isLogged.value = true;
        Get.offAllNamed('/dashboard');
      } else {
        isLogged.value = false;
      }
    });

    super.onInit();
    //create a dummy  patient based on the model
  }

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {
    super.onClose();
  }

  void login(String email, String password) async {
    try {
      //Get.offAllNamed('/dashboard');
      await authInstance.signInWithEmailAndPassword(
          email: email, password: password);
      Get.offAllNamed('/dashboard');
      //Get.offAllNamed('/dashboard');
      //fetch from custom backend
    } on FirebaseAuthException catch (e) {
      Get.snackbar('Error', e.message!);
    }
  }

  void signOut() async {
    await authInstance.signOut();
  }
}
