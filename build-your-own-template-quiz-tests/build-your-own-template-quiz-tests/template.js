function template(templateString, customDelimiters){
	var delimiters = {open: '*(', close: ')*'};

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
	//regardless of what delimiters are passed in, escape them so they are not caught by regex
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

var t = template('Hello, world');
t(1);
t = template('1, 2, *(value)*');
t(3, 1);
t = template('a, b, <<value>>', {open:'<<', close:'>>'});
t('c', 1);
t = template('1, 2, *(value)*');
t('a', 2);
