import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { AdminSettingSide, AdminJobList } from 'Components';

const cx = classNames.bind(styles);

const AdminPage = () => {

    return (
        <div className={cx('admin-container')}>
            <AdminSettingSide />
            <AdminJobList />
        </div>
    );
};

export default AdminPage;