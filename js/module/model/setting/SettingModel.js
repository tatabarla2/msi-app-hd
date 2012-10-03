/**
The SettingModel holds the various settings configurable by the user in
the Settings screen.

Currently, the following settings are available:
1. API URL
2. Security credentials (which will be moved to another model in the future)

The SettingsModel is used by the
{{#crossLink "../../viewmodel/setting/SettingsViewModel"}}{{/crossLink}}.

@class SettingModel
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

  debug.log("model.setting.SettingModel", "Loading");
  var Module = function() {
    var self = this;

    self.api = {
      metricstream: {
        baseUrl: ko.observable()
      }
    };

    self.settings = {
      general: {
        username: ko.observable(),
        password: ko.observable()
      }
    };

    self.applyMappings = function(value) {
      debug.log("model.setting.SettingModel", "applyMappings", "Applying mappings with", value);

      self.settings.general.username(value.settings.general.username);
      self.settings.general.password(value.settings.general.password);
      self.api.metricstream.baseUrl(value.api.metricstream.baseUrl);
    };

    return self;
  };

  return {
    createModule: function() {
      return new Module();
    }
  };
});