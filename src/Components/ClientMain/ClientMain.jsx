import React, { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const MAX_DEACTIVATE_COUNT = 10;
let deactivate_count = 1;

const ClientMain = ({ setIsAdView, isAdView }) => {
    const [flag, setFalg] = useState(false);
    
    const active = useCallback(() => {
        deactivate_count = 0;
    }, []);

    const addDeActivateCount = () => {
        if (!isAdView) deactivate_count = deactivate_count + 1;
    };

    useEffect(() => {
        active();
        let interval = setInterval(addDeActivateCount, 1000);
        return () => clearInterval(interval);
    }, [isAdView]);

    useEffect(() => {
        if (deactivate_count === MAX_DEACTIVATE_COUNT) setIsAdView(true);
        setTimeout(()=>{setFalg(!flag);}, 1000);
    }, [flag]);

    return (
        <div
            className={cx('main-container')}
            onClick={active}
            onTouchEnd={active}
            >
        </div>
    );
};

export default ClientMain;