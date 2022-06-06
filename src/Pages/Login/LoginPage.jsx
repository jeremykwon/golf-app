import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";

import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { Button, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

// lib
import { login } from 'Lib/api';
import { setStorage } from 'Lib/Storage';


const cx = classNames.bind(styles);

const LoginPage = () => {
    const [userInfo, setUserInfo] = useState({ id: '', pw: '' });
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const disabledLoginButton = useMemo(() => {
        if (userInfo.id === '' || userInfo.pw === '') return true;
        else return false;
    }, [userInfo]);

    const navigate = useNavigate();

    /* id, pw 초기화 */
    const initUserInfo = () => {
        setUserInfo({ id: '', pw: '' });
    };

    /* 엔터키를 통해 로그인 */
    const keyboardEvent = (e) => {
        if (disabledLoginButton) return;

        if (e.key === 'Enter') signIn();
    };

    /* 로그인 */
    const signIn = async () => {
        setIsLoading(true);

        const data = await login({
            id: userInfo.id,
            password: userInfo.pw
        });

        if (data === 'Not exsist user' || data === 'Not Found User') {
            initUserInfo();
            setIsError('아이디와 비밀번호를 확인하세요.');
        } else {
            let userType = data.user_type === 0 ? 'client' : 
                       data.user_type === 1 ? 'Adam' : 'Masto';
                       
            setStorage({
                key: 'user_info',
                value: {
                    nickname: data.nickname,
                    user_id: data.user_id,
                    user_type: userType,
                    token: data.token
                }
            });

            if (data.user_type === 0) navigate('/');
            else if (data.user_type === 1) navigate('/admin');
            else navigate('/master');
        }

        setIsLoading(false);
    };

    /* 유저 아이디 업데이트 */
    const changeUserId = (e) => {
        setUserInfo({
            id: e.target.value,
            pw: userInfo.pw
        });
    };

    /* 유저 비밀번호 업데이트 */
    const changeUserPw = (e) => {
        setUserInfo({
            id: userInfo.id,
            pw: e.target.value
        });
    };
    
    return (
        <div className={cx('login-container')}>
            <div className={cx('login-wrap')}>
                <div className={cx('input-wrap')}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                        fullWidth
                        onChange={changeUserId}
                        id="input-with-sx"
                        label="아이디"
                        variant="standard"
                        type="search"
                        value={userInfo.id}
                        onKeyUp={keyboardEvent}
                        />
                </div>
                
                <div className={cx('input-wrap')}>
                    <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        onChange={changeUserPw}
                        fullWidth
                        id="input-with-sx"
                        label="비밀번호"
                        variant="standard"
                        value={userInfo.pw}
                        type='password'
                        onKeyUp={keyboardEvent}
                    />
                </div>
                
                <p className={cx('error-msg')}>{ isError && '아이디와 비밀번호를 확인하세요'}</p>

                <Button
                    className={cx('input-wrap')}
                    variant="contained"
                    onClick={signIn}
                    disabled={disabledLoginButton}
                    >
                        {
                            isLoading ? <CircularProgress size={25} color="inherit" /> : '로그인'
                        }
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;

// Todo: 참고 https://mui.com/material-ui/react-text-field/