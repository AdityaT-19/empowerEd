import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/signin';
import Dashboard from './pages/dashboard';

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
        <Route path='/viewAllStudents' element={<Dashboard />} />
        <Route path='/viewCourses' element={<Dashboard />} />
        <Route path='/viewTeachers' element={<Dashboard />} />
        <Route path='/addCourses' element={<Dashboard/>}/>
        <Route path='/dropCourses' element={<Dashboard/>}/>
        <Route path='/updateStudent' element={<Dashboard/>}/>
        <Route path='/addCoordniator' element={<Dashboard/>}/>
        <Route path='/deleteCoordinator' element={<Dashboard/>}/>

      </Routes>
    </Router>
  );
}