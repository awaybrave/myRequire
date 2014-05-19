var _moduleClass = function(){
	var last_action = {
		'DEFINE': true,
		'REQUIRE':false
	},
	dependedList = {}, // modules that are depended by others
	dependList = {}, // modules that depend others
	modules = {}, // save callbacks and require state.
	last_require, last_define;

	this.setLastRequire = function(deps, callback){
		last_require = {};
		last_require['deps'] = deps;
		last_require['callback'] = callback;
	};

	this.setLastDefine = function(action){
		if(action.constructor == Function)
			last_define = action();
		else
			last_define = action;
	};

	this.messageParser = function(message){

	};
};

var _moduleAction = function(){
	this.require = function(){

	};
	this.define = function(){

	};
};

var _scriptClass = function(){
	var nameReg = /([^.]+.js^/;
	this.loadScript = function(path){
		var script_name = nameReg.exec(path)[1];
		var script = document.createElement('script');
		script.src = path;
		script.name = script_name;
		script.onload = function(){
			//send message to modules manager with name.
		};
	};
};

function(){
	var _module_manager = new _moduleClass();
	var _module_action = new _moduleAction();
	var _scripts = new scriptClass();
	if(!window['require'] && !window['define']){
		window['require'] = _module_action.require();
		window['define'] = _module_action.define();
	}
	//load data-main
}();
