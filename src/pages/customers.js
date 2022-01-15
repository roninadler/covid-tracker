import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';

const Customers = () => {

  return(
    <>
      <Head>
        <title>
          Countries Charts 
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <CountryPicker countriesList={countriesList} handleCountryChange={handleCountryChange}/>
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={12}
              xs={12}
            >
              <CountryChart picked={picked} countryData={countryData}  />
            </Grid>
            
          </Grid>
        </Container>
      </Box>
    </>
  )
};

Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
