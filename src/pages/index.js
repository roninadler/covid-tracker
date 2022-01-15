import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Cases } from '../components/dashboard/cases';
import {CovidMap} from 'src/components/dashboard/covid-map';
import { TodayCases } from '../components/dashboard/today-cases';
import { Deaths } from 'src/components/dashboard/deaths';
import { Recovered } from '../components/dashboard/recovered';
import { TodayRecovered } from '../components/dashboard/today-recovered';
import { DashboardLayout } from '../components/dashboard-layout';
import { Active } from 'src/components/dashboard/active';
import { TodayDeaths } from 'src/components/dashboard/today-deaths';
import { Critical } from 'src/components/dashboard/critical';

import React, { useEffect, useState } from "react";
import CountryPicker from 'src/components/dashboard/countryPicker';
import { CountryChart } from '../components/dashboard/countryChart';
import { Covid19 } from 'src/icons/covid-19';


const Dashboard = () => {
  const [data, setData] = useState(null)
  const [countriesList, setCountriesList] = useState([]);
  const [countryData, setCountryData] = useState(null)
  const [picked, setPicked] = useState(false)

  const fetchCountry = async (country) => {
    await fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
      .then((res) => res.json())
      .then((data) => {
        setCountryData(data);
      });
  }

  useEffect(async () => {
    await fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [])

  useEffect(async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountriesList(data);
      });
  }, [])


  const handleCountryChange =  (country) => {
     fetchCountry(country)
     setPicked(true)
  }

  return (<>
    <Head>
      <title>
        Covid-19 Dashboard 
      </title>
    </Head>
    <Box sx={{ p: 3 }}>
      <Covid19
        sx={{
          height: 42,
          width: 42
        }}
      />
      <Typography
          color="inherit"
          variant="h4"
          gutterBottom
          style={{display: 'inline-block', paddingLeft: '35%'}}
        >
          Covid-19 Tracker
      </Typography>
    </Box>
    <Box>
      
      <Container >
      <Typography color={"textSecondary"} variant="h5">
        Global Data
      </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Cases cases={data?.cases}/>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <Recovered recovered={data?.recovered}/>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <Deaths deaths={data?.deaths}/>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <Active active={data?.active} sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TodayCases todayCases={data?.todayCases}/>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TodayRecovered todayRecovered={data?.todayRecovered} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TodayDeaths todayDeaths={data?.todayDeaths}/>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <Critical critical={data?.critical}/>
          </Grid>
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
          <Grid
            item
            lg={12}>
             <CovidMap fetchCountry={fetchCountry} countryData={countryData}/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
          </Grid>
          
          
        </Grid>
      </Container>
    </Box>
  </>
  )
    };

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard
