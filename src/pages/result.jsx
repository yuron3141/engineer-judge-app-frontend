import React, {useEffect, useState, useCallback} from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

import { styled } from '@mui/material/styles';
import {useTheme, useMediaQuery, Paper} from '@mui/material';
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import resultList from '../json/result.json';

export const Result = ({result,setResult}) =>{
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const url = window.location.href.replace("result", "");

    const BorderLinearProgressA = styled(LinearProgress)(({ theme }) => ({
        height: 15,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: colors[0] ? '#ffffff' : '#ea5550',
        },
        [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: colors[0] ? '#1e90ff' : '#ffffff',
        },
    }));
    const BorderLinearProgressB = styled(LinearProgress)(({ theme }) => ({
        height: 15,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: colors[1] ? '#ffffff' : '#37a34a',
        },
        [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: colors[1] ? '#f39800' : '#ffffff',
        },
    }));
    const BorderLinearProgressC = styled(LinearProgress)(({ theme }) => ({
        height: 15,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: colors[2] ? '#ffffff' : '#c70067',
        },
        [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: colors[2] ? '#00a3a7' : '#ffffff',
        },
    }));
    const BorderLinearProgressD = styled(LinearProgress)(({ theme }) => ({
        height: 15,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: '#ffffff',
        },
        [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: '#192f60',
        },
    }));


    //??????????????????
    const [ResultSentence, setResultSentence] = useState(resultList[2]);
    const [typeBool, setTypeBool] = useState(false);
    const [loadcheck, setLoadcheck] = useState(false);
    const [params, setParams] = useState(new Array(4).fill(0));
    const [colors, setColors] = useState(new Array(3).fill(false));
    const [typeName, setTypeName] = useState(ResultSentence.patternA);
    const [image, setImage] = useState(ResultSentence.img);

    const setResultA = (num) => {
        setResultSentence(
            resultList[num]
        )
    };
    const setFalse = () => {
        setLoadcheck(
            true
        );

    };
    const setBool = () => {
        setTypeBool(
            true
        );
    };
    const setName = (val) => {
        setTypeName(
            val.patternB
        );
    };
    const setImg = (val, bool) =>{
        if(!bool){
            setImage(
                val.img
            );
        }else{
            setImage(
                val.img2
            );
        }
    };
    const setColor = (array) => {
        setColors(
            new Array(3).fill(false).map((color, index) => (array[index] < 50 ? false : true))
        );
    };

    const main = useCallback(() => {
        //??????????????????????????????????????????????????????
        const output = result.calced;
        if(output[0] === 0 && output[1] === 0 && output[2] === 0 && output[3] === 0)
        {
            setFalse();
        }

        let vals = new Array(4).fill(0);
        for(let j=0; j<vals.length; j++){
            vals[j] = parseInt(output[j] / 0.4);
        }
        //??????????????????????????????
        //?????????(????????????????????????)
        if(vals[0] <= -25){
            //??????????????????
            if(vals[1] > 0){
                setResultA(0);
            //?????????????????????
            }else{
                setResultA(1);
            }
        }else{
            //??????????????????
            if(vals[3] <= -20){
                setResultA(2);
            //?????????????????????????????????
            }else if(vals[1] < 0){
                setResultA(4);
            //?????????????????????
            }else if(vals[1] >= 0){
                setResultA(3);
            }else{
                setResultA(2);
            }

        }
        if(vals[2] < 0){
            setBool();
            setName(ResultSentence);
            setImg(ResultSentence, false);
        }else{
            setImg(ResultSentence, true);
        }

        let outparams = new Array(4).fill(50);
        for(let i=0; i<outparams.length; i++){
            outparams[i] = outparams[i] + parseInt(result.calced[i] * 2.5);
        }

        setParams(
            outparams
        );
        
        setColor(outparams);

    }, [result.calced, ResultSentence]);

    useEffect(() => {
        main();        
    }, [main]);

    return (
        <>
            {loadcheck ? (
                <>
                    <HelmetProvider>
                        <Helmet>
                            <title>?????????????????????????????????</title>
                            <meta
                                name="description"
                                content="?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                            />
                            <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta>
                            <head prefix="og: http://ogp.me/ns#" />
                            <meta property="og:type" content="website" />
                            <meta property="og:title" content="??????????????????????????????s???" />
                            <meta property="og:description" content="" />
                            <meta property="og:site_name" content="IT???????????????????????????" />
                        </Helmet>
                    </HelmetProvider>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</Alert>
                    </Stack>
                    <div style={{height: '720px', textAlign: 'center', paddingTop: 40}}>
                        <Typography variant="h5">???????????????????????????????????????????????????????????????????????????????????????</Typography>
                        <Typography variant="body2">??????????????????????????????????????????????????????????????????????????????????????????????????????????????????</Typography>
                        <Typography variant="body2">????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</Typography>
                        <Button to="/" component={Link} variant="contained" style={{marginTop: 60}}>?????????????????????</Button>
                    </div>
                </>
            ) : (
                <>
                <HelmetProvider>
                    <Helmet>
                        <title>????????????</title>
                        <meta
                            name="description"
                            content="IT??????????????????????????????????????????"
                        />
                        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta>
                        <head prefix="og: http://ogp.me/ns#" />
                        <meta property="og:url" content={url} />
                        <meta property="og:type" content="website" />
                        <meta property="og:title" content={"????????????" + ResultSentence.type + "??????????????????" + typeName + "???????????????"} />
                        <meta property="og:description" content={ResultSentence.chars1 + ResultSentence.chars2 + ResultSentence.chars3 + ResultSentence.chars4} />
                        <meta property="og:site_name" content="IT???????????????????????????" />
                        <meta property="og:image" content={`${process.env.PUBLIC_URL}/imgs/${image}`} />
                    </Helmet>
                </HelmetProvider>
                <Typography variant={ isMobile ? 'h5' : 'h4'} fontWeight={"bold"} align="center" style={{marginTop: "50px"}}>
                    ????????????{ResultSentence.type}??????????????????
                </Typography>
                <Typography variant={ isMobile ? 'h5' : 'h4'} fontWeight={"bold"} align="center" style={{marginBottom: "20px"}}>
                    {typeBool ? ResultSentence.patternA : ResultSentence.patternB}???????????????
                </Typography>
                <svg viewBox="0 0 1920 250" preserveAspectRatio="none" className="background">
                    <polygon fill="#e7dfea" points="1920 823 0 823 0 0 396 101 835 31 1574 149 1920 17 1920 823"></polygon>
                </svg>
                <div style={{backgroundColor: '#e7dfea',position: 'relative', paddingBottom: '100px', marginTop: '-10px'}}>
                    <div style={{textAlign: "center"}}>
                        <Box sx={{ flexGrow: 1 }}  style={isMobile ? {display: 'block'} : {display: 'inline-block', width: '650px'}}>
                            <Grid container direction={isMobile ? 'column-reverse' : 'row'} spacing={{ xs: 4, md: 8 }} columns={{ xs: 4, sm: 12 }} >
                                <Grid item xs={4} sm={7} sx={isMobile ? { m: 1} : {}}>
                                    <Typography variant="body1" align="left">
                                        {ResultSentence.chars1}
                                    </Typography>
                                    <Typography variant="body1" align="left">
                                        {ResultSentence.chars2}
                                    </Typography>
                                    <Typography variant="body1" align="left">
                                        {ResultSentence.chars3}
                                    </Typography>
                                    <Typography variant="body1" align="left">
                                        {ResultSentence.chars4}
                                    </Typography>
                                    <Typography variant="body1" align="left">
                                        {typeBool ? ResultSentence.charsA : ResultSentence.charsB}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={5}>
                                    <Box
                                        component="img"
                                        sx={{
                                        maxHeight: { xs: 233},
                                        maxWidth: { xs: 350},
                                        }}
                                        alt="??????????????????"
                                        src={`${process.env.PUBLIC_URL}/imgs/${image}`}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={{ xs: 4, md: 8 }} columns={{ xs: 4, sm: 12 }}>
                                <Grid item xs={4} sm={12} md={13} sx={{m: 1}}>
                                    <Paper elevation={0} sx={{p: 1}}>
                                        <Typography variant='h6' align="left" style={{paddingLeft: '10px'}}>??????</Typography>
                                        { ResultSentence.features.map((feature, index)=>{
                                            return (
                                                <Typography variant="body1" align="left" key={index}>
                                                    ???{feature}
                                                </Typography>
                                            );
                                        })}
                                    </Paper>
                                </Grid>
                                <Grid item xs={4} sm={12} md={13} sx={{m: 1}}>
                                        <Typography variant='h6' style={{paddingLeft: '10px'}}>??????</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">{params[0]}%</Typography>
                                            </Box>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <BorderLinearProgressA variant="determinate" value={params[0]} />
                                            </Box>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">{100 - params[0]}%</Typography>
                                            </Box>
                                        </Box>
                                        <div className="decisionmobile">
                                            <div style={{color: '#1e90ff', fontWeight: 'bold'}}>???????????????????????????</div> 
                                            <div style={{color: '#ea5550', fontWeight: 'bold'}}>???????????????????????????</div>
                                        </div>
                                </Grid>
                                <Grid item xs={4} sm={12} md={13} sx={{m: 1}}>
                                        <Typography variant='h6' style={{paddingLeft: '10px'}}>????????????</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">{params[1]}%</Typography>
                                            </Box>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <BorderLinearProgressB variant="determinate" value={params[1]} />
                                            </Box>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">{100 - params[1]}%</Typography>
                                            </Box>
                                        </Box>
                                        <div className="decisionmobile">
                                            <div style={{color: '#f39800', fontWeight: 'bold'}}>???????????????</div> 
                                            <div style={{color: '#37a34a', fontWeight: 'bold'}}>???????????????</div>
                                        </div>
                                </Grid>
                                <Grid item xs={4} sm={12} md={13} sx={{m: 1}}>
                                        <Typography variant='h6' style={{paddingLeft: '10px'}}>??????</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">{params[2]}%</Typography>
                                            </Box>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <BorderLinearProgressC variant="determinate" value={params[2]} />
                                            </Box>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">{100 - params[2]}%</Typography>
                                            </Box>
                                        </Box>
                                        <div className="decisionmobile">
                                            <div style={{color: '#00a3a7', fontWeight: 'bold'}}>???????????????</div> 
                                            <div style={{color: '#c70067', fontWeight: 'bold'}}>???????????????</div>
                                        </div>
                                </Grid>
                                <Grid item xs={4} sm={12} md={13} sx={{m: 1}}>
                                        <Typography variant='h6' style={{paddingLeft: '10px'}}>???????????????</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">   </Typography>
                                            </Box>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <BorderLinearProgressD variant="determinate" value={params[3]} />
                                            </Box>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">{params[3]}%</Typography>
                                            </Box>
                                        </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Typography variant="h5" color="text.secondary" style={{marginTop: '50px'}}>????????????????????????</Typography>
                        <div style={{fontSize: '40px'}}>
                            <div style={{marginTop: '30px', display: "inline-block"}}>
                                <a target="_blank" rel="noopener noreferrer" style={{color: '#ffffff', textDecoration: "none", margin: '5px', borderRadius: '50%', backgroundColor: '#00acee', padding: '15px', paddingLeft: '18px',paddingRight: '18px'}} href={'http://twitter.com/share?text=????????????'+ ResultSentence.type + '??????????????????' + typeName + '??????????????????IT???????????????????????????&url=' + url}>
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                            </div>
                            <div style={{display: "inline-block"}}>
                                <a target="_blank" rel="noopener noreferrer" style={{color: '#ffffff', textDecoration: "none",margin: '5px', borderRadius: '50%', backgroundColor: '#3b5998', padding: '15px', paddingLeft: '18px',paddingRight: '18px'}} href={'http://www.facebook.com/sharer.php?u='+ url}>
                                    <i className="fa-brands fa-facebook"></i>
                                </a>
                            </div>
                            <div style={{display: "inline-block"}}>
                                <a target="_blank" rel="noopener noreferrer" style={{color: '#ffffff', textDecoration: "none",margin: '5px', borderRadius: '50%', backgroundColor: '#03d50f', padding: '15px', paddingLeft: '20px',paddingRight: '20px'}} href={'http://line.me/R/msg/text/?????????????'+ ResultSentence.type + '??????????????????' + typeName + '??????????????????IT???????????????????????????%20' + url} >
                                    <i className="fa-brands fa-line"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )}         
        </>
    )
}
