import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { MasterLeftSide, CompanyModalContent, AdvertisingModalContent } from 'Components';

import { getAllAdminInfo, getAllADInfo } from 'Lib/api';
import { getStorage } from 'Lib/Storage';

import { 
    Modal,
} from '@mui/material';

const cx = classNames.bind(styles);

const MasterPage = () => {
    const [isRendering, setIsRendering] = useState(false);

    const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(null);
    const [selectedADIndex, setSelectedADIndex] = useState(null);
    const [modalType, setModalType] = useState(null);   // company, advertising
    const [adList, setAdList] = useState([]);
    const [adminList, setAdminList] = useState([]);

    const selectedCompany = useMemo(() => {
        if (selectedCompanyIndex !== null && adminList.length !== 0) return adminList[selectedCompanyIndex];
        else return [];
    }, [selectedCompanyIndex, adminList]);

    const selectedAD = useMemo(() => {
        if (selectedADIndex !== null && adList.length !== 0) return adList[selectedADIndex];
        else return [];
    }, [selectedADIndex, adList]);

    const modalClose = () => {
        setModalType(null);
        setSelectedCompanyIndex(null);
        setSelectedADIndex(null);
    };

    const getAdminInfo = async () => {
        if (!getStorage({ key: 'user_info' })) {
            window.location.href="/signin";
            return;
        }
        let info = await getAllAdminInfo();
        if (info === 'Not Have Authority') {
            alert('접근권한이 없습니다.');
            window.location.href="/signin";
            return;
        }
        setIsRendering(true);
        setAdminList(info.admin_list);
    };

    const getADInfo = async () => {
        if (!getStorage({ key: 'user_info' })) {
            window.location.href="/signin";
            return;
        }
        let info = await getAllADInfo();
        setAdList(info.ad_list);
    };

    useEffect(() => {
        getAdminInfo();
        getADInfo();
    }, []);

    if (isRendering) {
        return (
            <>
                <Modal
                    className={cx('modal-container')}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={modalType ? true : false}
                    onClose={modalClose}
                    closeAfterTransition
                    BackdropProps={{
                        timeout: 400,
                    }}
                >
                    <>
                        { modalType === 'company' && 
                            <CompanyModalContent 
                                modalClose={modalClose} 
                                selectedCompany={selectedCompany}
                                adList={adList}
                            />
                        }
    
                        { modalType === 'advertising' && 
                            <AdvertisingModalContent 
                                modalClose={modalClose} 
                                selectedAD={selectedAD}
                            />
                        }
                    </>
                </Modal>
    
                <div className={cx('master-container')}>
                    <MasterLeftSide
                        getAdminInfo={getAdminInfo}
                        getADInfo={getADInfo}
                        selectedCompanyIndex={selectedCompanyIndex}
                        setSelectedCompanyIndex={setSelectedCompanyIndex}
                        setSelectedADIndex={setSelectedADIndex}
                        setModalType={setModalType}
                        adminList={adminList}
                        adList={adList}
                        />
                </div>
            </>
        );
    } else {
        return (<></>);
    }
};

export default MasterPage;