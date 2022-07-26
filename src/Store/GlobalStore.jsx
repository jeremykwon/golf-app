import { atom, selector } from 'recoil';

// 알림
const alertState = atom({
    key: "alert",
    default: {
        isView: false,
        okHandler: () => {},
        text: ''
    }
});

// admin 모달
const adminModalState = atom({
    key: "adminModal",
    default: null
});


// const isNavbarOpen = atom({
//     key: "isNavbarOpen",
//     default: false
// });

// const showAlert = selector({
//     key: "showAlert",
//     get: ({get}) => get(dialogInfo),
//     set: ({set}, action ) => {
//         const handleOk = () => {
//             if (action.onOk) action.onOk();
//         };
        
//         set(dialogInfo, {
//             open: true,
//             title: action.title,
//             message: action.message,
//             okText: '확인',
//             onOk: handleOk,
//         });
//     }
// });

export {
    alertState,
    adminModalState
    // isNavbarOpen, 
    // showAlert,
};