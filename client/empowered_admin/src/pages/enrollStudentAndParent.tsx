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
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../FirebaseSetup';
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
  usn: string;
  name: string;
  sem: number;
  email: string;
  dept: string;
  cgpa: string;
  section: string;
  achievements: string[];
  counsel_rep: string[];
  parentName:string,
  parentEmail:string,
  parentphNo:string
}



function CreateStudentForm({ }: { handleSubmit: (event: React.FormEvent<HTMLFormElement>, student: any, parent: any) => void }) {
    const [dept, setDept] = useState('');

    const handleDeptChange = (event: SelectChangeEvent<string>) => {
      setDept(event.target.value);
    };

    const [studentFormData, setStudentFormData] = useState<FormData>({
      usn: '',
      name: '',
      sem: 1,
      email: '',
      dept: '',
      cgpa: '',
      section: '',
      achievements: [],
      counsel_rep: [],
      parentName:'',
      parentEmail:'',
      parentphNo:'',
    });
  
    
  
    const handleStudentChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setStudentFormData({
        ...studentFormData,
        [event.target.name]: event.target.value,
      });
    };
  
   
  
    const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const studentData={
        usn: studentFormData.usn,
        name: studentFormData.name,
        sem: studentFormData.sem,
        email: studentFormData.email,
        dept: dept,
        cgpa: '0',
        section: studentFormData.section,
        achievements: [],
        counsel_rep: []
      }
      const parentData={
        name:studentFormData.parentName,
        usn:studentFormData.usn,
        phNo:studentFormData.parentphNo,
        email:studentFormData.parentEmail
      }
      console.log(parentData,studentData)
      try {
        const studentResult = await createUserWithEmailAndPassword(auth, studentData.email, studentData.usn);
        const parentResult= await createUserWithEmailAndPassword(auth,parentData.email,parentData.phNo);
        if (studentResult&&parentResult) {
          // Update student role
          await updateProfile(studentResult.user, { displayName: 'student',photoURL:`${studentData.usn}`});
          await updateProfile(parentResult.user,{displayName:'parent', photoURL:`${parentData.usn}`});
          console.log(studentResult.user.displayName)
          console.log(parentResult.user.displayName)
          console.log(studentResult.user.photoURL)
          console.log(parentResult.user.photoURL)
  
          const response = await fetch('https://empowered-dw0m.onrender.com/api/v1/admin/createStudentParentEnroll', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ student: studentData, parents: parentData })
          });
  
          if (response.ok) {
            toast.success('Student and Parent enrolled successfully');
          } else {
            toast.error('Failed to enroll Student and Parent');
          }
        }
      } catch (error) {
        console.error('Error enrolling Student and Parent:', error);
        toast.error('An error occurred while enrolling Student and Parent');
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
          mx: 'auto', // centers the form horizontally
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
          Create Student and Parent
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Student Information
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="usn"
          label="USN"
          name="usn"
          value={studentFormData.usn}
          onChange={handleStudentChange}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          value={studentFormData.name}
          onChange={handleStudentChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="sem"
          label="Semester"
          name="sem"
          type="number"
          value={studentFormData.sem}
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
          value={studentFormData.email}
          onChange={handleStudentChange}
        />
        <FormControl fullWidth margin="normal" required>
        <InputLabel id="dept-label">Department</InputLabel>
        <Select
          labelId="dept-label"
          id="dept"
          value={dept}
          onChange={handleDeptChange}
          label="Department"
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
          value={studentFormData.section}
          onChange={handleStudentChange}
        />
        
        <Typography variant="h6" component="h2" gutterBottom sx={{ marginTop: 3 }}>
          Parent Information
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="parentName"
          label="Parent Name"
          name="parentName"
          value={studentFormData.parentName}
          onChange={handleStudentChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="parentPhNo"
          label="Parent Phone Number"
          name="parentphNo"
          value={studentFormData.parentphNo}
          onChange={handleStudentChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="parentEmail"
          label="Parent Email"
          name="parentEmail"
          type="email"
          value={studentFormData.parentEmail}
          onChange={handleStudentChange}
        />
  
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, py: 1.5 }}
        >
          Create Student and Parent
        </Button>
        
      </Box>
    );
  }
function AddStudentAndParent() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
  
    const toggleDrawer = () => {
      setOpen(!open);
    };
  
     //Dummy
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, studentData: any, parentData: any) => {
      event.preventDefault();
      try {
        // Create student and parent in Firebase or API
        // Example: Assuming functions like createUserWithEmailAndPassword and fetch API
        let studentResult = await createUserWithEmailAndPassword(auth, studentData.email, studentData.usn);
        if (studentResult) {
          let response = await fetch('http://localhost:3000/api/v1/admin/addStudentAndParent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ student: studentData, parents: parentData })
          });
  
          if (response.ok) {
            toast.success('Student and Parent added successfully');
          } else {
            toast.error('Failed to add Student and Parent');
          }
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
  
  export default AddStudentAndParent;
