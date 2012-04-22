define(
	function(){

		function Class( obj ){

	        var constructor = obj.__init__ || function(){}
	        	,base = obj.__extends__ ? 
	        		obj.__extends__.prototype : 
	        		false
	        	;

	        constructor.prototype = base ? 
	        	Class.extend(base, obj) : 
	        	obj;

	        return constructor;
	    };

	    Class.extend = function( a, b ){

	        var name
	        	,result = {}
	        	;

	        for ( name in a ){
	            result[name] = a[name];
	        }

	        for ( name in b ){
	            result[name] = b[name];
	        }

	        return result;
	    };

		return Class;
	}
);