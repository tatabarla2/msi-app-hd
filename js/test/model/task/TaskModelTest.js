/**
 * TaskModelTest
 * The TaskModelTest module.
 */
define([
	"lib.use!lib.debug",
	"util.Constants",
	"util.ErrorHandler",
	"lib.knockoutjs",
	"model.task.TaskModel",
	"lib.qunit"
],
function(
	debug,
	Constants,
	ErrorHandler,
	ko,
	Task
) {
	"use strict";

	debug.info("Beginning test", "test.model.task.TaskModelTest");
	module("test.model.task.TaskModelTest");
	test("applyMappings", function() {
		expect(4);

		var refTask = {
			title: "Test title",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			status: Constants.module.model.task.TaskModel.status.INCOMPLETE,
			processId: 1000
		};

		var testTask = Task.createModule();

		debug.info("test.model.task.TaskModelTest", "applyMappings", "Testing with", { refTask: refTask, testTask: testTask });

		testTask.title(refTask.title);
		testTask.description(refTask.description);
		testTask.status(refTask.status);
		testTask.processId(refTask.processId);

		strictEqual(refTask.title, testTask.title(), "Passed: strictEquals(refTask.title, testTask.title())");
		strictEqual(refTask.description, testTask.description(), "Passed: strictEquals(refTask.description, testTask.description())");
		strictEqual(refTask.status, testTask.status(), "Passed: strictEquals(refTask.status, testTask.status())");
		strictEqual(refTask.processId, testTask.processId(), "Passed: strictEquals(refTask.processId, testTask.processId())");
	});
});