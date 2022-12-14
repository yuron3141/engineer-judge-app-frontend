import React, {useEffect, useState} from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSearchParams, useNavigate } from "react-router-dom";

import { styled } from '@mui/material/styles';
import {useTheme, useMediaQuery, Paper} from '@mui/material';
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import list from '../json/result.json';

export const Result = () =>{
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    //バーの色を調整する関数群
    const BorderLinearProgressA = styled(LinearProgress)(({ theme }) => ({
        height: 15,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: colors[0] ? '#ffffff' : '#1e90ff',
        },
        [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: colors[0] ? '#ea5550' : '#ffffff',
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
            backgroundColor: colors[3] ? '#ffffff' : '#778899',
        },
        [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: colors[3] ? '#192f60' : '#ffffff',
        },
    }));

    //クエリパラメータから値を得る
    const [queryParams] = useSearchParams();
    const score_a = queryParams.get("scorea");
    const score_b = queryParams.get("scoreb");
    const score_c = queryParams.get("scorec");
    const score_d = queryParams.get("scored");

    const directurl = window.location.origin + window.location.pathname;

    //結果制御処理
    const [loadcheck, setLoadcheck] = useState(false); //クエリパラメータが指定されているかどうか判断に使用
    const [params, setParams] = useState(new Array(4).fill(0));
    const [colors, setColors] = useState(new Array(4).fill(false));
    const [yourresult, setYourresult] = useState({img: "", style: "", type: "", discription: new Array(4).fill(""), features: new Array(4).fill("")});

    let navigate = useNavigate();
    useEffect(() => {
        //バーの色向きを調整する関数
        const barcolorEdit = (array) => {
            setColors(
                new Array(4).fill(false).map((color, index) => (array[index] < 50 ? false : true))
            );
        };

        //クエリの調査と計算および結果の挿入処理
        function searchResult () {
            //クエリパラメータが指定されていない場合
            if(score_a === null || score_b === null || score_c === null || score_d === null){
                console.log("起動しました");
                setLoadcheck(true);

                navigate('/start');

            //スコアの計算および情報の更新
            }else{
                setYourresult(() =>{

                    if(score_a > 100  && score_b > 100 && score_c > 100 && score_d > 100){
                        return {...yourresult, img: list[0].img, style: list[0].style, type: list[0].type, discription: list[0].discription, features: list[0].features};
                    }else if(score_a > 100  && score_b > 100 && score_c < 100 && score_d > 100){
                        return {...yourresult, img: list[2].img, style: list[2].style, type: list[2].type, discription: list[2].discription, features: list[2].features};
                    }else if(score_a > 100 && score_b < 100 && score_c > 100 && score_d > 100){
                        return {...yourresult, img: list[1].img, style: list[1].style, type: list[1].type, discription: list[1].discription, features: list[1].features};
                    }else if(score_a > 100 && score_b < 100 && score_c < 100 && score_d > 100){
                        return {...yourresult, img: list[3].img, style: list[3].style, type: list[3].type, discription: list[3].discription, features: list[3].features};
                    }else if(score_a < 100 && score_b > 100 && score_c > 100 && score_d > 100){
                        return {...yourresult, img: list[7].img, style: list[7].style, type: list[7].type, discription: list[7].discription, features: list[7].features};
                    }else if(score_a < 100 && score_b > 100 && score_c < 100 && score_d > 100){
                        return {...yourresult, img: list[6].img, style: list[6].style, type: list[6].type, discription: list[6].discription, features: list[6].features};
                    }else if(score_a < 100 && score_b < 100 && score_c > 100 && score_d > 100){
                        return {...yourresult, img: list[5].img, style: list[5].style, type: list[5].type, discription: list[5].discription, features: list[5].features};
                    }else if(score_a < 100 && score_b < 100 && score_c < 100 && score_d > 100 ){
                        return {...yourresult, img: list[4].img, style: list[4].style, type: list[4].type, discription: list[4].discription, features: list[4].features};
                    }else if(score_c < 100 ){
                        return {...yourresult, img: list[8].img, style: list[8].style, type: list[8].type, discription: list[8].discription, features: list[8].features};
                    }else if(score_c > 100 ){
                        return {...yourresult, img: list[9].img, style: list[9].style, type: list[9].type, discription: list[9].discription, features: list[9].features};
                    }

                })
            }

            setParams(() =>{
                const calc_scores = [score_a, score_b, score_c, score_d].map((index)=>(index/2));
                barcolorEdit(calc_scores);

                return calc_scores;
            });

        };
        searchResult();

    }, []);

    return (
        <>
            {!loadcheck && (
                <>
                <HelmetProvider>
                    <Helmet>
                        <title>診断結果 | ITエンジニア性格診断テスト</title>
                        <meta
                            name="description"
                            content="ITエンジニア性格診断の結果です"
                        />
                        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta>
                        <head prefix="og: http://ogp.me/ns#" />
                        <meta property="og:url" content={directurl} />
                        <meta property="og:type" content="website" />
                        <meta property="og:title" content={"あなたは" + yourresult.style + "型エンジニア" + yourresult.type + "タイプです"} />
                        <meta property="og:description" content={yourresult.discription[0] + yourresult.discription[1] + yourresult.discription[2] + yourresult.discription[3]} />
                        <meta property="og:site_name" content="ITエンジニア性格診断テスト" />
                        <meta property="og:image" content={`${process.env.PUBLIC_URL}/imgs/${yourresult.img}`} />
                    </Helmet>
                </HelmetProvider>
                <Typography variant={ isMobile ? 'h5' : 'h4'} fontWeight={"bold"} align="center" style={{marginTop: "50px"}}>
                    あなたは{yourresult.style}型エンジニア
                </Typography>
                <Typography variant={ isMobile ? 'h5' : 'h4'} fontWeight={"bold"} align="center" style={{marginBottom: "20px"}}>
                    {yourresult.type}タイプです
                </Typography>
                <svg viewBox="0 0 1920 250" preserveAspectRatio="none" className="background">
                    <polygon fill="#e7dfea" points="1920 823 0 823 0 0 396 101 835 31 1574 149 1920 17 1920 823"></polygon>
                </svg>
                <div style={{backgroundColor: '#e7dfea',position: 'relative', paddingBottom: '100px', marginTop: '-10px'}}>
                    <div style={{textAlign: "center"}}>
                        <Box sx={{ flexGrow: 1 }}  style={isMobile ? {display: 'block'} : {display: 'inline-block', width: '650px'}}>
                            <Grid container direction={isMobile ? 'column-reverse' : 'row'} spacing={{ xs: 4, md: 8 }} columns={{ xs: 4, sm: 12 }} >
                                <Grid item xs={4} sm={7} sx={isMobile ? { m: 1} : {}}>
                                    { yourresult.discription.map((disp, index)=>{
                                            return (
                                                <Typography variant="body1" align="left" key={index}>
                                                    {disp}
                                                </Typography>
                                            );
                                    })}
                                </Grid>
                                <Grid item xs={4} sm={5}>
                                    <Box
                                        component="img"
                                        sx={{
                                        maxHeight: { xs: 233},
                                        maxWidth: { xs: 350},
                                        }}
                                        alt="イメージ画像"
                                        src={`${process.env.PUBLIC_URL}/imgs/${yourresult.img}`}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={{ xs: 4, md: 8 }} columns={{ xs: 4, sm: 12 }}>
                                <Grid item xs={4} sm={12} md={13} sx={{m: 1}}>
                                    <Paper elevation={0} sx={{p: 1}}>
                                        <Typography variant='h6' align="left" style={{paddingLeft: '10px'}}>特徴</Typography>
                                        { yourresult.features.map((feature, index)=>{
                                            return (
                                                <Typography variant="body1" align="left" key={index}>
                                                    ・{feature}
                                                </Typography>
                                            );
                                        })}
                                    </Paper>
                                </Grid>
                                <Grid item xs={4} sm={12} md={13} sx={{m: 1}}>
                                        <Typography variant='h6' style={{paddingLeft: '10px'}}>志向</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ minWidth: 50 }}>
                                                <Typography variant="body2" color="text.secondary">{params[0]}%</Typography>
                                            </Box>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <BorderLinearProgressA variant="determinate" value={params[0]} />
                                            </Box>
                                            <Box sx={{ minWidth: 50 }}>
                                                <Typography variant="body2" color="text.secondary">{100 - params[0]}%</Typography>
                                            </Box>
                                        </Box>
                                        <div className="decisionmobile">
                                            <div style={{color: '#ea5550', fontWeight: 'bold'}}>社会・プロジェクト</div>
                                            <div style={{color: '#1e90ff', fontWeight: 'bold'}}>コード・プロダクト</div> 
                                        </div>
                                </Grid>
                                <Grid item xs={4} sm={12} md={13} sx={{m: 1}}>
                                        <Typography variant='h6' style={{paddingLeft: '10px'}}>こだわり</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ minWidth: 50 }}>
                                                <Typography variant="body2" color="text.secondary">{params[1]}%</Typography>
                                            </Box>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <BorderLinearProgressB variant="determinate" value={params[1]} />
                                            </Box>
                                            <Box sx={{ minWidth: 50 }}>
                                                <Typography variant="body2" color="text.secondary">{100 - params[1]}%</Typography>
                                            </Box>
                                        </Box>
                                        <div className="decisionmobile">
                                            <div style={{color: '#f39800', fontWeight: 'bold'}}>どう作るか</div> 
                                            <div style={{color: '#37a34a', fontWeight: 'bold'}}>何を作るか</div>
                                        </div>
                                </Grid>
                                <Grid item xs={4} sm={12} md={13} sx={{m: 1}}>
                                        <Typography variant='h6' style={{paddingLeft: '10px'}}>知識</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ minWidth: 50 }}>
                                                <Typography variant="body2" color="text.secondary">{params[2]}%</Typography>
                                            </Box>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <BorderLinearProgressC variant="determinate" value={params[2]} />
                                            </Box>
                                            <Box sx={{ minWidth: 50 }}>
                                                <Typography variant="body2" color="text.secondary">{100 - params[2]}%</Typography>
                                            </Box>
                                        </Box>
                                        <div className="decisionmobile">
                                            <div style={{color: '#00a3a7', fontWeight: 'bold'}}>スペシャル</div> 
                                            <div style={{color: '#c70067', fontWeight: 'bold'}}>ジェネラル</div>
                                        </div>
                                </Grid>
                                <Grid item xs={4} sm={12} md={13} sx={{m: 1}}>
                                        <Typography variant='h6' style={{paddingLeft: '10px'}}>技術意識</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ minWidth: 50 }}>
                                                <Typography variant="body2" color="text.secondary">{params[3]}%</Typography>
                                            </Box>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <BorderLinearProgressD variant="determinate" value={params[3]} />
                                            </Box>
                                            <Box sx={{ minWidth: 50 }}>
                                                <Typography variant="body2" color="text.secondary">{100 - params[3]}%</Typography>
                                            </Box>
                                        </Box>
                                        <div className="decisionmobile">
                                            <div style={{color: '#192f60', fontWeight: 'bold'}}>モダン</div> 
                                            <div style={{color: '#778899', fontWeight: 'bold'}}>レガシー</div>
                                        </div>
                                </Grid>
                            </Grid>
                        </Box>
                        <Typography variant="h5" color="text.secondary" style={{marginTop: '50px'}}>結果をシェアする</Typography>
                        <div style={{fontSize: '40px'}}>
                            <div style={{marginTop: '30px', display: "inline-block"}}>
                                <a target="_blank" rel="noopener noreferrer" style={{color: '#ffffff', textDecoration: "none", margin: '5px', borderRadius: '50%', backgroundColor: '#00acee', padding: '15px', paddingLeft: '18px',paddingRight: '18px'}} href={'http://twitter.com/share?text=あなたは'+ yourresult.style + '型エンジニア' + yourresult.type + 'タイプです：ITエンジニア性格診断&url=' + directurl}>
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                            </div>
                            <div style={{display: "inline-block"}}>
                                <a target="_blank" rel="noopener noreferrer" style={{color: '#ffffff', textDecoration: "none",margin: '5px', borderRadius: '50%', backgroundColor: '#3b5998', padding: '15px', paddingLeft: '18px',paddingRight: '18px'}} href={'http://www.facebook.com/sharer.php?u='+ directurl}>
                                    <i className="fa-brands fa-facebook"></i>
                                </a>
                            </div>
                            <div style={{display: "inline-block"}}>
                                <a target="_blank" rel="noopener noreferrer" style={{color: '#ffffff', textDecoration: "none",margin: '5px', borderRadius: '50%', backgroundColor: '#03d50f', padding: '15px', paddingLeft: '20px',paddingRight: '20px'}} href={'http://line.me/R/msg/text/?あなたは'+ yourresult.style + '型エンジニア' + yourresult.type + 'タイプです：ITエンジニア性格診断%20' + directurl} >
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
