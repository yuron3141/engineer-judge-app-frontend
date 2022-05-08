import React from 'react'
import { Helmet, HelmetProvider } from "react-helmet-async";

import {useTheme, useMediaQuery} from '@mui/material';
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import resultList from '../json/result.json';

export const Type = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>エンジニア性格タイプ</title>
                    <meta
                        name="description"
                        content="ITエンジニア性格診断の結果です"
                    />
                    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta>
                    <head prefix="og: http://ogp.me/ns#" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="エンジニア性格タイプ" />
                    <meta property="og:description" content="" />
                    <meta property="og:site_name" content="ITエンジニア性格診断" />
                </Helmet>
            </HelmetProvider>
            <Typography variant={ isMobile ? 'h5' : 'h4'} fontWeight={"bold"} align="center" style={{marginTop: "50px", marginBottom: "20px"}}>
                エンジニア性格タイプ
            </Typography>
            <svg viewBox="0 0 1920 250" preserveAspectRatio="none" className="background">
                <polygon fill="#d9eaf0" points="1920 823 0 823 0 0 396 101 835 31 1574 149 1920 17 1920 823"></polygon>
            </svg>
            <div style={{backgroundColor: '#d9eaf0',position: 'relative', paddingBottom: '100px', marginTop: '-10px'}}>
                <div style={{textAlign: "center", marginBottom: "20px"}}>
                    { resultList.map((result, index) => {
                        return (
                            <div key={index}>
                                <Typography variant={ isMobile ? 'h4' : 'h2'} fontWeight={"bold"} align="center" style={{marginBottom: "20px",paddingTop: "70px", color: '#ffffff'}}>
                                    {result.type}型エンジニア
                                </Typography>
                                <Box sx={{ flexGrow: 1 }}  style={isMobile ? {display: 'block'} : {display: 'inline-block', width: '650px'}}>
                                    <Grid container direction={isMobile ? 'column-reverse' : 'row'} spacing={{ xs: 4, md: 8 }} columns={{ xs: 4, sm: 12 }} alignItems="center">
                                        <Grid item xs={4} sm={7} sx={isMobile ? { m: 1} : {}}>
                                            <Typography variant={ isMobile ? 'h5' : 'h4'} align="center">  
                                            {result.patternA}タイプ
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={5}>
                                            <Box
                                                component="img"
                                                sx={{
                                                maxHeight: { xs: 233},
                                                maxWidth: { xs: 350},
                                                }}
                                                alt="イメージ画像"
                                                src={`${process.env.PUBLIC_URL}/imgs/${result.img}`}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction={isMobile ? 'column' : 'row'} spacing={{ xs: 4, md: 8 }} columns={{ xs: 4, sm: 12 }} alignItems="center">
                                        <Grid item xs={4} sm={5} sx={isMobile ? { m: 1} : {}}>
                                            <Box
                                                component="img"
                                                sx={{
                                                maxHeight: { xs: 233},
                                                maxWidth: { xs: 350},
                                                }}
                                                alt="イメージ画像"
                                                src={`${process.env.PUBLIC_URL}/imgs/${result.img2}`}
                                            />
                                        </Grid>
                                        <Grid item xs={4} sm={7}>
                                            <Typography variant={ isMobile ? 'h5' : 'h4'} align="center">  
                                                {result.patternB}タイプ
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} sm={7} sx={isMobile ? { m: 1} : {}} style={{paddingTop: 30}}>
                                        <Typography variant="body1" align="left">
                                            {result.chars1}
                                        </Typography>
                                        <Typography variant="body1" align="left">
                                            {result.chars2}
                                        </Typography>
                                        <Typography variant="body1" align="left">
                                            {result.chars3}
                                        </Typography>
                                        <Typography variant="body1" align="left">
                                            {result.chars4}
                                        </Typography>
                                    </Grid>
                                </Box>
                            </div>
                        );
                    })}
                </div>
            </div>
    </>
    )
}
