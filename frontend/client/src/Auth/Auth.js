class Auth {
    //存储token及email
    static authenticateUser(token, email) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    }
    //判断用户是否已经登录
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }
    //登出时删除token及email
    static deauthenticateUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static getEmail() {
        return localStorage.getItem('email');
    }
}

export default Auth;