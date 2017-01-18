/**
 * Code for the Editor
 */

/**
  * The main Editor object
  */
var editor = {};

/**
 * Initializes the VanillaPress app
 */
editor.init = function( ) {

  editor.listenEditorToggle( );
  editor.checkEditorHidden();
};


editor.currentContent = '';
editor.unSavedContent = false;

/**
 * Saves local storage for post or page
 */
editor.saveContent = function( ) {

  event.preventDefault();
  model.updateContent( editor.currentContent );
  editor.unSavedContent = false;
  editor.animateSaveBtn();

};

/**
 * Update the title when changed in editor
 */
editor.updateTitle  = function () {

    var title = helpers.getEditorTitleEl().value;

    editor.currentContent.title = title;
    editor.unSavedContent = true;
    view.updateTitle( title );
};

/**
* Update the content when changed in editor
*/
editor.updateContent  = function () {

    var content = helpers.getEditorContentEl().value;

    editor.currentContent.content = content;
    editor.unSavedContent = true;
    view.updateContent( content );
};


/**
 * Dynamically fills the edit form based on the URL
 * @param {Object} contentObj Post or page object
 * to load
 */
editor.fillEditForm = function( contentObj ) {

    var titleForm = helpers.getEditorTitleEl( ),
        contentForm = helpers.getEditorContentEl( );

    titleForm.value = contentObj.title;
    contentForm.value = contentObj.content;

  editor.addFormListeners();
};


/**
 * Animates the Update button to mimic saving data
 *
 */
 editor.animateSaveBtn = function () {

  var btn = helpers.getEditorUpdateBtnEl(),
      saved = function () {
        setTimeout( function () {
          btn.innerText = 'Update';
        }, 900 );
      },
      saving = function () {
        setTimeout( function() {
          btn.innerText = 'Saved!';
          saved();
        }, 900 );
      };

  btn.innerText = 'Saving...';
  saving();
 };

/**
 * Adds event listeners to from elements
 *
 */
editor.addFormListeners = function( ) {

	var titleForm       = helpers.getEditorTitleEl(),
		  contentForm     = helpers.getEditorContentEl(),
      updateBtn = helpers.getEditorUpdateBtnEl(),
      links = helpers.getLinks();

	titleForm.addEventListener(
    'input',
    editor.updateTitle,
    false
  );

  contentForm.addEventListener(
    'input',
    editor.updateContent,
    false
  );
  // Add listener for updateBtn
  updateBtn.addEventListener(
    'click',
    editor.saveContent,
    false
  );
  links.forEach( function ( link ) {

      link.addEventListener(
          'click',
          editor.protectUnsavedContent,
          false
      );

  });
};

/**
 * Adds alert if links are clicked with unsaved content
 */
 editor.protectUnsavedContent = function () {

  if( true === editor.unSavedContent ) {

    var confirm = window.confirm( 'You have unsaved content' );

    if( false === confirm ) {

      event.preventDefault();

    } else {

      editor.unSavedContent = false;

    }

  }

 };

/**
 * Listens for the editor toggle button
 */
editor.listenEditorToggle = function( ) {

	var toggleEl = helpers.getEditorToggleEl( );

	toggleEl.addEventListener( 'click',
  function() {
    editor.toggle();
    event.preventDefault();
  }, false );

};


/**
 * Opens editor if local store has editor visible
 *
 */
 editor.checkEditorHidden = function () {

  var isHidden = model.getEditorHidden();

  if( false === isHidden ) {
    editor.toggle();
  }

 };

/**
  * Controls the toggle for the editor
  * @return {Object} Main toggle element
  */
editor.toggle = function( ) {

	var editorEl = helpers.getEditorEl( ),
		toggleEl = helpers.getEditorToggleEl( ),
    links = helpers.getLinks();

  editor.currentContent = model.getCurrentContent();

	editorEl.classList.toggle( 'hidden' );
	toggleEl.classList.toggle( 'hidden' );

	if (false === toggleEl.classList.contains( 'hidden' )) {

		editor.fillEditForm( editor.currentContent );
    model.updateEditorHidden( false );

	} else {

    model.updateEditorHidden( true );

      links.forEach( function ( link ) {

        link.removeEventListener(
          'click',
          editor.protectUnsavedContent,
          false
        );
      });

  }
};