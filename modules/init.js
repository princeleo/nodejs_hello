/**
 * 此模块转用来把对应常用的方法继承到window对象中
 * 方便在平常JS的调用
 */
define(function(require,exports,moudel){
    window.log = console.log;
})