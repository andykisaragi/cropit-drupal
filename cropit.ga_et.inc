<?php

/**
 * Implements hook_google_analytics_et_settings_info().
 */
function cropit_google_analytics_et_settings_info() {
  $settings = array();
  $settings['debug'] = TRUE;
  return $settings;
}

function cropit_google_analytics_et_api() {

  $selectors = array();

  $selectors = array(

    array(
      'event' => 'mousedown',
      'selector' => '.user-picture.update-link a',
      'category' => 'cropit image cropper',
      'action' => 'Chane your profile image',
      'label' => '',
      'value' => 0,
      'noninteraction' => TRUE,
    ),
    array(
      'event' => 'mousedown',
      'selector' => '.field-name-field-user-picture .upload-button',
      'category' => 'cropit image cropper',
      'action' => 'User picture (avatar): Upload a photo',
      'label' => '',
      'value' => 0,
      'noninteraction' => TRUE,
    ),
    array(
      'event' => 'mousedown',
      'selector' => '.field-name-field-user-picture .cropit-apply-btn',
      'category' => 'cropit image cropper',
      'action' => 'User picture (avatar): Apply',
      'label' => '',
      'value' => 0,
      'noninteraction' => TRUE,
    ),
    array(
      'event' => 'mousedown',
      'selector' => '.field-name-field-user-picture .cropit-save-btn',
      'category' => 'cropit image cropper',
      'action' => 'User picture (avatar): Save',
      'label' => '',
      'value' => 0,
      'noninteraction' => TRUE,
    ),

    array(
      'event' => 'mousedown',
      'selector' => '.user-profile-banner.update-link a',
      'category' => 'cropit image cropper',
      'action' => 'Chane your banner image',
      'label' => '',
      'value' => 0,
      'noninteraction' => TRUE,
    ),
    array(
      'event' => 'mousedown',
      'selector' => '#yw-user-settings-banner-form-popup .upload-button',
      'category' => 'cropit image cropper',
      'action' => 'User banner: Upload a photo',
      'label' => '',
      'value' => 0,
      'noninteraction' => TRUE,
    ),
    array(
      'event' => 'mousedown',
      'selector' => '#yw-user-settings-banner-form-popup .cropit-apply-btn',
      'category' => 'cropit image cropper',
      'action' => 'User banner: Apply',
      'label' => '',
      'value' => 0,
      'noninteraction' => TRUE,
    ),
    array(
      'event' => 'mousedown',
      'selector' => '#yw-user-settings-banner-form-popup .cropit-save-btn',
      'category' => 'cropit image cropper',
      'action' => 'User banner: Save',
      'label' => '',
      'value' => 0,
      'noninteraction' => TRUE,
    ),

  );

  return $selectors;

}