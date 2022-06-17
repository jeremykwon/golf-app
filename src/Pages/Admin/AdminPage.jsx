import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { alertMp3 } from 'Asset';
import { AdminSettingSide, AdminJobList } from 'Components';
import { getAdminPageInfo, getAdminMenu, getClientList, getOrderList } from 'Lib/api';
import { getStorage } from 'Lib/Storage';

const cx = classNames.bind(styles);

let tmpOrderList = [];

const AdminPage = () => {
    const [isRendering, setIsRendering] = useState(false);

    const [pageInfo, setPageInfo] = useState({
        holeInOne: null,
        menuList: [],
        clientList: []
    });
    const [orderList, setOrderList] = useState([]);

    const playAlertSound = () => {
        const audio = new Audio(alertMp3);
        audio.play();
    };

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
            clientList: res.client_list
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

    useEffect(() => {
        getAdminInfo();
        setInterval(getOrderListFunc, 2000);
    }, []);

    if (isRendering) {
        return (
            <div className={cx('admin-container')}>
                <AdminSettingSide
                    pageInfo={pageInfo}
                    refreshMenuList={refreshMenuList}
                    refreshClientList={refreshClientList}
                    />
                <AdminJobList
                    orderList={orderList}
                    getOrderListFunc={getOrderListFunc}
                    />
            </div>
        );
    } else {
        return (
            <></>
        );
    }
};

export default AdminPage;