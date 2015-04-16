(function ($) {

  Drupal.behaviors.cropit = {
    attach: function (context, settings) {

      // @todo: currently all just targeting by class, 
      // need to to .parents() or something
      // to ensure clicks only affect the relevant widget

      //var exported;

      $('.cropit-fake-button').unbind('click').click(function(event){

        $(this).siblings('.image-widget-data').find('.cropit-image-input').trigger('click'); 
        event.preventDefault();
        
      });

      $('.cropit-container input.form-file').addClass('cropit-image-input');
      $('.cropit-container').cropit();
      var width = Drupal.settings.cropit.width;
      var height = Drupal.settings.cropit.height;
      
      $('.cropit-container .step-2,.cropit-container .step-3').hide();

      $('.cropit-container').cropit('previewSize', { width: width, height: height });

      $('.cropit-container input.form-file').change(function(){
        
        if($(this).val() != ''){
          $('.cropit-container .step-1').hide();
          $('.cropit-container .step-2').show();
        }
      }); 

      $('.cropit-cancel-btn').click(function(){

        $('.cropit-container .step-2').slideUp();
        $('.cropit-container .step-3').slideUp();
        $('.cropit-container .step-1').slideDown();

      });
      $('.cropit-edit-btn').click(function(){

        $('.cropit-container .step-3').slideUp();
        $('.cropit-container .step-2').slideDown();

      });

      $('.cropit-apply-btn').click(function(){
        
        var exported = $('.cropit-container').cropit('export', {
          type: 'image/jpeg',
          quality: .9,
        });

        $('.cropit-cropped-image-preview').css('border','1px solid');
        
        $('.cropit-cropped-image-preview img').attr('src',exported);
        $('.cropit-container .step-2').slideUp();
        $('.cropit-container .step-3').slideDown();

        /*var filenameAr = $('.cropit-container input.form-file').val().split('\\').pop().split('.');
        var filename = filenameAr[0] + '_crop.jpg';

        $.post( "/cropit/save_image", { data_uri: exported, filename: filename} ).done(function( path ) {
          
            $('.cropit-saved-image img').html('<img src="/' + path + '" />');
            $('.cropit-container .step-2').slideUp();
            $('.cropit-container .step-3').slideDown();
          
        });*/

        console.log('exported ' + exported);

        return false;

      });   
      $('.cropit-save-btn').click(function(){

        var parentForm = $(this).parents('form');

        var exported = $('.cropit-cropped-image-preview img').attr('src');

        console.log('exported ' + exported);

        var filenameAr = $('.cropit-container input.form-file').val().split('\\').pop().split('.');
        var filename = filenameAr[0] + '_crop.jpg';

        $.post( "/cropit/save_image", { data_uri: exported, filename: filename, save_managed: 1} ).done(function( fid ) {
          console.log(fid);
          $('.cropit-fid').val(fid);
          parentForm.trigger('cropit-file-saved');
          $.post( "/cropit/preview_image/" + fid ).done(function( url ) {
            $('.cropit-saved-image').html('<img src="' + url + '" />');
            $('.cropit-container .step-3').slideUp();
            $('.cropit-container .step-1').slideDown();
          });
        });

        return false;

      });      
    }
  };

})(jQuery);