import React, { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Typography } from '@mui/material';

const CountryPicker = ({countriesList, handleCountryChange}) => {
  
  return (
    <>
      <Typography style={{paddingTop: '2%'}} color={"textSecondary"} variant="h5">
        Countries Charts
      </Typography>
      <FormControl > 
        <NativeSelect
          defaultValue=""
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option value="">Pick a country</option>
          {countriesList?.map((country, key) => (
            <option key={key} value={country.country}>
              {country.country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </>
    
  );
};

export default CountryPicker;