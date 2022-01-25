
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import {Card, CardContent, Typography} from '@mui/material';
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import { TodayDeaths } from "./today-deaths";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
    if (num > 1000000000) {
        return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
        return Math.round(num / 100000) / 10 + "M";
    } else {
        return Math.round(num / 100) / 10 + "K";
    }
};

export function CovidMap() {
    const [name, setName] = useState("");
    const [cases, setCases] = useState("");
    const [active, setActive]= useState("");
    const [deaths, setDeaths] = useState("");
    const [todayCases, setTodayCases] = useState("");
    const [todayDeaths, setTodayDeaths] = useState("");
    const [todayRecovered, setTodayRecovered] = useState("");
    const [tooltipDisabled, setTooltipDisabled] = useState(true);
    return (
        <div>
            <Typography style={{paddingTop: '2%'}} color={"textSecondary"} variant="h5">
                World Map
            </Typography>
            <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
                <ZoomableGroup>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onClick={() => {
                                        const { NAME, POP_EST } = geo.properties;
                                        setName(NAME);
                                        fetch(`https://disease.sh/v3/covid-19/countries/${NAME}`)
                                            .then((res) => res.json())
                                            .then((data) => {
                                                setCases(data.cases);
                                                setDeaths(data.deaths);
                                                setActive(data.active);
                                                setTodayCases(data.todayCases);
                                                setTodayDeaths(data.todayDeaths);
                                                setTodayRecovered(data.todayRecovered);
                                                setTooltipDisabled(false);
                                            });
                                    }}
                                    onMouseEnter={() => {
                                        const { NAME, POP_EST } = geo.properties;
                                        setName(NAME);
                                        fetch(`https://disease.sh/v3/covid-19/countries/${NAME}`)
                                            .then((res) => res.json())
                                            .then((data) => {
                                                setCases(data.cases);
                                                setDeaths(data.deaths);
                                                setActive(data.active);
                                                setTodayCases(data.todayCases);
                                                setTodayDeaths(data.todayDeaths);
                                                setTodayRecovered(data.todayRecovered);
                                                setTooltipDisabled(false);
                                            });
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipDisabled(true);
                                        setName("");
                                        setCases("");
                                        setDeaths("");
                                        setActive("");
                                        setTodayCases("");
                                        setTodayDeaths("");
                                        setTodayRecovered("");
                                        
                                    }}
                                    style={{
                                        default: {
                                            fill: "#D6D6DA",
                                            outline: "none"
                                        },
                                        hover: {
                                            fill: "#F53",
                                            outline: "none"
                                        },
                                        pressed: {
                                            fill: "#E42",
                                            outline: "none"
                                        }
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            {
                tooltipDisabled ? null : 
            <ReactTooltip>
            <Card sx={{ minWidth: 275 }}>
                                                <CardContent>
                                                    <Typography variant="h5" component="div">
                                                    {name}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    {`Cases: ${cases}`}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    {`Active: ${active}`}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    {`Deaths: ${deaths}`}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    {`Today cases: ${todayCases}`}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    {`Today recovered: ${todayRecovered}`}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    {`Today deaths: ${todayDeaths}`}
                                                    </Typography>
                                                </CardContent>
                                                </Card>
            </ReactTooltip>
}
        </div>
    );
}