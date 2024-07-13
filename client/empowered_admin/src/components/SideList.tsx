
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';

import PeopleIcon from '@mui/icons-material/People';

import { Add, AddModeratorRounded, BookSharp, ContactPage, DataObject, Delete, Grade, List, Remove, SchoolRounded, Update } from '@mui/icons-material';
import React from 'react';

interface NavigatorProps{
  navigate:(url:string)=>void
}

export function MainListItems({navigate}:NavigatorProps){
  return (
  <React.Fragment>
    <ListItemButton onClick={()=>navigate('/dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/enrollStudentAndParent')}>
      <ListItemIcon>
        <PeopleIcon/>
      </ListItemIcon>
      <ListItemText primary="Enroll Students" />
    </ListItemButton>


    <ListItemButton onClick={()=>navigate('/updateGrades')}>
      <ListItemIcon>
        <Grade />
      </ListItemIcon>
      <ListItemText primary="Update Grades" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/addTeachers')}>
      <ListItemIcon>
        <SchoolRounded/>
      </ListItemIcon>
      <ListItemText primary="Add Teachers" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/addCourses')}>
      <ListItemIcon>
        <BookSharp />
      </ListItemIcon>
      <ListItemText primary="Add Courses" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/viewAllStudents')}>
      <ListItemIcon>
        <ContactPage/>
      </ListItemIcon>
      <ListItemText primary="View All Students" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/viewCourses')}>
      <ListItemIcon>
        <DataObject />
      </ListItemIcon>
      <ListItemText primary="View Courses" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/viewTeachers')}>
      <ListItemIcon>
        <List/>
      </ListItemIcon>
      <ListItemText primary="View Teachers" />
    </ListItemButton>
  </React.Fragment>
  );
}

export function SecondaryListItems({navigate}:NavigatorProps){
  return (
  <React.Fragment>
    <ListItemButton onClick={()=>navigate('/addCourses')}>
      <ListItemIcon>
        <Add />
      </ListItemIcon>
      <ListItemText primary="Add Courses" />

    </ListItemButton >
    
    <ListItemButton onClick={()=>navigate('/dropCourses')}>
      <ListItemIcon>
        <Delete/>
      </ListItemIcon>
      <ListItemText primary="Drop Courses" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/updateStudent')}>
      <ListItemIcon>
        <Update />
      </ListItemIcon>
      <ListItemText primary="Update Student" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/addCoordniator')}>
      <ListItemIcon>
        <Add />
      </ListItemIcon>
      <ListItemText primary="Add Coordinator" />
    </ListItemButton>

    <ListItemButton onClick={()=>navigate('/deleteCoordinator')}>
      <ListItemIcon>
        <Remove/>
      </ListItemIcon>
      <ListItemText primary="Delete Coordinator" />
    </ListItemButton>
  </React.Fragment>
  );
}