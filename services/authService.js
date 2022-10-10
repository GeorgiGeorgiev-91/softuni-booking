async function login(username, password) {
    return new Promise((res, rej) => {
        if (username.toLocaleLowerCase() == 'peter' && password == '123456') {
            res({
                _id: '321321321312',
                username: 'Peter',
                roles: ['user']
            });
        } else {
            rej(new Error('Incorrect username or password'));
        }
    });
}

module.exports = {
    login
};