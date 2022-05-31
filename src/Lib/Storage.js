const setStorage = ({ key, value }) => {
    const data = JSON.stringify(value);
    window.localStorage.setItem(key, data);
};

const getStorage = ({ key }) => {
    return JSON.parse(window.localStorage.getItem(key));
};

export { setStorage, getStorage };