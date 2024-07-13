import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/signin';
import Dashboard from './pages/dashboard';
import ViewAllStudents from './pages/viewAllStudents';
import ViewAllTeachers from './pages/viewAllTeachers';
import ViewAllCourses from './pages/viewAllCourses';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/enrollStudentAndParent' element={<Dashboard />} />
        <Route path='/updateGrades' element={<Dashboard />} />
        <Route path='/addTeachers' element={<Dashboard />} />
        <Route path='/addCourses' element={<Dashboard />} />
        <Route path='/viewAllStudents' element={<ViewAllStudents />} />
        <Route path='/viewCourses' element={< ViewAllCourses/>} />
        <Route path='/viewTeachers' element={<ViewAllTeachers />} />
        <Route path='/addCourses' element={<Dashboard/>}/>
        <Route path='/dropCourses' element={<Dashboard/>}/>
        <Route path='/updateStudent' element={<Dashboard/>}/>
        <Route path='/addCoordniator' element={<Dashboard/>}/>
        <Route path='/deleteCoordinator' element={<Dashboard/>}/>

      </Routes>
    </Router>
  );
}