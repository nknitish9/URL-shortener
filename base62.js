const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function encode(num) {
    if(num == 0) return CHARSET[0];

    let result = '';
    while(num>0) {
        const remainder = num%62;
        result = CHARSET[remainder] + result;
        num = Math.floor(num/62);
    }

    return result;
}

function decode(str){
    let num = 0;
    for(let i=0; i<str.length; i++){
        const char = str[i];
        const value = CHARSET.indexOf(char);
        num = num*62 + value;
    }
    return num;
}

module.exports = {encode, decode};