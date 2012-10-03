/**
 * SettingsViewModel
 * The SettingsViewModel module.
 */
define([
  "lib.use!lib.debug",
  "util.Constants",
  "util.ErrorHandler",
  "util.Storage",
  "lib.knockoutjs",
  "jquery",
  "model.setting.SettingModel",
  "util.Settings"
],
function(
  debug,
  Constants,
  ErrorHandler,
  Storage,
  ko,
  jQuery,
  SettingModel,
  SettingsManager
) {
  "use strict";

  var Module = function() {
    var self = this;

    self.settings = ko.observable();

    self.settingsManager = SettingsManager.createModule();

    self.initialize = function() {
      debug.log("SettingsViewModel", "initialize", "Initializing module");

      debug.log("SettingsViewModel", "initialize", "Loading settings for the first time...");
      self.retrieveSettings();
    };

    self.retrieveSettings = function() {
      debug.log("SettingsViewModel", "retrieveSettings", "Retrieving settings...");
      var settingModel = SettingModel.createModule();
      var rawSettings = self.settingsManager.retrieve();
      settingModel.applyMappings(rawSettings);
      self.settings(settingModel);
    };

    self.saveSettings = function() {
      debug.log("SettingsViewModel", "saveSettings", "Saving settings...", { savedObject: ko.toJSON(self.settings()) });
      self.settingsManager.save(self.settings());
    };

    self.resetToDefaults = function() {
      debug.log("SettingsViewModel", "resetToDefaults", "Resetting settings to default...");
      localStorage.removeItem(Constants.keyrings.settings);
      self.retrieveSettings();

      debug.log("SettingsViewModel", "resetToDefaults", "Reset to defaults.", { settings: ko.toJSON(self.settings()), localStorage: localStorage });
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