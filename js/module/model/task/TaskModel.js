/**
 * TaskModel
 * The TaskModel module.
 */
define([
	"lib.use!lib.debug",
	"util.Constants",
	"util.ErrorHandler",
	"lib.knockoutjs"
],
function(
	debug,
	Constants,
	ErrorHandler,
	ko
) {
	"use strict";

	debug.log("model.task.TaskModel", "Loading");
	var Module = function() {
		var self = this;

		self.metaInformation = {
			ddobjecttype      :	ko.observable("n/a"),
			ddcurrentusername :	ko.observable("n/a"),
			ddeventusername   :	ko.observable("n/a"),
			ddenterpriseinfo  :	ko.observable("n/a"),
			ddcurrentstage    :	ko.observable("n/a"),
			ddprocesscode     :	ko.observable("n/a")
		};

		self.taskInformation = {
			taskname         :	ko.observable("n/a"),
			checklistname    :	ko.observable("n/a"),
			taskinstructions :	ko.observable("n/a"),
			tasktimespent    :	ko.observable("n/a"),
			taskstatus       :	ko.observable("n/a"),
			taskowner        :	ko.observable("n/a"),
			taskresult       :	ko.observable("n/a"),
			taskworkdone     :	ko.observable("n/a"),
			taskapprover     :	ko.observable("n/a"),
			re1TASKNAME      :	ko.observable("n/a"),

			// An observable for keeping track of the Twitter Bootstrap label class to apply.
			statusClass: ko.observable()
		};

		self.taskAuditInformation = {
			audittitle             :	ko.observable("n/a"),
			auditauditableentities :	ko.observable("n/a"),
			auditpurpose           :	ko.observable("n/a"),
			auditrelatedrisks      :	ko.observable("n/a"),
			auditmanager           :	ko.observable("n/a"),
			auditorganistions      :	ko.observable("n/a"),
			auditconductedbyorg    :	ko.observable("n/a"),
			auditactions           :	ko.observable("n/a"),
			auditleadauditor       :	ko.observable("n/a"),
			auditresults           :	ko.observable("n/a")
		};

		self.applyMappings = function(value) {
			debug.log("model.task.TaskModel", "applyMappings", "Applying mappings with", value);

			if(typeof value !== "undefined") {
				self.metaInformation.ddobjecttype                (((typeof value.ddobjecttype           !== "undefined") && (value.ddobjecttype           !== "")) ? value.ddobjecttype           : "n/a");
				self.metaInformation.ddcurrentusername           (((typeof value.ddcurrentusername      !== "undefined") && (value.ddcurrentusername      !== "")) ? value.ddcurrentusername      : "n/a");
				self.metaInformation.ddeventusername             (((typeof value.ddeventusername        !== "undefined") && (value.ddeventusername        !== "")) ? value.ddeventusername        : "n/a");
				self.metaInformation.ddenterpriseinfo            (((typeof value.ddenterpriseinfo       !== "undefined") && (value.ddenterpriseinfo       !== "")) ? value.ddenterpriseinfo       : "n/a");
				self.metaInformation.ddcurrentstage              (((typeof value.ddcurrentstage         !== "undefined") && (value.ddcurrentstage         !== "")) ? value.ddcurrentstage         : "n/a");
				self.metaInformation.ddprocesscode               (((typeof value.ddprocesscode          !== "undefined") && (value.ddprocesscode          !== "")) ? value.ddprocesscode          : "n/a");

				self.taskInformation.taskname                    (((typeof value.taskname               !== "undefined") && (value.taskname               !== "")) ? value.taskname               : "n/a");
				self.taskInformation.checklistname               (((typeof value.checklistname          !== "undefined") && (value.checklistname          !== "")) ? value.checklistname          : "n/a");
				self.taskInformation.taskinstructions            (((typeof value.taskinstructns         !== "undefined") && (value.taskinstruions         !== "")) ? value.taskinstctions         : "n/a");
				self.taskInformation.tasktimespent               (((typeof value.tasktimespent          !== "undefined") && (value.tasktimespent          !== "")) ? value.tasktimespent          : "n/a");
				self.taskInformation.taskstatus                  (((typeof value.taskstatus             !== "undefined") && (value.taskstatus             !== "")) ? value.taskstatus             : "n/a");
				self.taskInformation.taskowner                   (((typeof value.taskowner              !== "undefined") && (value.taskowner              !== "")) ? value.taskowner              : "n/a");
				self.taskInformation.taskresult                  (((typeof value.taskresult             !== "undefined") && (value.taskresult             !== "")) ? value.taskresult             : "n/a");
				self.taskInformation.taskworkdone                (((typeof value.taskworkdone           !== "undefined") && (value.taskworkdone           !== "")) ? value.taskworkdone           : "n/a");
				self.taskInformation.taskapprover                (((typeof value.taskapprover           !== "undefined") && (value.taskapprover           !== "")) ? value.taskapprover           : "n/a");
				self.taskInformation.re1TASKNAME                 (((typeof value.re1TASKNAME            !== "undefined") && (value.re1TASKNAME            !== "")) ? value.re1TASKNAME            : "n/a");

				self.taskAuditInformation.audittitle             (((typeof value.audittitle             !== "undefined") && (value.audittitle             !== "")) ? value.audittitle             : "n/a");
				self.taskAuditInformation.auditauditableentities (((typeof value.auditauditableentities !== "undefined") && (value.auditauditableentities !== "")) ? value.auditauditableentities : "n/a");
				self.taskAuditInformation.auditpurpose           (((typeof value.auditpurpose           !== "undefined") && (value.auditpurpose           !== "")) ? value.auditpurpose           : "n/a");
				self.taskAuditInformation.auditrelatedrisks      (((typeof value.auditrelatedrisks      !== "undefined") && (value.auditrelatedrisks      !== "")) ? value.auditrelatedrisks      : "n/a");
				self.taskAuditInformation.auditmanager           (((typeof value.auditmanager           !== "undefined") && (value.auditmanager           !== "")) ? value.auditmanager           : "n/a");
				self.taskAuditInformation.auditorganistions      (((typeof value.auditorganistions      !== "undefined") && (value.auditorganistions      !== "")) ? value.auditorganistions      : "n/a");
				self.taskAuditInformation.auditconductedbyorg    (((typeof value.auditconductedbyorg    !== "undefined") && (value.auditconductedbyorg    !== "")) ? value.auditconductedbyorg    : "n/a");
				self.taskAuditInformation.auditactions           (((typeof value.auditactions           !== "undefined") && (value.auditactions           !== "")) ? value.auditactions           : "n/a");
				self.taskAuditInformation.auditleadauditor       (((typeof value.auditleadauditor       !== "undefined") && (value.auditleadauditor       !== "")) ? value.auditleadauditor       : "n/a");
				self.taskAuditInformation.auditresults           (((typeof value.auditresults           !== "undefined") && (value.auditresults           !== "")) ? value.auditresults           : "n/a");
			}

			self.processStatusLabels();
		};

		self.stripMappings = function() {
			var strippedData = {};

			// We need to remove the string, "n/a", while sending it back to our server, hence the code below.

			strippedData.ddobjecttype     			= ("n/a" !== self.metaInformation.ddobjecttype()      					? self.metaInformation.ddobjecttype()      						: "");
			strippedData.ddcurrentusername			= ("n/a" !== self.metaInformation.ddcurrentusername() 					? self.metaInformation.ddcurrentusername() 						: "");
			strippedData.ddeventusername  			= ("n/a" !== self.metaInformation.ddeventusername()   					? self.metaInformation.ddeventusername()   						: "");
			strippedData.ddenterpriseinfo 			= ("n/a" !== self.metaInformation.ddenterpriseinfo()  					? self.metaInformation.ddenterpriseinfo()  						: "");
			strippedData.ddcurrentstage   			= ("n/a" !== self.metaInformation.ddcurrentstage()    					? self.metaInformation.ddcurrentstage()    						: "");
			strippedData.ddprocesscode    			= ("n/a" !== self.metaInformation.ddprocesscode()     					? self.metaInformation.ddprocesscode()     						: "");

			strippedData.taskname         			= ("n/a" !== self.taskInformation.taskname()         						? self.taskInformation.taskname()         					 	: "");
			strippedData.checklistname    			= ("n/a" !== self.taskInformation.checklistname()    						? self.taskInformation.checklistname()    					 	: "");
			strippedData.taskinstructions 			= ("n/a" !== self.taskInformation.taskinstructions() 						? self.taskInformation.taskinstructions() 					 	: "");
			strippedData.tasktimespent    			= ("n/a" !== self.taskInformation.tasktimespent()    						? self.taskInformation.tasktimespent()    					 	: "");
			strippedData.taskstatus       			= ("n/a" !== self.taskInformation.taskstatus()       						? self.taskInformation.taskstatus()       					 	: "");
			strippedData.taskowner        			= ("n/a" !== self.taskInformation.taskowner()        						? self.taskInformation.taskowner()        					 	: "");
			strippedData.taskresult       			= ("n/a" !== self.taskInformation.taskresult()       						? self.taskInformation.taskresult()       					 	: "");
			strippedData.taskworkdone     			= ("n/a" !== self.taskInformation.taskworkdone()     						? self.taskInformation.taskworkdone()     					 	: "");
			strippedData.taskapprover     			= ("n/a" !== self.taskInformation.taskapprover()     						? self.taskInformation.taskapprover()     					 	: "");
			strippedData.re1TASKNAME      			= ("n/a" !== self.taskInformation.re1TASKNAME()      						? self.taskInformation.re1TASKNAME()      					 	: "");

			strippedData.audittitle             = ("n/a" !== self.taskAuditInformation.audittitle()             ? self.taskAuditInformation.audittitle()             	: "");
			strippedData.auditauditableentities = ("n/a" !== self.taskAuditInformation.auditauditableentities() ? self.taskAuditInformation.auditauditableentities() 	: "");
			strippedData.auditpurpose           = ("n/a" !== self.taskAuditInformation.auditpurpose()           ? self.taskAuditInformation.auditpurpose()           	: "");
			strippedData.auditrelatedrisks      = ("n/a" !== self.taskAuditInformation.auditrelatedrisks()      ? self.taskAuditInformation.auditrelatedrisks()      	: "");
			strippedData.auditmanager           = ("n/a" !== self.taskAuditInformation.auditmanager()           ? self.taskAuditInformation.auditmanager()           	: "");
			strippedData.auditorganistions      = ("n/a" !== self.taskAuditInformation.auditorganistions()      ? self.taskAuditInformation.auditorganistions()      	: "");
			strippedData.auditconductedbyorg    = ("n/a" !== self.taskAuditInformation.auditconductedbyorg()    ? self.taskAuditInformation.auditconductedbyorg()    	: "");
			strippedData.auditactions           = ("n/a" !== self.taskAuditInformation.auditactions()           ? self.taskAuditInformation.auditactions()           	: "");
			strippedData.auditleadauditor       = ("n/a" !== self.taskAuditInformation.auditleadauditor()       ? self.taskAuditInformation.auditleadauditor()       	: "");
			strippedData.auditresults           = ("n/a" !== self.taskAuditInformation.auditresults()           ? self.taskAuditInformation.auditresults()           	: "");

			return strippedData;
		};

		self.processStatusLabels = function() {
			debug.log("model.task.TaskModel", "processStatusLabels", "Processing status labels", self.taskInformation.taskstatus(), Constants.module.model.task.TaskModel.status);
			switch(self.taskInformation.taskstatus()) {
				case Constants.module.model.task.TaskModel.status["1"].name:
						self.taskInformation.statusClass(Constants.module.model.task.TaskModel.status["1"].label);
						self.taskInformation.taskstatus(Constants.module.model.task.TaskModel.status["1"].humanName);
					break;

				case Constants.module.model.task.TaskModel.status["0"].name:
						self.taskInformation.statusClass(Constants.module.model.task.TaskModel.status["0"].label);
						self.taskInformation.taskstatus(Constants.module.model.task.TaskModel.status["0"].humanName);
					break;

				case Constants.module.model.task.TaskModel.status["2"].name:
						self.taskInformation.statusClass(Constants.module.model.task.TaskModel.status["2"].label);
						self.taskInformation.taskstatus(Constants.module.model.task.TaskModel.status["2"].humanName);
					break;

				default:
						self.taskInformation.statusClass(Constants.module.model.task.TaskModel.status.DEFAULT.label);
						self.taskInformation.taskstatus(Constants.module.model.task.TaskModel.status.DEFAULT.humanName);
					break;
			}
		};

		return self;
	};

	return {
		createModule: function() {
			return new Module();
		}
	};
});
