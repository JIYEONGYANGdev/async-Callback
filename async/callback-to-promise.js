// callback.js -> promise로 깔끔히 정리해보기

class UserStorage {
    loginUser(id, password) {
        return new Promise((resolve, reject) => {    
            setTimeout(()=> {if (
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ) {
                resolve(id);
            } else {
                reject(new Error('not found'));
            }
        }, 2000);
        
        })
    }

    getRoles(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (user === 'ellie') {
                    resolve({ name: 'ellie', role: 'admin' });
                } else {
                    reject(new Error('no access'));
                }
            }, 1000);
        })
    }

}

const userStorage = new UserStorage(); // class 만들고 서버와 통신
const id = prompt('enter your id');
const password = prompt('enter your pssword');

userStorage.loginUser(id, password)
    // .then((user) => userStorage.getRoles)
    .then(userStorage.getRoles)
    .then(user => alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`))
    .catch(console.log);