import sendAPI from './Network';
import { getStorage } from './Storage';

/*************** MASTER START ***************/
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

// TODO: 파라미터 수정해야함
/* 어드민 광고 수정 */
const modifyADOfAdmin = async ({
    user_id,
    adverts
}) => {
    try {
        const res = await sendAPI({
            url: '/master/ad-node',
            method: 'put',
            data: {
                user_id,
                adverts
            }
        });

        return res.data;
    } catch (err) {
        alert('로그인 오류 관리자에게 문의하세요');
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
/*************** MASTER FINISH ***************/


/*************** ADMIN START ***************/
const getAdminPageInfo = async ({ userId }) => {
    try {
        const res = await sendAPI({
            url: `/admin/render?user_id=${userId}`,
            method: 'get',
        });

        return res.data;
    } catch (err) {
        alert('admin menu error');
        throw err;
    }
};

// 어드민 주문 리스트를 받아오는 api
const getAdminMenu = async ({ userId }) => {
    try {
        const res = await sendAPI({
            url: `/admin/menu?user_id=${userId}`,
            method: 'get',
        });

        return res.data;
    } catch (err) {
        alert('admin menu error');
        throw err;
    }
};

// 홀인원 가격을 받아오는 api
// const getHoleInOnePrice = async ({ userId }) => {
//     try {
//         const res = await sendAPI({
//             url: `/admin/holeinone=${userId}`,
//             method: 'get',
//         });

//         return res.data;
//     } catch (err) {
//         alert('admin menu error');
//         throw err;
//     }
// };

// 홀인원 가격을 수정하는 api
const modifyHoleInOnePrice = async ({ userId, holeInOnePrice }) => {
    try {
        const res = await sendAPI({
            url: `/admin/holeinone`,
            method: 'put',
            data: {
                user_id: userId,
                set_holeinone: holeInOnePrice
            }
        });

        return res.data;
    } catch (err) {
        alert('admin menu error');
        throw err;
    }
};
/*************** ADMIN FINISH ***************/

/*************** COMMON START ***************/
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
/*************** COMMON FINISH ***************/

export { 
    login,

    makeAdmin,
    deleteAdmin, 
    getAllADInfo, 
    getAdminADInfo, 
    getAllAdminInfo,
    modifyADOfAdmin,

    getAdminPageInfo,
    getAdminMenu,
    // getHoleInOnePrice,
    modifyHoleInOnePrice
};