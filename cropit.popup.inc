<?php


/**
 * Form builder; edit a user account or one of their profile categories.
 *
 * @ingroup forms
 * @see yw_user_settings_banner_form()
 * @see yw_user_settings_banner_form_validate()
 * @see yw_user_settings_banner_form_submit()
 */
function cropit_popup_form($form, &$form_state, $entity_type, $entity_id, $field, $selector) {
  

  $entity = entity_load($entity_type,array($entity_id));

  $entity = array_pop($entity);

  //drupal_set_message(print_r($entity,true));

  if($entity_type == 'node'){
    module_load_include('inc', 'node', 'node.pages');
    $form_func = $entity->type . '_node_form';
    $form = drupal_get_form($form_func, $entity);
    foreach(element_children($form) as $item){
      if($item != $field){
        unset($form[$item]);
      }
    }
  }

  /*global $user;
  
  // During initial form build, add the entity to the form state for use during
  // form building and processing. During a rebuild, use what is in the form
  // state.
  if (!isset($form_state['user'])) {
    $form_state['user'] = $account;
  }
  else {
    $account = $form_state['user'];
  }*/
  
  $form['title']['#markup'] = '<h1>Add an image</h1>';
   
  //$form['field_image_help']['#markup'] = "<p>This is your current background image.</p><p>If you'd like to change it please choose a new image below. This image will be shown across the top of your public profile page.</p>";
  

  $form['#is_popup'] = 1;

  $form_state['#is_popup'] = 1;

  // Attach field widgets.
  field_attach_form($entity_type, $entity, $form, $form_state, NULL, array('field_name' => $field));
  
  // Hide unwanted fieldsets/fields
  $form['redirect']['#access'] = FALSE;
  $form['#metatags']['#access'] = FALSE;
  $form['og_user_node']['#access'] = FALSE;

  $form['actions'] = array('#type' => 'actions');
  $form['actions']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save your settings'),
  );
  
  $form['#attributes']['class'][] = 'cropit-popup-form';

  return $form;
}

/**
 * Submit function for the user account and profile editing form.
 */
function yw_user_settings_banner_form_submit($form, &$form_state) {
  
  // https://api.drupal.org/api/drupal/modules!field!field.attach.inc/function/field_attach_form/7
  // http://stackoverflow.com/questions/18794648/custom-submit-handler-for-two-combined-forms-workflow-and-node-edit-forms
  
  // Clear the page cache because pages can contain usernames and/or profile information:
  // cache_clear_all();
  
  // Load the user object, modify it, and save it.
  $uid = arg(1);
  $user = user_load($uid);
  $user->field_image[LANGUAGE_NONE][0] = $form_state['values']['field_image'][LANGUAGE_NONE][0];
  user_save($user);

  //$form_state['rebuild'] = TRUE;
  $form_state['redirect'] = 'user/' . $uid;

  drupal_set_message(t('The changes have been saved.'));
}
