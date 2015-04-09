(function ($) {

  Drupal.behaviors.cropit = {
    attach: function (context, settings) {
      //$('.view-display-id-page .views-row').addClass('fancy-pants');
      //alert("?");
      $('.field-widget-image-cropit input.form-file').addClass('cropit-image-input');
      $('.field-widget-image-cropit').cropit();
      var width = Drupal.settings.cropit.width;
      var height = Drupal.settings.cropit.height;
      
      $('.field-widget-image-cropit').cropit('previewSize', { width: width, height: height });

      $('.cropit-save-btn').click(function(){
        
        var exported = $('.field-widget-image-cropit').cropit('export', {
          type: 'image/jpeg',
          quality: .9,
        });
        
        var filenameAr = $('.field-widget-image-cropit input.form-file').val().split('\\').pop().split('.');
        var filename = filenameAr[0] + '_crop.jpg';

        $.post( "/cropit/save_image", { data_uri: exported, filename: filename} ).done(function( fid ) {
          $('.cropit-fid').val(fid);
          $.post( "/cropit/preview_image/" + fid ).done(function( url ) {
            $('.cropit-saved-image').html('<img src="' + url + '" />');
            $('.cropit-cropper-container').slideUp();
          });
        });

        return false;

      });      
    }
  };

  $(document).ready(function(){
    // @todo: move this out of js file! was easiest way to get working initially

    

    
  });
})(jQuery);