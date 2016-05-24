import { Component } from '@angular/core';

import { TableInputComponent } from './table-input/table-input.component';
import { StepsComponent } from './steps/steps.component';
import { DataService } from './services/data.service';

@Component({
	selector: 'my-app',
	template: `
	<h1>Association Rules</h1>
	<div class="container" style="width: 95%">
		<div class="row">
			<table-input></table-input>
		</div>
		<div class="row">
			<steps>{{msg}}</steps>
		</div>
	</div>
	`,
	directives: [TableInputComponent, StepsComponent]
})
export class AppComponent {
	msg = 'Calculating';
}