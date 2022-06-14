import React, { useState, useEffect } from 'react';

import { Advertising, ClientMain } from 'Components';
import { getClientInfo } from 'Lib/api';
import { getStorage } from 'Lib/Storage';

// import classNames from 'classnames/bind';
// import styles from './styles.module.scss';

// const cx = classNames.bind(styles);

const ClientPage = () => {
    const [isRendering, setIsRendering] = useState(false);

    const [isAdView, setIsAdView] = useState(false); // 개발시 false
    const [clientInfo, setClientInfo] = useState({
        adList: [],
        menuList: [],
        holinonePrice: 0
    });

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
                holinonePrice: res.set_holeinone
            });
            setIsRendering(true);
        }
    };

    useEffect(() => {
        getClientInfoFunc();
    }, []);

    if (isRendering) {
        return <ClientMain clientInfo={clientInfo} />;
    } else {
        return <></>;
    }
    // return (
    //     <>
    //         {/* <Advertising setIsAdView={setIsAdView} isAdView={isAdView} /> */}
    //         {/* { !isAdView && <ClientMain setIsAdView={setIsAdView} isAdView={isAdView} />} */}
    //         <ClientMain 
    //             // setIsAdView={setIsAdView}
    //             // isAdView={isAdView}
    //             clientInfo={clientInfo}
    //             />
    //     </>
    // );
};

export default ClientPage;