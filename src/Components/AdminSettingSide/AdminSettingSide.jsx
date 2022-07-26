import React, { useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { Table, AdminHoleMoney, AdminTitle } from 'Components';
import { Button, TextField, Modal } from '@mui/material';
import { createOrderMenu, deleteOrderMenu, createClient, deleteClient } from 'Lib/api';

const cx = classNames.bind(styles);

const AdminSettingSide = ({ pageInfo, refreshMenuList, refreshClientList }) => {
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
        setSelectedRoomIndex(null);
    };

    const deleteOrderMenuHandler = async (data) => {
        const res = await deleteOrderMenu({ menuId: data.menu_id });
        if (res === 'Delete is Done') {
            alert('주문 삭제 완료');
            refreshMenuList();
        }
    };

    const deleteClientHandler = async (data) => {
        const res = await deleteClient({ clientId: data.user_id });
        if (res === 'Delete is Done') {
            alert('방 삭제 완료');
            refreshClientList();
        }
    };
    
    return (
        <>
            <Modal
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
                        <p className={cx('modal-text')}>{pageInfo.clientList[selectedRoomIndex]?.login_id}</p>
                    </div>

                    <div className={cx('modal-text-wrap')}>
                        <p className={cx('modal-title')}>RoomName</p>
                        <div className={cx('modal-ok-btn-wrap')}>
                        <p className={cx('modal-text')}>{pageInfo.clientList[selectedRoomIndex]?.nickname}</p>
                            <Button
                                className={cx('modal-ok-btn')}
                                onClick={ininRoomIndex}
                                >o k
                                </Button>
                        </div>
                    </div>
                    
                    {/* <div className={cx('modal-text-wrap')}>
                        <p className={cx('modal-title')}>PassWord</p>
                        <div className={cx('modal-ok-btn-wrap')}>
                            <p className={cx('modal-text')}>{tmpRoomDatas[selectedRoomIndex]?.pw}</p>
                            <Button
                                className={cx('modal-ok-btn')}
                                onClick={ininRoomIndex}
                                >o k
                                </Button>
                        </div>
                    </div> */}
                </div>
            </Modal>

            {/* 홀인원 */}
            <div className={cx('setting-side-container')}>
                <div className={cx('setting-side-content-wrap')}>
                    <AdminTitle title={'홀인원 관리'} />

                    <AdminHoleMoney price={pageInfo.holeInOne} />
                </div>
                
                <div className={cx('setting-side-content-wrap')}>
                    <AdminTitle title={'주문 관리'} addHandler={addOrderHandler} isSelected={isAddOrder} />

                    {
                        isAddOrder &&
                            <AddOrderComponent refreshMenuList={refreshMenuList} />
                    }

                    <Table
                        datas={pageInfo.menuList}
                        keyText={'menu_name'}
                        deleteHandler={deleteOrderMenuHandler}
                        />
                </div>

                {/* 방관리 */}
                <div className={cx('setting-side-content-wrap')}>
                    <AdminTitle title={'방 관리'} addHandler={addRoomHandler} isSelected={isAddRoom} />
                    {
                        isAddRoom &&
                            <AddRoomComponent
                                refreshClientList={refreshClientList}
                            />
                    }

                    <Table 
                        datas={pageInfo.clientList}
                        clickHandler={roomClickHandler}
                        keyText={'nickname'}
                        deleteHandler={deleteClientHandler}
                        />
                </div>
            </div>
        </>
    );
};

const AddOrderComponent = ({ refreshMenuList }) => {
    const [inputText, setInputText] = useState('');

    const initInputText = () => {
        setInputText('');
    };

    const createOrderMenuHandler = async ({ order }) => {
        if (order === '') {
            alert('주문을 입력해주세요');
            return;
        }
        const res = await createOrderMenu({ menuName: order});
        if (res.menu_list) {
            alert('주문이 생성되었습니다.');
            refreshMenuList();
            initInputText();
        } else {
            alert('주문 생성 에러');
        }
    };
    return (
        <div className={cx('input-wrap')}>
            <TextField
                fullWidth
                label="주문 추가"
                onChange={(e)=> {setInputText(e.target.value)}}
                value={inputText}
                size="small"
                // disabled={!isModify}
            />
            <Button 
                className={cx('order-save-btn')}
                variant="contained"
                onClick={() => {
                    createOrderMenuHandler({ order: inputText });
                }}
                >
                추가
            </Button>
        </div>
    );
};

const AddRoomComponent = ({ refreshClientList }) => {
    const [clientInfo, setClientInfo] = useState({
        roomName: '',
        id: '',
        pw1: '',
        pw2: ''
    });
    
    const idDispabeled = useMemo(() => {
        if (
            clientInfo.roomName === '' || 
            clientInfo.id === '' || 
            clientInfo.pw1 === '' ||
            clientInfo.pw2 === ''
        ) return true;
        else return false;
    }, [clientInfo]);
    
    const inputs = [
        {
            label: '방 이름',
            key: 'roomName'
        },
        {
            label: '아이디',
            key: 'id'
        },
        {
            label: '비밀번호',
            key: 'pw1'
        },
        {
            label: '비밀번호 확인',
            key: 'pw2'
        }
    ];

    /* ---------- 함수 영역 ---------- */
    const initClientInfo = () => {
        setClientInfo({
            roomName: '',
            id: '',
            pw1: '',
            pw2: ''
        });
    };

    const changeclientInfo = ({ e, key }) => {
        setClientInfo({
            ...clientInfo,
            [key]: e.target.value
        });
    };

    const createValidationText = () => {
        if (clientInfo.pw1 !== clientInfo.pw2) return '입력하신 비밀번호가 일치하지 않습니다.';
        return '';
    };

    const createClientHandler = async ()=> {
        const errText = createValidationText();
        if (errText !== '') {
            alert(errText);
            return;
        }

        const data = await createClient({ 
            id: clientInfo.id, 
            password: clientInfo.pw1,
            nickname: clientInfo.roomName 
        });

        if (data === 'Duplicate ID') alert('아이디가 중복됩니다.');
        else if (data === 'Duplicate NICKNAME') alert('방이름이 중복됩니다.');
        else {
            alert('방 생성이 완료되었습니다.');
            refreshClientList();
            initClientInfo();
            // addCompanyHandler();
            // getAdminInfo();
        }
    };

    return (
        <div className={cx('input-wrap', 'room-setting-wrap')}>
            {
                inputs.map((item, index) => 
                    <TextField
                        key={index}
                        className={cx('room-text-field')}
                        fullWidth
                        label={item.label}
                        onChange={(e) => { changeclientInfo({ e, key: item.key }) }}
                        value={clientInfo[`${item.key}`]}
                        size="small"
                        type={item.key.includes('pw') ? 'password' : 'text'}
                    />
                )
            }
            
            <Button 
                className={cx('room-save-btn')}
                variant="contained"
                disabled={idDispabeled}
                onClick={createClientHandler}
                >
                추가
            </Button>
        </div>
    );
};


export default AdminSettingSide;