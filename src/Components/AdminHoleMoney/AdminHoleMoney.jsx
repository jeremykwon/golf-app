import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { Button, TextField, Switch, FormControlLabel } from '@mui/material';

import { addCommaInNumber } from 'Lib';
import { getStorage } from 'Lib/Storage';
import { modifyHoleInOnePrice } from 'Lib/api';

const cx = classNames.bind(styles);

let undoPrice = 0;

const AdminHoleMoney = ({ price }) => {
    const [isUseHoleMoney, seIsUseHoleMoney] = useState(price !== 0);
    const [holeMoney, setHoleMoney] = useState('');
    const [isModify, setIsModify] = useState(false);
    const inputText = useRef(null);

    const holeMoneyChange = ({ target }) => {
        const check = /^[0-9]+$/;
        const money = Number(target.value.replaceAll(',', ''));
        
        if (!check.test(money)) {
            alert('정수만 입력 가능합니다');
            return;
        } else if (money > 500000000) {
            alert('금액이 너무 높습니다');
            return;
        }

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

    const changeHoleInOnePrice = async (price, actionType) => {
        const data = await modifyHoleInOnePrice({
            userId: getStorage({ key: 'user_info' }).user_id,
            holeInOnePrice: price
        });
        
        if (data === 'Update is Done') {
            if (actionType === 0) alert('홀인원 상금 기능을 사용하지 않습니다');
            else if (actionType === 1) alert('홀인원 상금 기능을 사용합니다.');
            else alert('홀인원 상금이 적용되었습니다')
        }
    };

    const saveHoleMoney = () => {
        if (Number.isInteger(Number(holeMoney)) && holeMoney !== '') {
            changeHoleInOnePrice(holeMoney, 2);
            setHoleMoney(addCommaInNumber(String(holeMoney)));
            setIsModify(false);
        } else {
            alert('정수를 입력해주세요');
        }
    };

    const changeUseHoleState = (e) => {
        let state = e.target.checked;
        seIsUseHoleMoney(state);
        setIsModify(false);

        if (state) changeHoleInOnePrice(holeMoney, 1);
        else changeHoleInOnePrice(0, 0);
    };

    useEffect(() => {
        if (price !== null) setHoleMoney(addCommaInNumber(String(price)));
    }, [price]);

    useEffect(() => {
        if (isModify) inputText.current.focus();
    }, [isModify, inputText]);

    return (
        <div className={cx('hole-in-one-wrap')}>
            <FormControlLabel 
                className={cx('test')}
                control={
                    <Switch
                        defaultChecked={price !== 0 ? true : false}
                        onChange={changeUseHoleState}
                        />
                }
                label="홀인원기능"
                />
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
                disabled={!isUseHoleMoney}
                >
                    { isModify ? '저장' : '수정하기'}
            </Button>

            

        </div>
    );
};

export default AdminHoleMoney;