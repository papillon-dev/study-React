# Getting started

React is a JavaScript library for building user interfaces.

* **Just the UI:** 주로 MVC의 View로 React를 사용 (타 framework 사용 가능)
* **Virtual DOM:** 가상의 DOM을 사용하여 update된 부분만 rendering
* **Data flow:** 단방향 data binding

## Examples

JSX
```js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
```

Plain JavaScript
```js
var CommentBox = React.createClass({displayName: 'CommentBox',
  render: function() {
    return (
      React.createElement('div', {className: "commentBox"},
        "Hello, world! I am a CommentBox."
      )
    );
  }
});
ReactDOM.render(
  React.createElement(CommentBox, null),
  document.getElementById('content')
);
```

`render()` HTML로 rendering될 React Component의 Tree를 return

<div> 태그는 실제 DOM이 아니고 React div component를 초기화한다.
React가 처리할 수 있는 data의 한 조각이다.

`ReactDOM.render()` 두번째 인자로 받은 DOM에 component markup을 주입. copmonent들이 정의되고 난 후에만 호출 가능.

View만 처리할 수 있기 때문에 React 자체의 learning curve는 낮은 편이지만, 함께 쓰면 좋은 다른 익힐 기술들이 많다.

* **Redux:** data와 UI의 state를 관리.
* **Webpack:** module bundler
* **Babel:** Transform Compiler
* **ES6:** ECMAScript 2015 :+1:
