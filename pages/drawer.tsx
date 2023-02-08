import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DrawerMini from '../src/component/Drawer';


export default function Drawer() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      <DrawerMini></DrawerMini>        
      </Box>
    </Container>
  );
}
