import 'package:empowered_parent/app/routes/app_pages.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class DashboardScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        foregroundColor: Colors.white,
        title: Text(
          'EmpowerED Parent Portal',
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.deepPurple,
        leading: Builder(
          builder: (context) => IconButton(
            icon: Icon(Icons.menu, size: 28),
            onPressed: () => Scaffold.of(context).openDrawer(),
          ),
        ),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.deepPurple, Colors.purpleAccent],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    'EmpowerED',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'For Parents',
                    style: TextStyle(
                      color: Colors.white70,
                      fontSize: 18,
                    ),
                  ),
                ],
              ),
            ),
            buildDrawerItem(Icons.event_note, 'Attendance', Routes.ATTENDANCE),
            buildDrawerItem(Icons.assignment, 'CIE Details', Routes.CIE),
            buildDrawerItem(
                Icons.school, 'Previous Sem Results', Routes.PREV_RES),
            buildDrawerItem(
              Icons.file_copy_outlined,
              'Counselling Reports',
              Routes.COUNSEL,
            )
          ],
        ),
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.white, Colors.lightBlue[100]!],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image.asset('assets/images/logo.png'),
                SizedBox(height: 20.0),
                buildElevatedButton(
                    'Attendance', Routes.ATTENDANCE, Icons.event_note),
                SizedBox(height: 20.0),
                buildElevatedButton(
                    'CIE Details', Routes.CIE, Icons.assignment),
                SizedBox(height: 20.0),
                buildElevatedButton(
                    'Previous Sem Results', Routes.PREV_RES, Icons.school),
                SizedBox(height: 20.0),
                buildElevatedButton('Counselling Reports', Routes.COUNSEL,
                    Icons.file_copy_outlined),
              ],
            ),
          ),
        ),
      ),
    );
  }

  ListTile buildDrawerItem(IconData icon, String title, String route) {
    return ListTile(
      leading: Icon(icon, color: Colors.deepPurple),
      title: Text(title, style: TextStyle(color: Colors.deepPurple)),
      onTap: () {
        Get.toNamed(route);
      },
    );
  }

  ElevatedButton buildElevatedButton(
      String title, String route, IconData icon) {
    return ElevatedButton(
      onPressed: () {
        Get.toNamed(route);
      },
      style: ElevatedButton.styleFrom(
        padding: EdgeInsets.symmetric(vertical: 16.0, horizontal: 32.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20.0),
        ),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
        elevation: 4,
        shadowColor: Colors.deepPurple.withOpacity(0.4),
        textStyle: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
        side: BorderSide(color: Colors.deepPurple.withOpacity(0.6), width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 24),
          SizedBox(width: 8.0),
          Text(title),
        ],
      ),
    );
  }
}
