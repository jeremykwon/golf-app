import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

// lib
import { getAdminADInfo, modifyADOfAdmin } from 'Lib/api';

// component
import { AdminTitle } from 'Components';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';


const cx = classNames.bind(styles);

const CompanyModalContent = ({ modalClose, selectedCompany, adList }) => {
    const [selectedAdIdList, setSelectedAdIdList] = useState([]);
    // const formGroup = useRef(null);

    const getADInfo = async () => {
        let res = await getAdminADInfo({ userId: selectedCompany.user_id });
        setSelectedAdIdList(res.ad_list.map((ad) => { return ad.ad_id }));
    };

    const adModify = async () => {
        const data = await modifyADOfAdmin({ adverts: selectedAdIdList, user_id: selectedCompany.user_id });
        if (data ===  'Connection is Successful') {
            return true;
        } else {
            return false;
        }
    };

    const saveBtnClickHandler = () => {
        if (adModify()) modalClose();
        else alert('광고 등록 에러');
    };

    const changeChecked = (checked, adId) => {
        if (checked) {
            setSelectedAdIdList([...selectedAdIdList, adId]);
        } else {
            setSelectedAdIdList(selectedAdIdList.filter(id => id !== adId));
        }
    };

    useEffect(() => {
        getADInfo();
    }, []);

    return (
        <div className={cx('company-modal-content-body')}>
            <AdminTitle title={`${selectedCompany.nickname} 광고 등록`} />
            
            <FormGroup
                className={cx('check-box-wrap')}
                >
                {
                    adList.map((ad) => {
                        return (
                            <FormControlLabel
                                key={ad.ad_id}
                                className={cx('check-box')}
                                control={
                                    <Checkbox checked={selectedAdIdList.includes(ad.ad_id)} />
                                }
                                label={ad.name}
                                onChange={(e) => {changeChecked(e.target.checked, ad.ad_id)}}
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