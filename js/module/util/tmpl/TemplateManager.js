/**
 * TemplateManager
 * The TemplateManager module.
 */
define([
  "lib.use!lib.debug",
  "util.Constants",
  "util.ErrorHandler",
  "util.Storage",
  "lib.knockoutjs",
  "jquery",
  "util.communication.TmplComms"
],
function(
  debug,
  Constants,
  ErrorHandler,
  Storage,
  ko,
  jQuery,
  TmplComms
) {
  "use strict";

  var Module = function() {
    var self = this;

    self.tmplComms = null;

    self.initialize = function() {
      debug.log("TemplateManager", "initialize", "Initializing module");

      debug.log("TemplateManager", "initialize", "Creating tmplComms module...");
      self.tmplComms = TmplComms.createModule();
    };

    self.loadTemplates = function() {
      debug.log("TemplateManager", "loadTemplates", "Loading external templates using ", Constants.templateConfiguration);

      jQuery.each(Constants.templateConfiguration.templates, function(index, value) {
        debug.log("TemplateManager", "loadTemplates", "Loading template", index, value);
        var rawHtml = self.tmplComms.retrieveTemplate(value);

        if(null !== rawHtml) {
          debug.log("TemplateManager", "loadTemplates", "Loading raw HTML into tag", { rawHtml: rawHtml, value: value });
          jQuery("#" + value.tagId).html(rawHtml);
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