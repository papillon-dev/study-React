# 5. 라우팅

기본 개념: 라우팅을 이용하면 URL을통해 현재 Application의 상태를 결정할 수 있음


## 1. 간단하게 라우팅 해보기

URL에 따라 해당하는 자식 컴포넌트를 불러내는 부모컴포넌트

```babel
import React, { Component } from 'react';
import { render } from 'react-dom';

import About from './About.jsx';
import Home from './Home.jsx';
import Repos from './Repos.jsx';

class App extends Component{
	constructor(){
		super(...arguments);
		this.state = {
			route: window.location.hash.substr(1) // www.example.com/#someId 에서 "someId" 리턴
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

	}
}

render(<App/>, document.getElementById('root'));
```

