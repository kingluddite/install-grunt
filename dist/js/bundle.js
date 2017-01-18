/**
 * Main JSON object of posts, pages and settings
 */
var posts = [
		{
			"id": 1,
			"date": "2016-01-09T22:05:09",
			"modified": "2016-01-09T22:05:09",
			"slug": "hello-world",
			"type": "post",
			"title": "Hello world!",
			"content": "Welcome to WordPress. This is your first post. Edit or delete it, then start writing!"
		}, {
			"id": 2,
			"date": "2016-01-10T22:05:09",
			"modified": "2016-01-10T22:05:09",
			"slug": "learning-javascript",
			"type": "post",
			"title": "Learning JavaScript!",
			"content": "I'm learning JavaScript and super excited!!!"
		}, {
			"id": 3,
			"date": "2016-01-11T22:05:09",
			"modified": "2016-01-11T22:05:09",
			"slug": "rest-api",
			"type": "post",
			"title": "The REST API!",
			"content": "I've started working with the REST API in WordPress, what fun!"
		}, {
			"id": 4,
			"date": "2016-01-12T22:05:09",
			"modified": "2016-01-12T22:05:09",
			"slug": "json-data",
			"type": "post",
			"title": "JSON Data!",
			"content": "So, with the REST API it is posible to pull in WordPress data as pure JSON.  Now I'm figuring out what to do with the data"
		}, {
			"id": 5,
			"date": "2016-01-13T22:05:09",
			"modified": "2016-01-13T22:05:09",
			"slug": "javascript-project",
			"type": "post",
			"title": "JavaScript Project",
			"content": "I've started working with the REST API in WordPress, what fun!"
		}
	],
	pages = [
		{
			"id": 6,
			"date": "2016-01-18T22:05:09",
			"modified": "2016-01-18T22:05:09",
			"slug": "home",
			"type": "page",
			"title": "Home",
			"content": "Welcome to VanillaPress, my JavaScript site!"
		}, {
			"id": 7,
			"date": "2016-01-18T22:05:09",
			"modified": "2016-01-18T22:05:09",
			"slug": "about",
			"type": "page",
			"title": "About",
			"content": "A little about me!"
		}, {
			"id": 8,
			"date": "2016-01-18T22:05:09",
			"modified": "2016-01-18T22:05:09",
			"slug": "blog",
			"type": "page",
			"title": "Blog",
			"content": "Please enjoy my posts"
		}, {
			"id": 9,
			"date": "2016-01-18T22:05:09",
			"modified": "2016-01-18T22:05:09",
			"slug": "contact",
			"type": "page",
			"title": "Contact",
			"content": "Drop me a line with any questions :)"
		}
	],
  settings = {
    "editorHidden": "true"
  },
  data = {
  	"posts": posts,
  	"pages": pages,
    "settings": settings
  };
;/**
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
  };;/**
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
;/**
 * Router file for managing url changes
 */

/**
 * The main router object.
 *
 */

var router = {};

router.init = function( ) {

	router.loadContent( );
	router.listenPageChange( );

};

/**
 * Gets the slug from the URL
 *
 * @return slug {string} Slug from URL
 */
router.getSlug = function( ) {

	slug = window.location.hash;

	if ( "" === slug ) {

		return null;

	} else {

		return slug.substr( 1 );

	}

};

/**
 * Listener function for URL changes
 *
 */
router.listenPageChange = function( ) {

	window.addEventListener( 'hashchange', router.loadContent, false );

};

/**
 * Determines whether to load blog posts
 * or single post
 *
 */

router.loadContent = function( ) {

	var slug = router.getSlug( ),
      toggleEl = helpers.getEditorToggleEl();

	view.clearContent( );

	if ( null === slug ) {

		view.loadSingleContent( 'home' );

	} else if ( 'blog' === slug ) {

		view.loadBlogPosts( );

	} else {

		view.loadSingleContent( slug );

	}

  // Update editor.currentContent
  editor.currentContent = model.getContent( slug );

  // if editor is open, load the edit form
  if (false === toggleEl.classList.contains( 'hidden' )) {

		editor.fillEditForm( editor.currentContent );

	}

};
;/**
 * View file for displaying content
 */

/**
  * Main view object
  *
  */
var view = {};

/**
 * Calls initial View methods
 *
 */

view.init = function( ) {

	// Load menu
	view.createMainMenu( );

};

/**
 * Gets blog posts and appends them to the page
 *
 */

view.loadBlogPosts = function( ) {

	var posts = model.getPosts( ),
		postsMarkup = document.createDocumentFragment( ),
		titleEl = helpers.getPageTitleEl( ),
		contentEl = helpers.getPageContentEl( );

	for ( var i = 0, max = posts.length; i < max; i++ ) {
		postsMarkup.appendChild(view.createPostMarkup(posts[i]));
	}

	contentEl.appendChild( postsMarkup );
	titleEl.innerHTML = 'Blog Posts';

};

/**
 * Displays a single post or page based on slug
 *
 */

view.loadSingleContent = function( slug ) {

	var contentObj = model.getContent( slug ),
		titleEl = helpers.getPageTitleEl( ),
		contentEl = helpers.getPageContentEl( );

	titleEl.innerHTML = contentObj.title;
	contentEl.innerHTML = contentObj.content;

};


/**
 * Updates the main title for a page or post from editor form
 *
 */
 view.updateTitle = function ( title ) {

  var titleEl = helpers.getPageTitleEl();

  titleEl.innerHTML = title;

 };

 /**
  * Updates the main content for a page or post from editor form
  *
  */
view.updateContent = function ( content ) {

  var contentEl = helpers.getPageContentEl();

  contentEl.innerHTML = content;

};

/**
 * Clears the page title and content from the page
 *
 */

view.clearContent = function( ) {
	var titleEl = helpers.getPageTitleEl( ),
		contentEl = helpers.getPageContentEl( );

	titleEl.innerHTML = '';
	contentEl.innerHTML = '';
};

/**
 * Creates Main Menu Links for Pages
 *
 * @param array {posts} Posts to create links for
 * @return object {mainEl} Final markup for menu
 */

/**
 * Creates a Menu Item for a Page
 *
 */

view.createMainMenu = function( ) {

	var pages = model.getPages( ),
		menuMarkup = document.createDocumentFragment( ),
		mainMenuEl = helpers.getMainMenuEl( );

	for ( var i = 0, max = pages.length; i < max; i++ ) {

		menuMarkup.appendChild(helpers.createMenuItem(pages[i]));

	}
	mainMenuEl.appendChild( menuMarkup );

};

/**
 * Creates Markup for Blog Posts
 *
 * @param object {post} Post to create markup for
 * @return object {articleEl} Final post markup
 */

view.createPostMarkup = function( post ) {

	var articleEl = document.createElement( 'article' ),
		titleEl = document.createElement( 'h3' ),
		titleLink = helpers.createLink( post ),
		contentEl = document.createElement( 'div' );

	titleEl.appendChild( titleLink );
	contentEl.appendChild(document.createTextNode( post.content ));

	articleEl.appendChild( titleEl );
	articleEl.appendChild( contentEl );

	return articleEl;

};
;/**
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
};;/**
 * Main app file.  Initializes app components.
 */

/**
 * The main app object.
 *
 */
var vanillaPress = {

	init: function( ) {

		// Add any functions here you want
		// to run to start the application
		model.init( );
		router.init( );
		view.init( );
		editor.init( );

	}

};

vanillaPress.init( );

// Add your custom code starting here: