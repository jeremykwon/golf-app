import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { Button, TextField } from '@mui/material';

import { addCommaInNumber } from 'Lib';
import { getStorage } from 'Lib/Storage';
import { modifyHoleInOnePrice } from 'Lib/api';

const cx = classNames.bind(styles);

let undoPrice = 0;

const AdminHoleMoney = ({ price }) => {
    const [holeMoney, setHoleMoney] = useState('');
    const [isModify, setIsModify] = useState(false);
    const inputText = useRef(null);
    
    const holeMoneyChange = ({ target }) => {
        setHoleMoney(target.value);
    };

    const initUndoHoleMoney = (price) => {
        undoPrice = price;
    };

    const removeComma = () => {
        const numberHoleMoney = holeMoney.replace(/,/gi, "");
        initUndoHoleMoney(numberHoleMoney);
        setHoleMoney(numberHoleMoney);
    };

    const onModifyMode = () => {
        setIsModify(true);
        removeComma();
    };

    const changeHoleInOnePrice = async (price) => {
        const data = await modifyHoleInOnePrice({
            userId: getStorage({ key: 'user_info' }).user_id,
            holeInOnePrice: price
        });
        if (data === 'Update is Done') setHoleMoney(addCommaInNumber(holeMoney));
    };

    const saveHoleMoney = () => {
        if (Number.isInteger(Number(holeMoney)) && holeMoney !== '') {
            changeHoleInOnePrice(holeMoney);
            setIsModify(false);
        } else {
            alert('정수를 입력해주세요');
        }
    };

    useEffect(() => {
        if (price !== null) setHoleMoney(addCommaInNumber(String(price)));
    }, [price]);

    useEffect(() => {
        if (isModify) inputText.current.focus();
    }, [isModify, inputText]);

    return (
        <div className={cx('hole-in-one-wrap')}>
            <TextField
                inputRef={inputText}
                id="outlined-read-only-input"
                label="Hole in One"
                onChange={holeMoneyChange}
                value={holeMoney}
                size="small"
                disabled={!isModify}
            />
            <Button 
                className={cx('hole-in-on-save-btn')}
                variant="contained"
                onClick={() => {
                    if (isModify) {
                        saveHoleMoney();
                    } else {
                        onModifyMode();
                    }
                }}
                >
                    { isModify ? '저장' : '수정하기'}
            </Button>
        </div>
    );
};

export default AdminHoleMoney;