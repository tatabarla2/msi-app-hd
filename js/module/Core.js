define([
	"jquery",
	"lib.use!lib.jquery-mobile",
	"lib.use!lib.debug",
	"lib.knockoutjs",
	"lib.use!lib.bootstrap",
	"viewmodel.task.TaskViewModel",
	"viewmodel.setting.SettingsViewModel",
	"lib.jquery-mobile.iscrollview",
	"util.tmpl.TemplateManager"
],
function(
	jQuery,
	jQueryMobile,
	debug,
	ko,
	bootstrap,
	TaskViewModel,
	SettingsViewModel,
	iScrollView,
	TemplateManager
) {
	"use strict";

	debug.info("Core", "Loading");

	var Module = function() {
		var self = this;

		self.coreViewModel = null;

		self.initialize = function() {
			debug.log("Core", "initialize", "Initializing");

			// Setup Cross Origin Resource Sharing
			// See http://jquerymobile.com/test/docs/pages/phonegap.html
			debug.log("Core", "initialize", "Setup Cross Origin Resource Sharing");
			jQuery.support.cors = true;
			jQuery.mobile.allowCrossDomainPages = true;

			// Create view models
			debug.log("Core", "initialize", "Creating TaskViewModel", TaskViewModel);
			var taskViewModel = TaskViewModel.createModule();

			debug.log("Core", "initialize", "Creating SettingsViewModel", SettingsViewModel);
			var settingsViewModel = SettingsViewModel.createModule();
			// /Create view models

			debug.log("Core", "initialize", "Creating TemplateManager", TemplateManager);
			var templateManager = TemplateManager.createModule();

			debug.group("Core", "initialize", "Loading external templates before applying Knockout bindings...");
			templateManager.loadTemplates();
			debug.groupEnd();

			debug.log("Core", "initialize", "Applying Knockout bindings...", { taskViewModel: jQuery("#page-audits").get(0), settingsViewModel: jQuery("#page-settings").get(0) });

			self.coreViewModel = {
				taskViewModel: taskViewModel,
				settingsViewModel: settingsViewModel
			};

			ko.applyBindings(self.coreViewModel);
		};

		self.initialize();
		return self;
	};

	return {
		createModule: function() {
			return new Module();
		}
	};
});