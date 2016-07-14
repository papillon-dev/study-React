# 5. 라우팅

기본 개념: 라우팅을 이용하면 URL을통해 현재 Application의 상태/위치를 파악/결정할 수 있음

## 왜 굳이 Client에서 라우팅을?
싱글페이지 웹앱이라는 가정하에, Clientside Routing이 없으면 다음의 문제가 발생한다.
- 앞으로, 뒤로가기 버튼 못 씀 (브라우저 history사용 불가)
- 페이지 즐겨찾기나 공유하기 불가능
- 기타 등등

## 단순 무식하게 클라이언트 Clientside Routing 구현해보기

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

	- URL 유지보수가 헬에 가까워진다. (모든 시나리오에 대응하는 조건식을 만들어야함)
	- 웹사이트 구조가 복잡해지면 라우팅관련 코드가 기하급수적으로 늘어날 수 있다 (deeply nested files에 대한 routing 어쩔..?)
	- URL 코드를 파싱하려다 결국 코드가 엄청 늘어나게 될 것이다.


4. 해결방안 - 플러그인을 쓰십시오..  **(React Router)**


## React Router
1. 소개
	> React Router는 React 앱에 라우팅 기능을 추가하는데 가장 널리 쓰이는 솔루션입니다. URL이 얼마나 깊게 네스팅 되었든, 컴포넌트를 라우트와 연동하여 UI와 URL을 지속적으로 동기화 해줍니다. blah blah.. (자세한 사항은 책에 있습니다.)

2. 설치하기
	- React Router와 history 플러그인을 함께 설치합니다.

		```CLI
		$ npm install --save react-router@1.x.x history@1.x.x
		```

3. 사용하기

	React Router가 제공하는 대표적인 컴포넌트 - { Router, Route, Link, IndexRoute }
	- Router, Route: XML 선언문 형태로, 네스팅 레벨에 따라 직관적으로 라우팅을 선언할 수 있게 해주는 컴포넌트
	- Link: 라우터와 연계하여 해당하는 route로 가는 주소를 사용자에 뿌려줌
	- IndexRoute: URL이 '/' 로 들어오게 되면 Home.jsx가 아닌 App.jsx를 가리키게 되는데, IndexRoute통해 '/'로 들어오는 요청에 Index로 쓸 특정 컴포넌트를 할당할 수 있게 된다.

	**수정된 App.js(모든 코드가 아니라 수정된 부분만 기술)**

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

	- ReactDOM

		```javascript
		reactDOM.render(
			(<Router>
				<Route path='/' component={App}>
					<Route path='groups' components={{content:Groups, sidebar: GroupsSidebar}}/>
					<Route path='users' components={{content:Users, sidebar: UsersSidebar}}/>
				</Route>
			</Router>), element);
		```

	- Component's methods

		```javascript
		render(){
			return(
				<div>
					{this.props.children.sidebar} - {this.props.children.content}
				</div>
			);
		}
		```

## URL 파라미터

1. API 가져오기
	- 구형 브라우저 지원을 위한 Polyfill 설치하기

	```CLI
	$ npm install --save whatwg-fetch
	```

	- Repos.jsx 수정

		```javascript
		class Repos extends Component{
			constructor(){
				super(...arguments);
				this.state = {
					repositories:[]
				};
			}

			componentDidMount(){
				fetch('https://api.github.com/users/pro-react/repos')
					.then( (response) => response.json() )
					.then( (responseData) => {
						this.setState({repositories:responseData});
					});
			}
			render(){
				let repos = this.state.repositories.map((repo) => (
					<li key={repo.id}> {repo.name} </li>
				));
				return(
					<div>
						<h1>Github Repos</h1>
						<ul>
							{repos}
						</ul>
					</div>
				);
			}
		}
		```

	- Repos.jsx에 Link 컴포넌트 추가하여 동적으로 파라미터 붙이기

		```javascript
		import { Link } from 'react-router'
		class Repos extend Component{
			constructor(){...}

			componentDidMount(){...}

			render(){
				let repos = this.state.repositories.map((repo) => (
					<li key={repo.id}>
						<Link to={`/repos/details/${repo.name}`}>{repo.name}</Link>
					</li>
				));
				return(
					<div>
						<h1>Github Repos</h1>
						<ul>
							{repos}
						</ul>
					</div>
				);
			}
		}
		```

2. RepoDetails 컴포넌트 만들기
	1. React Router가 파라미터인 repo_name을 RepoDetails 컴포넌트의 prop 값으로 주입
		- 주입된 prop값을 fetchData 메소드의 파라미터로 사용하여 해당하는 API를 가져옴
	2. 이전에 소개된 예제에서는 API를 가져올 때 모두 componentDidMount 생명주기에 가져왔었음 (첫 렌더링이 일어난 직후에 가져오기)
		- 필요: RepoDetails 컴포넌트가 마운트 된 이후에도 유저가 링크를 클릭할 때마다 데이터를 새로 가져와야 함
		- 문제: componentDidMount는 렌더링 이후 딱 한번만 실행됨
		- 해결: componentWillReceiveProps는 컴포넌트가 새로운 props를 받을 때마다 실행됨 (첫 렌더링시에는 실행안됨), 해당 라이프사이클에 fetchData 메소드 실행시키기

		```javascript
		import React, { Component } from 'react';
		import 'whatwg-fetch'
		class RepoDetails extends Component{
			constructor(){
				super(...arguments);
				this.state={
					repository:{}
				};
			}

			fetchData(repo_name){
				fetch(`https://api.github.com/repos/pro-react/${repo_name}`)
				.then( (response)=>response.json() )
				.then((responseData)=>{
					this.setState({repository:responseData});
				});
			}

			componentDidMount(){
				// 라우터가 repo_name을 prop 파라미터로 주입함
				let repo_name = this.props.params.repo_name;
				this.fetchData(repo_name);
			}

			componentWillReceiveProps(nextProps){
				let repo_name = nextProps.params.repo_name;
				this.fetchData(repo_name);
			}

			render(){
				let stars = [];
				for (var i = 0; i < this.state.repository.stargazers_count ; i++){
					stars.push('★');
				}

				return(
					<div>
						<h2>{this.state.repository.name}</h2>
						<p>{this.state.repository.description}</p>
						<span>{stars}</span>
					</div>
				);
			}
		}

		export default RepoDetails;
		```

3. App.jsx파일 업데이트 해주기

	- RepoDetails import

		```javascript
		import RepoDetails from './RepoDetails';
		```

	- Route 설정

		```javascript
		render((
			<Router>
				<Route path="/" component={App}>
					<IndexRoute component={Home}/>
					<Route path="about" component={About}/>
					<Route path="repos" component={Repos}>
						<Route path="details/:repo_name" component={RepoDetails}/>
					</Route>
				</Route>
			</Router>
		), document.getElementById('root'));
		```

	- :repo_name과 같은 dynamic segment를 Route에 지정하면 React Router 플러그인이 해당하는 파라미터를 알아서 주입시켜준다.


## 활성링크 세팅하기

### activeClassName
Link컴포넌트가 제공하는 유용한 기능. 이 속성이 설정 돼 있으면, prop에 세팅한 클래스 명을 활성화된 링크(클릭 된 anchor tag)에 자동으로 추가해준다.

```javascript
class App extends Component{
	render(){
		return (
			<div>
				<header><Link to="/">App</Link></header>
				<nav>
					<ul>
						<li><Link to="/about" activeClassName="active">About</Link></li>
						<li><Link to="/repos" activeClassName="active">Repos</Link></li>
					</ul>
				</nav>
				{this.props.children}
			</div>
		);
	}
}
```

## Props 전달
현재까지 구현한 코드의 문제점: 매번 불필요하게 API를 반복해서 불러오고 있음
- https://api.github.com/users/pro-react/repos 에서 이미 필요한 API를 한번에 보내주고 있음
- 매번 하위컴포넌트에서 API call을 하기보다 그냥 상위 컴포넌트에서 API를 받아서 하위 컴포넌트의 props으로 내려보내면 됨
- 문제: 하위컴포넌트에 직접 props를 추가하던 방식과는 달리, React Router를 사용해야함

### 방법 1: Route 설정 조작하기
- React Router는 URL path에 따라 미리 지정해둔 Component를 불러옴
	- 예) ``` <Route path="about" component={About}/>```
- 해당 Route 속성으로 Component Props 를 주입시킬 수 있음
	- 예) ``` <Route path="about" component={About} title="About Us" />```
- 주입한 About Component에서는 Route를 통해서 주입된 props에 **this.props.route.prop_name**으로 접근할 수 있음
	```javascript
	import React, {Component} from 'react';
	class About extends Component{
		render(){
			return (<h1>{this.props.route.title}</h1>);
		}
	}
	```

### 방법 2: 자식 컴포넌트에서 Pros 복제하고나서 다시 주입하기
- 동적으로 props가 변해야 하는 상황에서 유용한 방법
- 기존방법의 문제: React Router가 RepoDetails 컴포넌트를 만든 뒤, Repo컴포넌트에서 props.children으로 넘겨서 렌더링 시켜버리기 때문에, 중간에서 props를 건드릴만한 여지가 없음
- 해결방법: Repo 컴포넌트에서 this.props.children을 직접 렌더링하지 않고, 해당 컴포넌트를 복제한 뒤 추가 속성을 주입하여 렌더링 하기

1. Repos.render 수정
	- React.cloneElement 메소드를 이용해 자식 컴포넌트와 복제한 후 속성 주입시키기
	- 복제한 컴포넌트를 child 변수에 담아 렌더링하기

	```javascript
	render(){
		let repos = this.state.repositories.map((repo) => (
			<li key={repo.id}>
				<Link to={`/repos/details/${repo.name}`}>{repo.name}</Link>
			</li>
		));

		let child = this.props.children && React.cloneElement(this.props.children, {repositories: this.state.repositories});


		return(
			<div>
				<h1>Github Repos</h1>
				<ul>
					{repos}
				</ul>
				{child}
			</div>

		);
	}
	```

2. RepoDetails 수정하기
	- Array.prototype.find가 구형 브라우저에서 지원되지 않으므르 babel-polyfill 다운받고 import 시키기
		```CLI
		$ npm install --save-dev babel-polyfill
		```

		```javascript
		// RepoDetails.jsx
		import React, { Component } from 'react';
		import 'babel-polyfill';
		```

	- API는 상위 컴포넌트에서 받아서 넘겨줬으므로, lifecycle에 셋업해두었던 fetchData를 다 없애고, props에 접근하도록 개조해야 함
		1. constructor, componentWillReceiveProps, componentDidMount 메소드 제거하기
		1. state가 제거됐으므로 props에 접근하기

		```javascript
		class RepoDetails extends Component{
			renderRepository(){
				let repository = this.props.repositories.find((repo) => repo.name === this.props.params.repo_name);
				let stars = [];
				for (var i = 0; i < repository.stargazers_count ; i++){
					stars.push('★');
				}

				return(
					<div>
						<h2>{repository.name}</h2>
						<p>{repository.description}</p>
						<span>{stars}</span>
					</div>
				);
			}
			render(){
				if(this.props.repositories.length > 0){
					return this.renderRepository();
				}else{
					return <h4>Loading...</h4>;
				}
			}
		}
		```

## URL과 UI 비동조화시키기 (다르게 나타내기)
- 필요성: /repos/details/:repo_name이 다소 긴 감이 있는데 이것을 더 짧게 줄이는 것이 가능함
- 어떻게?: React Router를 통해 route 절대경로를 설정해주면 됨

1. 수정 전
	- App.jsx

		```javascript
		render((
			<Router>
				<Route path="/" component={App}>
					<IndexRoute component={Home}/>
					<Route path="about" component={About} title="About Us"/>
					<Route path="repos" component={Repos}>
						<Route path="details/:repo_name" component={RepoDetails}/>
					</Route>
				</Route>
			</Router>
		), document.getElementById('root'));
		```
	- Repos.jsx

		```javascript
		class Repos extends Component{
			constructor(){...}

			componentDidMount(){...}
			render(){
				let repos = this.state.repositories.map((repo) => (
					<li key={repo.id}>
						<Link to={`/repos/details/${repo.name}`}>{repo.name}</Link>
					</li>
				));

				let child = this.props.children && React.cloneElement(...);

				return(...);
			}
		}
		```

2. 수정 후

	- App.jsx

		```javascript
		render((
			<Router>
				<Route path="/" component={App}>
					<IndexRoute component={Home}/>
					<Route path="about" component={About} title="About Us"/>
					<Route path="repos" component={Repos}>
						<Route path="/repo/:repo_name" component={RepoDetails}/>
					</Route>
				</Route>
			</Router>
		), document.getElementById('root'));
		```

	- Repos.jsx

		```javascript
		class Repos extends Component{
			constructor(){...}

			componentDidMount(){...}
			render(){
				let repos = this.state.repositories.map((repo) => (
					<li key={repo.id}>
						<Link to={`/repo/${repo.name}`}>{repo.name}</Link>
					</li>
				));

				let child = this.props.children && React.cloneElement(...);

				return(...);
			}
		}
		```

## 프로그램 자체적으로 Route 변경하기
- 현재까지 구현한 코드는 사용자가 직접 Link 컴포넌트를 통해 프로그램을 동작시키는 방식 (링크를 누르면 프로그램이 그걸 받아서 처리해주는 방식)
- 상황에 따라 프로그램 자체적으로 redirect 해야할 상황이 있음 (예: 회원가입 성공/실패시 지정된 페이지로 자동으로 이동시키기)
- React Router가 알아서 history object를 마운팅하는 모든 컴포넌트에 주입시킴
	- history object는 브라우저의 히스토리 스택을 관리하고 navigation 에 필요한 method를 제공함

|Method|Description|
|---|---|
|pushState|새 URL로 이동시키는 기본적인 method, 파라미터 객체는 선택사항 <br/>history.pushState(null, '/users/123')<br/>history.pushState({showGrades: true}, '/users/123')
|replaceState|pushState와 문법은 같으나, history stack의 length를 바꾸지 않고 현재 URL을 새로운 URL로 '대체'시킴|
|goBack|history상 바로 이전에 있는 페이지로 이동)|
|goForward|history상 바로 다음에 있는 페이지로 이동(더 최근)|
|Go| n번째 이전/이후 페이지로 이동 <br/> history.Go(-4) <br/> history.Go(2)|
|createHref|router설정에 따라 URL을 생성함|


1. ServerError 컴포넌트

	 ```javascript
	import React, { Component } from 'react';

	const styles = {
		root:{
			textAlign:'center'
		},
		alert:{
			fontSize:80,
			fontWeight: 'bold',
			color:'#e9ab2d'
		}
	};

	class ServerError extends Component{
		render(){
			return(
				<div style={styles.root}>
					<div style={styles.alert}>&#9888;</div>
					<h1>Ops, we have a problem</h1>
					<p>Sorry, we couldnt access the repositories. Please try again in a few moments.</p>
				</div>
			);
		}
	}

	export default ServerError;
	 ```

2. App.js에 import

	```javascript
	import ServerError from './ServerError.jsx';

	class App extends Component{
		render(){...}
	}

	render((
		<Router>
			<Route path="/" component={App}>
				<IndexRoute component={Home}/>
				<Route path="about" component={About} title="About Us"/>
				<Route path="repos" component={Repos}>
					<Route path="/repo/:repo_name" component={RepoDetails}/>
				</Route>
				<Route path="error" component={ServerError}/>
			</Route>
		</Router>
	), document.getElementById('root'));
	```

3. Repo 컴포넌트 중 fetch메소드의 catch 선언문에 pushState method 세팅하기

	```javascript
	componentDidMount(){
		fetch('https://api.github.com/users/pro-react/repos')
		.then( (response) => {
			if(response.ok){
				return response.json();
			}else{
				throw new Error('Server response wasn\'t OK');
			}
		} )
		.then( (responseData) => {
			this.setState({repositories:responseData});
		})
		.catch( (error) => {
			this.props.history.pushState(null, '/error');
		} );
	}
	```

	**fetch('URL') 주소를 바꿔서 테스트 해보면 됨**


## Histories

- React Router라이브러리는 History라이브러리를 기반으로 작동함 (npm으로 설치할 때 같이 깔았던..)
- History 라이브러리를 사용하는 목적
	1. URL추상화
	1. 세션관리
	1. 크로스 브라우저, 플랫폼, 환경에 적용할 수 있는 history stack과 URL 조작에 필요한 공통 API제공

- 사용 가능한 설정
	1. React 기본값: hash history setup
		- hash(#)기반 URL: http://localhost:3000/#/sub_path
		- 구형브라우저(IE8, 9 ) 지원
		- 추가적인 서버 설정 필요 없음
	2. browser history setup
		- 일반 URL 형태: http://localhost:3000/sub_path
		- 구형브라우저를 쓸 일이 없음
		- 추가적인 서버 설정 필요함
			1. root보다 깊은 depth에 있는 path로 사용자가 url을 입력하거나 새로고침 하면, 서버에 바로 해당 route로 get 신호를 보내기 때문
			2. 해결책: 서버 설정에서 unknown page에 대해서는 root path로 redirect해주는 설정 필요
			3. 왜?: root로 가면 우리가 만든 컴포넌트가 url을 파싱해서 해당 url과 매칭되는 컴포넌트를 불러와주기 때문
			4. 설정법: 서버마다 다름
				- 현재 스터디에서 사용하는 webpack-dev-server는 historyApiFallback이라는 옵션이 있음



### BrowserHistory Setup 사용하기

1. App.jsx

	- createBrowserHistory method 불러오기

		```javascript
		import createBrowserHistory from 'history/lib/createBrowserHistory';
		```

	- Router 설정하기

		```javascript
		render((
			<Router history={createBrowserHistory()}>
				<Route path="/" component={App}>
					<IndexRoute component={Home}/>
					<Route path="about" component={About} title="About Us"/>
					<Route path="repos" component={Repos}>
						<Route path="/repo/:repo_name" component={RepoDetails}/>
					</Route>
					<Route path="error" component={ServerError}/>
				</Route>
			</Router>
		), document.getElementById('root'));
		```



## 학습 자가진단
- [ ] 기본적인 라우팅을 연습해보며 경로가 깊어질수록 발생할 수 있는 복잡성에 대해 이해할 수 있었다.
- React Router 라이브러리를 사용하는 법을 배웠다. 이를 통해
- [ ] nested routes와 index route를 설정하는 법을 익혔다.
- [ ] route에서 component로 parameter를 전달하고, 컴포넌트를 복사하여 자식 컴포넌트에 prop으로 전달하는 법을 알게 되었다.
- [ ] History 객체를 이용하여 사용자 입력이 아닌, 코드를 사용하여 화면전환을 할 수 있게 되었다.


