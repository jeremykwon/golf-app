import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { AdminSettingSide, AdminJobList } from 'Components';
import { getAdminPageInfo } from 'Lib/api';
import { getStorage } from 'Lib/Storage';


const cx = classNames.bind(styles);

const AdminPage = () => {
    const [pageInfo, setPageInfo] = useState({
        holeInOne: null,
        menuList: [],
        orderList: [],
        clientList: []
    });
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
            orderList: res.order_list,
            clientList: res.client_list
        })
    };

    useEffect(() => {
        getAdminInfo();
    }, []);

    return (
        <div className={cx('admin-container')}>
            <AdminSettingSide pageInfo={pageInfo} />
            <AdminJobList />
        </div>
    );
};

export default AdminPage;