/**
 * Manager
 * The Manager module for iscroll.
 */
define([
	"lib.use!lib.debug",
	"util.Constants",
	"util.ErrorHandler",
	"util.Storage",
	"lib.knockoutjs",
	"jquery",
	"lib.iscroll"
],
function(
	debug,
	Constants,
	ErrorHandler,
	Storage,
	ko,
	jQuery,
	iscroll
) {
	"use strict";

	debug.info("util.lib.iscroll.Manager", "Loading");
	var Module = function() {
		var self = this;

		self.initialize = function() {
			debug.log("util.lib.iscroll.Manager", "initialize", "Initializing module");

			ko.bindingHandlers.iscroll = {
				init: function(element) {
					debug.log("util.lib.iscroll.Manager", "ko.bindingHandlers.iscroll.init", "Creating new iScroll", jQuery(element));
					if(undefined !== jQuery(element)) {
						jQuery(element).iscrollview({
							removeWrapperPadding: false
						});
					} else {
						debug.log("util.lib.iscroll.Manager", "ko.bindingHandlers.iscroll.init", "Did not create new iScroll");
					}
				},

				update: function(element) {
					debug.log("util.lib.iscroll.Manager", "ko.bindingHandlers.iscroll.update", "Refreshing iScroll", jQuery(element));
					// See http://stackoverflow.com/a/920310/585614
					if(undefined !== jQuery(element)) {
						jQuery(element).iscrollview('refresh');
					} else {
						debug.log("util.lib.iscroll.Manager", "ko.bindingHandlers.iscroll.update", "Did not refresh iScroll");
					}
				}
			};
		};

		self.initialize();
		return self;
	};

	return {
		createModule: function() {
			return (new Module());
		}
	};
});