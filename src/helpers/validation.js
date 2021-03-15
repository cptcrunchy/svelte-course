export function isEmpty(val) {
    return val.trim().length === 0;
}
// Regex from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
export function isValidEmail(val){
    return new RegExp(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
      ).test(val);
}