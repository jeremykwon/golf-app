import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { Table, AdminHoleMoney, AdminTitle } from 'Components';
import { Button, TextField, Modal } from '@mui/material';

const cx = classNames.bind(styles);

const tmpOrderDatas = [
    {
        id: 'id1',
        title: '주문1 입니다.'
    },
    {
        id: 'id2',
        title: '주문2 입니다.'
    },
    {
        id: 'id3',
        title: '주문3 입니다.'
    },
    {
        id: 'id4',
        title: '주문4 입니다.'
    },
    {
        id: 'id5',
        title: '주문5 입니다.'
    },
    {
        id: 'id6',
        title: '주문6 입니다.'
    },
    {
        id: 'id7',
        title: '주문7 입니다.'
    },
    {
        id: 'id8',
        title: '주문8 입니다.'
    },
    {
        id: 'id9',
        title: '주문9 입니다.'
    },
];

const tmpRoomDatas = [
    {
        id: 'id1',
        pw: 'pass word',
        title: '1번 방'
    },
    {
        id: 'id2',
        pw: 'pass word',
        title: '2번 방'
    },
    {
        id: 'id3',
        pw: 'pass word',
        title: '3번 방'
    },
    {
        id: 'id4',
        pw: 'pass word',
        title: '4번 방'
    }
];

const AdminSettingSide = () => {
    const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
    const [isAddOrder, setIsAddOrder] = useState(false);
    const [isAddRoom, setIsAddRoom] = useState(false);

    const addOrderHandler = () => {
        setIsAddOrder(!isAddOrder);
    };

    const addRoomHandler = () => {
        setIsAddRoom(!isAddRoom);
    };

    const roomClickHandler = (index) => {
        setSelectedRoomIndex(index);
    };

    const ininRoomIndex = () => {
        setSelectedRoomIndex(null)
    };

    return (
        <>
            <Modal
                // onClick={active}
                // onTouchEnd={active}
                className={cx('modal-container')}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={selectedRoomIndex !== null}
                onClose={ininRoomIndex}
                closeAfterTransition
                BackdropProps={{
                    timeout: 400,
                }}
                >
                <div className={cx('modal-content')}>
                    <div className={cx('modal-text-wrap')}>
                        <p className={cx('modal-title')}>ID</p>
                        <p className={cx('modal-text')}>{tmpRoomDatas[selectedRoomIndex]?.id}</p>
                    </div>

                    <div className={cx('modal-text-wrap')}>
                        <p className={cx('modal-title')}>RoomName</p>
                        <p className={cx('modal-text')}>{tmpRoomDatas[selectedRoomIndex]?.title}</p>
                    </div>
                    
                    <div className={cx('modal-text-wrap')}>
                        <p className={cx('modal-title')}>PassWord</p>
                        <div className={cx('modal-ok-btn-wrap')}>
                            <p className={cx('modal-text')}>{tmpRoomDatas[selectedRoomIndex]?.pw}</p>
                            <Button
                                className={cx('modal-ok-btn')}
                                onClick={ininRoomIndex}
                                >o k
                                </Button>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* 홀인원 */}
            <div className={cx('setting-side-container')}>
                <div className={cx('setting-side-content-wrap')}>
                    <AdminTitle title={'홀인원 관리'} />

                    <AdminHoleMoney />
                </div>
                
                <div className={cx('setting-side-content-wrap')}>
                    <AdminTitle title={'주문 관리'} addHandler={addOrderHandler} />

                    {
                        isAddOrder &&
                            <AddOrderComponent />
                    }

                    <Table datas={tmpOrderDatas}/>
                </div>

                {/* 방관리 */}
                <div className={cx('setting-side-content-wrap')}>
                    <AdminTitle title={'방 관리'} addHandler={addRoomHandler} />
                    {
                        isAddRoom &&
                            <AddRoomComponent />
                    }
                    

                    <Table datas={tmpRoomDatas} clickHandler={roomClickHandler}/>
                </div>
            </div>
        </>
    );
};

const AddOrderComponent = () => {
    return (
        <div className={cx('input-wrap')}>
            <TextField
                fullWidth
                label="주문 추가"
                // onChange={holeMoneyChange}
                // value={holeMoney}
                size="small"
                // disabled={!isModify}
            />
            <Button 
                className={cx('order-save-btn')}
                variant="contained"
                >
                추가
            </Button>
        </div>
    );
};

const AddRoomComponent = () => {
    return (
        <div className={cx('input-wrap', 'room-setting-wrap')}>
            <TextField
                className={cx('room-text-field')}
                fullWidth
                label="방 이름"
                // onChange={holeMoneyChange}
                // value={holeMoney}
                size="small"
                // disabled={!isModify}
            />
            <TextField
                className={cx('room-text-field')}
                fullWidth
                label="아이디"
                // onChange={holeMoneyChange}
                // value={holeMoney}
                size="small"
                // disabled={!isModify}
            />
            <TextField
                className={cx('room-text-field')}
                fullWidth
                label="비밀번호"
                // onChange={holeMoneyChange}
                // value={holeMoney}
                size="small"
                // disabled={!isModify}
            />
            <TextField
                className={cx('room-text-field')}
                fullWidth
                label="비밀번호 확인"
                // onChange={holeMoneyChange}
                // value={holeMoney}
                size="small"
                // disabled={!isModify}
            />

            <Button 
                className={cx('room-save-btn')}
                variant="contained"
                >
                추가
            </Button>
        </div>
    );
};


export default AdminSettingSide;