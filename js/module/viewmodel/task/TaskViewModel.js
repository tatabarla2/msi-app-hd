/**
 * TaskViewModel
 * The TaskViewModel module.
 */
define([
	"lib.use!lib.debug",
	"jquery",
	"lib.use!lib.jquery-mobile",
	"util.Constants",
	"util.ErrorHandler",
	"lib.knockoutjs",
	"util.communication.Communication",
	"util.communication.TaskComms",
	"model.task.TaskModel",
	"util.lib.iscroll.Manager",
	"util.Settings"
],
function(
	debug,
	jQuery,
	jQueryMobile,
	Constants,
	ErrorHandler,
	ko,
	Communication,
	TaskComms,
	TaskModel,
	iscrollManager,
	SettingsManager
) {
	"use strict";

	debug.info("viewmodel.task.TaskViewModel", "Loading");
	var Module = function() {
		var self = this;

		self.tasks = ko.observableArray();
		self.selectedTask = ko.observable();
		self.selectedTaskIndex = ko.observable();
		self.iscrollManagerObj = null;

		self.initialize = function() {
			debug.log("viewmodel.task.TaskViewModel", "initialize", "Initializing...");


			debug.log("viewmodel.task.TaskViewModel", "initialize", "iScroll: Initializing.");
			self.iscrollManagerObj = iscrollManager.createModule();

			jQuery("#page-audits, #page-audits-tasks-list").bind('pageinit', function(event) {
				debug.log("viewmodel.task.TaskViewModel", "initialize", "jQuery.bind('pageinit')...", { event: event });

				debug.log("viewmodel.task.TaskViewModel", "initialize", "iScroll: Adding pull down handlers.", jQuery(".iscroll-panel.task-list-panel").get(0));
				jQuery(".iscroll-panel.task-list-panel").bind({
					"iscroll_onpulldown" : function(event, data) {
						debug.log("viewmodel.task.TaskViewModel", "refreshListItemsUI", "iScroll: iscroll_onpulldown called.", { event: event, data: data });
						// See stackoverflow.com/q/4574940/585614
						setTimeout(function() {
							self.refreshTasks();
							data.iscrollview.refresh();
						}, 0);

					}
				});

				debug.log("viewmodel.task.TaskViewModel", "initialize", "Refreshing tasks for the first time.");
				self.refreshTasks();
			});
		};

		self.addTask = function(value) {
			debug.log("viewmodel.task.TaskViewModel", "addTask", "Adding task", value);
			self.tasks.push(value);
		};

		self.loadTasks = function() {
			debug.log("viewmodel.task.TaskViewModel", "loadTasks", "Loading tasks");

			var settingsManager = SettingsManager.createModule();
			var rawSettings = settingsManager.retrieve();

			var errorHandler = ErrorHandler.createModule();

			debug.log("viewmodel.task.TaskViewModel", "loadTasks", "Got raw settings via settingsManager", { rawSettings: rawSettings, settingsManager: settingsManager, SettingsManager: SettingsManager });

			var taskComms = TaskComms.createModule();
			debug.log("viewmodel.task.TaskViewModel", "loadTasks", "taskComms", taskComms);
			taskComms.retrieveTasks(rawSettings, function(rawTasks) {
				debug.log("viewmodel.task.TaskViewModel", "loadTasks", "Fetched tasks for", { username: rawSettings.username });

				debug.log("viewmodel.task.TaskViewModel", "loadTasks", "Removing old tasks");
				self.tasks.removeAll();

				// FIXME Ideally use the ko.mapping plugin. (knockoutjs.com/documentation/plugins-mapping.html)
				// Goes through the array of tasks and creates the TaskModel.
				// See Dealing with arrays in your view model > Looping through an array
				// in www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
				debug.group("viewmodel.task.TaskViewModel", "loadTasks", "Processing tasks");
				ko.utils.arrayForEach(rawTasks, function(task) {
					var newTask = TaskModel.createModule();
					newTask.applyMappings(task);
					self.tasks.push(newTask);
				});
				debug.groupEnd();

				// Refresh the jQuery mobile list view because the list items were recreated.
				self.refreshListItemsUI();
			});

			debug.log("viewmodel.task.TaskViewModel", "loadTasks", "Loading complete", self.tasks());
		};

		self.saveTask = function() {
			debug.log("viewmodel.task.TaskViewModel", "saveTask", "Saving tasks data.", self.selectedTask());

			var taskComms = TaskComms.createModule();

			var data = ko.toJS(self.selectedTask().stripMappings());

			var settingsManager = SettingsManager.createModule();
			var rawSettings = settingsManager.retrieve();

			taskComms.transmitData(data, rawSettings, function(successData) {
				debug.log("viewmodel.task.TaskViewModel", "saveTask", "OnSuccessHandler method", { successData: successData });
			});
		};

		self.refreshTasks = function() {
			debug.log("viewmodel.task.TaskViewModel", "refreshTasks", "Refreshing tasks");
			self.loadTasks();
		};

		self.refreshListItemsUI = function(elements) {
			debug.log("viewmodel.task.TaskViewModel", "refreshListItemsUI", "Entering", { elements: elements, selectedTask: self.selectedTask() });

			try {
				// Call refresh only if jQuery Mobile has initialized the list view.
				// See http://stackoverflow.com/a/9493671/585614
				debug.log("viewmodel.task.TaskViewModel", "refreshListItemsUI", "Refreshing jQuery Mobile list view", elements, self.selectedTask());
				if(undefined !== jQuery("#task-list").get(0)) {
					jQuery("#task-list").listview("refresh");
				}
			} catch(e) {
				// If list view is not initialized, then initialize it.
				debug.log("viewmodel.task.TaskViewModel", "refreshListItemsUI", "Creating jQuery Mobile list view", elements, self.selectedTask());
				if(undefined !== jQuery("#task-list").get(0)) {
					jQuery("#task-list").listview();
				}
			}
		};

		self.refreshCollapsibleBlocks = function(elements) {
			debug.log("viewmodel.task.TaskViewModel", "refreshCollapsibleBlocks", "Refreshing jQuery Mobile collapsible blocks", elements);

			if(undefined !== jQuery("#task-list").get(0)) {
				jQuery('#task-details').trigger('create');
			}
		};

		self.setSelectedTask = function(task, event) {
			debug.log("viewmodel.task.TaskViewModel", "setSelectedTask", { task: task, event: event });
			self.selectedTask(task);
			self.refreshListItemsUI();

			self.selectedTaskIndex = self.tasks.indexOf(self.selectedTask());
			debug.log("viewmodel.task.TaskViewModel", "setSelectedTask", "Index of selected task", { index: self.selectedTaskIndex, selectedTask: self.selectedTask });

			// See knockoutjs.com/documentation/click-binding.html#note_3_allowing_the_default_click_action
			// return true;
			if(undefined !== jQuery("#page-audits-task-details").get(0)) {
				jQuery.mobile.changePage(jQuery("#page-audits-task-details"));
			}
		};

		self.isTaskSelected = function() {
			debug.log("viewmodel.task.TaskViewModel", "isTaskSelected", self.selectedTask());
			if(typeof self.selectedTask() === "undefined") {
				return false;
			} else {
				return true;
			}
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