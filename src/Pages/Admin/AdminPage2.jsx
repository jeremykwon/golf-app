import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import styled from "styled-components";

import { TextField } from '@mui/material';
import { adminModalState } from 'Store/GlobalStore';

import { alertMp3 } from 'Asset';
import { getAdminPageInfo, getAdminMenu, getClientList, getOrderList } from 'Lib/api';
import { getStorage } from 'Lib/Storage';
import { createOrderMenu, createClient } from 'Lib/api';

import { OrderHistorySide, AdminSettingSide, Modal } from 'Components/templates';
import { ColorButton } from 'Components/atoms';

const cx = classNames.bind(styles);

let tmpOrderList = [];

const audio = new Audio(alertMp3);

const AdminPage = () => {
    const [isRendering, setIsRendering] = useState(true);
    const [pageInfo, setPageInfo] = useState({
        holeInOne: null,
        menuList: [],
        clientList: [],
        notice: ''
    });
    const [modalInfo, setModalInfo] = useRecoilState(adminModalState);
    const [orderList, setOrderList] = useState([]);

    const playAlertSound = useCallback(() => {
        audio.play();
    }, []);

    // 처음에 정보를 받아옴
    const getAdminInfo = async () => {
        const userInfo = getStorage({ key: 'user_info' });
        // 유저가 정보 체크후 없으면 로그인 페이지
        if (!userInfo) window.location.href="/signin";
        
        if (userInfo.user_type === 'Masto') {
            alert('master의 접근이 금지되어있습니다');
            window.location.href="/signin";
        }else if (userInfo.user_type === 'client') {
            alert('접근 권한이 없습니다');
            window.location.href="/signin";
        }
        
        const res = await getAdminPageInfo({
            userId: userInfo.user_id
        });

        if (res === 'Not Have Authority') {
            alert('접근권한이 없습니다.');
            window.location.href="/signin";
        }

        setPageInfo({
            holeInOne: res.set_holeinone,
            menuList: res.menu_list,
            clientList: res.client_list,
            notice: res.set_notice
        });

        tmpOrderList = res.order_list;

        setIsRendering(true);
        setOrderList(res.order_list);
    };

    // 주기적으로 주문을 받아옴
    const getOrderListFunc = async () => {
        const res = await getOrderList();

        if (res.order_list) {
            tmpOrderList = [...tmpOrderList, ...res.order_list];
            setOrderList(tmpOrderList);

            if (res.order_list.length > 0) playAlertSound();
        } else {
            alert('주문 리스트 불러오기 에러');
        }
    };

    const refreshMenuList = async () => {
        const res = await getAdminMenu();
        
        if (res.menu_list) {
            setPageInfo({
                ...pageInfo,
                menuList: res.menu_list
            });
        } else {
            alert('메뉴 리스트 불러오기 에러');
        }
    };

    const refreshClientList = async () => {
        const res = await getClientList();
        
        if (res.client_list) {
            setPageInfo({
                ...pageInfo,
                clientList: res.client_list
            });
        } else {
            alert('방 리스트 불러오기 에러');
        }
    };

    const modalClose = useCallback(() => {
        setModalInfo(null);
    }, []);

    useEffect(() => {
        getAdminInfo();
        setInterval(getOrderListFunc, 2000);
    }, []);

    if (isRendering) {
        return (
            <>
                <Modal
                    title={modalInfo}
                    open={modalInfo ? true : false}
                    onClose={modalClose}
                >
                    {
                        modalInfo === '주문관리' ? 
                        <AddOrderComponent 
                            refreshMenuList={refreshMenuList}
                            modalClose={modalClose} />
                        : 
                        <AddRoomComponent
                            refreshClientList={refreshClientList}
                            modalClose={modalClose} />
                    }
                </Modal>

                <Container>
                    <OrderHistorySide orderList={orderList} getAdminInfo={getAdminInfo} />
                    <AdminSettingSide
                        pageInfo={pageInfo}
                        refreshMenuList={refreshMenuList}
                        refreshClientList={refreshClientList}
                        />
                </Container>
            </>
        );
    } else {
        return (
            <></>
        );
    }
};

const Container = styled.div`
    display: flex;
    height: 100vh;
`;

export default AdminPage;

const AddOrderComponent = ({ refreshMenuList, modalClose }) => {
    const [inputText, setInputText] = useState('');

    const initInputText = () => {
        setInputText('');
    };

    const createOrderMenuHandler = async ({ order }) => {
        if (order === '') {
            alert('주문을 입력해주세요');
            return;
        }
        const res = await createOrderMenu({ menuName: order});
        if (res.menu_list) {
            alert('주문이 생성되었습니다.');
            refreshMenuList();
            initInputText();
        } else {
            if (res === 'Duplicate Menu Name') alert('해당 주문이 존재합니다');
            else alert('주문 생성 에러');
        }
    };
    return (
        <div className={cx('input-wrap')}>
            <TextField
                fullWidth
                label="주문 추가"
                onChange={(e)=> {setInputText(e.target.value)}}
                value={inputText}
                size="small"
            />
            <ColorButton
                disabled={inputText.length === 0}
                margin='30px 0 0 0'
                title={'추가'}
                clickHandler={() => {
                    createOrderMenuHandler({ order: inputText });
                    modalClose();
                }}
            />
        </div>
    );
};

const AddRoomComponent = ({ refreshClientList, modalClose }) => {
    const [clientInfo, setClientInfo] = useState({
        roomName: '',
        id: '',
        pw1: '',
        pw2: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    
    const idDispabeled = useMemo(() => {
        if (
            clientInfo.roomName === '' || 
            clientInfo.id === '' || 
            clientInfo.pw1 === '' ||
            clientInfo.pw2 === ''
        ) return true;
        else return false;
    }, [clientInfo]);
    
    const inputs = [
        {
            label: '방 이름',
            key: 'roomName'
        },
        {
            label: '아이디',
            key: 'id'
        },
        {
            label: '비밀번호',
            key: 'pw1'
        },
        {
            label: '비밀번호 확인',
            key: 'pw2'
        }
    ];

    /* ---------- 함수 영역 ---------- */
    const initClientInfo = () => {
        setClientInfo({
            roomName: '',
            id: '',
            pw1: '',
            pw2: ''
        });
    };

    const changeclientInfo = ({ e, key }) => {
        setClientInfo({
            ...clientInfo,
            [key]: e.target.value
        });
    };

    const createValidationText = () => {
        if (clientInfo.pw1 !== clientInfo.pw2) {
            setErrorMsg('입력하신 비밀번호가 일치하지 않습니다.');
            return 'error';
        }
        return '';
    };

    const createClientHandler = async () => {
        const errText = createValidationText();
        if (errText !== '') return;

        const data = await createClient({ 
            id: clientInfo.id, 
            password: clientInfo.pw1,
            nickname: clientInfo.roomName 
        });

        if (data === 'Duplicate ID') setErrorMsg('아이디가 중복됩니다.');
        else if (data === 'Duplicate NICKNAME') setErrorMsg('방이름이 중복됩니다.');
        else {
            modalClose();
            refreshClientList();
            initClientInfo();
            alert('방 생성이 완료되었습니다.');
        }
    };

    return (
        <div className={cx('input-wrap', 'room-setting-wrap')}>
            {
                inputs.map((item, index) => 
                    <TextField
                        key={index}
                        className={cx('room-text-field')}
                        fullWidth
                        label={item.label}
                        onChange={(e) => { changeclientInfo({ e, key: item.key }) }}
                        value={clientInfo[`${item.key}`]}
                        size="small"
                        type={item.key.includes('pw') ? 'password' : 'text'}
                    />
                )
            }
            <ErrorMsg>{ errorMsg }</ErrorMsg>
            <ColorButton
                margin='30px 0 0 0'
                title={'추가'}
                disabled={idDispabeled}
                clickHandler={createClientHandler}
            />
        </div>
    );
};

const ErrorMsg = styled.p`
    color: red;
    font-size: 15px;
`;