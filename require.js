var _moduleClass = function(){
	var last_action = {
		'DEFINE': true,
		'REQUIRE':false
	},
	dependedList = {}, // modules that are depended by others
	dependList = {}, // modules that depend others
	modules = {}, // save callbacks and require state.
	last_require, last_define, la;
	
	var scriptsManager, actionManager;

	this.init = function(sm, am){
		scriptsManager = sm;
		actionManager = am;
	};

	var setLastRequire = function(deps, callback){
		last_require = {};
		last_require['deps'] = deps;
		last_require['callback'] = callback;
		la = last_action['REQUIRE'];
	};

	var setLastDefine = function(action){
		if(action.constructor == Function)
			last_define = action();
		else
			last_define = action;
		la = last_action['DEFINE'];
	}; 

	this.dealRequire = function(deps, callback){
		setLastRequire(deps, callback);
		//set depend
	};

	this.dealDefine = function(callback){
		setLastDefine(callback);
	};

	this.setModuleLoaded = function(name){
		debugger;
		if(la == last_action['DEFINE']){
			modules[name] = last_define;
			//release other modules.
		}else{
			//load depending modules
		}
	};
};

var _moduleAction = function(){
	var moduleManager;

	this.init = function(mm){
		moduleManager = mm;
	};

	this.require = function(deps, callback){
		moduleManager.dealRequire(deps, callback);
	};

	this.define = function(callback){
		moduleManager.dealDefine(callback);
	};
};

var _scriptClass = function(){
	var moduleManager; 
	var nameReg = /([^\/.]+).js$/;

	this.init = function(mm){
		moduleManager = mm;
	};

	this.loadScript = function(path){
		debugger;
		var script_name = nameReg.exec(path)[1];
		var script = document.createElement('script');
		script.src = path;
		script.name = script_name;
		document.head.appendChild(script);
		script.onload = function(){
			//send message to modules manager with name.
			moduleManager.setModuleLoaded(this.name);
		};
	};
};

(function(){
	var _module_manager = new _moduleClass();
	var _module_action = new _moduleAction();
	var _scripts = new _scriptClass();
	_module_manager.init(_scripts, _module_action);
	_module_action.init(_module_manager);
	_scripts.init(_module_manager);

	if(!window['require'] && !window['define']){
		window['require'] = _module_action.require;
		window['define'] = _module_action.define;
	}
	else
		return;
	//load data-main
	var scripts = document.getElementsByTagName("script");
	var reg = /require.js$/;
	for(var i = 0; i < scripts.length; i++){
		if(reg.test(scripts[i].src)){
			var mainScript = document.createElement("script");
			var path = scripts[i].getAttribute("data-main");
			_scripts.loadScript(path);
			break;
		}
	}
})();
