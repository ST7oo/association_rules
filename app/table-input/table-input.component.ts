import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
	selector: 'table-input',
	templateUrl: 'app/table-input/table-input.component.html'
})
export class TableInputComponent implements OnInit {
	
	constructor(private dataService: DataService) {
		
	}
	
	ngOnInit() {
		this.dataService.setVariablesNames([
			'A',
			'B',
			'D',
			'C'
		]);
		this.dataService.setData([
			['A1', 'B1', 'D1', 'C1'],
			['A1', 'B3', 'D2', 'C1'],
			['A1', 'B1', 'D1', 'C1'],
			['A2', 'B2', 'D2', 'C2'],
			['A3', 'B2', 'D1', 'C2'],
			['A2', 'B1', 'D1', 'C3'],
			['A2', 'B1', 'D2', 'C3']
		]);
	}
}