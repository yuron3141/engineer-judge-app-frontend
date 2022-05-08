import React from 'react'
import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {useTheme, useMediaQuery} from '@mui/material';
import DrawerComponent from "./DrawerComp";
import { Link } from "react-router-dom";

const Customnavlinks = styled('div')(({ theme }) => ({
    marginleft: theme.spacing(5),
    display: "flex",
}));
const Customlogo = styled(Typography)({
    flexGrow: "1",
    cursor: "pointer",
});
const Customlink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    marginLeft: theme.spacing(5),
    "&:hover": {
        color: "yellow",
    },
}));

export const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <AppBar position="static" style={{ background: '#6495ed' }}>
            <CssBaseline />
            <Toolbar>
                <Customlogo variant="h5">
                10 types engineer
                </Customlogo>
                {isMobile ? (
                <DrawerComponent />
                ) : (
                    <Customnavlinks>
                        <Customlink to="/" >
                        エンジニア性格診断テスト
                        </Customlink>
                        <Customlink to="/type">
                        エンジニア性格タイプ
                        </Customlink>
                        <Customlink to="/static">
                        統計データ
                        </Customlink>
                    </Customnavlinks>
                )}
            </Toolbar>
        </AppBar>
    );
}
