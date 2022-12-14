import React, { useState, useEffect } from 'react'
import axios from 'axios'

//追加CSSのインポート
import '../css/unique.css';

//MUIのコンポーネントをインポート
import { useNavigate } from "react-router-dom";
import {useTheme, useMediaQuery} from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

//質問リストのインポート(json)
import questions1 from '../json/list1.json';
import questions2 from '../json/list2.json';
import questions3 from '../json/list3.json';
import questions4 from '../json/list4.json';

import { apiURL } from '../config'

export const Test= () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


    //usestateの初期値
    const [scene, setScene] = useState(0);//0で初期画面(質問リスト1)、1で質問リスト2切り替え,2で質問リスト3切り替え,3で質問リスト3切り替え, 4で結果表示切替
    const [questionlist, setQuestionlist] = useState(questions1);//質問のリスト
    const [calcpoint, setCalcpoint] = useState(new Array(10).fill(10)); //質問を選択値保存用(10個まで)
    const [selected, setSelected] = useState(new Array(10).fill([true, true, false, true, true])); //質問を選択したかどうか(10個まで)

    const [points, setPoints] = useState(new Array(4).fill(100)); //各ポイントの保存用(志向, こだわり, 専門性, 技術意識)
    const [info, setInfo] = useState({ age: 0, sex: 0, month:0}); //年代, 男女, 誕生月

    const [alert, setAlert] = useState(false); //警告画面の表示ON/OFFの状態
    const [alerttext, setAlerttext] = useState("最低どれか1つは真ん中以外を選択してください");
    

    //シーン(質問画面)と質問選択値が変わったときに実行
    useEffect(() => {

        //シーン(質問)の切り替え
        switch(scene){
            case 0:
                setQuestionlist(questions1);
                break;
            case 1:
                setQuestionlist(questions2);
                break;
            case 2:
                setQuestionlist(questions3);
                break;
            default:
                setQuestionlist(questions4);
                break;
        };

        //ポイントを計算する処理
        setPoints(() => {

            let newpoints = calcpoint.reduce((sum, element) => sum + element, 0);

            return  points.map((calc, key) => (key === scene ?  newpoints : calc ));
        });

        //console.log(points[scene]);

    }, [scene, calcpoint])

    //クリックされたかどうかの判断の格納&キャッシュへ格納等を行う関数
    const pointCalc = (vec, num, choice) =>{ //シーン, 計算向き, 問題番号, 選択肢)

        let multi = 0.0;
        //質問の向き(vec)に応じて計算値を分ける
        if(vec > 0){
            switch(choice){
                case 0: 
                    multi = 20.0;
                    break;
                case 1: 
                    multi = 15.0;
                    break;
                case 2: 
                    multi = 10.0;
                    break;
                case 3: 
                    multi = 5.0;
                    break;
                default:
                    multi = 0.0;
                    break;
            }
        }else{
            switch(choice){
                case 0: 
                    multi = 0.0;
                    break;
                case 1: 
                    multi = 5.0;
                    break;
                case 2: 
                    multi = 10.0;
                    break;
                case 3: 
                    multi = 15.0;
                    break;
                default:
                    multi = 20.0;
                    break;
            }
        }

        //計算値の保存
        setCalcpoint(calcpoint.map((calc, key) => (key === num ?  multi : calc )));
        //選択肢(5つ)の状態変化
        setSelected(selected.map((data1,key1) => (key1 === num ? data1.map((data2, key2) => (key2 === choice ? false : true)): data1)));

    };

    //次の質問を用意する関数
    const nextQuestion = () =>{


        const isAllEqual = (array) => array.every(val => val === array[0]); //質問に全く答えていないか確認する関数
        const bad = isAllEqual(calcpoint);

        if(!bad ){

            //計算値キャッシュと質問選択状態の初期化
            setCalcpoint(new Array(10).fill(10));
            setSelected(new Array(10).fill([true, true, false, true, true]));

            //ページ画面切り替え
            setScene(scene + 1);
            //アラートのOFF
            setAlert(false);

            //ページの上へ移動
            window.scrollTo({
                top: 500,
                behavior: "smooth",
            });

        }else{
            //アラートの表示をON
            setAlerttext("最低どれか1つは真ん中以外を選択してください");
            setAlert(true);
        }
    };
    
    const ageChange = (event) => {
        setInfo({...info, age: event.target.value});
    };
    const sexChange = (event) => {
        setInfo({...info, sex: event.target.value});
    };
    const monthChange = (event) => {
        setInfo({...info, month: event.target.value});
    };

    //結果画面表示への遷移とデータベース(APIサーバ)への登録を行う関数
    let navigate = useNavigate(); 
    const sceneChange = () => {
        if(info.age !== 0 && info.month !== 0){
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            setAlert(false);

            //axiosでデータベースへデータ送信 
            axios.post(apiURL+"/api/v1/datas", {
                calced: points,
                age: info.age,
                sex: info.sex,
                month: info.month,
            }).then(
                res => {
                    //console.log('status:', res.status);
                }
            ).catch(err=>{
                const {status,statusText} = err.response;

                console.log(`Error! HTTP Status: ${status} ${statusText}`);
            })
            

            navigate(`/result?scorea=${points[0]}&scoreb=${points[1]}&scorec=${points[2]}&scored=${points[3]}`);
        } else {
            setAlerttext("最低でも年齢と誕生月は教えてください");
            setAlert(true);
        }
    };

    return (
        <>
            {questionlist.map((data, index) => {
                    return (
                            <div className="questionComp" key={index} style={{paddingTop: 20}}>
                                <div className="statement">
                                    <span>{data.question}</span>
                                </div>
                                <div className="questions">
                                    <div style={isMobile ? {display: 'none'} : {color: '#ffffff'}}>同意する</div> 
                                    <div className="question" style={isMobile ? {flex: '0 0 90%'} : {flex: '0 0 60%'}}>
                                        <div className={selected[index][0] ? "option selectStyleL selectBig notselected" : "option selectStyleL selectBig selectedL" } onClick={() => pointCalc(data.vector, index, 0)}>
                                            <i className={selected[index][0] ? "" : "fa-solid fa-check"} style={{color: '#ffffff'}}></i>
                                        </div>
                                        <div className={selected[index][1] ? "option selectStyleL selectSmall notselected" : "option selectStyleL selectSmall selectedL" } onClick={() => pointCalc(data.vector, index, 1)}>
                                            <i className={selected[index][1] ? "" : "fa-solid fa-check"} style={{color: '#ffffff'}}></i>
                                        </div>
                                        <div className={selected[index][2] ? "option selectMiddle selectSmall notselected" : "option selectMiddle selectSmall selectedM" } onClick={() => pointCalc(data.vector, index, 2)}>
                                            <i className={selected[index][2] ? "" : "fa-solid fa-check"} style={{color: '#ffffff'}}></i>
                                        </div>
                                        <div className={selected[index][3] ? "option selectStyleR selectSmall notselected" : "option selectStyleR selectSmall selectedR" } onClick={() => pointCalc(data.vector, index, 3)}>
                                            <i className={selected[index][3] ? "" : "fa-solid fa-check"} style={{color: '#ffffff'}}></i>
                                        </div>
                                        <div className={selected[index][4] ? "option selectStyleR selectBig notselected" : "option selectStyleR selectBig selectedR" } onClick={() => pointCalc(data.vector, index, 4)}>
                                            <i className={selected[index][4] ? "" : "fa-solid fa-check"} style={{color: '#ffffff'}}></i>
                                        </div>
                                    </div>
                                    <div style={isMobile ? {display: 'none'} : {color: '#ffffff'}}>同意しない</div>
                                </div>
                                {isMobile ? 
                                (
                                    <div className="decisionmobile" style={{marginTop: -10, paddingLeft: 10, paddingRight: 10}}>
                                        <div style={{color: '#ffffff'}}>同意する</div> 
                                        <div style={{color: '#ffffff'}}>同意しない</div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                    );
                })
            }
            { scene !== 3 &&
                (
                    <Box textAlign='center'>
                        <Button onClick={() => nextQuestion()} variant="contained" style={{textAlign: "center", backgroundColor: "#483d8b", paddingLeft: "80px", paddingRight: '80px'}}>
                            次へ
                        </Button>
                    </Box>
                )
            }
            { scene === 3 &&
                (
                    <>
                        <Box textAlign='center'>
                            <div className="statement">
                                    <span>あなたの年齢と性別、誕生月を教えてください</span>
                            </div>
                            <FormControl sx={{ mt: 3}} style={{display: 'inline-block', width: '120px'}}>
                                <InputLabel id="demo-simple-select-label">年齢</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={info.age}
                                label="年齢"
                                onChange={ageChange}
                                style={{ backgroundColor: '#dcdcdc'}}
                                >
                                <MenuItem value={0}>未選択</MenuItem>
                                <MenuItem value={10}>10代</MenuItem>
                                <MenuItem value={20}>20代</MenuItem>
                                <MenuItem value={30}>30代</MenuItem>
                                <MenuItem value={40}>40代</MenuItem>
                                <MenuItem value={50}>50代</MenuItem>
                                <MenuItem value={60}>60代</MenuItem>
                                <MenuItem value={70}>それ以上</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ mt: 3}} style={{display: 'inline-block', width: '120px'}}>
                                <InputLabel id="demo-simple-select-label">性別</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="性別"
                                value={info.sex}
                                onChange={sexChange}
                                style={{ backgroundColor: '#dcdcdc'}}
                                >
                                <MenuItem value={0}>未選択</MenuItem>
                                <MenuItem value={1}>男性</MenuItem>
                                <MenuItem value={2}>女性</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ mt: 3}} style={{display: 'inline-block', width: '120px'}}>
                                <InputLabel id="demo-simple-select-label">誕生月</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="誕生月"
                                value={info.month}
                                onChange={monthChange}
                                style={{ backgroundColor: '#dcdcdc'}}
                                >
                                <MenuItem value={0}>未選択</MenuItem>
                                <MenuItem value={1}>1月</MenuItem>
                                <MenuItem value={2}>2月</MenuItem>
                                <MenuItem value={3}>3月</MenuItem>
                                <MenuItem value={4}>4月</MenuItem>
                                <MenuItem value={5}>5月</MenuItem>
                                <MenuItem value={6}>6月</MenuItem>
                                <MenuItem value={7}>7月</MenuItem>
                                <MenuItem value={8}>8月</MenuItem>
                                <MenuItem value={9}>9月</MenuItem>
                                <MenuItem value={10}>10月</MenuItem>
                                <MenuItem value={11}>11月</MenuItem>
                                <MenuItem value={12}>12月</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box textAlign='center'>
                            <Button onClick={() => sceneChange()}
                            variant="contained" style={{textAlign: "center", backgroundColor: "#483d8b",marginTop: '50px', paddingLeft: "80px", paddingRight: '80px'}}>
                                結果を見る
                            </Button>
                        </Box>
                    </>
                )
            }
            { alert &&
                (
                    <Alert severity="warning" style={{position: 'fixed', bottom: '0', width: '100%'}}>{alerttext}</Alert>
                )                
            }
        </>
        
    )
}
