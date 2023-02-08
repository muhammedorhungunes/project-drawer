import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import projectContext from '../context/Project-Context';
import MenuItem from '@mui/material/MenuItem';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'projectName', headerName: 'Project name', width: 200 },
  { field: 'startDate', headerName: 'Start date', width: 200 },
  {
    field: 'endDate',
    headerName: 'End Date',
    width: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
  },
];

export default function DataTable({ products ,changeStatusCount, setChangeStatusCount } : any) {
  const ProjectContext = React.useContext(projectContext);
  const [selectedProject,setSelectedProject] = React.useState([]);
  const [selectedStatus,setSelectedStatus] = React.useState('In Progress');
  const [change, setChange] = React.useState(true);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value as string);
  };

  const buttonOnClick = () => {
    ProjectContext.changeStatus(selectedProject  ,selectedStatus);
    setChangeStatusCount(changeStatusCount++);
    setChange(!change);
  }

  React.useEffect(() => {
    
  },[change]);

  return (
    <div style={{ height: 500, width: 1000 }}>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedStatus}
          label="Status"
          placeholder='Plesae select status'
          onChange={handleChange}
          style={{width:"300px" ,marginBottom:'10px'}}
        >
          <MenuItem value={'In Progress'}>In Progress</MenuItem>
          <MenuItem value={'Waitting'}>Waitting</MenuItem>
          <MenuItem value={'Completed'}>Completed</MenuItem>
        </Select>
      <Button variant='outlined' onClick={buttonOnClick} style={{marginLeft: '10px'}}>Change Status</Button>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = products.filter((row : any) => selectedIDs.has(row.id));

          setSelectedProject(selectedRows);
          //props?.setSelectedRows(selectedRows);
        }}
      />
    </div>
  );
}