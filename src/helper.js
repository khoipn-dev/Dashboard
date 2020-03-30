export const findIndexInArrayByKey = (arr, key, value) => {
    return arr.findIndex(function(item) {
        return item[key] === value;
    });
};