import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { AdminSettingSide, AdminJobList } from 'Components';
import { getAdminPageInfo, getAdminMenu, getClientList, getOrderList } from 'Lib/api';
import { getStorage } from 'Lib/Storage';


const cx = classNames.bind(styles);

let tmpOrderList = [];

const AdminPage = () => {
    const [pageInfo, setPageInfo] = useState({
        holeInOne: null,
        menuList: [],
        clientList: []
    });
    const [orderList, setOrderList] = useState([]);

    const getAdminInfo = async () => {
        const res = await getAdminPageInfo({
            userId: getStorage({ key: 'user_info' }).user_id
        });

        if (res === 'Not Have Authority') {
            alert('권한이 없습니다.');
            window.location.href="/signin";
        }

        setPageInfo({
            holeInOne: res.set_holeinone,
            menuList: res.menu_list,
            clientList: res.client_list
        });

        tmpOrderList = res.order_list;

        setOrderList(res.order_list);
    };
    
    const getOrderListFunc = async () => {
        const res = await getOrderList();

        if (res.order_list) {
            tmpOrderList = [...tmpOrderList, ...res.order_list];
            setOrderList(tmpOrderList);
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

    return (
        <div className={cx('admin-container')}>
            <AdminSettingSide
                pageInfo={pageInfo}
                refreshMenuList={refreshMenuList}
                refreshClientList={refreshClientList}
                />
            <AdminJobList orderList={orderList} getOrderListFunc={getOrderListFunc} />
        </div>
    );
};

export default AdminPage;