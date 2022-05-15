import React, { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { Button, Modal } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LogoutIcon from '@mui/icons-material/Logout';

const cx = classNames.bind(styles);

const MAX_DEACTIVATE_COUNT = 10;
let deactivate_count = 1;

const ClientMain = ({ setIsAdView, isAdView }) => {
    const [flag, setFalg] = useState(false);
    const [isQuestionModal, setIsQuestionModal] = useState(false);
    
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
        <>
            <Modal
                onClick={active}
                onTouchEnd={active}
                className={cx('modal-container')}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isQuestionModal}
                onClose={() => { setIsQuestionModal(false) }}
                closeAfterTransition
                BackdropProps={{
                    timeout: 400,
                }}
            >
                <div className={cx('modal-content')}>
                    <div className={cx('modal-text-wrap')}>
                        <p className={cx('modal-title')}>Email</p>
                        <p className={cx('modal-text')}>qaz8461@naver.com</p>
                    </div>
                    
                    <div className={cx('modal-text-wrap')}>
                        <p className={cx('modal-title')}>Tel</p>
                        
                        <div className={cx('modal-ok-btn-wrap')}>
                            <p className={cx('modal-text')}>010-0000-0000</p>
                            <Button
                                onClick={() => { setIsQuestionModal(false) }}
                                className={cx('modal-ok-btn')}
                                >o k
                                </Button>
                        </div>
                    </div>
                </div>
            </Modal>

            <div
                className={cx('main-container')}
                onClick={active}
                onTouchEnd={active}
                >   
                    <HoleInOne />
                    <OrderBook />
                    <Footer
                        active={active}
                        setIsQuestionModal={setIsQuestionModal} 
                    />
            </div>
        </>
    );
};

const HoleInOne = () => {

    useEffect(() => {
        const numberCounter = (target_frame, target_number)  => {
            let count = 0; 
            let diff = 0;
            // let target_count = parseInt(target_number);
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
            <div className={cx('hole-wrap')}>
                <h2 className={cx('hole-cost-title')}>HOLE-IN-ONE <span>POT</span></h2>
                <div className={cx('hole-cost-wrap')}>
                    <p className={cx('hole-cost-number')} id="counter1"></p>
                    <pre className={cx('hole-cost-won')}> 원</pre>
                </div>
            </div>
        </div>
    );
};

const OrderBook = () => {
    const order_list = [
        '물을 가져다 주세요', 
        '고장났어요 빨리 와주세요!!!',
        '라면을끓일때에는 빨간맛으로 부탁드립니다.1111. fdskjh11111111dsfds111111111',
        '나는 지금 배가 고프다',
        '똥개 똥구멍!',
        '하지만 말야',
        'lorem lorem lorem lorem',
        '물을 가져다 주세요', 
        '고장났어요 빨리 와주세요!!!',
        '라면을끓일때에는 빨간맛으로 부탁드립니다.',
        '나는 지금 배가 고프다',
        '똥개 똥구멍!',
        '하지만 말야',
        'lorem lorem lorem lorem',
        '물을 가져다 주세요', 
        '고장났어요 빨리 와주세요!!!',
        '라면을끓일때에는 빨간맛으로 부탁드립니다.',
        '나는 지금 배가 고프다',
        '똥개 똥구멍!',
        '하지만 말야',
        'lorem lorem lorem lorem',
        '물을 가져다 주세요', 
        '고장났어요 빨리 와주세요!!!',
        '라면을끓일때에는 빨간맛으로 부탁드립니다.',
        '나는 지금 배가 고프다',
        '똥개 똥구멍!',
        '하지만 말야',
        'lorem lorem lorem lorem',
        '물을 가져다 주세요', 
        '고장났어요 빨리 와주세요!!!',
        '라면을끓일때에는 빨간맛으로 부탁드립니다.',
        '나는 지금 배가 고프다',
        '똥개 똥구멍!',
        '하지만 말야',
        'lorem lorem lorem lorem',
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
                <h2>주문하실 메뉴를 선택해주세요</h2>

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

const Footer = ({ setIsQuestionModal, active }) => {
    return (
        <div 
            onClick={active}
            onTouchEnd={active}
            className={cx('footer-container')}
            >
            <div className={cx('footer-content-wrap')} onClick={() => { setIsQuestionModal(true) }}>
                <QuestionAnswerIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <p>광고 문의</p>
            </div>

            <div className={cx('footer-content-wrap')}>
                <LogoutIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <p>로그아웃</p>
            </div>
        </div>
    );
};

export default ClientMain;