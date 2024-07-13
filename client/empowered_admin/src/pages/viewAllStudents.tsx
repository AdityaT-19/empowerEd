import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MainListItems, SecondaryListItems } from '../components/SideList';
import { Copyright } from '../components/Copyrights';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material';
import { useEffect, useState } from 'react';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface Student {
  id: any;
  usn: any;
  name: any;
  sem: any;
  email: any;
  dept: any;
  section: any;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


const defaultTheme = createTheme();

export default function ViewAllStudents() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    async function fetchStudentList() {
      try {
        let result = await fetch('http://localhost:3000/api/v1/admin/getAllStudents');
        if (!result.ok) {
          throw new Error('Network response was not ok');
        }

        let data = await result.json();
        data = data.data;

        const newList: Student[] = data.map((student: any) => ({
          id: student.id,
          usn: student.usn,
          name: student.name,
          sem: student.sem,
          email: student.email,
          dept: student.dept,
          section: student.section,
        }));

        setStudentList(newList);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }

    fetchStudentList();
  }, []);

  const navigateTo = (url: string) => {
    navigate(url);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Admin Dashboard
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              List of All Students
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Grid container spacing={3} alignItems="center" justifyContent="space-between">
              <Grid item xs={8}>
                <Typography component="h4" variant="h6" color="inherit" noWrap>
                  Operations
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems navigate={navigateTo} />
            <SecondaryListItems navigate={navigateTo} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>USN</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Semester</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,index) => (
                    <TableRow key={row.id}
                    sx={{
                        backgroundColor: index % 2 != 0 ? 'action.hover' : 'background.paper',
                        padding:'50px'
                      }}
                    >
                      <TableCell>{row.usn}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.dept}</TableCell>
                      <TableCell>{row.sem}</TableCell>
                      <TableCell>{row.section}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 15, 25]}
              component="div"
              count={studentList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
