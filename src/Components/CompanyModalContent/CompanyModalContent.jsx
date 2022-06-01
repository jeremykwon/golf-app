import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { getAdminADInfo } from 'Lib/api';

import { Table, AdminTitle } from 'Components';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';

const cx = classNames.bind(styles);

const CompanyModalContent = ({ modalClose, selectedCompany, adList }) => {
    const [selectedAdIdList, setSelectedAdIdList] = useState([]);
    const formGroup = useRef(null);

    const saveBtnClickHandler = () => {
        let index = 0;
        let tmpSelectedAdList = [];
        for (let checkbox of formGroup.current.children) {
            if (checkbox.control.checked) {
                tmpSelectedAdList.push({
                    ad_id: adList[index].ad_id,
                    user_id: selectedCompany.user_id
                });
            }

            index++;
        }

        console.log(tmpSelectedAdList)
        // TODO: 체크된 애들 저장하는 로직 추가
        
        // modalClose();
    };

    const getADInfo = async () => {
        let res = await getAdminADInfo({ userId: selectedCompany.user_id });
        setSelectedAdIdList(res.ad_list.map((ad) => { return ad.ad_id }));
    };

    useEffect(() => {
        getADInfo();
    }, []);

    return (
        <div className={cx('company-modal-content-body')}>
            <AdminTitle title={`${selectedCompany.nickname} 광고 등록`} />
            
            <FormGroup className={cx('check-box-wrap')} ref={formGroup}>
                {
                    adList.map((ad) => {
                        return (
                            <FormControlLabel
                                key={ad.ad_id}
                                className={cx('check-box')}
                                control={<Checkbox />}
                                label={ad.name}
                                defaultChecked={selectedAdIdList.includes(ad.ad_id)}
                                />
                        )
                    })
                }
            </FormGroup>

            <Button 
                className={cx('modal-ok-btn')}
                variant="contained"
                onClick={saveBtnClickHandler}
                >적용</Button>
        </div>
    );
};

export default CompanyModalContent;