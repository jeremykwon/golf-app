import React from 'react';
import { useRecoilState } from 'recoil';
import classNames from 'classnames/bind';
import styles from './Alert.styles.module.scss';

import { Button, Modal } from '@mui/material';

import { alertState } from 'Store/GlobalStore';

const cx = classNames.bind(styles);


const Alert = () => {
    const [info, setInfo] = useRecoilState(alertState);

    const initInfo = () => {
        setInfo({
            isView: false,
            okHandler: () => {},
            text: ''
        });
    };

    const onOk = () => {
        info.okHandler();
        initInfo();
    }

    return (
        <Modal
            className={cx('modal-container')}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={info.isView}
            onClose={initInfo}
            closeAfterTransition
            BackdropProps={{ timeout: 400 }}
            >
                <div className={cx('modal-content')}>
                    <div className={cx('modal-title-wrap')}>
                        <p className={cx('modal-title')}>{info.text}</p>
                    </div>

                    <div className={cx('modal-btn-wrap')}>
                        <Button
                            color='warning'
                            variant='contained'
                            className={cx('modal-ok-btn', 'close-btn')}
                            onClick={initInfo}
                            >닫기
                        </Button>

                        <Button
                            variant='contained'
                            className={cx('modal-ok-btn')}
                            onClick={onOk}
                            >확인
                        </Button>
                    </div> 
                </div>
        </Modal>
    );
};

export default Alert;