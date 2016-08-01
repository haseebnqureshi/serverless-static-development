
//requires jquery & underscore.js
if (jQuery && _) {
	jQuery(function($) {

		//using mustache rendering
		_.templateSettings = {
			interpolate: /\{\{(.+?)\}\}/g
		};

		//rendering each found partial
		$('div[data-partial]').each(function() {
			var $partial = $(this);
			try {
				var vars = $(this).data();
				var path = 'partials/' + vars.partial;
				$.get(path, function(html) {
					var template = _.template(html);
					var rendered = template(vars);
					$partial.html(rendered);
				});
			}
			catch (err) {
				console.error(err);
			}
		});
	});	
}
