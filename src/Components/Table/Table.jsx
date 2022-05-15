import React, { useState, useRef, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileMoveRoundedIcon from '@mui/icons-material/DriveFileMoveRounded';

const cx = classNames.bind(styles);



const Table = ({ 
    datas, 
    clickHandler=()=> {}, 
    modifyHandler, 
    moveHandler,
    selectedIndex
}) => {

    return (
        <div className={cx('table-container')}>
            {
                datas.map((data, index) => 
                    <TableContent
                        index={index}
                        data={data}
                        key={index}
                        clickHandler={clickHandler}
                        modifyHandler={modifyHandler}
                        moveHandler={moveHandler}
                        selectedIndex={selectedIndex}
                        />)
            }
        </div>
    );
};

const TableContent = ({ 
    data,
    clickHandler,
    index,
    modifyHandler,
    moveHandler,
    selectedIndex
}) => {
    const [isModify, setIsModify] = useState(false);
    const inputRef = useRef();

    const modifyModeOn = () => {
        setIsModify(!isModify);
    }

    useEffect(() => {
        if (isModify) inputRef.current.focus();
    }, [isModify]);

    console.log('selectedIndex---', selectedIndex)
    console.log('index---', index)

    return (
        <div 
            className={cx('content-container', {selected: selectedIndex === index} )}
            onClick={() => { clickHandler(index) }}
            >
            <input
                ref={inputRef}
                className={cx('content-text')}
                value={data.title}
                disabled={!isModify}
                title={data.title}
                />

            <div className={cx('content-btn-wrap')}>
                {
                    moveHandler &&
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <DriveFileMoveRoundedIcon />
                        </IconButton>
                }

                { 
                    modifyHandler &&
                        (
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
                        )
                        
                }

                <IconButton color="primary" aria-label="upload picture" component="span">
                    <DeleteForeverIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default Table;