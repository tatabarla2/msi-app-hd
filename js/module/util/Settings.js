/**
 * Settings
 * The Settings module.
 */
define([
  "lib.use!lib.debug",
  "util.Constants",
  "util.ErrorHandler",
  "util.Storage",
  "lib.knockoutjs",
  "jquery"
],
function(
  debug,
  Constants,
  ErrorHandler,
  Storage,
  ko,
  jQuery
) {
  "use strict";

  var Module = function() {
    var self = this;

    self.storage = Storage.createModule();

    self.initialize = function() {
      debug.log("util.Settings", "initialize", "Initializing module");
    };

    self.retrieve = function() {
      debug.log("util.Settings", "retrieve", "Retrieving settings...");

      var returnSettings = null;

      switch(self.storage.isAlreadyAvailable(Constants.keyrings.settings)) {
        case Constants.errors.storage.NOT_FOUND:
        case Constants.errors.storage.NOT_AVAILABLE:
          debug.warn("util.Settings", "retrieve", "Settings not found, using defaults...");

          returnSettings = Constants;

          break;

        case Constants.errors.storage.FOUND:
          debug.log("util.Settings", "retrieve", "Settings found...");

          var rawSettings = self.storage.load(Constants.keyrings.settings);
          debug.log("util.Settings", "retrieve", "Retrieved raw settings...", { rawSettings: rawSettings });

          returnSettings = rawSettings;

          break;

        default:
          debug.error("util.Settings", "retrieve", "Storage module error, using default settings.");

          returnSettings = Constants;

          break;
      }

      return returnSettings;
    };

    self.save = function(settings) {
      debug.log("util.Settings", "save", "Saving settings...", { savedObject: ko.toJSON(settings) });

      self.storage.save(Constants.keyrings.settings, settings);
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