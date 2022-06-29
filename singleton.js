// 单例模式
// 基本思想：保证一个类只能产生一个实例

// 思路：
// 1、使用一个变量判断这个类是否被实例化过
// 2、提供一个访问api

// java面向对象的单例模式
// 必须调用getInstance静态方法，有点鸡肋
function Foo(name) {
	this.name = name
}

Foo.getInstance = (function() {
	let instance;
	return function(...args) {
		if(!instance) {
			instance = new Foo(...args);
		}
		return instance;
	}
}());
let foo1 = Foo.getInstance('bus');
let foo2 = Foo.getInstance('car');
console.log(foo1 === foo2);

// 透明单例，劫持new
// 这种方式将单例控制逻辑和和实例初始化耦合在了一起，导致这个类只能产生单例
const Bar = (function() {
	let instance;
	return function(name) {
		if (!instance) {
			instance = this; // new会创建一个新对象，并将this绑定到该对象
		}
		this.name = name; // Bar实例初始化
		return instance;
	}
}());
let bar1 = new Bar('bus');
let bar2 = new Bar('car');
console.log(bar1 === bar2);

// 使用代理实现单例模式
// 将单例控制逻辑和实例初始化解耦，新增一个对应的单例类，不影响原来类的使用
function Singleton(name) {
	this.name = name;
}
const ProxySingleton = (function() {
	let instance;
	return function(...args) {
		if(!instance) {
			instance = new Singleton(...args);
		}
		return instance;
	}
}());
let single1 = new ProxySingleton('bus');
let single2 = new ProxySingleton('car');
console.log(single1 === single2);

// 将单例能力通用化
// 参数：需要单例化的类
// 返回值：对应的单例类
function getSingletonClass(fn) {
	let instance;
	return function(...args) {
		if(!instance) {
			instance = new fn(...args);
		}
		return instance;
	}
}
let SingleFoo = getSingletonClass(Foo);
let singlefoo1 = new SingleFoo('dog');
let singlefoo2 = new SingleFoo('cat');
let SingleSingleton = getSingletonClass(Singleton);
console.log(singlefoo1 === singlefoo2);
console.log(SingleFoo === SingleSingleton);
