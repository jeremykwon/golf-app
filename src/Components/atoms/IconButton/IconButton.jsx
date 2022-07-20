import { useMemo } from 'react';
import styled from "styled-components";

import checkDisabled from 'Asset/images/check_disable.png';
import checkEnabled from 'Asset/images/check_enable.png';
import trashDisabled from 'Asset/images/trash_disable.png';
import trashEnabled from 'Asset/images/trash_enable.png';


const IconButton = ({
    type,
    disabled,
    clickHandler
}) => {
    let icon = useMemo(()=> {
        if (type === 'check') {
            if (disabled) return checkDisabled;
            else return checkEnabled;
        } else {
            if (disabled) return trashDisabled;
            else return trashEnabled;
        }
    }, [type, disabled]);

    return(
        <Button
            cursor={clickHandler ? 'pointer' : 'auto'}
            onClick={clickHandler}
        >
            <img src={icon} alt='버튼' />
        </Button>
    );
};

export default IconButton;

const Button = styled.button`
    display: flex;
    cursor:  ${ ({ cursor }) => cursor };
    width: fit-content;
    height: fit-content;
    margin-left: 10px;
    align-items: center;

    img {
        width: 17px;
        height: 17px;
    }
`;