/*!
 * Runtime configuration
 */
require.config({
    
    //jQuery: '1.7.1', // Make sure we only get our version of jQuery (3rd parties may load their own)
    
    //paths: {
    //    'jquery': 'modules/jquery' // Reset jQuery's path to the module's directory
    //},
    
    //deps: [ 'jquery' ],
	
	baseUrl: 'http://inject.local/js/',
    
    callback: function( ) {
        
        
        // Debug
        console.log('#require-config.js');
        console.log('-------------------');
        console.log(arguments);
        console.log('-------------------');
        
    }
    
});

require([
	'modules/physics'
],
function(
	physics
){
	
	physics.init();
	
});