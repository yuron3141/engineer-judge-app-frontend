import React from 'react'
import { Helmet, HelmetProvider } from "react-helmet-async"

import {useTheme, useMediaQuery} from '@mui/material';
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const Info = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>サイト情報 | ITエンジニア性格診断テスト</title>
                    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta>
                    <head prefix="og: http://ogp.me/ns#" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="サイト情報" />
                    <meta property="og:description" content="" />
                    <meta property="og:site_name" content="ITエンジニア性格診断テスト" />
                </Helmet>
            </HelmetProvider>
            <Typography variant={ isMobile ? 'h5' : 'h4'} fontWeight={"bold"} align="center" style={{marginTop: "50px", marginBottom: "20px"}}>
                サイト情報
            </Typography>
            <svg viewBox="0 0 1920 250" preserveAspectRatio="none" className="background">
                <polygon fill="#d9eaf0" points="1920 823 0 823 0 0 396 101 835 31 1574 149 1920 17 1920 823"></polygon>
            </svg>
            <div style={{backgroundColor: '#d9eaf0',position: 'relative', paddingBottom: '100px', marginTop: '-22px'}}>
                <Grid container alignItems='center' justifyContent='center' direction="column">
                    <Grid item xs={12}>
                        <Card style={isMobile ? { background: '#f0f8ff', width: '350px'} : { background: '#f0f8ff', display: 'inline-block', width: '480px'}} sx={isMobile ? { mt: 2 } : { mt: 4 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} variant="h6" style={{textAlign: "center"}}>
                                    <i className="fa-solid fa-circle-exclamation"></i>サイト更新情報
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary" padding="10px">
                                    2022/5/11　サイト公開<br/>
                                    2022/12/15　サイト更新(質問構成変更・UI改良等)
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card style={isMobile ? { background: '#fff7ef', width: '350px'} : { background: '#fff7ef', display: 'inline-block', width: '480px'}} sx={isMobile ? { mt: 2 } : { mt: 4 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} variant="h6" style={{textAlign: "center"}}>
                                    <i className="fa-solid fa-user"></i>サイト運営者からの挨拶
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary" style={{paddingTop: 20}}>
                                    当サイトをご利用いただきありがとうございます。<br />
                                    何か不具合や要望等がございましたら「ホームページのお問い合わせ」よりご連絡ください。<br />
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} variant="h6" style={{textAlign: "center"}}>
                                    <i className="fa-brands fa-twitter"></i><a target="_blank" rel="noopener noreferrer" href='https://twitter.com/Bluesky_3141'>Twitter</a>
                                    <span>・</span>
                                    <i className="fa-solid fa-house"></i><a target="_blank" rel="noopener noreferrer" href='https://yuuronacademy.com/'>ホームページ</a>
                                </Typography>
                            </CardContent>
                            
                        </Card>
                    </Grid>                   
                </Grid>
                <div style={{height: '150px'}}></div>
            </div>
        </>
    )
}