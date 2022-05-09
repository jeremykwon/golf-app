import React from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const NotFoundPage = () => {
    return (
        <div className={cx('not-found-container')}>
            Not Found
        </div>
    );
};

export default NotFoundPage;