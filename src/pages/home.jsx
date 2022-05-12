import React from 'react'
import { Helmet, HelmetProvider } from "react-helmet-async"
import {useTheme, useMediaQuery} from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import {Test} from '../components/Test';


export const Home = ({result,setResult})=>{
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const url = window.location.href;

    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>ITエンジニア性格診断</title>
                    <meta
                        name="description"
                        content="このITエンジニア性格診断は独自の分析と質問構成に基づいて作成しています。診断結果は繰り返しトライすることで違う結果になることがあります。これは性格・タイプの「揺らぎ」や「重なり性」を示しています。自分のエンジニアとしての考え方や特徴の傾向を知ることができますのでぜひやってみてください。"
                    />
                    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta>
                    <head prefix="og: http://ogp.me/ns#" />
                    <meta property="og:url" content={url} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="ITエンジニア性格診断：トップ" />
                    <meta property="og:description" content="このITエンジニア性格診断は独自の分析と質問構成に基づいて作成しています。診断結果は繰り返しトライすることで違う結果になることがあります。これは性格・タイプの「揺らぎ」や「重なり性」を示しています。自分のエンジニアとしての考え方や特徴の傾向を知ることができますのでぜひやってみてください。" />
                    <meta property="og:site_name" content="ITエンジニア性格診断" />
                </Helmet>
            </HelmetProvider>
            <Typography variant={ isMobile ? 'h4' : 'h3'} sx={{ mt: 6}} fontWeight={"bold"} align="center">ITエンジニア性格診断</Typography>
            <div style={isMobile ? {textAlign: "center"} : {textAlign: "center", marginTop: "4px"}}>
                <Typography variant="body2" sx={{ mt: 4 }}>
                    このITエンジニア性格診断は、独自の分析と質問構成に基づいて作成しています。
                </Typography>
                <Typography variant='body2' sx={isMobile ? {} : { mt: 2 }}>
                    診断結果は繰り返しトライすることで違う結果になることがあります。
                </Typography>
                <Typography variant='body2' sx={isMobile ? {} : { mt: 2 }}>
                    これは性格・タイプの「揺らぎ」や「重なり性」を示しています。
                </Typography>
                <Typography variant='body2' sx={isMobile ? {} : { mt: 2 }}>
                    自分のエンジニアとしての考え方や特徴の傾向を知ることができますのでぜひやってみてください。
                </Typography>
                <Card style={isMobile ? { background: '#f0f8ff'} : { background: '#f0f8ff', display: 'inline-block', width: '480px'}} sx={isMobile ? { mt: 2 } : { mt: 4 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <i className="fa-solid fa-circle-check"></i>全部で40問あります。
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} variant="body2">
                        <i className="fa-solid fa-circle-check"></i>それぞれについて「同意する」～「同意しない」の中から、現在のあなたに最も近いものを1つだけ選んでチェックしてください。
                        </Typography>
                        <Typography variant="body2">
                        <i className="fa-solid fa-circle-check"></i>できるだけ真ん中の選択は避けて、必ず全問に回答してください。
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                    fill="#5c6bc0"
                    fillOpacity="1.0"
                    d="M0,256L48,266.7C96,277,192,299,288,293.3C384,288,480,256,576,234.7C672,213,768,203,864,213.3C960,224,1056,256,1152,261.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
            <div style={{backgroundColor: '#5c6bc0',paddingBottom: '100px',position: 'relative', marginTop: '-10px'}}>
                <Test result = {result} setResult = {setResult}/>
            </div>
        </div>
    )
}
