import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../css/unique.css';
import {useTheme, useMediaQuery} from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

import Data1 from '../json/list1.json';
import Data2 from '../json/list2.json';
import Data3 from '../json/list3.json';
import Data4 from '../json/list4.json';

import { apiURL } from '../config'

export const Test= ({result,setResult}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [scene, setScene] = useState(0);//0で初期画面、1で質問2,2で質問3,3で質問4, 4で結果
    const [choice, setChoice] = useState(new Array(10).fill(0));//選択要素保存用
    const [vectors, setVectors] = useState(new Array(10).fill(1));//ベクトル保存用
    const [jsonlist, setjsonlist] = useState(Data1);//jsonリスト
    const [control, setControl] = useState(false);//バリテーション用

    const handleChange = (event) => {
        setResult({...result, age: event.target.value});
    };
    const sexChange = (event) => {
        setResult({...result, sex: event.target.value});
    };
    const monthChange = (event) => {
        setResult({...result, month: event.target.value});
    };

    const updateChoice = (val, ind, vec) => {
        
        setChoice(
            choice.map((cho, index) => (index === ind ? val : cho))
        );
        setVectors(
            vectors.map((vector, index) => (index === ind ? vec : vector))
        );
    };

    const nextQuestion = (num) => {
        let sum = 0;
        for(let j=0; j<10; j++){
            sum += choice[j] * vectors[j];
        }

        const newResult = result.calced.map((res, index) => (index === num ? sum : res));
        setResult(
            {...result, calced: newResult}
        );

        const newScene = scene + 1;
        setScene(newScene);

        switch(newScene){
            case 1:
                setjsonlist(Data2);
                break;
            case 2:
                setjsonlist(Data3);
                break;
            case 3:
                setjsonlist(Data4);
                break;
            default:
                break;
        }

        window.scrollTo({
            top: 500,
            behavior: "smooth",
        });

        //初期化
        setChoice(
            new Array(10).fill(0)
        );
        setVectors(
            new Array(10).fill(1)
        );
    };

    let navigate = useNavigate(); 
    const sceneChange = () => {
        if(result.sex === "" || result.age === "" || result.month === ""){
            setControl(
                true
            )
        }else{
            setControl(
                false
            )

            let sum = 0;
            for(let j=0; j<10; j++){
                sum += choice[j] * vectors[j];
            }

            const newResult = result.calced.map((res, index) => (index === 3 ? sum : res));
            setResult(
                {...result, calced: newResult}
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            
            //axiosでデータベースへデータ送信
            
            axios.post(apiURL+"/api/v1/datas", {
                calced: newResult,
                age: result.age,
                sex: result.sex,
                month: result.month,
            }).then(
                res => {
                    //console.log('status:', res.status);
                }
            ).catch(err=>{
                console.log("error", err);
            })
            

            navigate('/result');
        }
    };

    return (
        <>
            { scene !== 4 && 
                jsonlist.map((data, index) => {
                    return (
                            <div className="questionComp" style={{textAlign: 'center', paddingTop: 20}} key={index}>
                                <div className="statement">
                                    <span>{data.question}</span>
                                </div>
                                <div className="questions">
                                    <div style={isMobile ? {display: 'none'} : {color: '#ffffff'}}>同意する</div> 
                                    <div className="question" style={isMobile ? {flex: '0 0 90%'} : {flex: '0 0 60%'}}>
                                        {   choice[index] === 2 && (
                                            <div className="option selectStyleL selectBig selectedL" onClick={() => updateChoice(2, index, data.vector)}>
                                                <i className="fa-solid fa-check" style={{color: '#ffffff'}}></i>
                                            </div>
                                        ) }
                                        {   choice[index] !== 2 && (
                                            <div className="option selectStyleL selectBig notselected" onClick={() => updateChoice(2, index, data.vector)}>
                                            </div>
                                        ) }
                                        {   choice[index] === 1 && (
                                            <div className="option selectStyleL selectSmall selectedL" onClick={() => updateChoice(1, index, data.vector)}>
                                                <i className="fa-solid fa-check" style={{color: '#ffffff'}}></i>
                                            </div>
                                        ) }
                                        {   choice[index] !== 1 && (
                                            <div className="option selectStyleL selectSmall notselected" onClick={() => updateChoice(1, index, data.vector)}>
                                            </div>
                                        ) }
                                        {   choice[index] === 0 && (
                                            <div className="option selectMiddle selectedM" onClick={() => updateChoice(0, index, data.vector)}>
                                                <i className="fa-solid fa-check" style={{color: '#ffffff'}}></i>
                                            </div>
                                        ) }
                                        {   choice[index] !== 0 && (
                                            <div className="option selectMiddle notselected" onClick={() => updateChoice(0, index, data.vector)}>
                                            </div>
                                        ) }
                                        {   choice[index] === -1 && (
                                            <div className="option selectStyleR selectSmall selectedR" onClick={() => updateChoice(-1, index, data.vector)}>
                                                <i className="fa-solid fa-check" style={{color: '#ffffff'}}></i>
                                            </div>
                                        ) }
                                        {   choice[index] !== -1 && (
                                            <div className="option selectStyleR selectSmall notselected" onClick={() => updateChoice(-1, index, data.vector)}>
                                            </div>
                                        ) }
                                        {   choice[index] === -2 && (
                                            <div className="option selectStyleR selectBig selectedR" onClick={() => updateChoice(-2, index, data.vector)}>
                                                <i className="fa-solid fa-check" style={{color: '#ffffff'}}></i>
                                            </div>
                                        ) }
                                        {   choice[index] !== -2 && (
                                            <div className="option selectStyleR selectBig notselected" onClick={() => updateChoice(-2, index, data.vector)}>
                                            </div>
                                        ) }
                                    </div>
                                    <div style={isMobile ? {display: 'none'} : {color: '#ffffff'}}>同意しない</div>
                                </div>
                                {isMobile ? 
                                (
                                    <div className="decisionmobile" style={{marginTop: -20, paddingLeft: 10, paddingRight: 10}}>
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
                        <Button onClick={() => nextQuestion(scene)} variant="contained" style={{textAlign: "center", backgroundColor: "#483d8b", paddingLeft: "80px", paddingRight: '80px'}}>
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
                                value={result.age}
                                label="年齢"
                                onChange={handleChange}
                                style={{ backgroundColor: '#dcdcdc'}}
                                >
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
                                value={result.sex}
                                onChange={sexChange}
                                style={{ backgroundColor: '#dcdcdc'}}
                                >
                                <MenuItem value={0}>男性</MenuItem>
                                <MenuItem value={1}>女性</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ mt: 3}} style={{display: 'inline-block', width: '120px'}}>
                                <InputLabel id="demo-simple-select-label">誕生月</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="誕生月"
                                value={result.month}
                                onChange={monthChange}
                                style={{ backgroundColor: '#dcdcdc'}}
                                >
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
            { control &&
                (
                    <Alert severity="warning" style={{position: 'fixed', bottom: '0', width: '100%'}}>年齢・性別・誕生月を全て答えてください</Alert>
                )                
            }
        </>
        
    )
}
