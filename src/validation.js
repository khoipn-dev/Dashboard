// eslint-disable-next-line
const emailRegexp = new RegExp('^[a-zA-Z][a-zA-Z0-9_\.]{5,32}@[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,4}){1,2}$');
export const isRequired = value => (value ? undefined : 'This field is required');
export const isEmail = value => (emailRegexp.test(value) ? undefined : 'Email invalid');
export const min = value => (String(value).length > 10) ? undefined: 'Min';