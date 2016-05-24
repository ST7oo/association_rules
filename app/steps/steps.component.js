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
    /*gammas3: number[][];
    gammas3_display: string[];
    gammas3_keys: string[];
    omegas3: number[][];
    omegas3_display: string[];
    rules3: string[];
    supports3: number[];
    supports3_display: string[];
    valid_rules3: Object;*/
    function StepsComponent(dataService) {
        var _this = this;
        this.dataService = dataService;
        dataService.supportChanged.subscribe(function (sup) { return _this.calculate(); });
    }
    StepsComponent.prototype.ngOnInit = function () {
        this.calculate();
    };
    StepsComponent.prototype.calculate = function () {
        var _this = this;
        var data = this.dataService.getData();
        var labels = data.map(function (x) { return x[x.length - 1]; });
        var observations = data.map(function (x) { return x.slice(0, x.length - 1); });
        var num_examples = data.length;
        // alphas
        var unique = [].concat.apply([], observations).filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
        this.alphas = unique.sort();
        var remaining_classify = Array.apply(null, { length: this.alphas.length }).map(Number.call, Number);
        unique = labels.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        }).sort();
        var labels_start_index = this.alphas.length;
        var labels_index = [labels_start_index];
        for (var i = 1; i < unique.length; i++) {
            labels_index.push(labels_start_index + i);
        }
        this.alphas = this.alphas.concat(unique);
        // betas
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
        /* Order 1 */
        // gammas1
        this.gammas1 = [];
        this.gammas1_display = [];
        for (var i_alpha = 0; i_alpha < this.alphas.length; i_alpha++) {
            this.gammas1[i_alpha] = [];
            var gamma_display = '{';
            for (var i_beta = 0; i_beta < this.betas.length; i_beta++) {
                var index = this.betas[i_beta].indexOf(i_alpha);
                if (index != -1) {
                    this.gammas1[i_alpha].push(i_beta);
                    gamma_display += 'E' + (i_beta + 1) + ', ';
                }
            }
            this.gammas1_display[i_alpha] = gamma_display.slice(0, -2) + '}';
        }
        // omegas1
        this.omegas1 = [];
        this.omegas1_display = [];
        for (var i_gamma in this.gammas1) {
            var beta_gamma_display = '{';
            // let intersection = this.betas[this.gammas1[i_gamma][0]];
            // for(let i_beta = 1; i_beta < this.gammas1[i_gamma].length; i_beta++) {
            // 		intersection = intersection.filter(x => this.betas[this.gammas1[i_gamma][i_beta]].indexOf(x) != -1);
            // }
            var intersection = this.intersectionBetas(this.gammas1[i_gamma]);
            this.omegas1[i_gamma] = intersection;
            for (var _b = 0, intersection_1 = intersection; _b < intersection_1.length; _b++) {
                var i = intersection_1[_b];
                beta_gamma_display += '\u03B1' + (i + 1) + ', ';
            }
            this.omegas1_display[i_gamma] = beta_gamma_display.slice(0, -2) + '}';
        }
        // rules1
        this.supports1 = [];
        this.supports1_display = [];
        this.rules1 = [];
        for (var i_omega = 0; i_omega < this.omegas1.length; i_omega++) {
            this.rules1[i_omega] = '-';
            this.supports1[i_omega] = 0;
            this.supports1_display[i_omega] = '0';
            if (this.omegas1[i_omega].length > 1) {
                this.omegas1[i_omega].splice(this.omegas1[i_omega].indexOf(i_omega), 1);
                var rule_pattern = '\u03B1' + (i_omega + 1) + ' => \u03B1';
                var rule = '';
                for (var _c = 0, _d = this.omegas1[i_omega]; _c < _d.length; _c++) {
                    var v = _d[_c];
                    rule += rule_pattern + (v + 1) + ', ';
                }
                this.rules1[i_omega] = rule.slice(0, -2);
                // support
                var num_examples_rule = this.gammas1[i_omega].length;
                this.supports1[i_omega] = num_examples_rule / num_examples;
                this.supports1_display[i_omega] = num_examples_rule + '/' + num_examples + ' = ' + this.supports1[i_omega].toFixed(2);
            }
        }
        // valid rules1
        this.valid_rules1 = [];
        for (var i_omega = 0; i_omega < this.omegas1.length; i_omega++) {
            if (this.omegas1[i_omega].length > 0 && this.supports1[i_omega] > this.dataService.support) {
                for (var _e = 0, _f = this.omegas1[i_omega]; _e < _f.length; _e++) {
                    var v = _f[_e];
                    var index = labels_index.indexOf(v);
                    if (index != -1) {
                        this.valid_rules1.push([i_omega, labels_index[index]]);
                        remaining_classify.splice(remaining_classify.indexOf(i_omega), 1);
                    }
                }
            }
        }
        /* Order 2 */
        // gammas2
        this.gammas2 = [];
        this.gammas2_display = [];
        for (var i_alpha1 = 0; i_alpha1 < remaining_classify.length; i_alpha1++) {
            var _loop_1 = function(i_alpha2) {
                var index_gammas2 = '\u03B1' + (remaining_classify[i_alpha1] + 1) + '&\u03B1' + (remaining_classify[i_alpha2] + 1);
                var intersection = this_1.gammas1[remaining_classify[i_alpha1]].filter(function (x) {
                    return _this.gammas1[remaining_classify[i_alpha2]].indexOf(x) != -1;
                });
                this_1.gammas2[index_gammas2] = intersection;
                var gamma_display = '{';
                for (var _g = 0, intersection_2 = intersection; _g < intersection_2.length; _g++) {
                    var v = intersection_2[_g];
                    gamma_display += 'E' + (v + 1) + ', ';
                }
                if (gamma_display.length > 1) {
                    gamma_display = gamma_display.slice(0, -2);
                }
                this_1.gammas2_display[index_gammas2] = gamma_display + '}';
            };
            var this_1 = this;
            for (var i_alpha2 = i_alpha1 + 1; i_alpha2 < remaining_classify.length; i_alpha2++) {
                _loop_1(i_alpha2);
            }
        }
        // for(let i_alpha1 = 0; i_alpha1 < this.alphas.length-1; i_alpha1++){
        // 	for(let i_alpha2 = i_alpha1+1; i_alpha2 < this.alphas.length; i_alpha2++) {
        // 		let index_gammas2 = '\u03B1' + (i_alpha1+1) + '&\u03B1' + (i_alpha2+1);
        // 		let intersection = this.gammas1[i_alpha1].filter(x => this.gammas1[i_alpha2].indexOf(x) != -1);
        // 		this.gammas2[index_gammas2] = intersection;
        // 		let gamma_display = '{';
        // 		for(let v of intersection){
        // 			gamma_display += 'E' + (v+1) + ', ';
        // 		}
        // 		if (gamma_display.length > 1) {
        // 			gamma_display = gamma_display.slice(0,-2);
        // 		}
        // 		this.gammas2_display[index_gammas2] = gamma_display + '}';
        // 	}
        // }
        this.gammas2_keys = Object.keys(this.gammas2_display);
        // omegas2
        this.omegas2 = [];
        this.omegas2_display = [];
        for (var i_gamma in this.gammas2) {
            var beta_gamma_display = '{';
            var intersection = this.intersectionBetas(this.gammas2[i_gamma]);
            this.omegas2[i_gamma] = intersection;
            for (var _h = 0, intersection_3 = intersection; _h < intersection_3.length; _h++) {
                var i = intersection_3[_h];
                beta_gamma_display += '\u03B1' + (i + 1) + ', ';
            }
            if (beta_gamma_display.length > 1) {
                beta_gamma_display = beta_gamma_display.slice(0, -2);
            }
            this.omegas2_display[i_gamma] = beta_gamma_display + '}';
        }
        // rules2
        this.supports2 = [];
        this.supports2_display = [];
        this.rules2 = [];
        for (var i_omega in this.omegas2) {
            this.rules2[i_omega] = '-';
            this.supports2[i_omega] = 0;
            this.supports2_display[i_omega] = '0';
            if (this.omegas2[i_omega].length == 3) {
                var numbers = i_omega.match(/\d+/g);
                var i1 = parseInt(numbers[0]);
                var i2 = parseInt(numbers[1]);
                this.omegas2[i_omega].splice(this.omegas2[i_omega].indexOf(i1 - 1), 1);
                this.omegas2[i_omega].splice(this.omegas2[i_omega].indexOf(i2 - 1), 1);
                var rule_pattern = '\u03B1' + i1 + '&\u03B1' + i2 + ' => \u03B1' + (this.omegas2[i_omega][0] + 1);
                this.rules2[i_omega] = rule_pattern;
                // support
                var num_examples_rule = this.gammas2[i_omega].length;
                this.supports2[i_omega] = num_examples_rule / num_examples;
                this.supports2_display[i_omega] = num_examples_rule + '/' + num_examples + ' = ' + this.supports2[i_omega].toFixed(2);
            }
        }
        // valid rules2
        this.valid_rules2 = [];
        var count = 0;
        for (var i_omega in this.omegas2) {
            if (this.omegas2[i_omega].length == 1 && this.supports2[i_omega] > this.dataService.support) {
                var numbers = i_omega.match(/\d+/g);
                var i1 = parseInt(numbers[0]);
                var i2 = parseInt(numbers[1]);
                var index = labels_index.indexOf(this.omegas2[i_omega][0]);
                if (index != -1) {
                    this.valid_rules2[count++] = [[i1, i2], labels_index[index]];
                    remaining_classify.splice(remaining_classify.indexOf(i1 - 1), 1);
                    remaining_classify.splice(remaining_classify.indexOf(i2 - 1), 1);
                }
            }
        }
        /* Order 3 */
        // TODO
        /*
        // gammas3
        console.log(remaining_classify);
        this.gammas3 = [];
        this.gammas3_display = [];
        for(let i_alpha1 = 0, i_alpha2 = 1; i_alpha1 < remaining_classify.length-1; i_alpha1++, i_alpha2++){
            for(let i_alpha3 = i_alpha2+1; i_alpha3 < remaining_classify.length; i_alpha3++) {
                let index_gammas3 = '\u03B1' + (remaining_classify[i_alpha1]+1) + '&\u03B1' + (remaining_classify[i_alpha2]+1) + '&\u03B1' + (remaining_classify[i_alpha3]+1);
                let intersection = this.gammas1[remaining_classify[i_alpha1]].filter(x =>
                    this.gammas1[remaining_classify[i_alpha2]].indexOf(x) != -1);
                console.log(intersection);
                intersection = intersection.filter(x =>
                    this.gammas1[remaining_classify[i_alpha3]].indexOf(x) != -1);
                console.log(intersection);
                // this.gammas2[index_gammas2] = intersection;
                // let gamma_display = '{';
                // for(let v of intersection){
                // 	gamma_display += 'E' + (v+1) + ', ';
                // }
                // if (gamma_display.length > 1) {
                // 	gamma_display = gamma_display.slice(0,-2);
                // }
                // this.gammas2_display[index_gammas2] = gamma_display + '}';
            }
        }
        // this.gammas2_keys = Object.keys(this.gammas2_display);
        */
    };
    StepsComponent.prototype.intersectionBetas = function (array) {
        var _this = this;
        var intersection = [];
        if (array.length > 0) {
            intersection = this.betas[array[0]];
            var _loop_2 = function(i_beta) {
                intersection = intersection.filter(function (x) {
                    return _this.betas[array[i_beta]].indexOf(x) != -1;
                });
            };
            for (var i_beta = 1; i_beta < array.length; i_beta++) {
                _loop_2(i_beta);
            }
        }
        return intersection;
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