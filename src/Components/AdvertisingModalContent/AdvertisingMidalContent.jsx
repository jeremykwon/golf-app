import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { getAdminADInfo } from 'Lib/api';

import { Table, AdminTitle } from 'Components';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';

const cx = classNames.bind(styles);

const AdvertisingModalContent = ({ modalClose, selectedAD }) => {
    const saveBtnClickHandler = () => {
        modalClose();
    };

    // const getADInfo = async () => {
    //     let adInfo = await getAdminADInfo({ userId: selectedAD.selectedAD });
    // };

    useEffect(() => {
        // getADInfo();
        console.log(selectedAD)
    }, []);

    return (
        <div className={cx('modal-content-body')}>
            {
                selectedAD?.type === 0 && <img src={selectedAD.url} alt='광고 이미지' />
            }

            {
                selectedAD?.type === 1 && 
                    <video autoPlay muted>
                        <source src={selectedAD.url} type="video/mp4" />
                    </video>
            }
        </div>
    );
};

export default AdvertisingModalContent;