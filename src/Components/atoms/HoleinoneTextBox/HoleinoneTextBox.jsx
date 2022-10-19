/* 텍스트 + 토글버튼 */
import styled from "styled-components";

import { useState, useEffect, useRef } from 'react';
import { ColorButton } from 'Components/atoms';
import { TextField } from '@mui/material';

// library
import { addCommaInNumber } from 'Lib';

let undoPrice = 0;

const HoleinoneTextBox = ({
    price,
    isUseHoleMoney,
    seIsUseHoleMoney,
    setHoleMoney,
    holeMoney,
    isModify,
    setIsModify,
    changeHoleInOnePrice
}) => {
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

    const saveHoleMoney = () => {
        if (Number.isInteger(Number(holeMoney)) && holeMoney !== '') {
            changeHoleInOnePrice(holeMoney, 2);
            setHoleMoney(addCommaInNumber(String(holeMoney)));
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

    return(
        <Box>
            <TextField
                inputRef={inputText}
                id="outlined-read-only-input"
                label="홀인원 금액"
                onChange={holeMoneyChange}
                value={holeMoney}
                size="small"
                disabled={!isModify}
            />
            <p>원</p>

            <ColorButton
                title={isModify ? '저장하기' : '수정하기'}
                disabled={!isUseHoleMoney}
                clickHandler={() => {
                    if (isModify) {
                        saveHoleMoney();
                    } else {
                        onModifyMode();
                    }
                }}
                height={'34px'}
                width={'100px'}
                color={'black'}
                />
        </Box>
    );
};

export default HoleinoneTextBox;

const Box = styled.div`
    display: flex;
    color: #6b7583;
    align-items: center;
    align-self: end;

    p {
        font-size: 15px;
        color: #252733;
        margin-left: 10px;
        margin-right: 20px;
    }
`;