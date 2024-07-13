import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(
  id: number,
  scheme: string,
  c_name: string,
  deptarment: string,
  semester: string,
) {
  return { id, scheme, c_name,deptarment, semester };
}

const rows = [
  createData(
    0,
    '2024',
    'Deep Learning',
    'Computer Science and Engineering',
    "5",
  ),
  createData(
    1,
    '2024',
    'Deep Learning',
    'Computer Science and Engineering',
    "5",
  ),
  createData(2, 
    '2024',
    'Deep Learning',
    'Computer Science and Engineering',
    "5",
  ),
  createData(
    3,
    '2024',
    'Deep Learning',
    'Computer Science and Engineering',
    "5",
  ),
  createData(
    4,
    '2024',
    'Deep Learning',
    'Computer Science and Engineering',
    "5",
  ),
];



export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Additions For Our Criculum</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Scheme</TableCell>
            <TableCell>Couse Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Semester</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.scheme}</TableCell>
              <TableCell>{row.c_name}</TableCell>
              <TableCell>{row.deptarment}</TableCell>
              <TableCell>{row.semester}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}