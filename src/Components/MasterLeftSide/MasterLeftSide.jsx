import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { Table, AdminTitle } from 'Components';
import { Button, TextField } from '@mui/material';

const cx = classNames.bind(styles);

const tmpCompanyDatas = [
    {
        id: 'id1',
        title: '강동 골프존'
    },
    {
        id: 'id2',
        title: '강서 골프존'
    },
    {
        id: 'id3',
        title: '강남 골프의신'
    },
    {
        id: 'id4',
        title: '강남 골프존'
    },
    {
        id: 'id5',
        title: '강북 골프존'
    },
    {
        id: 'id6',
        title: '강북 골플의역사'
    },
    {
        id: 'id7',
        title: '강남 골프골프'
    },
    {
        id: 'id8',
        title: '강서 골프골프'
    },
    {
        id: 'id9',
        title: '동작 스크린골프'
    },
];

const tmpAdDatas = [
    {
        id: 'id1',
        title: '강동 순대국집'
    },
    {
        id: 'id2',
        title: '강서 스크린야구'
    },
    {
        id: 'id3',
        title: '강남 갈비찜'
    },
    {
        id: 'id4',
        title: '강남 피자마루'
    },
    {
        id: 'id5',
        title: '강북 이박사 철물점'
    },
    {
        id: 'id6',
        title: '강북 스크린골프장'
    },
    {
        id: 'id7',
        title: '강남 골프갤러리'
    },
];


const MasterLeftSide = ({ selectedCompanyIndex, setSelectedCompanyIndex }) => {
    const [isAddCompany, setIsAddCompany] = useState(false);
    const [isAddAdvertising, setIsAddAdvertising] = useState(false);

    const addCompanyHandler = () => {
        setIsAddCompany(!isAddCompany);
    };

    const addAdvertisingHandler = () => {
        setIsAddAdvertising(!isAddAdvertising);
    };

    const selectedCompanyHandler = (index) => {
        setSelectedCompanyIndex(index);
    };

    const advertisingMoveHandler = () => {
    };

    return (
        <div className={cx('master-left-side-container')}>
            <div className={cx('content-wrap')}>
                <AdminTitle title={'업체 관리'} addHandler={addCompanyHandler} />
                {
                    isAddCompany &&
                        <AddCompanyComponent />
                }
                <Table 
                    datas={tmpCompanyDatas}
                    clickHandler={selectedCompanyHandler}
                    selectedIndex={selectedCompanyIndex}
                    />
            </div>

            <div className={cx('content-wrap')}>
                <AdminTitle title={'광고 관리'} addHandler={addAdvertisingHandler} />
                {
                    isAddAdvertising &&
                        <AddAdvertisingComponent />
                }
                <Table datas={tmpAdDatas} moveHandler={advertisingMoveHandler} />
            </div>
        </div>
    );
};

const AddAdvertisingComponent = () => {
    const [fileName, setFileName] = useState('');

    const clickUploadBtn = () => {
        document.getElementById('file_upload_input').click();
    };

    return (
        <div className={cx('input-wrap', 'room-setting-wrap')}>
            <TextField
                className={cx('company-text-field')}
                fullWidth
                label="광고 명"
                // onChange={holeMoneyChange}
                // value={holeMoney}
                size="small"
                // disabled={!isModify}
            />

            <div className={cx('file-upload-wrap')}>
                <TextField
                    className={cx('file-name-field')}
                    fullWidth
                    label="파일 명"
                    // onChange={holeMoneyChange}
                    value={fileName}
                    size="small"
                    disabled
                />

                <Button 
                    className={cx('upload-btn')}
                    variant="contained"
                    onClick={clickUploadBtn}
                    >
                    파일 업로드
                </Button>
            </div>

            <input
                className={cx('upload-input')}
                label="광고 명"
                size="small"
                type='file'
                onChange={(e) => {
                    setFileName(e.target.value)
                }}
                id='file_upload_input'
            />

            <Button 
                className={cx('company-save-btn')}
                variant="contained"
                >
                추가
            </Button>
        </div>
    );
};

const AddCompanyComponent = () => {
    
    return (
        <div className={cx('input-wrap', 'room-setting-wrap')}>
            <TextField
                className={cx('company-text-field')}
                fullWidth
                label="지점 명"
                // onChange={holeMoneyChange}
                // value={holeMoney}
                size="small"
                // disabled={!isModify}
            />
            <TextField
                className={cx('company-text-field')}
                fullWidth
                label="아이디"
                // onChange={holeMoneyChange}
                // value={holeMoney}
                size="small"
                // disabled={!isModify}
            />
            <TextField
                className={cx('company-text-field')}
                fullWidth
                label="비밀번호"
                // onChange={holeMoneyChange}
                // value={holeMoney}
                size="small"
                // disabled={!isModify}
            />
            <TextField
                className={cx('company-text-field')}
                fullWidth
                label="비밀번호 확인"
                // onChange={holeMoneyChange}
                // value={holeMoney}
                size="small"
                // disabled={!isModify}
            />

            <Button 
                className={cx('company-save-btn')}
                variant="contained"
                >
                추가
            </Button>
        </div>
    );
};

export default MasterLeftSide;