# 9. 리액트 컴포넌트의 테스트

애플리케이션이 복잡해지면 새로운 기능을 추가할 때 마다 새로운 구현 때문에 기존 기능에 영향을 미치는지 확인할 필요가 있다.

####제스트
 제스트는 리액트가 권장하는 테스트 프레임워크다. 널리 이용되는 재스민 프레임워크를 기반으로 여러 기능이 추가된 형태이다. (페이스북이 개발)
 
 >> 가상 DOM 구현으로 테스트를 실행한다
 >> JSX를 기본적으로 지원한다
 
 npm을 초기화하고 jest-cli babel-jest를 설치한다
 
 ````
 npm init -y
 
 npm install --D jest-cli babel-jest
 ````
 
 package.json 파일에 아래 설정을 추가한다. (rootDir 매개변수는 기본적으로 package.json 파일 위치와 동일한 디렉터리를 가리킨다.)
 
 ````
  "scripts" : {
    "babel-jest": "^5.3.0",
    "jest-cli" : "^0.6.1"
  },
  "jset" : {
    "scriptPreprocessor" : "<rootDir>/node_modules/babel-jest"
  }
  ````
 
 프로젝트 루트에 sum.js 파일을 생성하고 아래와 같이 작성하여 테스트할 예제를 만든다
 
 ````
  let sum = (value1, value2) -> (
    value1 + value2
  )
  
  export default sum;
  ```` 
  
  다음 "\__tests__" 폴더에 sum-test.js 파일을 만든다.
````
jest.autoMockOff();
describe('sum', function() {
    it('adds 1+ 2 to equal 3', function() {
        var sum = require('../sum');
        expect(sum(1,2)).toBe(3);
    });
});
````
####리액트 테스트 유틸리티
리액트는 컴포넌트를 테스트하는 프로세스를 지원하기 위한 테스트 유틸리티의 집합을 제공한다. 테스트 유틸리티는 npm의 별도 애드온 패키지로 제공되며, npm install -D react-addons-test-utils 명령으로 실행할 수 있다.

가장 많이 사용되는 리액트 테스트 유틸리티 메서드는 renderIntoDocument다. 이 메서드는 이름이 의미하는 것처럼 분리된 DOM 노드로 컴포넌트를 렌더링한다. 이 메서드를 이용하면 페이지에 실제 컴포넌트를 삽입하지 않고도 생성된 DOM에 대해 어셜션을 설정할 수 있다. 가장 기본적인 형식으로는 다음과 같이 할 수 있다.

````
let component = TestUtils.renderIntoDocument(\<MyComponent />);
````

그런 다음 findDOMNode()를 이용해 원시 DOM 요소에 접근하고 그 값을 테스트할 수 있다.

####정리
리액트의 테스트 유틸을 이용해 리액트 컴포넌트를 테스트하는 법을 배웠다. renderIntoDocument를 이용해 분리된 DOM 노드로 컴포넌트 트리를 생성하거나 얕은 렌더링을 이용해 실제로 렌더링 하지 않고 컴포넌트의 가상 트리를 출력할 수 있다. 컴포넌트 트리나 가상 트리를 생성한 후에는 원하는 프레임워크를 사용해 컴포넌트의 속성 노드 등에 대한 어설션을 설정할 수 있다. 또한 리액트 프로젝트 테스트를 위한 권장 프레임워크로서 페이스북이 개발한 제스트를 소개했다.

보다 상세한 듀토리얼은 https://facebook.github.io/jest/docs/tutorial-react.html 이곳에서 참고할 수 있다.
  
