import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DataService {
	data: string[][];
	variables_names: string[];
	support: number;
	public supportChanged: EventEmitter<number>; 

	constructor() {
		this.supportChanged = new EventEmitter();
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
		if (sup != this.support){
			this.support = sup;
			this.supportChanged.emit(sup);
		}
	}
	
}