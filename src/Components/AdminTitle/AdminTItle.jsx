import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import IconButton from '@mui/material/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const cx = classNames.bind(styles);

const AdminTitle = ({ title, addHandler, isSelected }) => {
   
    return (
        <div className={cx('admin-title-container')}>
            <h2>{title}</h2>
            {
                addHandler &&
                    <IconButton
                        onClick={addHandler}
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        className={cx({ isSelected: isSelected}, { isSelected1: !isSelected})}
                        // onClick={modifyModeOn}
                        >
                        <AddRoundedIcon />
                    </IconButton>
            }
        </div>
    );
};

export default AdminTitle;