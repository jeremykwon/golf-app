import React, { useEffect, useState } from 'react';

import { Advertising, ClientMain } from 'Components';

// import classNames from 'classnames/bind';
// import styles from './styles.module.scss';

// const cx = classNames.bind(styles);

const ClientPage = () => {
    const [isAdView, setIsAdView] = useState(true);

    return (
        <>
            <Advertising setIsAdView={setIsAdView} isAdView={isAdView} />
            { !isAdView && <ClientMain setIsAdView={setIsAdView} isAdView={isAdView} />}
        </>
    );
};

export default ClientPage;