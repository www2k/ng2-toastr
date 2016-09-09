declare var require;
import 'reflect-metadata';
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);