/**
 * TmplComms
 * The TmplComms module.
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
      debug.log("util.communication.TmplComms", "initialize", "Initializing module");
    };

    self.retrieveTemplate = function(tmpl) {
      debug.log("util.communication.TmplComms", "retrieveTemplate", tmpl);

      var rawTemplateHtml = null;

      var errorHandler = ErrorHandler.createModule();

      jQuery.ajax({
        url: tmpl.url,
        type: "GET",
        dataType: "html",
        async: false,
        cache: true,
        data: {},
        beforeSend: function(jqXHR, settings) {
          debug.log("util.communication.TmplComms", "retrieveTemplate", "beforeSend", { jqXHR: jqXHR, settings: settings });
        },
        complete: function(jqXHR, settings) {
          debug.log("util.communication.TmplComms", "retrieveTemplate", "complete", { jqXHR: jqXHR, settings: settings });
        },
        error: function(jqXHR, textStatus, errorThrown) {
          debug.error("util.communication.TmplComms", "retrieveTemplate", "error", { jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });

          rawTemplateHtml = "Sorry, unable to load template: " + tmpl.tagId + " from " + tmpl.url;
          errorHandler.showError("Sorry, unable to load template:" + tmpl.tagId + " from " + tmpl.url);
        },
        success: function(data, textStatus, jqXHR) {
          debug.info("util.communication.TmplComms", "retrieveTemplate", "success", { data: data, textStatus: textStatus, jqXHR: jqXHR });

          rawTemplateHtml = data;
        }
      });

      return rawTemplateHtml;
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