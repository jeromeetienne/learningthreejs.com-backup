function addLensFlare()
{
	var textureFlare0	= THREE.ImageUtils.loadTexture( "images/lensflare/lensflare0.png" );
	var textureFlare2	= THREE.ImageUtils.loadTexture( "images/lensflare/lensflare2.png" );
	var textureFlare3	= THREE.ImageUtils.loadTexture( "images/lensflare/lensflare3.png" );

	addLight( 0.1, 0.825, 0.99	, -2.5	, 5	,  -25 );
	//addLight( 0.08, 0.825, 0.99	, 0	, 0	, -100 );
	//addLight( 0.995, 0.025, 0.99	, -500	, 500	, -100 );

	function addLight( h, s, v, x, y, z ) {

		var light	= new THREE.PointLight( 0xffffff, 1.5, 45000 );
		light.position.set( x, y, z );
		light.position.set( x, y, z );
		light.color.setHex( 0xFFaa88 );
		scene.add( light );


		var flareColor = new THREE.Color( 0xffffff );
		flareColor.copy( light.color );
		THREE.ColorUtils.adjustHSV( flareColor, 0, -0.5, 0.5 );

		var lensFlare = new THREE.LensFlare( textureFlare0, 500, 0.0, THREE.AdditiveBlending, flareColor );

		lensFlare.add( textureFlare2, 512	, 0.0, THREE.AdditiveBlending );

		lensFlare.add( textureFlare3, 60	, 0.6-0.4, THREE.AdditiveBlending );
		lensFlare.add( textureFlare3, 80	, 0.7-0.4, THREE.AdditiveBlending );
		lensFlare.add( textureFlare3, 150	, 0.9-0.4, THREE.AdditiveBlending );
		lensFlare.add( textureFlare3, 70	, 1.0-0.4, THREE.AdditiveBlending );

		lensFlare.position		= light.position;

		scene.add( lensFlare );
	}
}
