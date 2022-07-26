import React, { useState } from 'react';
import styled from "styled-components";

import { getStorage } from 'Lib/Storage';
import { modifyHoleInOnePrice } from 'Lib/api';

import { IconText, TextToggle, HoleinoneTextBox } from 'Components/atoms';

import holeinone from 'Asset/images/holeinone_40.svg';

const HoleinoneSettingContainer = ({ price }) => {
    const [isUseHoleMoney, seIsUseHoleMoney] = useState(price !== 0);
    const [holeMoney, setHoleMoney] = useState('');
    const [isModify, setIsModify] = useState(false);

    const changeUseHoleState = (e) => {
        let state = e.target.checked;
        seIsUseHoleMoney(state);
        setIsModify(false);

        if (state) changeHoleInOnePrice(holeMoney, 1);
        else changeHoleInOnePrice(0, 0);
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

    return(
        <Box>
            <FlexOneBox>
                <IconText imageSrc={holeinone} title={'홀인원 관리'} />
            </FlexOneBox>
            
            <MarginBox>
                <TextToggle
                    title={'홀인원기능'}
                    price={price}
                    changeHandler={changeUseHoleState}
                    />
            </MarginBox>
            
            <HoleinoneTextBox
                price={price}
                isUseHoleMoney={isUseHoleMoney}
                seIsUseHoleMoney={seIsUseHoleMoney}
                setHoleMoney={setHoleMoney}
                holeMoney={holeMoney}
                isModify={isModify}
                setIsModify={setIsModify}
                changeHoleInOnePrice={changeHoleInOnePrice}
                />
        </Box>
    );
};

export default HoleinoneSettingContainer;

const Box = styled.div`
    width: 100%;
    height: 114px;
    padding: 27px 30px;
    border-radius: 15px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
`;

const FlexOneBox = styled.div`
    flex: 1;
`;

const MarginBox = styled.div`
    margin-right: 30px;
`;

