import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const AdminTitle = ({ title }) => {
   
    return (
        <div className={cx('admin-title-container')}>
            <h2>{title}</h2>
        </div>
    );
};

export default AdminTitle;