import React, { useState, useEffect } from 'react';

import { Advertising, ClientMain } from 'Components';
import { getClientInfo } from 'Lib/api';

// import classNames from 'classnames/bind';
// import styles from './styles.module.scss';

// const cx = classNames.bind(styles);

const ClientPage = () => {
    const [isAdView, setIsAdView] = useState(false); // 개발시 false
    const [clientInfo, setClientInfo] = useState({
        adList: [],
        menuList: [],
        holinonePrice: 0
    });

    const getClientInfoFunc = async () => {
        const res = await getClientInfo();
        console.log(res);

        if (res.ad_list) {
            setClientInfo({
                adList: res.ad_list,
                menuList: res.menu_list,
                holinonePrice: res.set_holeinone
            });
        }
    };

    useEffect(() => {
        getClientInfoFunc();
    }, []);
    

    return (
        <>
            {/* <Advertising setIsAdView={setIsAdView} isAdView={isAdView} /> */}
            {/* { !isAdView && <ClientMain setIsAdView={setIsAdView} isAdView={isAdView} />} */}
            <ClientMain 
                // setIsAdView={setIsAdView}
                // isAdView={isAdView}
                clientInfo={clientInfo}
                />
        </>
    );
};

export default ClientPage;