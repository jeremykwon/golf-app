import React, { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Button } from '@mui/material';
import anime from 'animejs/lib/anime.es.js';

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

    useEffect(() => {
        const ob = document.querySelector('#logg1');
        
        var myObject = {
            prop1: 0,
            prop2: '0%'
        }

        anime({
            targets: myObject,
            prop1: 50,
            prop2: '100000%',
            easing: 'linear',
            round: 1,
            update: function() {
                ob.innerHTML = JSON.stringify(myObject);
            }
          });

        anime({
            targets: '#logg',
            value: [0, 1000],
            round: 1,
            easing: 'easeInOutExpo',
            duration: 5000
          });
    }, []);


    return (
        <div
            className={cx('main-container')}
            onClick={active}
            onTouchEnd={active}
            >   
                <p className={cx('test')} id='logg1'>12345</p>
                <input className={cx('test')} id='logg' value={1000} />

                <HoleInOne />
                <OrderBook />
                <Footer />
        </div>
    );
};

const HoleInOne = () => {
    return (
        <div className={cx('hole-container')}>
            today's hole in one
            <div>
            
            </div>
        </div>
    );
};

const OrderBook = () => {
    const order_list = [
        '물을 가져다 주세요', 
        '고장났어요 빨리 와주세요!!!',
        '라면을끓일때에는 빨간맛으로 부탁드립니다.',
        '나는 지금 배가 고프다',
        '똥개 똥구멍!'
    ];

    const OrderBox = ({ order }) => {
        return (
            <div className={cx('orderbook-order-box')}>
                <p>{order}</p>
            </div>
        );
    };

    return (
        <div className={cx('orderbook-container')}>
            <div className={cx('orderbook-header')}>
                주문하실 메뉴를 선택해주세요

                <Button className={cx('submit-btn')} variant="contained">주문하기</Button>
            </div>

            <div className={cx('orderbook-order-wrap')}>
                {
                    order_list.map((i, index) => {
                        return <OrderBox key={index} order={i} />;
                    })
                }
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <div className={cx('footer-container')}>
            <div>
            </div>

            <div>
            </div>
        </div>
    );
};

export default ClientMain;