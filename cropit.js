(function ($) {
	$(document).ready(function(){
		//console.log('cropit.js');
		var extra_markup = '<div class="cropit-image-preview"></div>'
		+ '<div class="image-size-label">'
        + '  Resize image'
        + '</div>'
        + '<input type="range" class="cropit-image-zoom-input">'
        + '<input type="hidden" name="image-data" class="hidden-image-data" />'
        + '<div id="cropclick">click</div>';
		$('.image-widget-data').append(extra_markup);
		$('.image-widget-data input').addClass('cropit-image-input');
		$('.image-widget-data').cropit();

		$('#cropclick').click(function(){
			console.log('cropclick');
			var exported = $('.image-widget-data').cropit('export', {
			  type: 'image/jpeg',
			  quality: .9,
			});
			console.log('exported: ' + exported);

		});
	});
})(jQuery);