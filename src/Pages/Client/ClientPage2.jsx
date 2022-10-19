import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { getClientInfo } from 'Lib/api';
import { getStorage } from 'Lib/Storage';

import { ColorButton } from 'Components/atoms';
import { ControlContainer, HoleinoneSide, AdContactSection, LoginSection, Advertising } from 'Components/templates';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

let counter = 0;
let _isAdView = false;

const ClientPage = () => {
    const [isAdView, setIsAdView] = useState(true); // 개발시 false
    const [modalType, setModalType] = useState(null); // contact, logout

    const [isRendering, setIsRendering] = useState(false);
    const [clientInfo, setClientInfo] = useState({
        adList: [],
        menuList: [],
        holinonePrice: 0,
        notice: ''
    });
    const [open, setOpen] = useState(false);    // 스낵바
    const handle = useFullScreenHandle();

    const modalCloseHandler = () => {
        setModalType(null);
    };

    const modalView = (type) => {
        setModalType(type);
    };

    const initCounter = () => {
        counter = 0;
    };

    const getClientInfoFunc = async () => {
        const userInfo = getStorage({ key: 'user_info' });

        if (!userInfo) window.location.href="/signin";
        if (userInfo.user_type !== 'client') {
            alert('admin, master의 접근이 금지되어있습니다');
            window.location.href="/signin";
        }

        const res = await getClientInfo();

        if (res.ad_list) {
            setClientInfo({
                adList: res.ad_list,
                menuList: res.menu_list,
                holinonePrice: res.set_holeinone,
                notice: res.set_notice
            });
            setIsRendering(true);
        }
    };

    const snackBarOpenhandler = () => {
        setOpen(true);
    };

    const snackBarClosehandler = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    useEffect(() => {
        getClientInfoFunc();

        setInterval(() => {
            if (!_isAdView) {
                if (counter === 30) {
                    setIsAdView(true);
                }
                counter++;
            }
        }, 1000);
    }, []);

    useEffect(() => {
        if (isAdView) _isAdView = true;
        else {
            _isAdView = false;
            initCounter();
        }
    }, [isAdView]);

    return(
        <>
            {
                isRendering &&
                <>
                    {/* 전체화면으로 전환하도록 하는 버튼 wrapper */}
                    <Blind
                        isView={!document.fullscreenElement}
                        >
                        <ColorButton
                            title={'전체화면 전환'}
                            width='300px'
                            clickHandler={handle.enter} />
                    </Blind>
                    
                    {/* 전체화면 전환시 보여지는 스크린 */}
                    <FullScreen id="container" handle={handle}>
                        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={4000} onClose={snackBarClosehandler}>
                            <Alert onClose={snackBarClosehandler} severity="info" sx={{ width: '100%' }}>
                                주문이 완료되었습니다
                            </Alert>
                        </Snackbar>

                        {/* 광고 */}
                        <Advertising
                            setIsAdView={setIsAdView}
                            isAdView={isAdView}
                            adList={clientInfo.adList}
                            />

                        <Container
                            onTouchStart={initCounter}
                            onTouchEnd={initCounter}
                            >
                            <Blind
                                isView={modalType}
                                onClick={modalCloseHandler}
                                >
                                    <>
                                        {
                                            modalType === 'contact' && <AdContactSection modalCloseHandler={modalCloseHandler} />
                                        }
                                        {
                                            modalType === 'logout' && <LoginSection />
                                        }
                                    </>
                            </Blind>

                            <HoleinoneSide money={clientInfo.holinonePrice} notice={clientInfo.notice} />

                            <ControlContainer
                                modalView={modalView}
                                menuList={clientInfo.menuList}
                                snackBarOpenhandler={snackBarOpenhandler}
                                />
                        </Container>
                    </FullScreen>
                </>
            }
        </>
    );
};

export default ClientPage;

const Container = styled.div`
    display: flex;
    height: 100%;
    background-color: #fff;
`;

const Blind = styled.div`
    position: fixed;
    z-index: 10;
    display: ${ ({ isView }) => isView ? 'flex' : 'none'};
    width: 100vw;
    height: 100vh;
    background-color: rgba(28, 28, 28, 0.99);
    align-items: center;
    justify-content: center;
`;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
