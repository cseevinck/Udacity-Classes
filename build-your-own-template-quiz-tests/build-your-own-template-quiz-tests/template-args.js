var templateString = "This is a test of the _!! testname !!_ broadcasting system.";

var myDelimiters = {open: '_!!', close: '!!_'};

function template(templateString, customDelimiters){
	var delimiters = {open: '*(', close: ')*'};

	//if(! customDelimiters) return function(){ console.log('Stop 1:' +templateString); return templateString; };

	RegExp.escape = function(s) {
	    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	};

	//get USABLE delimiters from the user
	if(typeof customDelimiters == 'object'){
		if(typeof customDelimiters.open == 'string'){
			delimiters.open = customDelimiters.open;
		}
		if(typeof customDelimiters.close == 'string'){
			delimiters.close = customDelimiters.close;
		}
	}

	var pattern = RegExp.escape(delimiters.open)+'.*'+RegExp.escape(delimiters.close);
	var re = new RegExp(pattern, "g");

	//return the function to be called by an instance of template
	return function (userstring, repeat) {

		//if there are no matches, we can just return the string
		if(templateString.indexOf(delimiters.open) < 0) {
			console.log(templateString);
			return;
		}

		//prevent spam!
		if(! repeat || repeat < 1 || repeat > 100) {
			console.log(templateString);
			return;
		}

		//replace out placeholders with the string entered by the user
		var returnString = templateString.replace(re, userstring);

		//now we log this string X times
		for(var r = 0; r < repeat; r++){
			console.log(returnString);
		}

	};

}


function template(templateString, customDelimiters){
	var delimiters = {open: '@_@', close: '@_@'};

	//get USABLE delimiters from the user
	if(typeof customDelimiters == 'object'){
		if(typeof customDelimiters.open == 'string'){
			delimiters.open = customDelimiters.open;
		}
		if(typeof customDelimiters.close == 'string'){
			delimiters.close = customDelimiters.close;
		}
	}

	RegExp.escape = function(s) {
		return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	};

	var pattern = RegExp.escape(delimiters.open)+'.*'+RegExp.escape(delimiters.close);
	var re = new RegExp(pattern, "g");

	return function (...args) {
		console.log(args);
		console.log(args.length);
		if(! args) return;
		if(args.length == 1) return args[0];

		//prevent running this too often or not enough times
		if(isNaN(args[args.length-1]) || args[args.length-1] < 1 || args[args.length-1] > 100) return args[0];

		//if there are no delimiters present, just return;
		//if(templateString.indexOf(delimiters.open) == -1) return templateString;

		var returnString = '';
		for(var a = 0; a < args.length; a++){
			returnString += templateString.replace(delimiters.open+'  '+delimiters.close, args[a]);
		}
		console.log(returnString);

		for(var i = 0; i < repeat; i++){
			console.log(returnString);
		}

		return returnString; // template renderer usually returns a string
	};

}

var templateString = "This is a test of the _!! testname !!_ broadcasting system. Please _!! action !!_";
var myDelimiters = {open: '_!!', close: '!!_'};

//var t = template(templateString, myDelimiters);
var t = template(templateString);
//t(1);
//t(3, 1);
//t('c', 1);
//t('a', 2);
t('Emergency', 'RUN FOR YOUR LIFE!!!', 5);
