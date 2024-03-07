export const randomStringGeneratorHelper = (length: number, mode: 'alphanumeric' | 'numeric' = 'alphanumeric') => {
    const characters = mode === 'alphanumeric' ? 'abcdefghijklmnopqrstuvwxyz0123456789' : '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
