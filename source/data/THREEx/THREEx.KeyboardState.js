// THREEx.KeyboardState.js keep the current state of the keyboard.
// It is possible to query it at any time. No need of an event.
// This is particularly convenient in loop driven case, like in
// 3D demos or games.
//
// # Usage
//
// **Step 1**: Create the object
//
// ```var keyboard	= new THREEx.KeyboardState();```
//
// **Step 2**: Query the keyboard state
//
// ```keyboard.pressed("shift+A")```
//
// **Step 3**: Stop listening to the keyboard
//
// ```keyboard.destroy()```
//
// # Code


/** @namespace */
var THREEx	= THREEx 		|| {};

/**
 * - NOTE: it would be quite easy to push event-driven too
 *   - microevent.js for events handling
 *   - in this._onkeyChange, generate a string from the DOM event
 *   - use this as event name
*/
THREEx.KeyboardState	= function()
{
	// to store the current state
	this._keyCodes	= {};
	this._modifiers	= {};
	
	// create callback to bind/unbind keyboard events
	this._onKeyDown	= function(event){ this._onKeyChange(event, true); }.bind(this);
	this._onKeyUp	= function(event){ this._onKeyChange(event, false);}.bind(this);

	// bind keyEvents
	var element	= document.body;
	element.addEventListener("keydown", this._onKeyDown, false);
	element.addEventListener("keyup", this._onKeyUp, false);
}

/**
 * To stop listening of the keyboard events
*/
THREEx.KeyboardState.prototype.destroy	= function()
{
	// unbind keyEvents
	var element	= document.body;
	element.removeEventListener("keydown", this._onKeyDown, false);
	element.removeEventListener("keyup", this._onKeyUp, false);
}

THREEx.KeyboardState.MODIFIERS	= ['shift', 'ctrl', 'alt', 'meta'];

/**
 * to process the keyboard dom event
*/
THREEx.KeyboardState.prototype._onKeyChange	= function(event, pressed)
{
	// log to debug
	//console.log("onKeyChange", event, pressed, event.keyCode, event.shiftKey, event.ctrlKey, event.altKey, event.metaKey)

	// update this._keyCodes
	var keyCode		= event.keyCode;
	this._keyCodes[keyCode]	= pressed;

	// update this._modifiers
	this._modifiers['shift']= event.shiftKey;
	this._modifiers['ctrl']	= event.ctrlKey;
	this._modifiers['alt']	= event.altKey;
	this._modifiers['meta']	= event.metaKey;
}

/**
 * query keyboard state to know if a key is pressed of not
 *
 * @param {String} keyDesc the description of the key. format : modifiers+key e.g shift+A
 * @returns {Boolean} true if the key is pressed, false otherwise
*/
THREEx.KeyboardState.prototype.pressed	= function(keyDesc)
{
	var keys	= keyDesc.split("+");
	for(var i = 0; i < keys.length; i++){
		var key		= keys[i];
		var isModifier	= THREEx.KeyboardState.MODIFIERS.indexOf( key ) !== -1;
		var isPressed	= isModifier ? this._modifiers[key] : this._keyCodes[key.charCodeAt(0)];
		if( !isPressed)	return false;
	};
	return true;
}
