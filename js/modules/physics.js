define(
	[
		'require',
		'modules/synchro',
		'modules/vector',
		'base/class',
		'modules/microphysics'
	],
	function(
		require,
		synchro,
		vector,
		Class,
		physics
	){
		
		var phygets = []
			,world = new physics.World()
			;

		function each( arr, fn ){

			for(var i = 0, l = arr.length; i < l; ++i){

				if ( fn( arr[i++], i ) === false ){

					return false;
				}

			}

			return true;
		}

		var Phyget = Class({
			body: null,
			__init__: function( args ){

				this.body = new physics.Sphere({
					radius: args.radius,
					x: args.x,
					y: args.y,
					z: args.z,
					hardness: args.hardness,
					restitution: args.restitution,
					density: args.density
				});

				this.render = args.render || this.render;
				this.el = args.el;
				this.world = args.world;

				this.world.add( this.body );
			},

			// override
			render: function(){},

			update: function(){

				var p = this.body.getPosition();
				this.render( p[0], p[1], p[2] );

			}

		});

		function step( time, delta ){
			
			var timeStep = 1/180;

			each( phygets, function( p ) {
				
				p.update( time, delta );

			});

			world.step( timeStep, time );

		}
		
		function init(){
			
			if (!window.jQuery){

				require(['modules/jquery'], setup);

			} else {

				setup( jQuery );

			}
		}

		function setup( $ ){

			var testel = $('.btn-primary')
				,offset = testel.offset()
				;

			testel.css('position','absolute');

			// a phyget
			phygets.push(new Phyget({
				radius: 1,
				x: offset.left,
				y: offset.top,
				world: world,
				el: testel,
				render: function( x, y ) {

					this.el.css('top', y + 'px');
				}
			}));

			// gravity
			world.add(new physics.LinearAccelerator({
			    x   :  0,
			    y   : .98,
			    z   :  0
			}));

			world.add(new physics.AABB({
				width: 2000,
				height: 2000,
				depth: 9999999,
				x: 0,
				y: 0,
				z:0
			}));

			// start ticking
			world.start( Date.now() );
			synchro
				.subscribe( step )
				.start();
			
		}
		
		return {
			init: init
		};
	}
);