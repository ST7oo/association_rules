import { Component } from '@angular/core';

import { TableInputComponent } from './table-input/table-input.component';
import { StepsComponent } from './steps/steps.component';
import { DataService } from './services/data.service';

@Component({
	selector: 'my-app',
	template: `
	<h1>Association Rules</h1>
	<table-input></table-input>
	<steps></steps>
	`,
	directives: [TableInputComponent, StepsComponent]
})
export class AppComponent {
	
}