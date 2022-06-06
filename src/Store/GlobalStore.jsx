import { atom, selector } from 'recoil';

// 모달
const alertState = atom({
    key: "alert",
    default: {
        isView: false,
        okHandler: () => {},
        text: ''
    }
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
    // isNavbarOpen, 
    // showAlert,
};