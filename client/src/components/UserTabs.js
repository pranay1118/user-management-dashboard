import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PeopleIcon from '@mui/icons-material/People';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Users from './Users';
import Account from './Account';
export default function UserTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '95%', typography: 'body1'}}>
       
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="User's Details" icon={<PeopleIcon/>} iconPosition='start' value="1" />
            <Tab label="Account Creation" icon={<GroupAddIcon/>} iconPosition='start' value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><Users/>  </TabPanel>
        <TabPanel value="2"><Account/></TabPanel>
      </TabContext>
    </Box>
  );
}
