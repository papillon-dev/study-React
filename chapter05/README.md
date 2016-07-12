# 5. 라우팅

기본 개념: 라우팅을 이용하면 URL을통해 현재 Application의 상태를 결정할 수 있음


## 간단하게 라우팅 따라해보기

1. URL에 따라, 해당하는 자식 컴포넌트를 불러내는 부모컴포넌트 제작

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';

import About from './About.jsx';
import Home from './Home.jsx';
import Repos from './Repos.jsx';

class App extends Component{
	constructor(){
		super(...arguments);
		this.state = {
			route: window.location.hash.substr(1) // 1) www.example.com/#someId 에서 "someId" 리턴
		};
	}

	componentDidMount(){
		window.addEventListener('hashchange', () => {
			this.setState({
				route: window.lcoation.hash.substr(1)
			});
		});
	}

	render(){
    		var Child;
    		switch(this.state.route){ // 2) 자른 문자열에 따라 각기 다른 컴포넌트를 Child로 할당
    			case '/about': Child = About; break;
    			case 'repos': Child = Repos; break;
    			default: Child = Home;
    		}

    		return (
    			<div>
    				<header>App</header>
    				<nav> // 3) menu 태그는 firefox에서만 지원하므로 nav로 대체
    					<ul>
    						<li><a href="#/about">About</a></li>
    						<li><a href="#/repos">Repos</a></li>
    					</ul>
    				</nav>
    				<Child/> // 3) 해당 콤포넌트 render하기
    			</div>
    		);
    	}
}

render(<App/>, document.getElementById('root'));
```

2. 시나리오
- URL의 hash 변화를 이용한다
- Hash string에 해당하는 component를 직접 switch문으로 할당하여 render한다

3. 잠재적 문제

- URL 유지보수가 헬에 가까워진다.
- 웹사이트 구조가 복잡해지면 라우팅관련 코드가 기하급수적으로 늘어날 수 있다
- URL 코드를 파싱하려다 결국 코드 숫자가 엄청 늘어나게 될 것이다.


4. 해결방안 - 플러그인을 쓰십시오..  (React Router library)


## React Router
1. 소개
	> React Router는 React 앱에 라우팅 기능을 추가하는데 가장 널리 쓰이는 솔루션입니다. URL이 얼마나 깊게 네스팅 되었든지간에, 컴포넌트를 라우트와 연동하여 UI와 URL을 지속적으로 동기화 해줍니다. blah blah.. (자세한 사항은 책에 있습니다.)

2. 설치하기
	- React Router와 history 플러그인을 함께 설치합니다.

	```CLI
	$ npm install --save react-router@1.x.x history@1.x.x
	```

3. 사용하기

React Router가 제공하는 세가지 컴포넌트 - { Router, Route, Link }
- Router, Route: XML 선언문 형태로, 네스팅 레벨에 따라 직관적으로 라우팅을 선언할 수 있게 해주는 컴포넌트
- Link: 라우터와 연계하여 해당하는 route로 가는 주소를 사용자에 뿌려줌

	**수정된 App.js(모든 코드가 아니라 수정된 부분만 기술함)**

	```javascript
	// 1) 해당 플러그인 불러오기
	import {Router, Route, Link, IndexRoute} from 'react-router';

	// 2) App컴포넌트 render method수정하기
	class App extends Component{
		render(){
			return (
				<div>
					<header><Link to="/home">App</Link></header>
					<nav>
						<ul>
							<li><Link to="/about">About</Link></li>
							<li><Link to="/repos">Repos</Link></li>
						</ul>
					</nav>
					{this.props.children}
				</div>
			);
		}
	}

	// 3) ReactDOM.render method 수정하기
	render((
	<Router>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="about" component={About}/>
			<Route path="repos" component={Repos}/>
		</Route>
	</Router>
	), document.getElementById('root'));
	```

4. 라우터 하나에 한개 이상의 컴포넌트 할당하기