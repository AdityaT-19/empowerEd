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
import { Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import auth from '../FirebaseSetup';
import { signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LogoutOutlined } from '@mui/icons-material';

const drawerWidth: number = 240;

interface USN{
    usn:string,
    name:string
}

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

function CreatePlacementCordForm({ handleSubmit }: { handleSubmit: (event: React.FormEvent<HTMLFormElement>, dept: string) => void }) {
  const [dept, setDept] = useState('');
  const [usnList,setUsnList]=useState<USN[]>([]);

  useEffect(() => {
    async function fetchStudentList() {
      try {
        let result = await fetch('https://empowered-dw0m.onrender.com/api/v1/admin/getPlacementCoordinators');
        if (!result.ok) {
          throw new Error('Network response was not ok');
        }

        let data = await result.json();
        data = data.data;

        const newList= data.map((student: any) => ({
          usn: student.usn,
          name:student.name
        }));

        setUsnList(newList);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }

    fetchStudentList();
  }, []);

  const handleDeptChange = (event: SelectChangeEvent<string>) => {
    setDept(event.target.value);
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event, dept);
  };

  return (
    <Box
      component="form"
      onSubmit={submitForm}
      noValidate
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'background.paper',
        maxWidth: 500,
        mx: 'auto', // centers the form horizontally
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
        Delete Placement Coordinator
      </Typography>
      
      <FormControl fullWidth margin="normal" required>
        <InputLabel id="dept-label">Select USN</InputLabel>
        <Select
        labelId="dept-label"
        id="dept"
        value={dept}
        onChange={handleDeptChange}
        label="Department"
        >
        {usnList.map((usn) => (
            <MenuItem key={usn.usn} value={usn.usn}>
            {`${usn.usn} - ${usn.name}`}
            </MenuItem>
        ))}
        </Select>

      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, py: 1.5 }}
      >
        Add Placement Coordinator
      </Button>
    </Box>
  );
}

export default function DeletePlacementCoordinator() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, dept: string) => {
    event.preventDefault();
   

    try {
        
        const response = await fetch(`http://localhost:3000/api/v1/admin/deletePlacementCoodinator/${dept}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        
        });

        if (response.ok) {
          toast.success('Coordinator delete successfully');
          
        } else {
          toast.error('Failed to delete coordinator');
       
        }
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('An error occurred. Please try again later.');
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
            <IconButton color="inherit" onClick={
              ()=>{
                let result=localStorage.getItem("user");
                if(result){
                  signOut(auth)
                  localStorage.setItem("user","");
                  navigate('/signin')
                }
              }
            }>
        
            <LogoutOutlined  />
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
            <CreatePlacementCordForm handleSubmit={handleSubmit} />
          </Container>
        </Box>
        <ToastContainer />
      </Box>
    </ThemeProvider>
  );
}
