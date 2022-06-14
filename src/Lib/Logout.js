import { setStorage } from './Storage';

const logout = () => {
    setStorage({
        key: 'user_info',
        value: null
    });
};

export { logout };