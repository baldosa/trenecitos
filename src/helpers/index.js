// Helper function to encode string to base64
function base64Encode(str) {
    // Convert string to UTF-8 encoded string
    const utf8Bytes = new TextEncoder().encode(str);
    // Convert bytes to string
    const binaryString = String.fromCharCode(...utf8Bytes);
    // Encode to base64
    return btoa(binaryString);
}

// Helper function to get current date in YYYYMMDD format
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

function genUser() {
    const dateStr = getCurrentDate();
    return base64Encode(dateStr + "sofse");
}

function genPasswd(str) {
    // First base64 encoding and replacement
    let encodedStr = base64Encode(str);
    encodedStr = encodedStr
        .replace(/a/g, "#t")
        .replace(/e/g, "#x")
        .replace(/i/g, "#f")
        .replace(/o/g, "#l")
        .replace(/u/g, "#7")
        .replace(/=/g, "#g");

    // Reverse the string
    encodedStr = encodedStr.split('').reverse().join('');

    // Second base64 encoding and replacement
    encodedStr = base64Encode(encodedStr);
    encodedStr = encodedStr
        .replace(/a/g, "#j")
        .replace(/e/g, "#p")
        .replace(/i/g, "#w")
        .replace(/o/g, "#8")
        .replace(/u/g, "#0")
        .replace(/=/g, "#v");

    // Reverse again
    encodedStr = encodedStr.split('').reverse().join('');

    try {
        // URI encode the string
        return encodeURIComponent(encodedStr);
    } catch (error) {
        return encodedStr;
    }
}
function isTokenExpired(token) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
}

function storeToken(token) {
    try {
        localStorage.setItem('authToken', token);
        return true;
    } catch (error) {
        console.error('Error storing token:', error);
        return false;
    }
}

function getToken() {
    try {
        return localStorage.getItem('authToken');
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
}

export { genUser, genPasswd, isTokenExpired, storeToken, getToken };