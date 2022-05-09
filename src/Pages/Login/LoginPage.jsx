import React, { useState } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { Button, TextField } from '@mui/material';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const LoginPage = () => {
    const [isError, setIsError] = useState(true);
    
    return (
        <div className={cx('login-container')}>
            <div className={cx('login-wrap')}>
                <div className={cx('input-wrap')}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField fullWidth  id="input-with-sx" label="아이디" variant="standard" />
                </div>
                
                <div className={cx('input-wrap')}>
                    <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField fullWidth id="input-with-sx" label="비밀번호" variant="standard" />
                </div>
                
                <p className={cx('error-msg')}>{ isError && '아이디와 비밀번호를 확인하세요'}</p>
                

                <Button className={cx('input-wrap')} variant="contained">로그인</Button>
            </div>
        </div>
    );
};

export default LoginPage;

// Todo: 참고 https://mui.com/material-ui/react-text-field/