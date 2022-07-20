import { useMemo, useState } from 'react';
import styled from "styled-components";

import adDefault from 'Asset/images/ad_default.png';
import adActivate from 'Asset/images/ad_activate.png';
import bellDefault from 'Asset/images/bell_default.png';
import bellActivate from 'Asset/images/bell_activate.png';
import logoutDefault from 'Asset/images/logout_default.png';
import logoutActivate from 'Asset/images/logout_activate.png';

const icons = {
    ad: {
        default: adDefault,
        activate: adActivate
    },
    bell: {
        default: bellDefault,
        activate: bellActivate
    },
    logout: {
        default: logoutDefault,
        activate: logoutActivate
    }
}

const IconTextButton = ({ title, clickHandler }) => {
    const [isHover, setIsHover] = useState(false);
    const currentIcon = useMemo(() => {
        if (title === '광고문의') {
            return icons.ad;
        } else if (title === '로그아웃') {
            return icons.logout;
        } else {
            return icons.bell;
        }
    }, [title]);

    const setHover = () => {
        setIsHover(true);
    };

    const setUnHover = () => {
        setIsHover(false);
    };
    
    return(
        <Box
            onMouseEnter={setHover}
            onMouseLeave={setUnHover}
        >
            <img src={isHover ? currentIcon.activate : currentIcon.default} alt='버튼 아이콘' />
            { title }
        </Box>
    );
};

export default IconTextButton;

const Box = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    color: #d4d4d4;
    font-size: 13px;
    cursor: pointer;

    &:hover {
        color: #fff;
    }

    img {
        margin-right: 5px;
        width: 17px;
    }
`;