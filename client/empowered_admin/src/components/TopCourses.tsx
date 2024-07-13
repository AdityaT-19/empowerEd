import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useEffect, useState } from 'react';

interface Courses {
  id:number,
  cid:string,
  name:string,
  dept:string,
  semester:number
}


export default function Orders() {
  const [courseList, setCourseList] = useState<Courses[]>([]);
  useEffect(() => {
    async function fetchCourseList() {
      try {
        let result = await fetch('http://localhost:3000/api/v1/admin/courses');
        if (!result.ok) {
          throw new Error('Network response was not ok');
        }

        let data = await result.json();
        data = data.data;

        const newList: Courses[] = data.map((course: any) => ({
          id:course.id,
          cid:course.cid,
          name:course.name,
          dept:course.dept,
          semester:course.semester
        }));
        
        setCourseList(newList);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }

    fetchCourseList();
  }, []);
  return (
    <React.Fragment>
      <Title>Recent Additions For Our Criculum</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>Course ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Department</TableCell>
          <TableCell>Semester</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {courseList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.cid}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.dept}</TableCell>
              <TableCell>{row.semester}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}