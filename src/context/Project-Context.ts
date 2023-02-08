import React from 'react';
 
const projects = [{
    id:1,
projectName: 'Project A',
startDate: '22.10.2022',
endDate: '22.11.2022',
status: 'In Progress'
},{
    id:2,
    projectName: 'Project A',
    startDate: '22.10.2022',
    endDate: '22.11.2022',
    status: 'In Progress'
    },{
        id:3,
        projectName: 'Project A',
        startDate: '22.10.2022',
        endDate: '22.11.2022',
        status: 'Waitting'
        },{
            id:4,
            projectName: 'Project A',
            startDate: '22.10.2022',
            endDate: '22.11.2022',
            status: 'Completed'
            }];
const projectContext = React.createContext({projects:projects,changeStatus:(selectedProjects : any, selectedStatus : any )=>{}, addProject: (obeject : any) => {}});
 
export default projectContext;