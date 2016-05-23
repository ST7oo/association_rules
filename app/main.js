"use strict";
// The usual bootstrapping imports
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var data_service_1 = require('./services/data.service');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [data_service_1.DataService]);
//# sourceMappingURL=main.js.map