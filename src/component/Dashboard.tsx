import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import { CssVarsProvider } from '@mui/joy/styles';
import ProjectContext from '../context/Project-Context';


export default function Dashboard() {
  const projectContext = React.useContext(ProjectContext);
  const [projects, setProjects] = React.useState(projectContext.projects);

  const outgoingProjects = projects.filter(project => {return project.status === 'In Progress'} );
  const nextProjects = projects.filter(project => {return project.status === 'Waitting'} );
  const completedProjects = projects.filter(project => {return project.status === 'Completed'} );

  const completedRate = completedProjects.length/projects.length;
  const nextRate = nextProjects.length/projects.length;
  const outgoingRate = outgoingProjects.length/projects.length;

  return (
    <CssVarsProvider>
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <CircularProgress size="lg" determinate value={completedRate*100}>
       {'%'+completedRate*100}
      </CircularProgress>
      <CircularProgress size="lg" determinate value={nextRate*100}>
       {'%'+nextRate*100}
      </CircularProgress>
      <CircularProgress size="lg" determinate value={outgoingRate*100}>
       {'%'+outgoingRate*100}
      </CircularProgress>
    </Box>
    </CssVarsProvider>
  );
}