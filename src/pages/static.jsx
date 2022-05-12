import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from 'axios';

import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import  Button  from '@mui/material/Button';
import {useTheme, useMediaQuery} from '@mui/material';

import { apiURL } from '../config'

ChartJS.register(ArcElement, Tooltip, Legend);


export const Static = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [datalist, setDatalist] = useState({
        sum: 0,
        list: {
            A: 0,
            B: 0,
            C: 0,
            D: 0,
            E: 0,
            F: 0,
            G: 0,
            H: 0,
            I: 0,
            J: 0
        }
    });

    useEffect(() => { 
        axios.get(apiURL+"/api/v1/datas").then(
            (response) => {
                setDatalist(response.data);
            }
        ).catch(err=>{
            console.log("error", err);
        })

    }, []);

    const graphData = {
        labels: ["事業者型", "社会指向型", "職業人型", "技術職人型", "モノづくり楽しみ型"],
        datasets: [{
                label: "# of Votes",
                data: [datalist.list.A+datalist.list.B, datalist.list.C+datalist.list.D, datalist.list.E+datalist.list.F, datalist.list.G+datalist.list.H, datalist.list.I+datalist.list.J],
                backgroundColor: [
                '#e7dfea',
                '#ffc6e2',
                '#f9eed7',
                '#d9eaf0',
                '#d6ece3'
                ]
        }]
    }
    const options = {
        plugins: {
            legend: {
                display: true,
                position: "top"
            }
        }
    };

    function createData(id, name, sum) {
        return {id, name, sum};
    }
    const rows = [
        createData(1, '事業者タイプ', datalist.list.A),
        createData(2, 'イノベータタイプ',  datalist.list.B),
        createData(3, 'インフルエンサタイプ',  datalist.list.C),
        createData(4, '発信型クリエイタタイプ',  datalist.list.D),
        createData(5, 'サラリーマンタイプ',  datalist.list.E),
        createData(6, 'プロフェッショナルタイプ',  datalist.list.F),
        createData(7, '技術好きタイプ',  datalist.list.G),
        createData(8, '科学者タイプ',  datalist.list.H),
        createData(9, 'クリエイタタイプ',  datalist.list.I),
        createData(10, 'クラフトマンタイプ',  datalist.list.J)
    ];

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>統計データ</title>
                    <meta
                        name="description"
                        content="ITエンジニア性格診断の統計データです"
                    />
                    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta>
                    <head prefix="og: http://ogp.me/ns#" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="統計データ" />
                    <meta property="og:description" content="" />
                    <meta property="og:site_name" content="ITエンジニア性格診断" />
                </Helmet>
            </HelmetProvider>
            { datalist.sum !== 0 && (
            <>
                <div style={{position: 'relative', paddingBottom: '100px', marginTop: '-10px'}}>
                    <div style={{textAlign: "center", marginBottom: "20px"}}>
                        <div>
                            <Typography variant={ isMobile ? 'h4' : 'h3'} fontWeight={"bold"} align="center" style={{paddingTop: "70px"}}>
                                統計データ
                            </Typography>
                            <Typography variant="body2" align="center" style={{marginBottom: "10px"}}>
                                合計診断受験者数:{datalist.sum}人
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}  style={isMobile ? {display: 'block'} : {display: 'inline-block', width: '900px'}}>
                                <Grid container direction={isMobile ? 'column' : 'row'} spacing={0} columns={{ xs: 4, sm: 12 }} alignItems="center">
                                    <Grid item xs={4} sm={6} sx={isMobile ? { m: 1} : {}}>
                                        <Typography variant={ isMobile ? 'h6' : 'h5'} fontWeight={"bold"} align="center">
                                            円グラフ
                                        </Typography>
                                        <div className={isMobile ? "mobilechart" : "chart"} style={{marginTop: 40}}>
                                            <Pie data={graphData} options={options}/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} sm={6}>
                                        <Typography variant={ isMobile ? 'h6' : 'h5'} fontWeight={"bold"} align="center">
                                            詳細
                                        </Typography>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 100 }} aria-label="simple table">
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell>No</TableCell>
                                                    <TableCell>エンジニアタイプ</TableCell>
                                                    <TableCell>人数</TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                    <TableCell component="th" scope="row">
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>{row.sum}</TableCell>
                                                    </TableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </div>
                </div>
            </>
            )} 
            { datalist.sum === 0 && (
            <>
                <div style={{height: '720px', textAlign: 'center', paddingTop: 40}}>
                    <Typography variant="h4">このページは現在準備中です</Typography>
                    <Typography variant="body2">しばらく時間をあけてからアクセスしてください。</Typography>
                    <Button to="/" component={Link} variant="contained" style={{marginTop: 60}}>トップに戻る</Button>
                </div>
            </>
            )} 
        </> 
    )
}
