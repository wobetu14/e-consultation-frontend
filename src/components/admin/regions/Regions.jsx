
import Header from '../AdminHeader';

import { RegionsDataProvider } from '../../../contexts/RegionsDataContext';
import RegionsTable from './RegionsTable';
import { Box } from '@mui/material';


const Regions = () => {
   
  return (
    <Box m='0 20px' width={'95%'}>
      <Header title="Regions" subtitle="Manage Regions" />
        <RegionsDataProvider>
          <RegionsTable />
        </RegionsDataProvider>
      </Box> 
  )
}

export default Regions