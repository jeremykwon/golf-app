import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const AdvertisingModalContent = ({ modalClose, selectedAD }) => {

    return (
        <div className={cx('modal-content-body')}>
            {
                selectedAD?.type === 0 && <img src={selectedAD.url} alt='광고 이미지' />
            }

            {
                selectedAD?.type === 1 && 
                    <video autoPlay muted>
                        <source src={selectedAD.url} type="video/mp4" />
                    </video>
            }
        </div>
    );
};

export default AdvertisingModalContent;