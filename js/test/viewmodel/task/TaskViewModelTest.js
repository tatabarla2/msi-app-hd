/**
 * TaskModelTest
 * The TaskModelTest module.
 */
define([
	"lib.use!lib.debug",
	"util.Constants",
	"util.ErrorHandler",
	"lib.knockoutjs",
	"jquery",
	"viewmodel.task.TaskViewModel",
	"lib.qunit"
],
function(
	debug,
	Constants,
	ErrorHandler,
	ko,
	jQuery,
	TaskViewModel,
	QUnit
) {
	"use strict";

	debug.info("Beginning test", "test.viewmodel.task.TaskViewModelTest");
	module("test.viewmodel.task.TaskViewModelTest");
	test("loadTasks", function() {
		var sampleTaskData = {};

		jQuery.ajax({
			url: Constants.api.metricstream.baseUrl +	Constants.api.metricstream.methods.task.url,
			async: false,
			success: function(data) {
				debug.log("test.viewmodel.task.TaskViewModelTest", "loadTasks", "jQuery.ajax.success", "Recieved data", data);
				sampleTaskData = data;
			}
		});

		debug.log("test.viewmodel.task.TaskViewModelTest", "loadTasks", "Sample task data", sampleTaskData);

		var taskViewModel = TaskViewModel.createModule();

		debug.log("test.viewmodel.task.TaskViewModelTest", "loadTasks", "taskViewModel.tasks", taskViewModel.tasks());

		expect(sampleTaskData.items.tasks.length * 4);

		jQuery.each(taskViewModel.tasks(), function(index, value) {
			debug.log("test.viewmodel.task.TaskViewModelTest", "loadTasks", "each", index, value, sampleTaskData.items.tasks[index]);
			strictEqual(value.title(), sampleTaskData.items.tasks[index].title, "Passed strictEqual(\"" + value.title() + "\", \"" + sampleTaskData.items.tasks[index].title + "\")");
			strictEqual(value.description(), sampleTaskData.items.tasks[index].description, "Passed strictEqual(\"" + value.description() + "\", \"" + sampleTaskData.items.tasks[index].description + "\")");
			strictEqual(value.status(), sampleTaskData.items.tasks[index].status, "Passed strictEqual(\"" + value.status() + "\", \"" + sampleTaskData.items.tasks[index].status + "\")");
			strictEqual(value.processId(), sampleTaskData.items.tasks[index].processId, "Passed strictEqual(\"" + value.processId() + "\", \"" + sampleTaskData.items.tasks[index].processId + "\")");
		});
	});
});