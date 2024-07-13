import * as React from 'react';
import { useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../FirebaseSetup'
import { useEffect } from 'react';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
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

interface FormData {
  usn: any;
  name: any;
  sem: any;
  email: any;
  dept: any;
  cgpa: any;
  section: any;
  achievements: any[];
  counsel_rep: any[];
}

function CreateStudentForm({ handleSubmit }: { handleSubmit: (event: React.FormEvent<HTMLFormElement>, student: any) => void }) {
    const { id } = useParams<{ id: string }>();
    const [dept, setDept] = useState('');
    const [studentById, setStudentById] = useState<FormData | null>(null);
  
    useEffect(() => {
      console.log("useEffect triggered");
      async function fetchStudentData() {
        console.log("Fetching student data...");
        try {
          const result = await fetch(`https://empowered-dw0m.onrender.com/api/v1/student/${id}`);
          if (!result.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await result.json();
          const studentData = data.data[0];
          setStudentById({
            usn: studentData.usn,
            name: studentData.name,
            sem: studentData.sem,
            email: studentData.email,
            dept: studentData.dept,
            section: studentData.section,
            achievements: studentData.achievements,
            counsel_rep: studentData.counsel_rep,
            cgpa: studentData.cgpa,
          });
          setDept(studentData.dept);
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      }
  
      fetchStudentData();
    }, [id]);
  
    const handleDeptChange = (event: SelectChangeEvent<string>) => {
      setDept(event.target.value);
    };
  
    const handleStudentChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (studentById) {
        setStudentById({
          ...studentById,
          [event.target.name]: event.target.value,
        });
      }
    };
  
    const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!studentById) return;
  
      const studentData = {
        "usn":studentById.usn,
        "name":studentById.name,
        "sem":studentById.sem,
        "email":studentById.email,
        "dept":dept,
        "cgpa":studentById.cgpa,
        "section":studentById.section,
        "achivements":studentById.achievements,
        "counsel_rep":studentById.counsel_rep
      };
      try {
        const response = await fetch('https://empowered-dw0m.onrender.com/api/v1/admin/updateStudent', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "usn":studentById.usn,
            "name":studentById.name,
            "sem":studentById.sem,
            "email":studentById.email,
            "dept":dept,
            "cgpa":0,
            "section":studentById.section,
            "achivements":studentById.achievements,
            "counsel_rep":studentById.counsel_rep
          }),
        });
  
        if (response.ok) {
          toast.success('Student updated successfully');
        } else {
            console.log(response)
          toast.error('Failed to update student');
        }
      } catch (error) {
        console.error('Error updating student:', error);
        toast.error('An error occurred while updating the student');
      }
    };
  
    return (
      <Box
        component="form"
        onSubmit={handleSubmitForm}
        noValidate
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper',
          maxWidth: 700,
          mx: 'auto',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
          Update Student
        </Typography>
        {studentById ? (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="usn"
              label="USN"
              name="usn"
              value={studentById.usn}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={studentById.name}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="sem"
              label="Semester"
              name="sem"
              type="number"
              value={studentById.sem}
              onChange={handleStudentChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={studentById.email}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cgpa"
              label="CGPA"
              name="cgpa"
              type="number"
              value={studentById.cgpa}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="dept-label">Department</InputLabel>
              <Select
                labelId="dept-label"
                id="dept"
                value={dept}
                onChange={handleDeptChange}
              >
                <MenuItem value={"Computer Science And Engineering"}>Computer Science And Engineering</MenuItem>
                <MenuItem value={"Information Science And Engineering"}>Information Science And Engineering</MenuItem>
                <MenuItem value={"Civil Engineering"}>Civil Engineering</MenuItem>
                <MenuItem value={"Mechanical Engineering"}>Mechanical Engineering</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="section"
              label="Section"
              name="section"
              value={studentById.section}
              onChange={handleStudentChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Update Student
            </Button>
          </>
        ) : (
          <Typography variant="body1" component="p" sx={{ textAlign: 'center', mt: 3 }}>
            Loading student data...
          </Typography>
        )}
      </Box>
    );
  }
  


function UpdateStudent() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
  
    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>,studentData:any) => {
      event.preventDefault();
      try {
        
        console.log("entered here")
          let response = await fetch('http://localhost:3000/api/v1/admin/updateStudent', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ student: studentData })
          });
  
          if (response.ok) {
            toast.success('Student and Parent added successfully');
          } else {
            toast.error('Failed to add Student and Parent');
          }
        
      } catch (error) {
        console.error('Error adding Student and Parent:', error);
        toast.error('An error occurred while adding Student and Parent');
      }
    };
  
    const navigateTo = (url: string) => {
      navigate(url);
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
              <SecondaryListItems navigate={navigateTo}/>
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
              <CreateStudentForm handleSubmit={handleSubmit} />
            </Container>
          </Box>
        </Box>
        <ToastContainer />
      </ThemeProvider>
    );
  }
  
  export default UpdateStudent;