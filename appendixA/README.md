# ECMAscript 6
가장 자주 사용할만한 ES6의 문법만 골라서 정리했습니다.
출처: http://es6-features.org/

## 새로운 기능들

### Constants
새로운 값을 할당 받을 수 없는 const 키워드가 새로 지원되었다.

```javascript
const randomNumber = Math.random();
randomNumber = 1 // error
```

다만 할당받은 값이 object나 array라면 그 내부의 데이터가 변경되는 것 까지는 막지 못한다.

```javascript
const myObj = {x = 1};
myObj.x = 2; // no error
console.log(myObj.x) // output: 2
```

### Scoping
ES6는 hoisting 없이 Block level 스코프를 형성하는 변수를 선언할 수 있다.
*Array에 각자 다른 i값을 참조하는 함수 할당하기*
1. ES6

```javascript
var myArr = [];
for(let i = 0 ; i < 10 ; i++){
    myArr[i] = function(){return i};
}
```

2. ES5

```javascript
var myArr = [], i;
for(i = 0; i < 10; i++){
    myArr[i] = (function(n){
        return function(){return n};
    })(i)
}
```

### Arrow Functions
익명함수를 선언할 때 Array function을 사용할 수 있다

```javascript
var evens = [1,2,3,4,5,6,7,8,9,10].filter( num => num%2 == 0 );
console.log(evens) // [2,4,6,8,10];

// arguments가 여러개일 때
var str = [132, 333, 44413].map( (el, index) => "value" + index + ": " + el);
console.log(str[0]) // "value 0: 132"

// statement가 여러줄일때
var mathScore = [{subject:"english", score:80}, {subject:"math", score:70}, {subject:"music", score:90}].filter( (each) => {
    let subject = each.subject;
    return subject == "math";
})[0].score;

console.log(mathScore) // "math"
```

*Arrow function의 가장 중요한 특징은 this context binding*

1. ES6에서의 this

```javascript
// scope = window
const x = "hello";
const el = document.getElementById("el");
el.addEventListener("click", ()=>{
    console.log(this.x); // output: "hello", this: window;
});
```

2. ES5에서의 this

```javascript
var x = "hello";
var self = window;
var el = document.getElementById("el");
el.addEventListener("click", function(){
    console.log(self.x); // output: "hello", this: el
});

```

### 파라미터 기능 추가
1. Default parameter value 지정

```javascript
// ES6
function foo(x, y, z=[]){
    return z.push(x + y);
}

// ES5
function foo(x, y, z){
    z = z || [];
    return z.push(x + y);
}
```

2. rest parameter - 어떤 argument라도 배열에 담아서 넘겨주는 파라미터
```javascript
// ES6
function sum(...args){
    return args.reduce( (a, b) => a + b );
}

// ES5
function sum(){
    var inputs = Array.prototype.slice(arguments);
    return inputs.reduce(function(a, b){
        return a + b;
    });
}
```

3. spread operator - array, object, string처럼 iteration이 가능한 데이터의 element를 각각의 단위로 쪼개어 반환해줌

```javascript
var evens = [2, 4, 6, 8];
var odds = [1, 3, 5, 7, 9];
var num = [...odds, ...evens].sort();
console.log(num) // output [1, 2, 3, 4, 5, 6, 7, 8, 9]

var str = "hello";
console.log([...str]) // output ["h", "e", "l", "l", "o"];
```

### 템플릿 리터럴

1. String Interpolation - 더욱 직관적으로 변한 스트링 + 변수 삽입법

```javascript
// ES6
const hello = "Hello";
const helloWorld = `${hello} World!`;
console.log(helloWorld) // output: "Hello World!";

// ES5
var hello = "Hello";
var helloWorld = hello + "World!";
console.log(helloWorld);
```

### 오브젝트 속성 정의

1. 축약형 Object 속성 선언

```javascript
// ES6
const obj = {x, y};

// ES5
const obj = {x: x, y: y};
```

2. Computed Property Names - 오브젝트 선언시에 property명을 계산된 값으로 지정할 수 있음

```javascript
// ES6
let obj = {
    foo: "bar",
    ["hello" + getWorld()]: "hello World"
};

//ES5
var obj = {foo: "bar"};
obj["hello" + getWorld()] = "hello World";
```

3. Method 선언

```javascript
// ES6
const obj = {
    css(key, value){
        //
    },
    animate(obj){
        //
    }
}

// ES5
var obj = {
    css: function(key, value){
        ///
    },
    animate: function(key, value){
        //
    }
};
```

### Destructuring Assignment

1. Array Matching - 배열의 element를 각각의 variable로 쪼개어 할당할 수 있음

```javascript
// ES6
var list = [1, 2, 3];
var [a, , b] = list;
[b, a] = [a, b];
console.log(b) // output: 1;

// ES5
var list = [1, 2, 3];
var a = list[0], b = list[2];
var tmp = a;
a = b;
b = tmp;

console.log(b); // output: 1
```

2. 축약형 Object Matching - 객체의 property명과 동일한 변수를 할당할 떄 씀

```javascript
// 공통 obj
var obj = {
    x: "x",
    y: "y"
};

// ES6
var {x, y} = obj;
console.log(x) // output: "x"

// ES5
var x = obj.x,
    y = obj.y

console.log(x) // output: "x"
```


### Modules

1. Import/Export

```javascript
// ES6
// lib/util.js
var util = {
    getElement:(query) => document.querySelectorAll(query);
};

export default util;

// main.js
import $ from './lib/util'

$.getElement("#wrapper");

// ES5

//lib/util.js
exports = window.exports;

var util = {
    getElement: function(query){
        return document.querySelectorAll(query);
    }
}

exports.util = util;

// main.js
exports = window.exports;
var $ = exports.util;

$.getElement("#wrapper");

```

### Classes

1. Class 선언

```javascript
// ES6
class Person{
    constructor(name, sex){
        this.name = name;
        this.sex = sex;
    }
    move(dir){
        this.x = dir.x;
        this.y = dir.y;
    }
}


//ES5
var Person = function(name, sex){
    this.name = name;
    this.sex = sex;    
};

Person.prototype = {
    move: function(dir){
        this.x = dir.x;
        this.y = dir.y;
    }
}
```

2. Class 상속

```javascript
// ES6
class Zach extends Person {
    constructor(name, sex, height, weight){
        super(name, sex);
        this.height = height;
        this.weight = weight;
    }
}

// ES5
var Zach = function(name, sex, height, weight){
    Person.call(this, name, sex);
    this.height = height;
    this.weight = weight;
}

Zach.prototype = Object.create(Person.prototype);
Zach.prototype.constructor = Zach;

```
