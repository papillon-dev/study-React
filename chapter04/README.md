# 04. 정교한 상호작용

## 리액트의 애니메이션
  - 애드온 모듈의 일부인 고수준 ReactCSSTransitionGroup을 통해 애니메이션 처리
  - 컴포넌트가 DOM에 추가, 제거 될 때 CSS트랜지션과 애니메이션을 트리거하는 방식

### CSS 트랜지션과 애니메이션의 기초
- CSS를 이용한 애니메이션에서는 CSS트랜지션과 CSS키프레임 애니메이션의 두가지 범주
  - CSS 트랜지션은 시작상태와 종료상태의 두가지 고유한 상태값을 보간
  - CSS 키프레임 애니메이션은 시작과 종료 외에 키프레임을 이용해 중간단계 제어 가능

### CSS 트랜지션
- 두 css 속성 값 사이를 전환하는 방법으로 애니메이션 적용 (예. 색이 변환될 때 서서히 변하는 것)
- transition 속성 이용하여 제어. 브라우저가 해당 셀렉터 내의 속성값을 지정한 시간동안 보간해 애니메이션 효과 만듬
- 애니메이션 적용 요소 속성이름(color, width등) 생략시 모든 속성에 적용
  - 애니메이션 지속 시간
  - 가속 곡선을 제어할 선택적 타이밍 함수(ease-in, ease-out)
  - 애니메니션 시작하기전 지연시간

### 키프레임 애니메이션
- keyframe을 통해 트랜지션에 비해 세부적으로 제어

  ```
  @keyframes plusing-heart {
    0% { transform: none; };
    50% { transform: scale(1.4); }
    100% { transform: none; }
  }
  // plusing-heart이름의 키프레임 집합으로, 시작, 중간, 끝 세 키프레임 지정
  ```

### 프로그래밍 방식으로 CSS 트랜지션과 애니메이션 시작
- psudo 셀렉터로는 가장 기본적인 상호작용 시나리오만 처리 가능하기 때문에 자바스크립트 class swapping이용
- 동일한 요소를 포함한 속성값이 다른 별도 클래스 두개 만들

## ReactCSSTransitionGroup
- 애니메이션에 포함할 모든 컴포넌트를 래핑하여 컴포넌트 수명주기(마운팅, 언마운팅)와 연관된 특정한 시점에 애니메이션과 트랜지션을 트리거
- 애드온으로 제공되기 때문에 ```npm install --save react-addons-css-transition-group```설치 필요

### ReactCSSTransitionGroup 요소 추가
- 애니메이션 적용하려는 자식요소는 ReactCSSTransitionGroup 요소로 래핑
- transitionName, transitionEnterTimeout, transitionLeaveTimeout(밀리초) 세가지 속성 포함

```
return (
  <div>
    <ReactCSSTransitionGroup transitionName="example"
                             transitionEnterTimeout={300}
                             transitionLeaveTimeout={300}>
       {shoppingItems}
    </ReactCSSTransitionGroup>
    <input type="text" value={this.state.newItem} onKeyDown={this.handleChange.bind(this)} />
  </div>
  )
  // 새로운 항목 추가시 example-enter 라는 className
```

### 초기 마운팅 애니메이션
```
return (
  <div>
    <ReactCSSTransitionGroup transitionName="example"
                             transitionEnterTimeout={300}
                             transitionLeaveTimeout={300}
                             *transitionAppear={true}*
                             *transitionAppearTimeout={300}*>
       {shoppingItems}
    </ReactCSSTransitionGroup>
  </div>
  )
  // 초기 항목이 표시될 때 애니메이션 적용
  // transitionAppear처음 마운팅시 적용되는 초기 트랜지션 단계 추가. 기본값 false.
```

## 드래그 앤드 드롭
- 드래그앤드드롭: 객체를 다른 위치로 끌어서 이동
- 최근까지도 브라우저용 표준 API가 없음
- DOM직접 조작하지 않고 단방향 데이터 흐름 수용, 시작점과 드롭대상 논리를 데이터로 정의하는 DnD 이용
- DnD는 내부적으로 이용가능한 API에 플러그인 방식으로 연결하고 특이성 관ㄹ
```
npm install --save react-dnd@2.x.x react-dnd-html5-backend@1.x.x
// 리액트 DnD는 외부라이브러리이므로 npm이용하여 DnD2 설치
```

### 리액트 DnD
- 고차 컴포넌트를 이용해 구현. 고차 컴포넌트는 컴포넌트를 매개변수로 받고 여기에 기능을 추가한 향상된 버전의 컴포넌트를 반환하는 자바스크립트 함수
- DragSource, DropTarget, DragDropContext 세가지 고차 컴포넌트가 있다
- 컴포넌트 대신 자바스크립트 데코레이터를 이용하는 방법도 지원(javascript 데코레이터는 아직 실험단계이며, ES2015에 포함되지 않아서 사용하지 않음)
