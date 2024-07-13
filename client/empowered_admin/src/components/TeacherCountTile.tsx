import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useState,useEffect } from 'react';


export default function TeacherCount() {
    const [teacherCount,setTeacherCount]=useState<number>(0);
    useEffect(() => {
    async function fetchTeacherList() {
      try {
        let result = await fetch('https://empowered-dw0m.onrender.com/api/v1/admin/getAllTeachers');
        if (!result.ok) {
          throw new Error('Network response was not ok');
        }

        let data = await result.json();
        data = data.data;

        setTeacherCount(data.length);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }

    fetchTeacherList();
  }, []);
  return (
    <React.Fragment>
      <Title>Total Teachers</Title>
      <Typography component="p" variant="h4">
        {teacherCount}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
       as on {new Date().getUTCDay().toString()}/{new Date().getMonth().toString()}/{new Date().getFullYear().toString()}
      </Typography>
      <div>
        <Link color="primary" href="/viewTeachers">
          View All Teachers
        </Link>
      </div>
    </React.Fragment>
  );
}