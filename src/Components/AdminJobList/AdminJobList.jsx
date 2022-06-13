import React, { useEffect, useState } from 'react';

import { completeOrder } from 'Lib/api';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

const cx = classNames.bind(styles);

const AdminJobList = ({ orderList }) => {
    return (
        <div className={cx('job-list-container')}>
            <JobLsitComponent orderList={orderList} />
        </div>
    );
};
// log_id

const JobLsitComponent = ({ orderList }) => {
    const [checkedIdList, setCheckedIdList] = useState([]);

    // const makeOrderList = useMemo(() => {
    //     return orderList.map(order => {
    //         return {
    //             ...order,
    //             checked: false
    //         }
    //     });
    // }, [orderList]);
    // console.log(makeOrderList)

    const addCheckedId = (id) => {
        setCheckedIdList([...checkedIdList, id]);
    };
    
    const checkingJob = async (order) => {
        const res = await completeOrder({ clientId: order.user_id, logId: order.log_id });

        if (res === 'Delete is Done') {
            addCheckedId(order.log_id);
        }
    };

    return (
        <div className={cx('job-list-content-container')}>
            {
                orderList.map((order, index) => {
                    return (
                        <div key={index} className={cx('job-container')}>
                            <div className={cx('job-time-wrap')}>
                                <p className={cx('job-time-text')}>13:00</p>
                                <p className={cx('job-date-text')}>2022-05-10</p>
                            </div>
                            
                            <div className={cx('job-box')}>
                                <div className={cx('job-box-header')}>
                                    <p className={cx('room-name')}>1111</p>
                                
                                    <div className={cx('job-btn-wrap')}>
                                        <IconButton 
                                            color="primary"
                                            aria-label="upload picture"
                                            component="span"
                                            onClick={() => {checkingJob(order)}}
                                            >
                                            {
                                                checkedIdList.includes(order.log_id) ?
                                                    <CheckCircleIcon
                                                        fontSize='medium'   // large
                                                    />
                                                    :
                                                    <CircleOutlinedIcon
                                                        fontSize='medium'   // large
                                                    />
                                                
                                            }
                                        </IconButton>
                                    </div>
                                </div>
                                <p className={cx('job-text')}>{ order.comment }</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};



export default AdminJobList;