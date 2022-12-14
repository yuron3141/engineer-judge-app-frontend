import React, { useState } from 'react';
import { Link } from "react-router-dom";

//MUIのコンポーネントをインポート
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { styled } from '@mui/material/styles';


//独自DOMノードの設計
const CustomLink = styled(Link)({
    textDecoration:"none",
    color: "grey",
    fontSize: "18px",
});
const CustomIcon = styled(IconButton)({
    color: "white"
});
const CustomListItem = styled(ListItem)({
    "&:hover": {
        backgroundColor: "#f8f8ff",
    },
});


function DrawerComp () {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <>
            <Drawer
            anchor='right'
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            >
            <List>
                <CustomListItem onClick={() => setOpenDrawer(false)}>
                    <ListItemText>
                        <CustomLink to="/">エンジニア性格診断</CustomLink>
                    </ListItemText>
                </CustomListItem>
                <CustomListItem onClick={() => setOpenDrawer(false)}>
                    <ListItemText>
                        <CustomLink to="/type">エンジニア性格タイプ</CustomLink>
                    </ListItemText>
                </CustomListItem>
                <CustomListItem onClick={() => setOpenDrawer(false)}>
                    <ListItemText>
                        <CustomLink to="/static">統計データ</CustomLink>
                    </ListItemText>
                </CustomListItem>
                <CustomListItem onClick={() => setOpenDrawer(false)}>
                    <ListItemText>
                        <CustomLink to="/info">サイト情報</CustomLink>
                    </ListItemText>
                </CustomListItem>
            </List>
            </Drawer>
            <CustomIcon onClick={() => setOpenDrawer(!openDrawer)}>
                <i className="fa-solid fa-bars"></i>
            </CustomIcon>          
        </>
    );
}
export default DrawerComp;
