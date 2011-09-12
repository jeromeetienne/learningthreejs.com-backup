/** @namespace */
var THREEx	= THREEx 		|| {};

THREEx.KeyboardState	= function(){
	this._keyCodes	= {};
	this._modifiers	= {};
	var element	= document.body;
	

	this._onKeyDown	= function(event){ this._onKeyChange(event, true); }.bind(this);
	this._onKeyUp	= function(event){ this._onKeyChange(event, false);}.bind(this);

	// bind keyEvents
	element.addEventListener("keydown", this._onKeyDown, false);
	element.addEventListener("keyup", this._onKeyUp, false);
}


THREEx.KeyboardState.prototype.destroy	= function()
{
	// unbind keyEvents
	element.removeEventListener("keydown", this._onKeyDown, false);
	element.removeEventListener("keyup", this._onKeyUp, false);
}

THREEx.KeyboardState.prototype._onKeyChange	= function(event, pressed)
{
	// log to debug
	console.log("onKeyChange", event, pressed, event.shiftKey, event.ctrlKey, event.altKey, event.metaKey)
	// update this._keyCodes
	var keyCode	= event.keyCode;
	this._keyCodes[keyCode]	= pressed;

	// update this._modifiers
	this._modifiers['shift']= event.shiftKey;
	this._modifiers['ctrl']	= event.ctrlKey;
	this._modifiers['alt']	= event.altKey;
	this._modifiers['meta']	= event.metaKey;	
}


