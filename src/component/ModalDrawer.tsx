import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ProjectContext from '../context/Project-Context';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal(props : any) {
  const [status, setStatus] = React.useState('Waitting');
  const [projectName, setProjectName] = React.useState('');

  const projectContext = React.useContext(ProjectContext);
  const [projects, setProjects] = React.useState(projectContext.projects);


  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  const handleClose = () => props?.setModalOpen(false);

  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54'),
  );

  const handleChangeDate = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54'),
  );

  const handleChangeEndDate = (newValue: Dayjs | null) => {
    setEndDate(newValue);
  };

  

  const saveProject = () => {
    var object = {
      id: projects.length+1,
      projectName: projectName,
      startDate: startDate?.$d,
      endDate: endDate?.$d,
      status: status
    }
    projectContext.addProject(object);

    props.setModalOpen(false);
    
  }

  return (
    <div>
    {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        keepMounted
        open={props?.modalOpen}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <TextField id="outlined-basic" label="Project Name" variant="outlined" fullWidth onChange={(e) => setProjectName(e.target.value)}/>
          <Box sx={{ minWidth: 120 ,marginTop: "10px"}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={'In Progress'}>In Progress</MenuItem>
                <MenuItem value={'Waitting'}>Waitting</MenuItem>
                <MenuItem value={'Completed'}>Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Stack spacing={3} style={{marginTop:"10px"}}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={startDate}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
                
              />
            </Stack>
            <Stack spacing={3} style={{marginTop:"10px"}}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={endDate}
                onChange={handleChangeEndDate}
                renderInput={(params) => <TextField {...params} />}
                
              />
            </Stack>
          </LocalizationProvider>
          <Stack spacing={2} direction="row" style={{float: 'right',marginTop:"10px"}}>
            <Button variant="outlined" onClick={saveProject}>Kaydet</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}