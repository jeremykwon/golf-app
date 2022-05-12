import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';

const cx = classNames.bind(styles);

const AdminJobList = () => {

    return (
        <div className={cx('job-list-container')}>
            <JobLsitComponent />
        </div>
    );
};

const JobLsitComponent = () => {
    const [isChecked, setIsChecked] = useState(false);
    const tmpJobList = [1,2,3,4,5,6,7,8];
    
    const checkingJob = () => {

    };

    return (
        <div className={cx('job-list-content-container')}>
            {
                tmpJobList.map((i, index) => {
                    return (
                        <div key={index} className={cx('job-container')}>
                            <div className={cx('job-time-wrap')}>
                                <p className={cx('job-time-text')}>13:00</p>
                                <p className={cx('job-date-text')}>2022-05-10</p>
                            </div>
                            
                            <div className={cx('job-box')}>
                                <p className={cx('room-name')}>1111</p>
                                <p className={cx('job-text')}>물좀 가져다 주세요물좀 가져다 주세요물좀 가져다 주세요물좀 가져다 주세요</p>
                                <div className={cx('job-btn-wrap')}>
                                    {
                                        !isChecked ?
                                            <IconButton 
                                                color="primary"
                                                aria-label="upload picture"
                                                component="span"
                                                onClick={checkingJob}
                                                >
                                                <CheckCircleIcon
                                                    fontSize='large'
                                                    />
                                            </IconButton>
                                        :
                                        <p>완료</p>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};



export default AdminJobList;