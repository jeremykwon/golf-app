import React, { useState, useRef, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const cx = classNames.bind(styles);

let tmpDatas = [1,2,3,4,5,6,7,8,9,10,11];

const Table = ({ datas }) => {

    return (
        <div className={cx('table-container')}>
            {
                tmpDatas.map((col, index) => <TableContent key={index} />)
            }
        </div>
    );
};

const TableContent = () => {
    const [isModify, setIsModify] = useState(false);
    const inputRef = useRef();

    const modifyModeOn = () => {
        setIsModify(!isModify);
    }

    useEffect(() => {
        if (isModify) inputRef.current.focus();
    }, [isModify]);

    return (
        <div className={cx('content-container')}>
            <input
                ref={inputRef}
                className={cx('content-text')}
                value='This is Text!This is Text!This is Text!This is Text!This is Text!This is Text!'
                disabled={!isModify}
                title={'This is Text!This is Text!This is Text!This is Text!This is Text!This is Text!'}
                />

            

            <div className={cx('content-btn-wrap')}>
                { 
                    isModify ? 
                        <Button onClick={modifyModeOn} variant="contained">적용</Button> 
                    :
                        <IconButton 
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={modifyModeOn}
                            >
                            <ChangeCircleIcon />
                        </IconButton>
                }

                <IconButton color="primary" aria-label="upload picture" component="span">
                    <DeleteForeverIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default Table;