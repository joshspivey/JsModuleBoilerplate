define(['js/Class'],function(Class){
	
	/**
	 * Module
	 *
	 * Our module class that extends the base class "Class"
	 */
	jsmbp.Module = jsmbp.Class.extend({
	
		options: {},
		/**
		 * init
		 *
		 * Construct the object with the options and couple it with the element.
		 *
		 * @param {object literal} options An array of options.
		 * @param {HTMLElement} element A DOM element.
		 */
		init: function(options, element){
			this.element = $(element);
			this.options = $.extend({
				debug: false
			}, this.options, options, this.element.data());
			
			this.log('component init', this.options, this.element);
		},
		/**
		 * pubsub
		 *
		 * Used to publish or subscribe to events from
		 * or to modules.
		 */
		pubsub: function(el, ev, mode){
			$(el).trigger(ev)
		},
		
		/**
		 * log
		 *
		 * Output to the console,
		 * if it exists and debugging is enabled in the sub-class.
		 *
		 * Accepts any number of arguments, any type.
		 */
		log: function(){
			if (this.options.debug && window.console && window.console.log) {
				window.console.log(arguments);
			}
		},
		/**
		 * callback
		 *
		 * Callback is used to activate modules on
		 * ajax loaded content or hidden elements.
		 * @usage this.callback('.wrapper');
		 *
		 * @param elements  A set of elements to execute the method on
		 */
		callback: function(el){
			for (var prop in jsmbp.RegisteredModules) {
				$(el).find(jsmbp.RegisteredModules[prop]).each(function(idx, el){
					$.fn[prop].apply($(el));
				});
			}
			this.log('callback', el);
		}
	});
	return jsmbp.Module;
});

