import sendAPI from './Network';
import { getStorage } from './Storage';

const makeAdmin = async ({
    id,
    nickname,
    password
}) => {
    try {
        const res = await sendAPI({ 
            url: '/master/user',
            method: 'post',
            data: {
                id,
                nickname: nickname,
                password,
                user_id: getStorage({ key: 'user_info' }).user_id
            }
        });

        return res.data;
    } catch (err) {
        alert('업체 생성 오류 관리자에게 문의하세요');
        throw err;
    }
};

const deleteAdmin = async ({ id }) => {
    try {
        const res = await sendAPI({ 
            url: '/master/user',
            method: 'delete',
            data: {
                id,
                user_id: getStorage({ key: 'user_info' }).user_id
            }
        });

        return res.data;
    } catch (err) {
        alert('업체 삭제 오류 관리자에게 문의하세요');
        throw err;
    }
};

const login = async ({
    id,
    password
}) => {
    try {
        const res = await sendAPI({ 
            url: '/common/login',
            method: 'post',
            data: {
                id,
                password
            }
        });

        return res.data;
    } catch (err) {
        alert('로그인 오류 관리자에게 문의하세요');
        throw err;
    }
};

export { login, makeAdmin, deleteAdmin };