import React, { useState, useMemo, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { Table, AdminTitle } from 'Components';
import { Button, TextField } from '@mui/material';

import { makeAdmin, deleteAdmin } from 'Lib/api';

const cx = classNames.bind(styles);

const MasterLeftSide = ({ 
    selectedCompanyIndex,
    setSelectedCompanyIndex,
    setModalType,
    adList,
    adminList,
    getAdminInfo,
    getADInfo,
    setSelectedADIndex
}) => {
    const [isAddCompany, setIsAddCompany] = useState(false);
    const [isAddAdvertising, setIsAddAdvertising] = useState(false);    

    // 업체 추가 toggle
    const addCompanyHandler = () => {
        setIsAddCompany(!isAddCompany);
    };

    // 광고 추가 toggle
    const addAdvertisingHandler = () => {
        setIsAddAdvertising(!isAddAdvertising);
    };

    // 업체 선택 handler
    const selectedCompanyHandler = (index) => {
        setSelectedCompanyIndex(index);
        setModalType('company');
    };

    // 광고 선택 handler
    const selectedADHandler = (index) => {
        setSelectedADIndex(index);
        setModalType('advertising');
    };

    // 업체 삭제 handler
    const adminDeleteHandler = async (data) => {
        const res = await deleteAdmin({ adminId: data.user_id });
        if (res === 'Delete is Done') getAdminInfo();
    };

    // 광고 삭제 handler
    const adDeleteHandler = async (data) => {
        // TODO: 광고 삭제 로직 추가
        // const res = await deleteAdmin({ adminId: data.user_id });
        // if (res === 'Delete is Done') getAdminInfo();
    };

    return (
        <div className={cx('master-left-side-container')}>
            <div className={cx('content-wrap')}>
                <AdminTitle title={'업체 관리'} addHandler={addCompanyHandler} isSelected={isAddCompany} />
                {
                    isAddCompany &&
                        <AddCompanyComponent
                            getAdminInfo={getAdminInfo}
                            addCompanyHandler={addCompanyHandler}
                            />
                }
                <Table 
                    datas={adminList}
                    clickHandler={selectedCompanyHandler}
                    selectedIndex={selectedCompanyIndex}
                    deleteHandler={adminDeleteHandler}
                    />
            </div>

            <div className={cx('content-wrap')}>
                <AdminTitle title={'광고 관리'} addHandler={addAdvertisingHandler} isSelected={isAddAdvertising} />
                {
                    isAddAdvertising &&
                        <AddAdvertisingComponent />
                }
                <Table
                    datas={adList}
                    clickHandler={selectedADHandler}
                    deleteHandler={adDeleteHandler}
                    />
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
                size="small"
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

// 업체 추가
const AddCompanyComponent = ({ getAdminInfo, addCompanyHandler }) => {
    /* ---------- 데이터 정의 영역 ---------- */
    const [companyInfo, setCompanyInfo] = useState({
        branchName: '',
        id: '',
        pw1: '',
        pw2: ''
    });
    const idDispabeled = useMemo(() => {
        if (
            companyInfo.branchName === '' || 
            companyInfo.id === '' || 
            companyInfo.pw1 === '' ||
            companyInfo.pw2 === ''
        ) return true;
        else return false;
    }, [companyInfo]);
    const inputs = [
        {
            label: '지점 명',
            key: 'branchName'
        },
        {
            label: '아이디',
            key: 'id'
        },
        {
            label: '비밀번호',
            key: 'pw1'
        },
        {
            label: '비밀번호 확인',
            key: 'pw2'
        }
    ];

    /* ---------- 함수 영역 ---------- */
    const changeCompanyInfo = ({ e, key }) => {
        setCompanyInfo({
            ...companyInfo,
            [key]: e.target.value
        });
    };

    const createValidationText = () => {
        if (companyInfo.pw1 !== companyInfo.pw2) return '입력하신 비밀번호가 일치하지 않습니다.';
        return '';
    };

    const createAdmin = async ()=> {
        const errText = createValidationText();
        if (errText !== '') {
            alert(errText);
            return;
        }

        const data = await makeAdmin({ 
            id: companyInfo.id, 
            password: companyInfo.pw1,
            nickname: companyInfo.branchName 
        });

        if (data === 'Duplicate ID') alert('아이디가 중복됩니다.');
        else if (data === 'Duplicate NICKNAME') alert('닉네임이 중복됩니다.');
        else {
            alert('업체 생성이 완료되었습니다.');
            addCompanyHandler();
            getAdminInfo();
        }
    };
    
    return (
        <div className={cx('input-wrap', 'room-setting-wrap')}>
            {
                inputs.map((item, index) => {
                    return <TextField
                        key={index}
                        className={cx('company-text-field')}
                        fullWidth
                        label={item.label}
                        onChange={(e) => { changeCompanyInfo({ e, key: item.key }) }}
                        value={companyInfo[`${item.key}`]}
                        size="small"
                        type={item.key.includes('pw') ? 'password' : 'text'}
                    />
                })
            }

            <Button 
                className={cx('company-save-btn')}
                variant="contained"
                disabled={idDispabeled}
                onClick={createAdmin}
                >
                추가
            </Button>
        </div>
    );
};

export default MasterLeftSide;