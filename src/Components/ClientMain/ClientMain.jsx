import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";

import { requestOrder } from 'Lib/api';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { logout } from 'Lib/Logout';
import { getStorage } from 'Lib/Storage';
import { login } from 'Lib/api';

import MenuIcon from '@mui/icons-material/Menu';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LogoutIcon from '@mui/icons-material/Logout';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import CheckIcon from '@mui/icons-material/Check';
import ListItemIcon from '@mui/material/ListItemIcon';

import CircularProgress from '@mui/material/CircularProgress';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

import { 
    Button,
    Modal,
    ListItemButton,
    Drawer,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    TextField
} from '@mui/material';

const cx = classNames.bind(styles);

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ClientMain = ({ clientInfo }) => {
    // const [flag, setFalg] = useState(false);
    // const [isQuestionModal, setIsQuestionModal] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        isOpen: false,
        type: ''
    });
    const [open, setOpen] = useState(false);

    const snackBarOpenhandler = () => {
        setOpen(true);
    };

    const snackBarClosehandler = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const toggleDrawer = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const modalOpenHandler = (type) => {
        if (['주문', '광고 문의'].includes(type)) {
            setModalInfo({
                isOpen: true,
                type
            });
        } else if (['로그아웃'].includes(type)) {
            setModalInfo({
                isOpen: true,
                type
            });
        }
    };

    const modalCloseHandler = (type) => {
        setModalInfo({
            isOpen: false,
            type: ''
        });
    };

    return (
        <>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={4000} onClose={snackBarClosehandler}>
                <Alert onClose={snackBarClosehandler} severity="info" sx={{ width: '100%' }}>
                    주문이 완료되었습니다
                </Alert>
            </Snackbar>

            <Modal
                className={cx('modal-container')}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalInfo.isOpen}
                onClose={modalCloseHandler}
                closeAfterTransition
                BackdropProps={{
                    timeout: 400,
                }}
            >
                <>
                    {
                        modalInfo.type === '광고 문의' && <AdvertisingModalBody modalCloseHandler={modalCloseHandler} />
                    }
                    {
                        modalInfo.type === '주문' && 
                            <OrderModalBody
                                snackBarOpenhandler={snackBarOpenhandler}
                                modalCloseHandler={modalCloseHandler}
                                menuList={clientInfo.menuList}
                                />
                    }
                    {
                        modalInfo.type === '로그아웃' && 
                            <LoginModalBody
                                modalCloseHandler={modalCloseHandler}
                                />
                    }
                </>
            </Modal>

            <div className={cx('main-container')}>
                <Button
                    className={cx('menu-btn')}
                    variant="contained"
                    onClick={() =>{setIsOpenMenu(true);}}
                    startIcon={<MenuIcon variant="contained" sx={{ fontSize: 60 }} />}
                    >
                    Menu
                </Button>

                <Drawer
                    anchor='left'
                    open={isOpenMenu}
                    onClose={toggleDrawer}
                >
                    <MenuItems
                        toggleDrawer={toggleDrawer}
                        modalOpenHandler={modalOpenHandler}
                        />
                </Drawer>
                
                {
                    clientInfo.holinonePrice !== 0 && <HoleInOne price={clientInfo.holinonePrice} />
                }

                <AdView adList={clientInfo.adList} />
            </div>
        </>
    );
};

/* 광고 */
const AdView = ({ adList }) => {
    const [adIndex, setAddindex] = useState(0);

    const nextAd = () => {
        let adLength = adList.length;
        if (adLength === adIndex + 1) setAddindex(0);
        else setAddindex(adIndex + 1);
    };

    // 광고 변경
    useEffect(() => {
        if (adList[adIndex].type === 0) {
            setTimeout(nextAd, 10000);
        } else {
            const currentVideo = document.getElementById(`video_${adIndex}`); 
            currentVideo.play();
        }
    }, [adIndex]);

    return (
        <>
            {
                adList.map((adItem, index) => {
                    return (
                        <div className={cx('ad-wrap', {visible: index === adIndex})}>
                            {
                                adItem.type === 0 ? 
                                    <img className={cx('ad-img')} src={adItem.url} />
                                    :
                                    <video
                                        id={`video_${index}`}
                                        className={cx('ad-video')}
                                        muted
                                        onEnded={nextAd}
                                        >
                                        <source src={adItem.url} type="video/mp4" />
                                    </video>

                            }
                        </div>
                    );
                })
            }
        </>
    );
};

const MenuItems = ({ toggleDrawer, modalOpenHandler }) => {
    const buttonList1 = [
        {
            icon: <RoomServiceIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />,
            text: '주문'
        },
        {
            icon: <QuestionAnswerIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />,
            text: '광고 문의'
        },
    ];

    const buttonList2 = [
        {
            icon: <LogoutIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />,
            text: '로그아웃'
        },
    ];

    return (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer}
            >
            <List>
                {
                    buttonList1.map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={() => {modalOpenHandler(item.text)}}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                    ))
                }
            </List>

            <Divider />

            <List>
                {
                    buttonList2.map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={() => {modalOpenHandler(item.text)}}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                    ))
                }
            </List>

            <p style={{ 
                position: 'fixed',
                bottom: '5px',
                left: '5px',
                fontSize: '15px',
                width: '240px',
                overflow: 'hidden',
                textAlign: 'center'
                }}>
                    {getStorage({ key: 'user_info' }).nickname}
                </p>
        </Box>
    );
};

const HoleInOne = ({ price }) => {
    useEffect(() => {
        const numberCounter = (target_frame, target_number)  => {
            let count = 0; 
            let diff = 0;
            let target = document.getElementById(target_frame);
            let timer = null;

            const counter = () => {
                diff = target_number - count;
                
                if(diff > 0) {
                    count += Math.ceil(diff / 5);
                }
                
                target.innerHTML = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                
                if(count < target_number) {
                    timer = setTimeout(counter , 20);
                } else {
                    clearTimeout(timer);
                }
            };
            counter();
        };
        numberCounter("counter1", price);
    }, [price]);

    return (
        <div className={cx('hole-container')}>
            <h2 className={cx('hole-cost-title')}>HOLE-IN-ONE <span>POT</span></h2>
            <div className={cx('hole-cost-wrap')}>
                -
                    <p className={cx('hole-cost-number')} id="counter1"></p>
                    <pre className={cx('hole-cost-won')}> 원</pre>
                -
            </div>
        </div>
    );
};

const LoginModalBody = ({ modalCloseHandler }) => {
    const [userInfo, setUserInfo] = useState({ id: '', pw: '' });
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const disabledLoginButton = useMemo(() => {
        if (userInfo.id === '' || userInfo.pw === '') return true;
        else return false;
    }, [userInfo]);

    const navigate = useNavigate();

    /* id, pw 초기화 */
    const initUserInfo = () => {
        setUserInfo({ id: '', pw: '' });
    };

    /* 엔터키를 통해 로그인 */
    const keyboardEvent = (e) => {
        if (disabledLoginButton) return;

        if (e.key === 'Enter') signIn();
    };

    /* 로그인 */
    const signIn = async () => {
        setIsLoading(true);

        const data = await login({
            id: userInfo.id,
            password: userInfo.pw
        });

        if (data.user_type === 1 || data.user_type === 2) {
            logout();
            window.location.href="/signin";
        } else {
            initUserInfo();
            setIsError('아이디와 비밀번호를 확인하세요.');
        }

        setIsLoading(false);
    };

    /* 유저 아이디 업데이트 */
    const changeUserId = (e) => {
        setUserInfo({
            id: e.target.value,
            pw: userInfo.pw
        });
    };

    /* 유저 비밀번호 업데이트 */
    const changeUserPw = (e) => {
        setUserInfo({
            id: userInfo.id,
            pw: e.target.value
        });
    };
    
    return (
        <div className={cx('login-wrap')}>
            <div className={cx('input-wrap')}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField 
                    fullWidth
                    onChange={changeUserId}
                    id="input-with-sx"
                    label="아이디"
                    variant="standard"
                    type="search"
                    value={userInfo.id}
                    onKeyUp={keyboardEvent}
                    />
            </div>
            
            <div className={cx('input-wrap')}>
                <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                    onChange={changeUserPw}
                    fullWidth
                    id="input-with-sx"
                    label="비밀번호"
                    variant="standard"
                    value={userInfo.pw}
                    type='password'
                    onKeyUp={keyboardEvent}
                />
            </div>
            
            <p className={cx('error-msg')}>{ isError && '아이디와 비밀번호를 확인하세요'}</p>

            <Button
                className={cx('input-wrap')}
                variant="contained"
                onClick={signIn}
                disabled={disabledLoginButton}
                >
                    {
                        isLoading ? <CircularProgress size={25} color="inherit" /> : '로그인'
                    }
            </Button>
        </div>
    );
};

const AdvertisingModalBody = ({ modalCloseHandler }) => {
    return (
        <div className={cx('ad-modal-content')}>
            <div className={cx('ad-modal-text-wrap')}>
                <p className={cx('ad-modal-title')}>Email</p>
                <p className={cx('ad-modal-text')}>qaz8461@naver.com</p>
            </div>
            
            <div className={cx('ad-modal-text-wrap')}>
                <p className={cx('ad-modal-title')}>Tel</p>
                
                <div className={cx('ad-modal-ok-btn-wrap')}>
                    <p className={cx('ad-modal-text')}>010-0000-0000</p>
                    <Button
                        onClick={modalCloseHandler}
                        className={cx('ad-modal-ok-btn')}
                        >확인
                    </Button>
                </div>
            </div>
        </div>
    );
};

const OrderModalBody = ({ modalCloseHandler, snackBarOpenhandler, menuList }) => {
    const [selectedOrder, setSelectedOrder] = useState([]);

    const requestOrderToAdmin = async () => {
        let sendselectedOrders = [];
        menuList.forEach((menu, index) => {
            if (selectedOrder.includes(index)) sendselectedOrders.push(menu.menu_name);
        });
        return await requestOrder({ orderText: sendselectedOrders });
        
    };

    const orderSubmmit = async () => {
        const res = await requestOrderToAdmin();
        
        if (res !== 'Ordering is Success') {
            alert('주문 오류 관리자에게 문의하세요');
            return;
        }

        modalCloseHandler();
        snackBarOpenhandler();
    };

    const selectIndex = (index, exist) => {
        if (exist) {
            let tmpList = [];
            for (let i of selectedOrder) {
                if (i !== index) tmpList.push(i);
            }

            setSelectedOrder(tmpList);
        }
        else setSelectedOrder([...selectedOrder, index]);
    };

    return (
        <div className={cx('order-modal-content')}>
            <div className={cx('order-modal-header')}>
                <h1>
                    주문 목록
                </h1>

                <Button 
                    className={cx('submit-btn')}
                    variant="contained"
                    disabled={selectedOrder.length === 0}
                    onClick={orderSubmmit}
                    >
                        {selectedOrder.length}가지 주문하기
                </Button>
            </div>

            <div className={cx('order-modal-body')}>
                {
                    menuList.map((menu, index) => {
                        const exist = selectedOrder.includes(index);
                        return (
                            <div 
                                key={index}
                                className={cx('order-modal-item-wrap')}
                                onClick={() => {selectIndex(index, exist)}}
                                >
                                <div className={cx('btn-wrap')}>
                                    {
                                        exist &&
                                            <CheckIcon
                                                fontSize='large'
                                                color='primary'
                                            />
                                    }
                                </div>
                                
                                <p className={cx('order')}>{menu.menu_name}</p>
                            </div>
                        );
                    })
                }
                
            </div>
        </div>
    );
};

export default ClientMain;