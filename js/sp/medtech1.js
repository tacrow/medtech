$(function() {
	var $DOC = $(document);
	var $window = $(window);

	var touch = '.js-touch';

	// btn
	$DOC.on('touchstart', touch, function() {
		$(this).addClass('touchActive');
	});
	$DOC.on('touchend', touch, function() {
		$(this).removeClass('touchActive');
	});

});





