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
var DataService = (function () {
    function DataService() {
        this.supportChanged$ = new core_1.EventEmitter();
        this.calculate$ = new core_1.EventEmitter();
    }
    DataService.prototype.getData = function () {
        return this.data;
    };
    DataService.prototype.setData = function (data) {
        this.data = data;
    };
    DataService.prototype.addRow = function (row) {
        this.data.push(row);
    };
    DataService.prototype.setVariablesNames = function (names) {
        this.variables_names = names;
    };
    DataService.prototype.setSupport = function (sup) {
        if (sup != this.support) {
            this.support = sup;
            this.supportChanged$.emit(sup);
        }
    };
    DataService.prototype.recalculate = function () {
        this.calculate$.emit(true);
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map