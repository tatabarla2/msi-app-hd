/**
 * TaskComms
 * The TaskComms module.
 */
define([
	"lib.use!lib.debug",
	"util.Constants",
	"util.ErrorHandler",
	"util.Storage",
	"util.communication.Communication",
	"lib.knockoutjs",
	"jquery"
],
function(
	debug,
	Constants,
	ErrorHandler,
	Storage,
	Communication,
	ko,
	jQuery
) {
	"use strict";

	var Module = function() {
		var self = this;

		self.initialize = function() {
			debug.log("util.communication.TaskComms", "initialize", "Initializing module");
		};

		self.retrieveTasks = function(rawSettings, onSuccessHandler) {
			debug.log("util.communication.TaskComms", "retrieveTasks", { rawSettings: rawSettings, onSuccessHandler: onSuccessHandler });
			var storage = Storage.createModule();
			var fetchFromServer = false;

			var errorHandler = ErrorHandler.createModule();

			var taskData = null;

			// TODO Implement client side intelligent caching
			fetchFromServer = true;

			if(true === fetchFromServer) {
				jQuery.ajax({
					url:
						rawSettings.api.metricstream.baseUrl,
					type: "GET",
					dataType: "json",
					// Make this an async call so the UI thread doesn't block.
					async: true,
					cache: true,
					data: {
						username: rawSettings.settings.general.username,
						password: rawSettings.settings.general.password,
						callback: "callback"
					},
					beforeSend: function(jqXHR, settings) {
						debug.log("util.communication.TaskComms", "retrieveTasks", "beforeSend", jqXHR, settings);
					},
					complete: function(jqXHR, settings) {
						debug.log("util.communication.TaskComms", "retrieveTasks", "complete", jqXHR, settings);
					},
					error: function(jqXHR, textStatus, errorThrown) {
						debug.error("util.communication.TaskComms", "retrieveTasks", "error", jqXHR, textStatus, errorThrown);

						var storedContents = null;

						// On error, load from local cache.
						switch(storage.isAlreadyAvailable(Constants.keyrings.tasks)) {
							case Constants.errors.storage.FOUND:
								// FIXME If a second user is logged in, then don't load data for the first user.
								storedContents = storage.load(Constants.keyrings.tasks);
								taskData = storedContents.contents;
								debug.warn("util.communication.TaskComms", "retrieveTasks", "Using locally cached data.", taskData);
								errorHandler.showWarn("Using locally cached data from " + new Date(storedContents.timestamp).toLocaleString());

								debug.log("util.communication.TaskComms", "retrieveTasks", "complete", "Calling onSuccessHandler", { onSuccessHandler: onSuccessHandler });
								onSuccessHandler.call(undefined, taskData);
							break;

							case Constants.errors.storage.NOT_FOUND:
								debug.error("util.communication.TaskComms", "retrieveTasks", Constants.errors.storage.NOT_FOUND.message);
								errorHandler.showError("Sorry, unable to load your data. Please check your network settings and try again.");
							break;

							case Constants.errors.storage.NOT_AVAILABLE:
								debug.error("util.communication.TaskComms", "retrieveTasks", Constants.errors.storage.NOT_AVAILABLE.message);
								errorHandler.showError("Sorry, your device does not support HTML5 local storage.");
							break;
						}
					},
					success: function(data, textStatus, jqXHR) {
						debug.info("util.communication.TaskComms", "retrieveTasks", "success", data, textStatus, jqXHR);

						debug.log("util.communication.TaskComms", "retrieveTasks", "Checking status", data.taskStatus);
						switch(data.taskStatus) {
							case Constants.errors.communication.OK.message:
								debug.log("util.communication.TaskComms", "retrieveTasks", "Status: " + Constants.errors.communication.OK.message + ", processing tasks");

								var now = new Date();

								debug.log("util.communication.TaskComms", "retrieveTasks", "Creating container", now, data);
								var container = {
									timestamp: now.getTime(),
									contents: data.taskDetails
								};

								debug.log("util.communication.TaskComms", "retrieveTasks", "Saving to localstorage", storage);
								storage.save(Constants.keyrings.tasks, container);

								debug.log("util.communication.TaskComms", "retrieveTasks", "Returning data", data);
								taskData = data.taskDetails;

								debug.log("util.communication.TaskComms", "retrieveTasks", "complete", "Calling onSuccessHandler", { onSuccessHandler: onSuccessHandler });
								errorHandler.showInfo("Tasks successfully loaded.");
								onSuccessHandler.call(undefined, taskData);

							break;

							case Constants.errors.communication.ERROR.message:
								errorHandler.showError("Oops! " + data.message);
							break;
						}
					}
				});
			}
		};

		self.transmitData = function(data, rawSettings, onSuccessHandler) {
			debug.log("util.communication.TaskComms", "transmitData", "Transmitting data...", { data: data });

			var errorHandler = ErrorHandler.createModule();

			// HACK Remove username/password from here
			// and pass it as a separate JSON object.

			data.username = rawSettings.settings.general.username;
			data.password = rawSettings.settings.general.password;

			jQuery.ajax({
				url:	rawSettings.api.metricstream.baseUrl +
							Constants.api.metricstream.methods.task.transmit.url,
				type: "POST",
				async: true,
				cache: true,
				data: data,
				beforeSend: function(jqXHR, settings) {
					debug.log("util.communication.TaskComms", "transmitData", "beforeSend", { jqXHR: jqXHR, settings: settings });
				},
				complete: function(jqXHR, settings) {
					debug.log("util.communication.TaskComms", "transmitData", "complete", { jqXHR: jqXHR, settings: settings });
				},
				error: function(jqXHR, textStatus, errorThrown) {
					debug.log("util.communication.TaskComms", "transmitData", "error", { jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });

					errorHandler.showError("Unable to connect to server. Please try again later.");
				},
				success: function(data, textStatus, jqXHR) {
					debug.log("util.communication.TaskComms", "transmitData", "success", { data: data, textStatus: textStatus, jqXHR: jqXHR});

					debug.log("util.communication.TaskComms", "retrieveTasks", "complete", "Calling onSuccessHandler", { onSuccessHandler: onSuccessHandler });
					onSuccessHandler.call(undefined, data);

					errorHandler.showInfo("Task successfully submitted: " + data);
				}
			});
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