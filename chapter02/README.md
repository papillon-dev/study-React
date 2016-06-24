# 02 DOM 추상화 내부

* * *



>## 리액트 이벤트 종로
1. 터치와 마우스 이벤트
onTouchStart  , onTouchMove   , onTouchEnd  , onTouchCancel
onClick       , onDoubleClick , onMouseDown , onMouseUp      , onMouseOver
onMouseMove   , onMouseEnter  , onMouseLeave, onMouseOut     , onContextMenu
onDrag        , onDragEnter   , onDragLeave , onDragExit     ,onDragStart
onDragEnd     , onDragOver    , onDrop
* * *
2. 키보드 이벤트
onKeyDown     , onKeyup       , onkeyPress
3. 포커스와 폼 이벤트
* * *
onFocus       , onBlur
onChange      , onInput       , onSubmit
* * *
4. 기타 이벤트
onScroll      , onWheel       , onCopy      , onCut           , onPaste



>## 이벤트 전달하기


:인라인 함수 추가
  {```
    <div className="card_title" onClick={
      ()=> this.setState({showDetails : !this.state.showDetails})
    }>
  ```}  

####이런 방법 말고  바인드를 이용해 보자

:bind
  {```
        constructor(){
          super(...arg);
          this.state = {
            showDetails :false
          };
        }

        toggleDetails(){
          this.setState({showDetails : !this.state.showDetails});
        }

          .
          .
          생략 책보시오
          .

        <div className="card_title" onClick={
          this.setState({showDetails : !this.state.showDetails})
        }>
  ```}
