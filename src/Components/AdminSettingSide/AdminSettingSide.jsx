import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { Table, AdminHoleMoney, AdminTitle } from 'Components';
import { Button, TextField } from '@mui/material';

const cx = classNames.bind(styles);

const AdminSettingSide = () => {
    

    return (
        <div className={cx('setting-side-container')}>
            <div className={cx('setting-side-content-wrap')}>
                <AdminTitle title={'홀인원'} />
                <AdminHoleMoney />
            </div>
            
            <div className={cx('setting-side-content-wrap')}>
                <AdminTitle title={'주문'} />
                <Table/>
                <div className={cx('order-add-wrap')}>
                    <TextField
                        fullWidth
                        label="주문 추가"
                        // onChange={holeMoneyChange}
                        // value={holeMoney}
                        size="small"
                        // disabled={!isModify}
                    />
                    <Button 
                        className={cx('order-save-btn')}
                        variant="contained"
                        >
                        추가
                    </Button>
                </div>
               
            </div>

            {/* <div className={cx('setting-side-content-wrap')}>
                <AdminTitle title={'주문'} />
                <Table/>
            </div> */}
        </div>
    );
};

export default AdminSettingSide;