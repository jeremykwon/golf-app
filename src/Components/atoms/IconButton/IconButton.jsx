/* check, trash 등 아이콘 버튼 */
import { useMemo } from 'react';
import styled from "styled-components";

import checkDisabled from 'Asset/images/check_disable.png';
import checkEnabled from 'Asset/images/check_enable.png';
import trashDisabled from 'Asset/images/trash_disable.png';
import trashEnabled from 'Asset/images/trash_enable.png';


const IconButton = ({
    type,
    clickHandler,
    color
}) => {
    let icon = useMemo(()=> {
        if (type === 'check') {
            if (clickHandler) return checkDisabled;
            else return checkEnabled;
        } else {
            if (clickHandler) return trashDisabled;
            else return trashEnabled;
        }
    }, [type, clickHandler]);

    return(
        <Button
            cursor={clickHandler ? 'pointer' : 'auto'}
            onClick={clickHandler}
            backColor={color}
        >
            <img src={icon} alt='버튼' />
        </Button>
    );
};

export default IconButton;

const Button = styled.div`
    display: flex;
    cursor:  ${ ({ cursor }) => cursor };
    width: fit-content;
    height: fit-content;
    margin-left: 10px;
    align-items: center;
    user-select: none;
    

    img {
        width: 25px;
        height: 25px;
    }

    @media screen and (max-width: 1000px) {
        img {
            width: 17px;
            height: 17px;
        }
    }
`;