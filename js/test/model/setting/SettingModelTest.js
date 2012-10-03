/**
 * SettingModelTest
 * The SettingModelTest module.
 */
define([
  "lib.use!lib.debug",
  "util.Constants",
  "util.ErrorHandler",
  "lib.knockoutjs",
  "model.setting.SettingModel",
  "lib.qunit"
],
function(
  debug,
  Constants,
  ErrorHandler,
  ko,
  SettingModel
) {
  "use strict";

  debug.info("Beginning test", "test.model.task.SettingModelTest");
  module("test.model.setting.SettingModelTest");
  test("applyMappings", function() {
    expect(1);

    var refSettingModel = {
      username: null
    };

    var testSettingModel = SettingModel.createModule();

    debug.info("test.model.setting.SettingModelTest", "applyMappings", "Testing with", { testSettingModel: testSettingModel, refSettingModel: refSettingModel });
    testSettingModel.applyMappings(refSettingModel);
    deepEqual(ko.toJS(refSettingModel), testSettingModel, "Passed: deepEqual(ko.toJS(testSettingModel), refSettingModel");

    refSettingModel.username = "";
    debug.info("test.model.setting.SettingModelTest", "applyMappings", "Testing with", { testSettingModel: testSettingModel, refSettingModel: refSettingModel });
    testSettingModel.applyMappings(refSettingModel);
    deepEqual(ko.toJS(refSettingModel), testSettingModel, "Passed: deepEqual(ko.toJS(testSettingModel), refSettingModel");

    refSettingModel.username = "Kiran.Kumar";
    debug.info("test.model.setting.SettingModelTest", "applyMappings", "Testing with", { testSettingModel: testSettingModel, refSettingModel: refSettingModel });
    testSettingModel.applyMappings(refSettingModel);
    deepEqual(ko.toJS(refSettingModel), testSettingModel, "Passed: deepEqual(ko.toJS(testSettingModel), refSettingModel");
  });
});