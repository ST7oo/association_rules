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
	gammas: number[][];
	gammas_display: string[];
	omegas: number[][];
	omegas_display: string[];
	rules1: string[];
	
	constructor(private dataService: DataService) { }

	ngOnInit() { 
		this.calculate();
	}
	
	calculate() {
		let data = this.dataService.getData();
		let unique = [].concat.apply([], data).filter((value, index, self) => {
			return self.indexOf(value) === index;
		});
		this.alphas = unique.sort();
		console.log(this.alphas);
		
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
		console.log(this.betas);
		
		this.gammas = [];
		this.gammas_display = [];
		for(let i_alpha = 0; i_alpha < this.alphas.length; i_alpha++){
			this.gammas[i_alpha] = [];
			let gamma_display = '{';
			for(let i_beta = 0; i_beta < this.betas.length; i_beta++){
				let index = this.betas[i_beta].indexOf(i_alpha);
				if(index != -1) {
					this.gammas[i_alpha].push(i_beta);
					gamma_display += 'E' + (i_beta+1) + ', ';
				}
			}
			this.gammas_display[i_alpha] = gamma_display.slice(0,-2) + '}';
		}
		console.log(this.gammas);
		
		this.omegas = [];
		this.omegas_display = [];
		for(let i_gamma in this.gammas){
			let beta_gamma_display = '{';
			let intersection = this.betas[this.gammas[i_gamma][0]];
			for(let i_beta = 1; i_beta < this.gammas[i_gamma].length; i_beta++) {
					intersection = intersection.filter(x => this.betas[this.gammas[i_gamma][i_beta]].indexOf(x) != -1);
			}
			this.omegas[i_gamma] = intersection;
			for(let i of intersection){
				beta_gamma_display += '\u03B1' + (i+1) + ', ';
			}
			this.omegas_display[i_gamma] = beta_gamma_display.slice(0,-2) + '}';
		}
		console.log(this.omegas);
		
		this.rules1 = [];
		for(let i_omega = 0; i_omega < this.omegas.length; i_omega++){
			this.rules1[i_omega] = '-';
			if (this.omegas[i_omega].length > 1) {
				let alphas = this.omegas[i_omega].splice(this.omegas[i_omega].indexOf(i_omega), 1);
				let rule_pattern = '\u03B1' + (i_omega+1) + ' => \u03B1';
				let rule = '';
				for(let v of this.omegas[i_omega]) {
					rule += rule_pattern + (v+1) + ', ';
				}
				this.rules1[i_omega] = rule.slice(0,-2);
			}
		}
	}

}