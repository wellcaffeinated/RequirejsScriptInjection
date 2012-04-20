define(
	[
		'modules/request-anim-frame',
		'modules/vector',
		'base/window'
	],
	function(
		frame,
		vector,
		window
	){
		
		var els = window.document.getElementsByTagName('div')
			,el = els[Math.floor(Math.random()*els.length)]
			,lastTime
			,pos = 0
			;
		
		function draw(){
			var time = new Date().getTime()
				,delta = time - lastTime
				;
				
			pos += delta/5;
			el.style.top = Math.floor(pos) + 'px';
			
			lastTime = time;
			//console.log(time, 1000/delta)
		}
		
		function step( time ){
			frame.requestAnimationFrame( step );
			draw();
		}
		
		function init(){
			
			el.style.position = 'absolute';
			lastTime = new Date().getTime();
			step();
			
		}
		
		return {
			init: init
		};
	}
);