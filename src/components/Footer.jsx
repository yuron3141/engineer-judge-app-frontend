import React from 'react'

//MUIのコンポーネントをインポート
import { styled } from '@mui/material/styles';


//独自DOMノードの設計
const FooterDesign = styled('div')(({ theme }) => ({
    color: "#ffffff",
    background: '#6495ed',
    width: "100%",
    bottom: 0,
    padding: 15,
}));


export const Footer = () => {

    return (
        <>
            <FooterDesign align="center">ITエンジニア性格診断 &copy;{new Date().getUTCFullYear()} ゆーろん All rights reserved</FooterDesign>
        </>
    );
}