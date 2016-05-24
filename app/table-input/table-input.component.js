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
var data_service_1 = require('../services/data.service');
var TableInputComponent = (function () {
    function TableInputComponent(dataService) {
        this.dataService = dataService;
    }
    TableInputComponent.prototype.ngOnInit = function () {
        this.dataService.setVariablesNames([
            'A',
            'B',
            'D',
            'C'
        ]);
        this.dataService.setData([
            // ['A1', 'B1', 'C1', 'D1'],
            // ['A1', 'B3', 'C2', 'D1'],
            // ['A1', 'B1', 'C1', 'D1'],
            // ['A2', 'B2', 'C2', 'D2'],
            // ['A3', 'B2', 'C1', 'D2'],
            // ['A2', 'B1', 'C1', 'D3'],
            // ['A2', 'B1', 'C2', 'D3']
            ['A1', 'B1', 'D1', 'C1'],
            ['A1', 'B3', 'D2', 'C1'],
            ['A1', 'B1', 'D1', 'C1'],
            ['A2', 'B2', 'D2', 'C2'],
            ['A3', 'B2', 'D1', 'C2'],
            ['A2', 'B1', 'D1', 'C3'],
            ['A2', 'B1', 'D2', 'C3']
        ]);
        this.dataService.setSupport(0.1);
    };
    TableInputComponent.prototype.supportChanged = function (new_support) {
        this.dataService.setSupport(new_support);
    };
    TableInputComponent.prototype.addRow = function (text) {
        var obs = text.split(',');
        if (obs.length > 0) {
            this.dataService.addRow(obs);
        }
    };
    TableInputComponent.prototype.calculate = function () {
        this.dataService.recalculate();
    };
    TableInputComponent.prototype.reset = function () {
        this.dataService.setData([]);
    };
    TableInputComponent = __decorate([
        core_1.Component({
            selector: 'table-input',
            templateUrl: 'app/table-input/table-input.component.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], TableInputComponent);
    return TableInputComponent;
}());
exports.TableInputComponent = TableInputComponent;
//# sourceMappingURL=table-input.component.js.map