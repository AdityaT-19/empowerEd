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
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems, SecondaryListItems } from '../components/SideList';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@mui/icons-material';
import auth from '../FirebaseSetup';
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';

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

export default function MassUpdateGrade() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }
    console.log(file)
    const formData = new FormData();
    formData.append('file', file);

    try {
      let response = await fetch('https://empowered-py.onrender.com/processStudentandParentData', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const studentAndParents = data.studentAndParents;

        for (let i = 0; i < studentAndParents.length; i++) {
          const studentData = studentAndParents[i].student;
          const parentData = studentAndParents[i].parent

          // Create student and parent accounts
          const studentResult = await createUserWithEmailAndPassword(auth, studentData.email, studentData.usn);
          const parentResult = await createUserWithEmailAndPassword(auth, parentData.email, parentData.phNo);

          if (studentResult && parentResult) {
            // Update user profiles
            await updateProfile(studentResult.user, { displayName: 'student', photoURL: studentData.usn });
            await updateProfile(parentResult.user, { displayName: 'parent', photoURL: studentData.usn });

            // Call API to enroll student and parent
            const enrollResponse = await fetch('https://empowered-dw0m.onrender.com/api/v1/admin/createStudentParentEnroll', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ student: studentData, parents: parentData }),
            });

            if (enrollResponse.ok) {
              let r=await fetch('https://empowered-dw0m.onrender.com/api/v1/admin/sendMailToStudent', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "studentName":studentData.name,
                  "email":studentData.email,
                  "password":studentData.usn
                })
              });
              if(r.ok){
                let r1=await fetch('https://empowered-dw0m.onrender.com/api/v1/admin/sendMailToStudent', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    "studentName":parentData.name,
                    "email":parentData.email,
                    "password":parentData.phNo
                  })
                });
                if(!r1.ok){
                  toast.error("Mail Sending Failed")
                }
  
              }else{
                toast.error('Mail sending failed')
              }
             toast.success("Students and parent enrolled successfully");
            } else {
              toast.error('Failed to enroll Student and Parent');
            }
          }
        }
      } else {
        toast.error('Failed to process student and parent data');
      }
    } catch (error) {
      console.error('Error processing student and parent data:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  const navigateTo = (url: string) => {
    navigate(url);
  };

  const toggleDrawer = () => {
    setOpen(!open);
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
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => {
                let result = localStorage.getItem('user');
                if (result) {
                  signOut(auth);
                  localStorage.setItem('user', '');
                  navigate('/signin');
                }
              }}
            >
              <LogoutOutlined />
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
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Add Your Excel Sheet to Enroll Student and Parents
            </Typography>
            <form onSubmit={handleFileUpload} encType="multipart/form-data">
              <input type="file" onChange={handleFileChange} accept=".xlsx" />
              <Button type="submit" variant="contained" color="primary">
                Upload
              </Button>
            </form>
          </Container>
        </Box>
        <ToastContainer />
      </Box>
    </ThemeProvider>
  );
}

