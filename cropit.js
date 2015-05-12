(function ($) {

  Drupal.behaviors.cropit = {
    attach: function (context, settings) {

      // @todo: doing
      // var parentForm = $(this).parents('form'); 
      // loads of times. unnecessary. make better

      //var exported;

      $('#cboxLoadedContent').css('overflow-x','hidden');

      $('.cropit-fake-button').unbind('click').click(function(event){
        $(this).siblings('.image-widget-data').find('.cropit-image-input').trigger('click'); 
        event.preventDefault();
      });

      $('.cropit-container input.form-file').addClass('cropit-image-input');
      $('.cropit-container').cropit({
        imageBackground: true,
        imageBackgroundBorderWidth: 30
      });
      //$('.cropit-container').cropit();
      var width = Drupal.settings.cropit.width;
      var height = Drupal.settings.cropit.height;
      var preview_style = Drupal.settings.cropit.preview_style;
      var add_image_link_text = Drupal.settings.cropit.add_image_link_text;
      var change_image_link_text = Drupal.settings.cropit.change_image_link_text;
      $('.cropit-container').cropit('previewSize', { width: width, height: height });
      //$('.cropit-image-preview-container').width(width);
      
      $('.cropit-container .step-2,.cropit-container .step-3,.cropit-container .step-4').hide();


      $('.cropit-container input.form-file').change(function(){
        var parentForm = $(this).parents('form');
        
        if($(this).val() != ''){
          parentForm.find('.cropit-container .step-1').hide();
          parentForm.find('.cropit-container .step-2').show();

          var imgwidth = $('.cropit-image-preview-container').width();
          var containerwidth = $('.cropit-cropper-container').width();
          if(imgwidth > containerwidth){
            var scale = containerwidth / imgwidth;
            var height = ($('.cropit-image-preview-container').height() * scale) + 60; // fairly arbitrary, @todo a better calc here

            $('.cropit-image-preview-container').css('transform','scale(' + scale + ')');
            $('.cropit-image-preview-container').css('transform-origin','top left');
            $('.cropit-image-preview-container').css('-webkit-transform','scale(' + scale + ')');
            $('.cropit-image-preview-container').css('-webkit-transform-origin','top left');
            $('.cropit-image-preview-container').css('-ms-transform','scale(' + scale + ')');
            $('.cropit-image-preview-container').css('-ms-transform-origin','top left');
            $('.cropit-image-preview-outer').css('height',height + 'px');
          }
        }
      }); 

      $('.cropit-cancel-btn').click(function(){
        var parentForm = $(this).parents('form');

        parentForm.find('.cropit-container .step-2').slideUp();
        parentForm.find('.cropit-container .step-3').slideUp();
        parentForm.find('.cropit-container .step-1').slideDown();

      });
      $('.cropit-edit-btn').click(function(){
        var parentForm = $(this).parents('form');

        parentForm.find('.cropit-container .step-3').slideUp();
        parentForm.find('.cropit-container .step-2').slideDown();

      });

      $('.cropit-apply-btn').click(function(){
        var parentForm = $(this).parents('form');
        
        var exported = parentForm.find('.cropit-container').cropit('export', {
          type: 'image/jpeg',
          quality: .9,
        });

        parentForm.find('.cropit-cropped-image-preview img').attr('src',exported);
        parentForm.find('.cropit-container .step-2').slideUp();
        parentForm.find('.cropit-container .step-3').slideDown();

        return false;

      });   
      $('.cropit-save-btn').click(function(){
        var parentForm = $(this).parents('form');
        var selecta = parentForm.find('input[name=field_name]').val();
        selecta = '.form-field-name-' + selecta;
        var parentField = $(selecta);

        var exported = parentForm.find('.cropit-cropped-image-preview img').attr('src');

        var filenameAr = parentForm.find('.cropit-container input.form-file').val().split('\\').pop().split('.');
        var filename = filenameAr[0] + '_crop.jpg';

        parentForm.find('.cropit-container .step-3').slideUp();
        parentForm.find('.cropit-container .step-4').slideDown();

        $.post( "/cropit/save_image", { data_uri: exported, filename: filename, save_managed: 1} ).done(function( fid ) {
          //console.log(fid);

          parentForm.find('.cropit-fid').val(fid);
          parentField.find('.cropit-fid').val(fid);
          parentForm.trigger('cropit-file-saved');
          $.post( "/cropit/preview_image/" + fid + "/" + preview_style).done(function( url ) {
            //alert(url);
            parentField.find('.image-preview').html('<img src="' + url + '" />');
            parentField.find('.launch-popup').html(change_image_link_text);
            if($('.cropit-popup-form').length){
              $('#cboxClose').click();
            }else{

              //parentForm.find('.cropit-container .step-4').slideUp();
              //parentForm.find('.cropit-container .step-1').slideDown();
              //$('.cropit-container .step-1').slideDown();
            }
          });
        });

        return false;

      });      
    }
  };

})(jQuery);