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
import CircularProgress from '@mui/material/CircularProgress';
import  Button  from '@mui/material/Button';
import {useTheme, useMediaQuery} from '@mui/material';

import { apiURL } from '../config'

ChartJS.register(ArcElement, Tooltip, Legend);


export const Static = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [isLoading, setIsloading] = useState(true);//ロード中ページの状態
    const [fetchFalse, setFetchFalse] = useState(false); //データベースから情報取得の失敗
    const [specific, setSpecific] = useState(0); //年代指定用変数
    const [datalist, setDatalist] = useState( //APIで受け取ったデータ保存用
        {
            sum: 0, //総計
            datas:[
                [10, 9, 8, 7, 6, 21, 4, 3, 2, 1], //全年代
                [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], //10代
                [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], //20代
                [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]  //それ以上
            ]
        }
    );

    //テーブル保存用変数
    const [tablelist, setTablelist] = useState([
            {colorid: "#e7dfea", name: '事業者タイプ', sum: 10},
            {colorid: "#e7dfea", name: 'イノベータタイプ', sum: 9},
            {colorid: "#ffdbed", name: 'インフルエンサタイプ', sum: 8},
            {colorid: "#ffdbed", name: '発信型クリエイタタイプ', sum: 7},
            {colorid: "#d9eaf0", name: '技術好きタイプ', sum: 6},
            {colorid: "#d9eaf0", name: '科学者タイプ', sum: 5},
            {colorid: "#f9eed7", name: 'クリエイタタイプ', sum: 4},
            {colorid: "#f9eed7", name: 'クラフトマンタイプ', sum: 3},
            {colorid: "#d6ece3", name: 'サラリーマンタイプ', sum: 2},
            {colorid: "#d6ece3", name: 'プロフェッショナルタイプ', sum: 1}
    ]);



    //char.jsへの表示用データ構造
    const [graphdata, setGraphdata] = useState({
            labels: ["事業者型", "社会指向型", "技術職人型", "モノづくり楽しみ型", "職業人型"],
            datasets: [{
                    label: "# of Votes",
                    data: [9, 21, 56, 23, 67],
                    backgroundColor: [
                    '#e7dfea',
                    '#ffdbed',
                    '#d9eaf0',
                    '#f9eed7',
                    '#d6ece3'
                    ]
            }]
    });
    const options = {
        plugins: {
            legend: {
                display: true,
                position: "top"
            }
        },
        responsive: true,
    };



    //初回レンダリング後のみ実行
    useEffect(() => { 
        const fetchData = async () => {
            try {
                const res = await axios.get(apiURL+`/api/v1/statics`);
                const items = res.data;

                setDatalist(items);
                setIsloading(false);

            } catch (error){
                const {status,statusText} = error.response;
                console.log(`Error! HTTP Status: ${status} ${statusText}`);

                setFetchFalse(true);
            }
        };
        fetchData();

    }, []);

    //再レンダリングのたびに実行
    useEffect(() => { 

        //char.jsへの表示用データ構造のデータを更新
        let copy = JSON.parse(JSON.stringify(graphdata)); // 複製
        copy.datasets[0].data = [
            datalist.datas[specific][0]+datalist.datas[specific][1],
            datalist.datas[specific][2]+datalist.datas[specific][3],
            datalist.datas[specific][4]+datalist.datas[specific][5],
            datalist.datas[specific][6]+datalist.datas[specific][7],
            datalist.datas[specific][8]+datalist.datas[specific][9]
        ];
        setGraphdata(copy);

        //テーブル保存用変数のデータを更新
        let copy2 = JSON.parse(JSON.stringify(tablelist)); // 複製
        copy2.map((data, key)=>({...data, sum: datalist.datas[specific][key]}));
        setTablelist(copy2)

        //console.log(tablelist);

    }, [specific]);

    //関数コンポーネント
    function Scene(){
        if(!isLoading && !fetchFalse){
            return (
                <>
                <div style={{position: 'relative', paddingBottom: '100px', marginTop: '-10px'}}>
                    <div style={{textAlign: "center", marginBottom: "20px"}}>
                        <div>
                            <Typography variant={ isMobile ? 'h4' : 'h3'} fontWeight={"bold"} align="center" style={{paddingTop: "70px"}}>
                                統計データ
                            </Typography>
                            <Typography variant="h6" align="center" style={{marginBottom: "10px"}}>
                                総診断受験者数:{datalist.sum}人
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}  style={isMobile ? {display: 'block'} : {display: 'inline-block', width: '900px'}}>
                                <Grid container direction={isMobile ? 'column' : 'row'} spacing={0} columns={{ xs: 4, sm: 12 }} alignItems="center">
                                    <Grid item xs={4} sm={6} sx={isMobile ? { m: 1} : { m: 0}} style={{paddingTop: 20, margin: 0}}>
                                        <Typography variant={ isMobile ? 'h6' : 'h5'} fontWeight={"bold"} align="center">
                                            グラフ
                                        </Typography>
                                        <div className={isMobile ? "mobilechart" : "chart"} style={{marginTop: 20}}>
                                            <Pie data={graphdata} options={options} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} sm={6} style={{paddingTop: 10, margin: 0}}>
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
                                                {tablelist.map((row, key) => (
                                                    <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                    <TableCell component="th" scope="row" style={{backgroundColor: row.colorid}}>
                                                        {key+1}
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
            );
        }else if(isLoading && fetchFalse){
            return (
                <>
                    <div style={{height: '720px', textAlign: 'center', paddingTop: 40}}>
                        <section style={{paddingTop: 100}} >
                            <Typography variant="h5">このページは現在準備中です</Typography>
                            <Typography variant="body2">しばらく時間をあけてからアクセスしてください。</Typography>
                            <Button to="/" component={Link} variant="contained" style={{marginTop: 60}}>トップに戻る</Button>
                        </section>
                    </div>
                </>
            );
        }else{
            return (
                <>
                    <div style={{height: '720px', textAlign: 'center', paddingTop: 40}}>
                        <section style={{paddingTop: 100}} >
                            <CircularProgress size="10rem" />
                            <p className="text-center mt-3">読み込み中</p>
                        </section>
                    </div>
                </>
            );
        }
    }




    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>統計データ | ITエンジニア性格診断テスト</title>
                    <meta
                        name="description"
                        content="ITエンジニア性格診断の統計データです"
                    />
                    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta>
                    <head prefix="og: http://ogp.me/ns#" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="統計データ" />
                    <meta property="og:description" content="" />
                    <meta property="og:site_name" content="ITエンジニア性格診断テスト" />
                </Helmet>
            </HelmetProvider>
            <Scene />
        </> 
    )
}
