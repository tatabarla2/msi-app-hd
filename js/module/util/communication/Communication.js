/**
 * Communication
 * The Communication module.
 */
define([
	"lib.use!lib.debug",
	"util.Constants",
	"util.ErrorHandler",
	"util.Storage",
	"lib.knockoutjs",
	"jquery"
],
function(
	debug,
	Constants,
	ErrorHandler,
	Storage,
	ko,
	jQuery
) {
	"use strict";

	var Module = function() {
		debug.info("util.communication.Communication");
		var self = this;

		self.initialize = function() {
			debug.log("util.communication.Communication", "initialize", "Initializing module");
		};

		self.initalize();
		return self;
	};

	return {
		createModule: function() {
			return (new Module());
		}
	};
});