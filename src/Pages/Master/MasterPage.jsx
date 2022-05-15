import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { MasterLeftSide, MasterRightSide } from 'Components';

const cx = classNames.bind(styles);

const MasterPage = () => {
    const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(null);

    return (
        <div className={cx('master-container')}>
            <MasterLeftSide
                selectedCompanyIndex={selectedCompanyIndex}
                setSelectedCompanyIndex={setSelectedCompanyIndex}
                />
            <MasterRightSide
                selectedCompanyIndex={selectedCompanyIndex}
            />
        </div>
    );
};

export default MasterPage;