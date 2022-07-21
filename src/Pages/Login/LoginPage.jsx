import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { LoginSection } from 'Components/templates';

const cx = classNames.bind(styles);

const LoginPage = () => {
    
    return (
        <div className={cx('login-container')}>
            <LoginSection signinType={'page'} />
        </div>
    );
};

export default LoginPage;

// Todo: 참고 https://mui.com/material-ui/react-text-field/