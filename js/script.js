/* Author: See /humans.txt
*/

"use strict";

require.config({
	paths: {
		// libraries
		'lib.modernizr': "lib/modernizr/modernizr-2.5.3-respond-1.1.0.min", // modernizr.com
		'lib.use': "lib/requirejs/addons/use", // documentup.com/tbranyen/use.js
		'lib.domready': "lib/requirejs/addons/domReady", // requirejs.com/docs/download.html#domReady
		'jquery': "lib/jquery/jquery-1.8.2", // jquery.com
		'lib.jquery-mobile': "lib/jquery-mobile/jquery.mobile-1.2.0-rc.2", // jquerymobile.com
		'lib.bootstrap': "lib/bootstrap/bootstrap", // twitter.github.com/bootstrap,
		'lib.bootstrap.carousel': "lib/bootstrap/carousel", // twitter.github.com/bootstrap,
		'lib.debug': "lib/ba.debug/ba.debug", // benalman.com/code/projects/javascript-debug
		'lib.knockoutjs': "lib/knockoutjs/knockout-2.1.0.debug", // knockoutjs.com,
		'lib.iscroll': "lib/iscroll/iscroll", // cubiq.org/iscroll-4
		'lib.jquery-mobile.iscrollview': "lib/iscroll/jquery.mobile.iscrollview", // github.com/watusi/jquery-mobile-iscrollview
		'lib.qunit': "lib/qunit/qunit", // qunitjs.com
		// /libraries

		// application core
		'Core': "module/Core",
		// /application core

		// models
		'model.task.TaskModel': "module/model/task/TaskModel",
		'model.setting.SettingModel': "module/model/setting/SettingModel",
		// /models

		// viewmodels
		'viewmodel.task.TaskViewModel': "module/viewmodel/task/TaskViewModel",
		'viewmodel.setting.SettingsViewModel': "module/viewmodel/setting/SettingsViewModel",
		// /viewmodels

		// utilities
		'util.communication.Communication': "module/util/communication/Communication",
		'util.communication.TaskComms': "module/util/communication/TaskComms",
		'util.ErrorHandler': "module/util/ErrorHandler",
		'util.Constants': "module/util/Constants",
		'util.Storage': "module/util/Storage",
		'util.Settings': "module/util/Settings",
		'util.lib.iscroll.Manager': "module/util/lib/iscroll/Manager",
		'util.communication.TmplComms': "module/util/communication/TmplComms",
		'util.tmpl.TemplateManager': "module/util/tmpl/TemplateManager",
		// /utilities

		// tests
		'test.CoreTest': "test/CoreTest",
		'test.model.task.TaskModelTest': "test/model/task/TaskModelTest",
		'test.viewmodel.task.TaskViewModelTest': "test/viewmodel/task/TaskViewModelTest"
		// /tests
	},

	// use.js configuration for non-amd libraries
	use: {
		'lib.jquery-mobile': {
			'attach': "jquery"
		},
		'lib.debug': {
			'attach': "debug"
		},
		'lib.bootstrap': {
			'attach': "bootstrap"
		}
	},
	// /use.js configuration for non-amd libraries

	// shim configuration
	shim: {
		// libraries
		'lib.bootstrap': {
			deps: [
				'jquery'
			]
		},

		'lib.qunit': {
			deps: [
				'jquery'
			]
		},

		'lib.use!lib.jquery-mobile': {
			deps: [
				'jquery'
			]
		},

		'lib.jquery-mobile.iscrollview': {
			deps: [
				'lib.use!lib.jquery-mobile',
				'lib.iscroll'
			]
		}
		// /libraries
	}
	// /shim configuration
});

require([
	"lib.domready",
	"lib.use!lib.debug",
	"Core"
],
function(
	domReady,
	debug,
	Core
) {
	domReady(function() {
		debug.info("Starting application");

		var core = Core.createModule();
	});
});