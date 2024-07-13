import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/signin';
import Dashboard from './pages/dashboard';
import ViewAllStudents from './pages/viewAllStudents';
import ViewAllTeachers from './pages/viewAllTeachers';
import ViewAllCourses from './pages/viewAllCourses';
import AddTeachers from './pages/addTeachers';
import AddCourses from './pages/addCourses';
import AddPlacementCoordinator from './pages/addPlacementCoordinator';
import DeletePlacementCoordinator from './pages/deletePlacementCoordinator';
import AddStudentAndParent from './pages/enrollStudentAndParent';
import UpdateStudent from './pages/updateStudent';
import ViewAllStudentsWithButton from './pages/viewStudentsWithUpdateButton';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/enrollStudentAndParent' element={<AddStudentAndParent />} />
        <Route path='/updateGrades' element={<Dashboard />} />
        <Route path='/addTeachers' element={<AddTeachers />} />
        <Route path='/addCoursesforStudent' element={<AddCourses/>}/>
        <Route path='/viewAllStudents' element={<ViewAllStudents />} />
        <Route path='/viewCourses' element={< ViewAllCourses/>} />
        <Route path='/viewTeachers' element={<ViewAllTeachers />} />
        <Route path='/addCoursesForStudent' element={<AddCourses/>}/>
        <Route path='/addCourses' element={<AddCourses/>}/>
        <Route path='/teachCourse' element={<AddCourses/>}/>
        <Route path='/updateStudent' element={<ViewAllStudentsWithButton/>}/>
        <Route path='/updateStudentAfterClick/:id' element={<UpdateStudent/>}/>
        <Route path='/addCoordniator' element={<AddPlacementCoordinator/>}/>
        <Route path='/deleteCoordinator' element={<DeletePlacementCoordinator/>}/>

      </Routes>
    </Router>
  );
}