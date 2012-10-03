"use strict";

/**
 * Constants
 * The Constants module stores global constants required in the application.
 * @author See /humans.txt
 */
define({
	module: {
		model: {
			task: {
				TaskModel: {
					status: {
						"1": {
							'name': "1",
							'label': "label label-success",
							'humanName': "Completed"
						},
						"0": {
							'name': "0",
							'label': "label label-info",
							'humanName': "In Process"
						},
						"2": {
							'name': "2",
							'label': "label label-important",
							'humanName': "Blocked"
						},
						DEFAULT: {
							'name': "",
							'label': "label",
							'humanName': "Not available"
						}
					},

					mappings: {
						'auditName'    : 0,
						'taskName'     : 1,
						'status'       : 2,
						'auditor'      : 3,
						'approver'     : 4,
						'finalApprover': 5,
						'startDate'    : 6,
						'endDate'      : 7,
						'type'         : 8,
						'details'      : 9
					}
				}
			}
		}
	},

	api: {
		metricstream: {
			baseUrl: "http://msi-l277.metricstream.com:8080/MobilePOC/restx",
			methods: {
				task: {
					receive: {
						url: "/tasksD/getTask"
					},
					transmit: {
						url: "/tasksD/addTask"
					}
				}
			}
		}
	},

	keyrings: {
		tasks: "MSI_APP_TASKS",

		settings: "MSI_APP_SETTINGS"
	},

	refreshTimeouts: {
		tasks: (1 * 60 * 1000) // 2 mins in milliseconds.
	},

	errors: {
		timeoutError: 20000,
		timeoutWarn: 5000,
		timeoutInfo: 2000,
		storage: {
			FOUND: {
				code: -5000,
				message: "key-value pair found."
			},
			NOT_AVAILABLE: {
				code: -5001,
				message: "localstorage not supported."
			},

			NOT_FOUND: {
				code: -5002,
				message: "key-value pair not found."
			}
		},

		communication: {
			OK: {
				code: 0,
				message: "OK"
			},

			ERROR: {
				code: -1,
				message: "ERROR"
			}
		}
	},

	"templateConfiguration": {
		"templates": [{
			"tagId": "page-settings",
			"url": "tmpl/pages/page-settings.html"
		}, {
			"tagId": "template-tasks-list",
			"url": "tmpl/tasks-list.html"
		}, {
			"tagId": "template-task-detail",
			"url": "tmpl/task-detail.html"
		}]
	},

	settings: {
		general: {
			username: "SYSTEMI",
			password: "welcome*12"
		}
	}
});