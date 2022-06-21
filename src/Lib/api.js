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

// 광고 추가
const createAD = async ({ formData }) => {
    try {
        const res = await sendAPI({
            url: '/master/advert',
            method: 'post',
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData
        });

        return res.data;
    } catch (err) {
        alert('광고 생성 오류 관리자에게 문의하세요');
        throw err;
    }
};

// 광고 삭제
const deleteAD = async ({ adID }) => {
    try {
        const res = await sendAPI({
            url: `/master/advert?ad_id=${adID}`,
            method: 'delete',
        });

        return res.data;
    } catch (err) {
        alert('광고 삭제 오류 관리자에게 문의하세요');
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
        alert('admin info error');
        throw err;
    }
};

// 어드민 주문 리스트를 받아오는 api
const getAdminMenu = async () => {
    try {
        const res = await sendAPI({
            url: `/admin/menu`,
            method: 'get',
        });

        return res.data;
    } catch (err) {
        alert('get admin menu error');
        throw err;
    }
};


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
        alert('modify holeinone price error');
        throw err;
    }
};

// menu(주문리스트) 생성 api
const createOrderMenu = async ({ menuName }) => {
    try {
        const res = await sendAPI({
            url: `/admin/menu`,
            method: 'post',
            data: {
                menu_name: menuName,
            }
        });

        return res.data;
    } catch (err) {
        alert('create menu error');
        throw err;
    }
};

// menu(주문리스트) 삭제 api
const deleteOrderMenu = async ({ menuId }) => {
    try {
        const res = await sendAPI({
            url: `/admin/menu?menu_id=${menuId}`,
            method: 'delete',
        });

        return res.data;
    } catch (err) {
        alert('delete order error');
        throw err;
    }
};

// menu(주문리스트) 생성 api
const createClient = async ({ id, nickname, password }) => {
    try {
        const res = await sendAPI({
            url: `/admin/user`,
            method: 'post',
            data: {
                id,
                nickname,
                password,
            }
        });

        return res.data;
    } catch (err) {
        alert('create user error');
        throw err;
    }
};

// 클라이언트(방) 리스트를 받아오는 api
const getClientList = async () => {
    try {
        const res = await sendAPI({
            url: `/admin/user`,
            method: 'get',
        });

        return res.data;
    } catch (err) {
        alert('get client list error');
        throw err;
    }
};

// menu(주문리스트) 삭제 api
const deleteClient = async ({ clientId }) => {
    try {
        const res = await sendAPI({
            url: `/admin/user?client_id=${clientId}`,
            method: 'delete',
        });

        return res.data;
    } catch (err) {
        alert('delete client error');
        throw err;
    }
};

// 들어온 주문 list 확인
const getOrderList = async () => {
    try {
        const res = await sendAPI({
            url: `/admin/order`,
            method: 'get',
        });

        return res.data;
    } catch (err) {
        alert('get order list error');
        throw err;
    }
};

// 주문 완료 체크
const completeOrder = async ({ clientId, logId }) => {
    try {
        const res = await sendAPI({
            url: `/admin/order?client_id=${clientId}&log_id=${logId}`,
            method: 'delete',
        });

        return res.data;
    } catch (err) {
        alert('delete client error');
        throw err;
    }
};
/*************** ADMIN FINISH ***************/

/*************** CLIENT START ***************/
// 방 정보 받아오는 api
const getClientInfo = async () => {
    try {
        const res = await sendAPI({
            url: ` client/render`,
            method: 'get',
        });

        return res.data;
    } catch (err) {
        alert('get client info error');
        throw err;
    }
};

// 주문 넣는 api
const requestOrder = async ({ orderText }) => {
    try {
        const res = await sendAPI({
            url: '/client/order',
            method: 'post',
            data: {
                order: orderText
            }
        });

        return res.data;
    } catch (err) {
        alert('주문 오류 관리자에게 문의하세요');
        throw err;
    }
};
/*************** CLIENT FINISH ***************/

/*************** COMMON START ***************/
/* 로그인 */
const login = async ({
    id,
    password
}) => {
    try {
        const res = await sendAPI({
            url: '/common/login/',
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

    // master
    makeAdmin,
    deleteAdmin,
    getAllADInfo,
    getAdminADInfo,
    getAllAdminInfo,
    modifyADOfAdmin,
    createAD,
    deleteAD,

    // admin
    getAdminPageInfo,
    getAdminMenu,
    // getHoleInOnePrice,
    modifyHoleInOnePrice,
    createOrderMenu,
    deleteOrderMenu,
    createClient,
    getClientList,
    deleteClient,
    getOrderList,
    completeOrder,

    // client
    getClientInfo,
    requestOrder
};