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
                nickname,
                password,
                master_id: getStorage({ key: 'user_info' }).nickname
            }
        });

        return res.data;
    } catch (err) {
        alert('업체 생성 오류 관리자에게 문의하세요');
        throw err;
    }
};

const getAllADInfo = async () => {
    try {
        const res = await sendAPI({
            url: `/master/advert`,
            method: 'get',
        });

        return res.data;
    } catch (err) {
        alert('광고 정보 불러오기 오류 관리자에게 문의하세요');
        throw err;
    }
};

const getAllAdminInfo = async () => {
    try {
        const res = await sendAPI({
            url: `/master/user`,
            method: 'get',
        });

        return res.data;
    } catch (err) {
        alert('업체 정보 불러오기 오류 관리자에게 문의하세요');
        throw err;
    }
};

const getAdminADInfo = async ({ userId }) => {
    try {
        const res = await sendAPI({
            url: `/master/ad-node?user_id=${userId}`,
            method: 'get',
        });

        return res.data;
    } catch (err) {
        alert('정보 불러오기 오류 관리자에게 문의하세요');
        throw err;
    }
};


/* admin 삭제 */
const deleteAdmin = async ({ adminId }) => {
    try {
        const res = await sendAPI({
            url: `/master/user?user_id=${adminId}`,
            method: 'delete',
        });

        return res.data;
    } catch (err) {
        alert('업체 삭제 오류 관리자에게 문의하세요');
        throw err;
    }
};

/* 로그인 */
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

export { 
    login, 
    makeAdmin,
    deleteAdmin, 
    getAllADInfo, 
    getAdminADInfo, 
    getAllAdminInfo 
};