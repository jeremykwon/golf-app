import styled from "styled-components";
import { useSetRecoilState } from 'recoil';
import { adminModalState } from 'Store/GlobalStore';

import { IconText } from 'Components/atoms';

import room from 'Asset/images/room_40.svg';
import order from 'Asset/images/ordermanage_40.svg';

const AddTitleHeader = ({ type }) => {
    const setModalInfo = useSetRecoilState(adminModalState);

    return(
        <Box>
            <IconText imageSrc={type === '주문관리' ? order : room} title={type} />
            <AddButton onClick={() => {setModalInfo(type);}}>+ 추가하기</AddButton>
        </Box>
    );
};

export default AddTitleHeader;

const Box = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AddButton = styled.button`
    display: flex;
    background-color: inherit;
    cursor: pointer;
    color: #4d6aed;
    font-size: 20px;
    height: 30px;

    span {
        font-size: 25px;
    }
`;