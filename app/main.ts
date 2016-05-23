// The usual bootstrapping imports
import { bootstrap }      from '@angular/platform-browser-dynamic';

import { AppComponent }   from './app.component';
import { DataService } from './services/data.service';

bootstrap(AppComponent, [DataService]);