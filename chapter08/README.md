# 8. 동형 리액트 애플리케이션 (isomorphic)

애플리케이션이 서버사이드에서 실행되는 스크립트로 빠른 로드와 렌더링으로 사용자에세 보다 나은 경험과 검색 엔진의 인덱싱 지원과 접근성 향상 등
로컬에서 자바스크립트 오류로 애플리케이션이 완전히 중단되지 안는 장점도 있다.
  

####Node.js 와 익스프레스
 익스프레시는 단일 페이지, 다중 페이지 하이브리드 웹 애플리케이션을 구축하기 위한 node.js 웹 애플리케이션 서버 프레임워크이다.
 
 >> npm install --save express (익스프레스 서버 모듈 설치)
 >> npm install --save babel-core babel-preset-es2015 (es6을 위한 모듈 설치)
 >> npm install --global babel-cli (컴파일러)
 
 .babelrc 를 생성한후 
 
 ````
 {
 
    "presets" : ["es2015"]
 
 }
 ````
 
 server.js
 ------------
 import express from 'express';
 const app = express();
 
 app.get('/', (req , res) => {
    res.send('<html><body><p>hello world!</p></body></html>');
 });
 
 app.listen(3000, () => {
    console.log('Express app listening on port 3000');
 });



#####템플릿활용(EJS)
 
 1. res.send 를 통해서 마크업을 표기 할 수 있지만 빠르고 쉽게 적용할 수 있는 템플릿을 진원한다.
  ejs사용

app.set('view engine' , 'ejs');

 app.get('/', (req , res) => {
    res.render('index', {message : 'hello world'})
 });


 2. 경로  views/index.ejs
    <body>
        <h1><%= message%></h1>
    </body>
    
 
 3. 정적 데이터 (css, imge)
 
 정적 콘텐츠를 제공하기 위해서 express.static() < 미들 웨어를 제공한다
 ex) app.use(express.static(__dirname + '/public'));
 
 
 #####서버 상의 리액트 컴포넌트 렌더
 
 .babelrc 
 
 ````
 {
 
    "presets" : ["es2015" , "react"]
 
 }
 ````

 server.js 에서는 다음과 같은 사항을 감안하고 서버를 설정한다
 
 **익스프레스 서버는 다음과 같이 구성한다
    -EJS를 템플릿 포맷으로 이용하며 루트 폴더에서 템플릿 파일을 찾는다
    -public 폴더에 있는 정적 애셋을 제공한다
    
 **ContactApp  컴포넌트에 연락처 리스트(데이터) 필요한다. DB나 api 를 통해서 가져 올수 있지만 간단히 json 파일을 이용한다
 
 
#####리액트 컴포넌트 렌더링


**컴포넌트의 어노테이션 마크업을 생성하고 브라우저로 전송하는 데는 리액트 DOM 메서드인 renderToString 을 이용한다
**익스프레스 서버에서는 JSX를 사용하지 않는다. JSX를 사용하지 않고 리액트 컴포넌트의 인스턴스를 만들려면 호출하기 전에 팩터리로 래핑



######라우팅

**Match - 라우트를 렌더링 하지 않고 한위치와 연열

**RoutingContext - 라우트 컴포턴트의 동기 렌더링을 수행




# 정리
8장에서는 체감 성능 개선 검색엔진 최적화 단계적 기능 이제 리액트 컴포넌트를 서버에서 렌더링하고 사전에 렌더링된 리액트 컴포넌트를
브라우저에서 마운팅 할 수 있게됐다
