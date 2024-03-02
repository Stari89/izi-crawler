export const obfuscateEmailHelper = (email: string): string => {
    var arr = email.split('@');
    return obfuscateWord(arr[0]) + '@' + obfuscateWord(arr[1]);
};

const obfuscateWord = (str: string) => {
    return str[0] + '*'.repeat(str.length - 2) + str.slice(-1);
};
