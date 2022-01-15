import React, { useEffect, useState } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import { toNiceNumber } from "src/utils/toNiceNumber";

export function Recovered (props) {
  
  return(
  <Card
    sx={{ height: '100%' }}
    style={{ backgroundColor: 'green', 
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
            transition: '0.3s',
          }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="#cdced1"
            gutterBottom
            variant="overline"
          >
            RECOVERED
          </Typography>
          <Typography
            color="white"
            variant="h4"
          >
            {toNiceNumber(props.recovered)}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)};
