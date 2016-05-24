"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var table_input_component_1 = require('./table-input/table-input.component');
var steps_component_1 = require('./steps/steps.component');
var AppComponent = (function () {
    function AppComponent() {
        this.msg = 'Calculating';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\t<h1>Association Rules</h1>\n\t<div class=\"container\" style=\"width: 95%\">\n\t\t<div class=\"row\">\n\t\t\t<table-input></table-input>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<steps>{{msg}}</steps>\n\t\t</div>\n\t</div>\n\t",
            directives: [table_input_component_1.TableInputComponent, steps_component_1.StepsComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map