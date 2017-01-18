/**
 * Helper file for extra helper functions
 */

/**
 * Main helper object
 */
var helpers = {};

/**
 * Creates a list item with a link inside for menus
 *
 * @param {Object} page Page or post object to create menu item for
 * @return {Object} menuItemEl List item DOM object
 */
helpers.createMenuItem = function( contentObj ) {

	var menuItemEl = document.createElement( 'li' );

	menuItemEl.appendChild(helpers.createLink( contentObj ));

	return menuItemEl;
};

/**
  * Creates link
  *
  * @param {Object} page Page or post object to create link for
  * @return {Object} linkEl Link object
  */
helpers.createLink = function( contentObj ) {

	var linkEl = document.createElement( 'a' ),
		linkTitle = document.createTextNode( contentObj.title );

	linkEl.appendChild( linkTitle );

	if ( 'home' === contentObj.slug ) {
		linkEl.href = '#';
	} else {
		linkEl.href = '#' + contentObj.slug;
	}

	return linkEl;

};


/**
 * Gets all links
 * @return {Object[]} All link elements
 */
 helpers.getLinks = function () {

   return document.querySelectorAll( 'a' );

 };

/**
 * Get's the main menu element
 * @return {Object} Main menu DOM object
 */
helpers.getMainMenuEl = function( ) {

	return document.querySelector( '#mainNav ul' );

};

/**
 * helpers - gets page title from the DOM
 *
 * @return {Object}  Main page title DOM object
 */
helpers.getPageTitleEl = function( ) {

	return document.getElementById( 'pageTitle' );

};

/**
 * helpers - Gets page content from the DOM
 *
 * @return {Object}  Main content DOM Object
 */
helpers.getPageContentEl = function( ) {

	return document.getElementById( 'pageContent' );

};

/**
 * Gets the Editor element in the DOM
 * @return {Object} Main editor DOM object
 */
helpers.getEditorEl = function( ) {

	return document.getElementById( 'editor' );

};

/**
 * Gets Editor toggle element in the DOM
 * @return {Object} Main toggle element
 */
helpers.getEditorToggleEl = function( ) {

	return document.getElementById( 'editorToggle' );

};

/**
 * Gets Editor title field element
 * @return {Object} Title field
 */
helpers.getEditorTitleEl = function( ) {

	return document.getElementById( 'editTitle' );

};
/**
  * Gets Editor content field element
  * @return {Object} Content field
  */
helpers.getEditorContentEl = function( ) {

	return document.getElementById( 'editContent' );

};

 /**
  * Gets editor form update button
  * @return {Object} Content form element
  */
  helpers.getEditorUpdateBtnEl = function () {
    return document.getElementById( 'editUpdateBtn' );
  };