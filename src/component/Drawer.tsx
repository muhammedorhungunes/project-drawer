import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TableChartIcon from '@mui/icons-material/TableChart';
import Table from '../component/Table';
import Dashboard from './Dashboard';
import ProjectContext from '../context/Project-Context';
import DrawerModal from '../component/ModalDrawer';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activePage, setActivePage] = React.useState('Dashboard');
  const projectContext = React.useContext(ProjectContext);
  const [projects, setProjects] = React.useState(projectContext.projects);
  const projectsTemp = projectContext.projects;
  const [outgoingProjects,setOutGoingProjects] = React.useState(projectsTemp.filter(project => {return project.status === 'In Progress'} ));
  const [nextProjects,setNextProjects] = React.useState(projectsTemp.filter(project => {return project.status === 'Waitting'} ));
  const [completedProjects,setCompletedProjects] = React.useState(projectsTemp.filter(project => {return project.status === 'Completed'} ));
  const [modalOpen, setModalOpen] = React.useState(false);
  const [changeStatusCount, setChangeStatusCount] = React.useState(0);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (text: string) => {
    setActivePage(text);
  };

  const onClickModal = () => {
    setModalOpen(true);
    console.log(modalOpen)
  };

  const changeStatus = (selectedProjects : any , selectedStatus : any) => {
    let projectsTemp = [...projectContext.projects];
    for(var i = 0 ; i < projectsTemp.length;i++){
      for(var j=0; j<selectedProjects.length;j++){
        if(selectedProjects[j].id === projectsTemp[i].id){
          projectsTemp[i].status = selectedStatus;
        } 
      }
    }
    projectContext.projects = projectsTemp;

    setOutGoingProjects(projectsTemp.filter(project => {return project.status === 'In Progress'}));
    setNextProjects(projectsTemp.filter(project => {return project.status === 'Waitting'}));
    setCompletedProjects(projectsTemp.filter(project => {return project.status === 'Completed'}));
  };

  const addProject = (object: any) => {
        var array = [...projectContext.projects];
        array.push(object as any);
        console.log(array)
        projectContext.projects = array;
  }

  React.useEffect(() => {
    
  },[modalOpen, changeStatusCount]);

  return (
    <ProjectContext.Provider value={{ projects: projects, changeStatus: changeStatus , addProject: addProject} as any}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {activePage.toString()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard','All Project', 'Outgoing Project List', 'Next Project', 'Completed Project'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => handleClick(text)}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 0 ? <AdminPanelSettingsIcon /> : <TableChartIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <ListItem key='Create Project' disablePadding sx={{ display: 'block' ,position: 'absolute', bottom: '10px'}}  onClick={()=> onClickModal()}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                    <TableChartIcon />
                </ListItemIcon>
                <ListItemText primary='Create Project' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        { activePage === 'Dashboard' ?
        <Dashboard></Dashboard>
        :
        activePage === 'All Project' ?
        <Table products={projectsTemp} changeStatusCount={changeStatusCount} setChangeStatusCount={setChangeStatusCount}></Table>
        :
        activePage === 'Outgoing Project List' ?
        <Table products={outgoingProjects} changeStatusCount={changeStatusCount} setChangeStatusCount={setChangeStatusCount}></Table>
        :
        activePage === 'Next Project' ? 
        <Table products={nextProjects} changeStatusCount={changeStatusCount} setChangeStatusCount={setChangeStatusCount}></Table>
        :
        activePage === 'Completed Project' ? 
        <Table products={completedProjects} changeStatusCount={changeStatusCount} setChangeStatusCount={setChangeStatusCount}></Table>
        :
        <div></div>
        }
      </Box>
    </Box>
    <DrawerModal modalOpen={modalOpen} setModalOpen ={setModalOpen}></DrawerModal>
    </ProjectContext.Provider>
  );
}