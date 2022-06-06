import React, { useState, useRef, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { alertState } from 'Store/GlobalStore';

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
    selectedIndex,
    deleteHandler
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
                        selectedIndex={selectedIndex}
                        deleteHandler={() => { deleteHandler(data); }}
                        />)
            }
            {
                datas.length === 0 &&
                    <p style={{ margin: '10px 0', textAlign: 'center', fontSize: '18px' }}>데이터를 추가해주세요.</p>
            }
        </div>
    );
};

const TableContent = ({ 
    data,
    clickHandler,
    index,
    modifyHandler,
    selectedIndex,
    deleteHandler
}) => {
    console.log(data)
    const [isModify, setIsModify] = useState(false);
    const inputRef = useRef();

    const setInfo = useSetRecoilState(alertState);

    const modifyModeOn = () => {
        setIsModify(!isModify);
    };

    const modalOpen = () => {
        setInfo({
            isView: true,
            okHandler: () => { deleteHandler(index) },
            text: `${data.nickname || data.name || data.title} 을(를) 삭제하시겠습니까?`
        });
    };

    useEffect(() => {
        if (isModify) inputRef.current.focus();
    }, [isModify]);

    return (
        <div 
            className={cx('content-container', {selected: selectedIndex === index} )}
            onClick={() => { clickHandler(index) }}
            >
            <input
                ref={inputRef}
                className={cx('content-text')}
                value={data.nickname || data.name || data.title}
                disabled={!isModify}
                title={data.nickname || data.name || data.title}
                />

            <div className={cx('content-btn-wrap')} onClick={(e) => {e.stopPropagation()}}>
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

                <IconButton 
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={modalOpen}
                    >
                    <DeleteForeverIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default Table;