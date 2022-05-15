import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { Table, AdminTitle } from 'Components';

const cx = classNames.bind(styles);

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
    }
];

const MasterRightSide = ({ selectedCompanyIndex }) => {

    return (
        <div className={cx('master-right-side-container')}>
            {
                selectedCompanyIndex !== null  ?
                    <div className={cx('content-wrap')}>
                        <AdminTitle title={'광고 리스트'} />
                        <Table datas={tmpAdDatas}/>
                    </div>
                    :
                    <p>광고를 등록할 업체를 선택해주세요</p>
            }
            
        </div>
    );
};

export default MasterRightSide;