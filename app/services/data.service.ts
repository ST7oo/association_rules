import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
	data: string[][];
	variables_names: string[];
	support: number;

	constructor() {
	}
	
	getData() {
		return this.data;
	}
	
	setData(data: string[][]) {
		this.data = data;
	}
	
	setVariablesNames(names: string[]) {
		this.variables_names = names;
	}
	
	setSupport(sup: number) {
		this.support = sup;
	}
	
}