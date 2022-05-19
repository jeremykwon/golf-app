import React, { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import MenuIcon from '@mui/icons-material/Menu';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LogoutIcon from '@mui/icons-material/Logout';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import CheckIcon from '@mui/icons-material/Check';
import ListItemIcon from '@mui/material/ListItemIcon';

import { 
    Button,
    Modal,
    ListItemButton,
    Drawer,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';

const cx = classNames.bind(styles);

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ClientMain = () => {
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
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const toggleDrawer = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const modalOpenHandler = (type) => {
        if (['주문', '광고 문의'].includes(type)) setModalInfo({
            isOpen: true,
            type
        });
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
                        modalInfo.type === '주문' && <OrderModalBody snackBarOpenhandler={snackBarOpenhandler} modalCloseHandler={modalCloseHandler} />
                    }
                </>
            </Modal>

            <div
                className={cx('main-container')}
                >
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
                    <MenuItems toggleDrawer={toggleDrawer} modalOpenHandler={modalOpenHandler} />
                </Drawer>
                
                <HoleInOne />

                <video
                    className={cx('ad-video')}
                    autoPlay
                    muted
                    loop
                    >
                    <source src='https://www.kobaco.co.kr/site/main/file/stream/uu/08f6d66163d44bbda38ca568e3497a5b' type="video/mp4" />
                </video>
            </div>
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
        </Box>
    );
};

const HoleInOne = () => {

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
        numberCounter("counter1", 1000000);
    }, []);

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
                        >o k
                    </Button>
                </div>
            </div>
        </div>
    );
};

const OrderModalBody = ({ modalCloseHandler, snackBarOpenhandler }) => {
    const [selectedOrder, setSelectedOrder] = useState([]);

    const orderSubmmit = () => {
        modalCloseHandler();
        snackBarOpenhandler();
    };

    const order_list = [
        '연습장 시간 더 넣어주세요', 
        '게임 넣어주세요',
        '플레이어 추가해주세요',
        '코스매니저가 안돼요',
        '화면이 깨졌어요',
        '공이 안나와요',
        '음료 더 주세요',
        '티가 부러졌어요',
        '설정 변경해주세요',
        '에어컨 켜주세요',
        '에어컨 꺼주세요',
        '홀인원 넣어주세요',
        '잔돈 교환해주세요',
        '맥주 주세요',
        '소주요',
        '과자 주세요',
        '한 번 와주세요'
    ];

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
                    order_list.map((order, index) => {
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
                                
                                <p className={cx('order')}>{order}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default ClientMain;