import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DataService {
	data: string[][];
	variables_names: string[];
	support: number;
	public supportChanged$: EventEmitter<number>;
	public calculate$: EventEmitter<boolean>;

	constructor() {
		this.supportChanged$ = new EventEmitter();
		this.calculate$ = new EventEmitter();
	}
	
	getData() {
		return this.data;
	}
	
	setData(data: string[][]) {
		this.data = data;
	}
	
	addRow(row: string[]) {
		this.data.push(row);
	}
	
	setVariablesNames(names: string[]) {
		this.variables_names = names;
	}
	
	setSupport(sup: number) {
		if (sup != this.support){
			this.support = sup;
			this.supportChanged$.emit(sup);
		}
	}
	
	recalculate() {
		this.calculate$.emit(true);
	}
	
}