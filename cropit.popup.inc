<?php


/**
 * Form builder; edit a user account or one of their profile categories.
 *
 * @ingroup forms
 * @see yw_user_settings_banner_form()
 * @see yw_user_settings_banner_form_validate()
 * @see yw_user_settings_banner_form_submit()
 */
function cropit_popup_form($form, &$form_state, $entity_type, $entity_id, $field) {
  
  if(is_numeric($entity_id)){
    $entity = entity_load($entity_type,array($entity_id));
    $entity = array_pop($entity);
  }else{
    $entity = new stdClass();
    $entity->type = $entity_id;
  }

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
  
  $form['title']['#markup'] = '<h2>Add an image</h2>';

  $form['#is_popup'] = 1;
  $form_state['#is_popup'] = 1;

  // Attach field widgets.
  field_attach_form($entity_type, $entity, $form, $form_state, NULL, array('field_name' => $field));
  
  $form[$field]['#title'] = '';

  $form['field_name'] = array(
    '#type' => 'hidden',
    '#value' => str_replace('_','-',$field),
    );

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


