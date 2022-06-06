const addCommaInNumber = (number) => {
    let stringNumber = `${number}`;
    stringNumber = stringNumber.replace(/(^0+)/, "");
    return stringNumber.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export default addCommaInNumber;