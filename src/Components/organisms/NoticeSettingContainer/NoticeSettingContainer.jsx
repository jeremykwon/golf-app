import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import { TextField } from '@mui/material';

import { IconText, ColorButton } from 'Components/atoms';

import { modifyNotice } from 'Lib/api';

import holeinone from 'Asset/images/holeinone_40.svg';

const NoticeSettingContainer = ({ noticeText }) => {
    const [notice, seTNotice] = useState('');

    const changeNotice = (e) => {
        seTNotice(e.target.value);
    };

    const modifyNoticeHandler = async () => {
        const res = await modifyNotice({ message: notice });
        if (res.message) {
            alert('공지사항이 저장되었습니다.');
        } else {
            alert('modify error');
        }
    };

    useEffect(() => {
        seTNotice(noticeText);
    }, [noticeText]);

    return(
        <Box>
            <FlexOneBox>
                <IconText imageSrc={holeinone} title={'공지 관리'} />
            </FlexOneBox>
            
            <TextField
                // inputRef={inputText}
                id="outlined-read-only-input"
                label="공지사항"
                onChange={changeNotice}
                value={notice}
                size="small"
                // disabled={!isModify}
                fullWidth
            />

            <ColorButton
                title={'저장하기'}
                disabled={notice === ''}
                clickHandler={modifyNoticeHandler}
                margin={'0 0 0 20px'}
                height={'34px'}
                width={'140px'}
                color={'black'}
                />
        </Box>
    );
};

export default NoticeSettingContainer;

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
    min-width: 250px;
`;

