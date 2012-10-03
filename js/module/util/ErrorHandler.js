"use strict";

/**
 * ErrorHandler
 * The ErrorHandler module.
 * @author rishabhsrao
 */
define([
	"lib.use!lib.debug",
	"util.Constants",
	"jquery",
	"lib.use!lib.jquery-mobile"
],
function(
	debug,
	Constants,
	jQuery,
	jQueryMobile
) {
	debug.log("Loading util.ErrorHandler");
	var Module = function() {
		var self = this;

		self.showError = function(error) {
			debug.error(error);
			jQuery.mobile.showPageLoadingMsg("e", error, true);
			setTimeout(jQuery.mobile.hidePageLoadingMsg, Constants.errors.timeoutError);
		};

		self.showWarn = function(error) {
			debug.warn(error);
			jQuery.mobile.showPageLoadingMsg("e", error, true);
			setTimeout(jQuery.mobile.hidePageLoadingMsg, Constants.errors.timeoutWarn);
		};

		self.showInfo = function(error) {
			debug.info(error);
			jQuery.mobile.showPageLoadingMsg("a", error, true);
			setTimeout(jQuery.mobile.hidePageLoadingMsg, Constants.errors.timeoutInfo);
		};

		return self;
	};

	return {
		createModule: function() {
			return new Module();
		}
	};
});