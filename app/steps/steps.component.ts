import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
	moduleId: module.id,
	selector: 'steps',
	templateUrl: 'steps.component.html'
})
export class StepsComponent implements OnInit {
	alphas: string[];
	betas: number[][];
	betas_display: string[];
	gammas1: number[][];
	gammas1_display: string[];
	omegas1: number[][];
	omegas1_display: string[];
	rules1: string[];
	supports1: number[];
	supports1_display: string[];
	valid_rules1: number[][];
	gammas2: number[][];
	gammas2_display: string[];
	gammas2_keys: string[];
	omegas2: number[][];
	omegas2_display: string[];
	rules2: string[];
	supports2: number[];
	supports2_display: string[];
	valid_rules2: Object;
	/*gammas3: number[][];
	gammas3_display: string[];
	gammas3_keys: string[];
	omegas3: number[][];
	omegas3_display: string[];
	rules3: string[];
	supports3: number[];
	supports3_display: string[];
	valid_rules3: Object;*/
	
	constructor(private dataService: DataService) { 
		dataService.supportChanged$.subscribe(sup => this.calculate());
		dataService.calculate$.subscribe(b => this.calculate());
	}

	ngOnInit() { 
		this.calculate();
	}
	
	calculate() {
		let data = this.dataService.getData();
		let labels = data.map(x => x[x.length-1]);
		let observations = data.map(x => x.slice(0, x.length-1));
		let num_examples = data.length;
		
		// alphas
		let unique = [].concat.apply([], observations).filter((value, index, self) => {
			return self.indexOf(value) === index;
		});
		this.alphas = unique.sort();
		let remaining_classify = Array.apply(null, {length: this.alphas.length}).map(Number.call, Number);
		unique = labels.filter((value, index, self) => {
			return self.indexOf(value) === index;
		}).sort();
		let labels_start_index = this.alphas.length;
		let labels_index = [labels_start_index];
		for (let i = 1; i < unique.length; i++) {
			labels_index.push(labels_start_index+i);
		}
		this.alphas = this.alphas.concat(unique);
		
		// betas
		this.betas = [];
		this.betas_display = [];
		for(let i in data){
			this.betas[i] = [];
			let beta_display = '{';
			for(let value of data[i]){
				let index = this.alphas.indexOf(value);
				this.betas[i].push(index);
				beta_display += '\u03B1' + (index+1) + ', ';
			}
			this.betas_display[i] = beta_display.slice(0,-2) + '}';
		}
		
		
		/* Order 1 */
		
		// gammas1
		this.gammas1 = [];
		this.gammas1_display = [];
		for(let i_alpha = 0; i_alpha < this.alphas.length; i_alpha++){
			this.gammas1[i_alpha] = [];
			let gamma_display = '{';
			for(let i_beta = 0; i_beta < this.betas.length; i_beta++){
				let index = this.betas[i_beta].indexOf(i_alpha);
				if(index != -1) {
					this.gammas1[i_alpha].push(i_beta);
					gamma_display += 'E' + (i_beta+1) + ', ';
				}
			}
			this.gammas1_display[i_alpha] = gamma_display.slice(0,-2) + '}';
		}
		
		// omegas1
		this.omegas1 = [];
		this.omegas1_display = [];
		for(let i_gamma in this.gammas1){
			let beta_gamma_display = '{';
			// let intersection = this.betas[this.gammas1[i_gamma][0]];
			// for(let i_beta = 1; i_beta < this.gammas1[i_gamma].length; i_beta++) {
			// 		intersection = intersection.filter(x => this.betas[this.gammas1[i_gamma][i_beta]].indexOf(x) != -1);
			// }
			let intersection = this.intersectionBetas(this.gammas1[i_gamma]);
			this.omegas1[i_gamma] = intersection;
			for(let i of intersection){
				beta_gamma_display += '\u03B1' + (i+1) + ', ';
			}
			this.omegas1_display[i_gamma] = beta_gamma_display.slice(0,-2) + '}';
		}
		
		// rules1
		this.supports1 = [];
		this.supports1_display = [];
		this.rules1 = [];
		for(let i_omega = 0; i_omega < this.omegas1.length; i_omega++) {
			this.rules1[i_omega] = '-';
			this.supports1[i_omega] = 0;
			this.supports1_display[i_omega] = '0';
			if (this.omegas1[i_omega].length > 1) {
				this.omegas1[i_omega].splice(this.omegas1[i_omega].indexOf(i_omega), 1);
				let rule_pattern = '\u03B1' + (i_omega+1) + ' => \u03B1';
				let rule = '';
				for(let v of this.omegas1[i_omega]) {
					rule += rule_pattern + (v+1) + ', ';
				}
				this.rules1[i_omega] = rule.slice(0,-2);
				// support
				let num_examples_rule = this.gammas1[i_omega].length;
				this.supports1[i_omega] = num_examples_rule / num_examples;
				this.supports1_display[i_omega] = num_examples_rule + '/' + num_examples + ' = ' + this.supports1[i_omega].toFixed(2);
			}
		}
		
		// valid rules1
		this.valid_rules1 = [];
		for(let i_omega = 0; i_omega < this.omegas1.length; i_omega++) {
			if (this.omegas1[i_omega].length > 0 && this.supports1[i_omega] > this.dataService.support) {
				for(let v of this.omegas1[i_omega]) {
					let index = labels_index.indexOf(v);
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
		for(let i_alpha1 = 0; i_alpha1 < remaining_classify.length; i_alpha1++){
			for(let i_alpha2 = i_alpha1+1; i_alpha2 < remaining_classify.length; i_alpha2++) {
				let index_gammas2 = '\u03B1' + (remaining_classify[i_alpha1]+1) + '&\u03B1' + (remaining_classify[i_alpha2]+1);
				let intersection = this.gammas1[remaining_classify[i_alpha1]].filter(x => 
					this.gammas1[remaining_classify[i_alpha2]].indexOf(x) != -1);
				this.gammas2[index_gammas2] = intersection;
				let gamma_display = '{';
				for(let v of intersection){
					gamma_display += 'E' + (v+1) + ', ';
				}
				if (gamma_display.length > 1) {
					gamma_display = gamma_display.slice(0,-2);
				}
				this.gammas2_display[index_gammas2] = gamma_display + '}';
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
		for(let i_gamma in this.gammas2){
			let beta_gamma_display = '{';
			let intersection = this.intersectionBetas(this.gammas2[i_gamma]);
			this.omegas2[i_gamma] = intersection;
			for(let i of intersection){
				beta_gamma_display += '\u03B1' + (i+1) + ', ';
			}
			if (beta_gamma_display.length > 1) {
				beta_gamma_display = beta_gamma_display.slice(0,-2);
			}
			this.omegas2_display[i_gamma] = beta_gamma_display + '}';
		}
		
		// rules2
		this.supports2 = [];
		this.supports2_display = [];
		this.rules2 = [];
		for(let i_omega in this.omegas2) {
			this.rules2[i_omega] = '-';
			this.supports2[i_omega] = 0;
			this.supports2_display[i_omega] = '0';
			if (this.omegas2[i_omega].length == 3) {
				let numbers = i_omega.match(/\d+/g);
				let i1 = parseInt(numbers[0]);
				let i2 = parseInt(numbers[1]);
				this.omegas2[i_omega].splice(this.omegas2[i_omega].indexOf(i1-1), 1);
				this.omegas2[i_omega].splice(this.omegas2[i_omega].indexOf(i2-1), 1);
				let rule_pattern = '\u03B1' + i1 + '&\u03B1' + i2 + ' => \u03B1' + (this.omegas2[i_omega][0]+1);
				this.rules2[i_omega] = rule_pattern;
				// support
				let num_examples_rule = this.gammas2[i_omega].length;
				this.supports2[i_omega] = num_examples_rule / num_examples;
				this.supports2_display[i_omega] = num_examples_rule + '/' + num_examples + ' = ' + this.supports2[i_omega].toFixed(2);
			}
		}
		
		// valid rules2
		this.valid_rules2 = [];
		let count = 0;
		for(let i_omega in this.omegas2) {
			if (this.omegas2[i_omega].length == 1 && this.supports2[i_omega] > this.dataService.support) {
				let numbers = i_omega.match(/\d+/g);
				let i1 = parseInt(numbers[0]);
				let i2 = parseInt(numbers[1]);
				let index = labels_index.indexOf(this.omegas2[i_omega][0]);
				if (index != -1) {
					this.valid_rules2[count++] = [[i1, i2], labels_index[index]];
					remaining_classify.splice(remaining_classify.indexOf(i1-1), 1);
					remaining_classify.splice(remaining_classify.indexOf(i2-1), 1);
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
		
	}
	
	intersectionBetas(array: number[]) {
		let intersection = [];
		if (array.length > 0) {
			intersection = this.betas[array[0]];
			for(let i_beta = 1; i_beta < array.length; i_beta++) {
				intersection = intersection.filter(x => 
				this.betas[array[i_beta]].indexOf(x) != -1);
			}
		}
		return intersection;
	}

}