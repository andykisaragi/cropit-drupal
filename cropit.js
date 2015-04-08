(function ($) {
	$(document).ready(function(){
		console.log('cropit.js');
		var extra_markup = '<div class="cropit-image-preview"></div>'
		+ '<div class="image-size-label">'
        + '  Resize image'
        + '</div>'
        + '<input type="range" class="cropit-image-zoom-input">'
        + '<input type="hidden" name="image-data" class="hidden-image-data" />'
        + '<div id="cropclick">click</div>';
		$('.field-widget-image-cropit').append(extra_markup);
		$('.field-widget-image-cropit input.form-file').addClass('cropit-image-input');
		$('.field-widget-image-cropit').cropit();

		$('#cropclick').click(function(){
			
			var exported = $('.field-widget-image-cropit').cropit('export', {
			  type: 'image/jpeg',
			  quality: .9,
			});
			
			$.post( "/cropit/save_image", { data_uri: exported } ).done(function( data ) {
				//alert( "Data Loaded: " + data );
				$('.cropit-fid').val(data);
			});

		});
	});
})(jQuery);