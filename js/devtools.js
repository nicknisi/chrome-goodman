chrome.devtools.panels.create('Goodman Inspector', 'img/goodman.png', 'panel.html');

// create a sidebar in the elements panel
chrome.devtools.panels.elements.createSidebarPane('John Goodman Properties', function (sidebar) {
	sidebar.setObject({
		wasinroseanne: true,
		isawesome: true,
		bestmovie: 'coyote ugly'
	}, 'John Goodman Properties');
});
