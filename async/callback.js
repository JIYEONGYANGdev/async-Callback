'use strict';

// Javascript is synchronous. 동기적
// Execute the code block by order after hoisting.
// hoisting: var, fuction declaration

console.log('1')
// async 는 비동기적으로 언제 코드가 실행될지 모르는 것
setTimeout(() => {
    console.log('2')
}, 1000) // 대표적. 일정 시간 이후 콜백함수를 호출해줘. setTimeout(callback, millisec)
console.log('3')
// 브라우저 콘솔 상 1; 3; 2; 순서로 찍힘

// ! Callback 함수도 동기적/비동기적 나뉨
// * Synchronous callback; 즉각적으로 동기적으로 실행되는 콜백
function printImmediately(print) { // print 라는 콜백함수가 인자로 들어옴 어떤 타입의 콜백함수인지는 모르지만. 
    print();
} // hoisting됨
printImmediately(() => console.log('hello')); // print인자에 이러한 함수로 넘겨줘보면,
// 1; 3; hello; 2; 콘솔찍힘

// * Asynchronous callback; 언제 호출될지 예측할 수 없는 콜백(비동기)
function printWithDelay(print, timeout) { // (callback, millisec)
    setTimeout(print, timeout);
} // hoisting됨
printWithDelay(() => console.log('async callback'), 2000);
// 1; 3; hello; 2; async callback; 찍힘

// ! 자바스크립트는 함수를 콜백형태로 인자로, 다른 함수에 전달 / 변수에 할당할 수도 있음

// 💩 Callback Hell example 🧻
class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => { // 지금 백엔드가 없으니, 시간차를 주는 setTimeout활용해서 실습
            if (
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }

    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if (user === 'ellie') {
                onSuccess({ name: 'ellie', role: 'admin' });
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

// *
// 1. 사용자에게 id, pw 받아오기
// 2. 로그인 시도
// 3. 로그인 성공 시 id 받아오고
// 4. 역할 받아오기
// 5. 성공적으로 받아온다면 사용자의 object를 갖게 되는 것

const userStorage = new UserStorage(); // class 만들고 서버와 통신
const id = prompt('enter your id');
const password = prompt('enter your pssword');

userStorage.loginUser(id, password, (user) => {
    userStorage.getRoles(user, (userWithRole) => {
        alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`)
    }, (error) => {
        console.log(error)
    })
}, (error) => {
    console.log(error)
})

// 전달 전달 전달 ... .콜백 지옥 
// ! 위와 같은 콜백지옥 코드 문제점: 가독성 현저히 낮고, 로직 파악이 불편하며 디버깅도 어려움, 유지보수에 꽝

// ! Promise & async로 비동기 코드를 어떻게 잘 작성할지 
// ! 병렬적으로, 효율적으로 네트워크 통신을 할 수 있도록 


