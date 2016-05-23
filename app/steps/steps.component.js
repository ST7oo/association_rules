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
var StepsComponent = (function () {
    function StepsComponent(dataService) {
        this.dataService = dataService;
    }
    StepsComponent.prototype.ngOnInit = function () {
        this.calculate();
    };
    StepsComponent.prototype.calculate = function () {
        var _this = this;
        var data = this.dataService.getData();
        var unique = [].concat.apply([], data).filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
        this.alphas = unique.sort();
        console.log(this.alphas);
        this.betas = [];
        this.betas_display = [];
        for (var i in data) {
            this.betas[i] = [];
            var beta_display = '{';
            for (var _i = 0, _a = data[i]; _i < _a.length; _i++) {
                var value = _a[_i];
                var index = this.alphas.indexOf(value);
                this.betas[i].push(index);
                beta_display += '\u03B1' + (index + 1) + ', ';
            }
            this.betas_display[i] = beta_display.slice(0, -2) + '}';
        }
        console.log(this.betas);
        this.gammas = [];
        this.gammas_display = [];
        for (var i_alpha = 0; i_alpha < this.alphas.length; i_alpha++) {
            this.gammas[i_alpha] = [];
            var gamma_display = '{';
            for (var i_beta = 0; i_beta < this.betas.length; i_beta++) {
                var index = this.betas[i_beta].indexOf(i_alpha);
                if (index != -1) {
                    this.gammas[i_alpha].push(i_beta);
                    gamma_display += 'E' + (i_beta + 1) + ', ';
                }
            }
            this.gammas_display[i_alpha] = gamma_display.slice(0, -2) + '}';
        }
        console.log(this.gammas);
        this.omegas = [];
        this.omegas_display = [];
        var _loop_1 = function(i_gamma) {
            var beta_gamma_display = '{';
            var intersection = this_1.betas[this_1.gammas[i_gamma][0]];
            var _loop_2 = function(i_beta) {
                intersection = intersection.filter(function (x) { return _this.betas[_this.gammas[i_gamma][i_beta]].indexOf(x) != -1; });
            };
            for (var i_beta = 1; i_beta < this_1.gammas[i_gamma].length; i_beta++) {
                _loop_2(i_beta);
            }
            this_1.omegas[i_gamma] = intersection;
            for (var _b = 0, intersection_1 = intersection; _b < intersection_1.length; _b++) {
                var i = intersection_1[_b];
                beta_gamma_display += '\u03B1' + (i + 1) + ', ';
            }
            this_1.omegas_display[i_gamma] = beta_gamma_display.slice(0, -2) + '}';
        };
        var this_1 = this;
        for (var i_gamma in this.gammas) {
            _loop_1(i_gamma);
        }
        console.log(this.omegas);
        this.rules1 = [];
        for (var i_omega = 0; i_omega < this.omegas.length; i_omega++) {
            this.rules1[i_omega] = '-';
            if (this.omegas[i_omega].length > 1) {
                var alphas = this.omegas[i_omega].splice(this.omegas[i_omega].indexOf(i_omega), 1);
                var rule_pattern = '\u03B1' + (i_omega + 1) + ' => \u03B1';
                var rule = '';
                for (var _c = 0, _d = this.omegas[i_omega]; _c < _d.length; _c++) {
                    var v = _d[_c];
                    rule += rule_pattern + (v + 1) + ', ';
                }
                this.rules1[i_omega] = rule.slice(0, -2);
            }
        }
    };
    StepsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'steps',
            templateUrl: 'steps.component.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], StepsComponent);
    return StepsComponent;
}());
exports.StepsComponent = StepsComponent;
//# sourceMappingURL=steps.component.js.map