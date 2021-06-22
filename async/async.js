// * async & await
// promise를 좀 더 간결하게,
// 동기적으로 실행되는 것처럼 보이게 만들어주는 

// promise를 chaining -> 많으면 또 복잡
// => async & await로 동기적인 것처럼 
// 유용 API ,syntatic sugar

// promise를 써야할 때가 있고,
// async / await을 써서 간결히 할 수 있는 경우 있음

// 1. async
function fetchUser() { // 서버에서 userdata를 받아오는 함수가 있어~
// do network request in 10secs...
    // return 'ellie';

    return new Promise((resolve, reject) => {
        resolve('ellie'); // resolve나 reject 호출 안하면 "pending" 콘솔 찍힘   
    }) 
}


// !! ** 함수 앞에 "async" 붙이면 비동기적으로 수행 ** // 
async function fetchUser() {
    return 'ellie';
}

const user = fetchUser(); // ! 함수 선언된 곳으로 함수의 블럭 수행 한줄씩.. 10초 동안 머무름
console.log(user); // 동기적이라 위 함수호출 수행 완료 후 넘어오는 것

// 비동기적인 처리를 안하면 사용자정보를 가져오는 데 10초가 걸리는데
// 이 이후 웹페이지에 표시되는 UI 를 로드하는 코드가 있다면
// 사용자는 10초 동안 텅텅 빈 브라우저 화면을 봐야함

// 2. await ✨
// * async 붙은 함수 안에서만 쓸 수 있음

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function getApple() {
    await delay(1000); // delay(3000) 호출 ('3초가 지나는 수행') 이 끝날 때까지 기다려
//  throw 'error'; // < catch 
    return '🍎';
}

async function getBanana() {
    await delay(1000); // .then 역할
    return '🍌';
}

// ? 위 함수를 Promise chaining 으로 쓴다면?
/* function getBanana() {
    return delay(1000);
    .then(()=> '🍌');
};
*/

// 예제
// Promise Chaining ver.
/* function pickFruits() {
    return getApple()
        .then(apple => {
            return getBanana()
            .then(banana => `${apple} + ${banana}`)
    })
}
*/

// * async & await 로
async function pickFruits() {
/*    try {
    */
        const apple = await getApple(); // ! delay(1000)
        const banana = await getBanana(); // ! delay(1000) 이 각 각 걸려있어(서로 상관없어 비동기적으로 이루어져도 됨)
/*    } catch () {
        // throw 된 error 처리
    }
    */
/* 
    const applePromise = getApple(); // ! Promise를 만들자 마자 실행됨
    const bananaPromise = getBanana();
    const apple = await applePromise;
    const banana = await bananaPromise;
    그치만 이것도 지저분해 
    이렇게 동시다발적, 사과를 받는데 바나나 받는 거랑 상관 없고. 바나나 받는 데에 사과가 상관없으면?
    => ! Promise.all 쓰면 됨
*/
    return `${apple} + ${banana}`;
}

pickFruits().then(console.log)

// 3. useful Promise APIs
// ! Promise.all()
function pickAllFruits() {
    return Promise.all([getApple(), getBanana()]) // 배열로 넣어요
        .then(fruits => fruits.join(' + '));
    // ! 모든 프로미스들이 병렬적으로 다 받아질 때까지 기다림
    // 배열 형태 등이 넘겨짐
}

// * Promise.race() 가장먼저 수행결과값을 리턴하는 프로미스만 전달됨
function pickOnlyOne() {
    return Promise.race([getApple(), getBanana()]);
}


// 
const userStorage = new UserStorage(); // class 만들고 서버와 통신
const id = prompt('enter your id');
const password = prompt('enter your pssword');

userStorage.loginUser(id, password)
    // .then((user) => userStorage.getRoles)
    .then(userStorage.getRoles)
    .then(user => alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`))
    .catch(console.log);

//


