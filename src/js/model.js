/**
 * Model file for working with data
 */

/**
 * Main Model Object
 *
 */

var model = {};

model.init = function( ) {

  if ( false === model.checkLocalStore() ) {
    model.updateLocalStore( data );
  }

  console.log( model.getEditorHidden() );

};

/**
 * Get a single post or page based on the URL slug
 *
 * @param {String} slug The slug for the post
 * @return {Object} contentObj Single post or page
 *
 */
model.getContent = function( slug ) {

	var contentObj = model.getPost( slug );

	// if null we must be dealing with a page
	// so grab its slug using the getPage() method in models.js
	if ( null === contentObj ) {
		contentObj = model.getPage( slug );
	}

	// if contentObj is still null, then we will create
	// our own 404 object to return to the view
	if ( null === contentObj ) {
		contentObj = {
			title: '404 Error',
			content: 'Content not found'
		};
	}

	return contentObj;

};

/**
 * Get a single post or page based on the current URL
 *
 * @return {Object} contentObj Single post or page
 */
model.getCurrentContent = function( ) {

	var slug = router.getSlug( ),
		contentObj;

	if ( null === slug )
		slug = 'home';

	contentObj = model.getContent( slug );

	return contentObj;
};

/**
  * Gets posts from local store
  *
  * @return store {object} Object of posts
  */

model.getPosts = function( ) {

	// var posts = model.getLocalStore( )[ 'posts' ];
	var posts = model.getLocalStore( ).posts;
	return posts;

};

/**
 * Get a single post based on url slug
 *
 * @param slug {string} The slug for the post
 * @return post {object} Single post
 *
 */

model.getPost = function( slug ) {

	// var posts = model.getLocalStore( )[ 'posts' ];
	var posts = model.getLocalStore().posts;

	// Get the post from store based on the slug
	for ( i = 0, max = posts.length; i < max; i++ ) {

		if ( slug === posts[i].slug ) {
			return posts[i];
		}

	}

	return null;

};

/**
  * Gets pages from local store
  *
  * @return pages {array} Array of pages
  */

model.getPages = function( ) {

	var pages = model.getLocalStore( ).pages;
	return pages;

};

/**
 * Get a single page based on URL slug
 *
 * @param {String} slug The slug of the page
 * @return {Object} page Single page object
 *
 */

model.getPage = function( slug ) {

	var pages = model.getLocalStore( ).pages;

	// Get the post from store based on the slug
	for ( i = 0, max = pages.length; i < max; i++ ) {

		if ( slug === pages[i].slug ) {
			return pages[i];
		}

	}

	return null;

};

/**
 * Updates post or page in local store
 *
 * @param {Object} contentObj Content object to update
 */
 model.updateContent = function( contentObj ) {

  var store = model.getLocalStore(),
      date  = new Date();

  if( 'post' === contentObj.type ) {

    store.posts.forEach( function( post ) {

        if( contentObj.id === post.id ) {

          post.title     = contentObj.title;
          post.content   = contentObj.content;
          post.modified = date.toISOString;

        }

    });

  }

  if( 'page' === contentObj.type ) {

    store.pages.forEach( function( page ) {

        if( contentObj.id === page.id ) {

          page.title     = contentObj.title;
          page.content   = contentObj.content;
          page.modified  = date.toISOString;

        }

    });

  }

  model.updateLocalStore( store );

 };


 /**
  * Updates if editor is hidden
  *
  * @param {Boolean} hidden if editor is hidden or not
  */
  model.updateEditorHidden = function ( isHidden ) {

    var store = model.getLocalStore();

      store.settings.editorHidden = isHidden;

      model.updateLocalStore( store );
      
    };

 /**
  * Gets local store setting for if editor is hidden
  */
  model.getEditorHidden = function () {

    var store = model.getLocalStore();

    return store.settings.editorHidden;

  };
 /**
  * Checks if local store already exists
  *
  * @return {Boolean} Boolean value for if local sotre already exists
  */
model.checkLocalStore = function () {

    var store = model.getLocalStore();

    if( null === store ) {
      return false;
    } else {
      return true;
    }

};

/**
  * Gets content from local store
  *
  * @return store {object} Native JavaScript object from local store
  */

model.getLocalStore = function( ) {

	var store = JSON.parse(localStorage.getItem( 'vanillaPress' ));

	return store;

};

/**
  * Saves temporary store to local storage.
  *
  * @param store {object} Native JavaScript object with site data
  */

model.updateLocalStore = function( store ) {

	localStorage.setItem('vanillaPress', JSON.stringify( store ));

};

/**
  * Deletes data from local storage
  *
  */

model.removeLocalStore = function( ) {

	localStorage.removeItem( 'vanillaPress' );

};
