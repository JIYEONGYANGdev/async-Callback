// ! Promise & async로 비동기 코드를 어떻게 잘 작성할지 
// ! 병렬적으로, 효율적으로 네트워크 통신을 할 수 있도록 

// * Promise는 비동기를 간편하게 처리할 수 있도록 도와주는 object
// 정해진 장시간의 기능을 수행 후 기능이 정상적으로 수행되었으면 성공 메시지 + 처리된 결과값 전달
// 수행 중 에러 발생 -> 에러를 전달

// *
// 오픈될 수강에 대한 이메일 공지 알림받고싶어 이메일 구독 신청
// 뒤늦게 사전공지창을 발견, 이메일 등록 시 수업은 이미 오픈되었으니 기다리지 않아도 
// 바로 메일로 공지가 옴 : 이미 성공적으로 처리된 promise

// * callback을 쓰지 않고 promise로 비동기를 깔끔히 쓰기

// Promise is a JavaScript object for asynchronous operation.
// ! Two points  1. 상태state ; 프로세스가 operation을 수행하고 있는 중인지 / 기능을 다 수행하여 성공했는지 실패했는지
// ! 2. producer(정보 제공) vs consumer(소비)
// * 1. state: pending -> fulfilled (수행 성공 완료) or rejected
// * Producer vs Consumer

// 1. Producer
const promise = new Promise((resolve, reject) => { // 두가지 콜백을 또 인자로 들어옴 (resolve, reject)
    // doing some heavy work(network, read files..)
    // 시간이 걸리는 작업을 비동기적으로 처리하는 것이 좋겠지
    console.log('doing something...');

    setTimeout(() => {
        resolve('ellie'); // 수행 성공 시 resolve 콜백 호출(, 인자 전달)
    //  reject(new Error('no network'))
    }, 2000)
})
// resolve(executor)
// Promise 인스턴스가 만들어지는 순간 -> 콜백 executing 됨
// 사용자가 버튼을 눌러야만 작동해야한다면 
// ! when new Promise is created, executor runs automatically.

// * 위에서 만든 producer를 사용하는
// 2. Consumer: then, catch, finally*(최신)
promise
    .then((value) => { // promise 값이 잘 수행되었으면 어떤 값을 받아와서 (인자를 넘겨줘서) 콜백을 수행할 거임
        console.log(value);
    }) // ! then은 똑같은 promise를 리턴함
    .catch(error => { // ! 그 리턴된 promise에 catch를 또 호출할 수 있는 : chaining
        console.log(error);
    })
    .finally(() => { // 성공실패 여부 상관없이 마지막에 호출 가능. 인자 따로 받지 않아도 ok
        console.log('finally');
    });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber
    .then(num => num * 2)
    .then(num => num * 3)
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num - 1), 1000);
        })
    })
    .then(num => console.log(num));

//* .then은 값을 전달하거나 또 다른 비동기인 Promise를 전달해도 됨

// ! then 등을 통해 다른 비동기적인 애들을 묶어서 처리 가능(병렬적으로)

// 4. Error Handling
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('🐓'), 1000);
    });
const getEgg = hen =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${hen} => 🥚`), 1000);
    //  setTimeout(() => reject(new Error(`${hen} => 🥚`)), 1000);
    });
const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 🍳`), 1000);
    });

getHen()
    .then(hen => getEgg(hen)) // .then(getEgg)로 줄일 수 있음. 한 가지 인자만 받아오는 경우엔.
    .then(egg => cook(egg))
    .then(meal => console.log(meal));


getHen() //
    .then(getEgg)
    .catch(error => { // !직전에서 발생한 에러를 캐치하고 싶을 때는 바로 다음에 catch
        return '🥖' 
    }) // ! getEgg가 성공하지 않아도, 대신 전달해줘서 실패하지 않음
    .then(cook)
    .then(console.log)
    // 에러 핸들링하고 있지 않기 때문에
    .catch(console.log)