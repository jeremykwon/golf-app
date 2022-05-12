import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { Button, TextField } from '@mui/material';

import { addCommaInNumber } from 'Lib';

const cx = classNames.bind(styles);

const AdminHoleMoney = () => {
    const [holeMoney, setHoleMoney] = useState('100,000');
    const [isModify, setIsModify] = useState(false);
    
    const holeMoneyChange = ({ target }) => {
        setHoleMoney(target.value);
    };

    const removeComma = () => {
        setHoleMoney(holeMoney.replace(/,/gi, ""));
    };

    const togleModifyState = () => {
        setIsModify(!isModify);
    };

    const saveHoleMoney = () => {
        if (Number.isInteger(Number(holeMoney))) {
            setHoleMoney(addCommaInNumber(holeMoney))
            togleModifyState();
        } else {
            alert('정수만 입력가능합니다.');
        }
    };

    return (
        <div className={cx('hole-in-one-wrap')}>
                <TextField
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
                            removeComma();
                            togleModifyState();
                        }
                    }}
                    >
                        { isModify ? '저장' : '수정하기'}
                </Button>
            </div>
    );
};

export default AdminHoleMoney;