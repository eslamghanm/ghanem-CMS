import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared/shared-module';

import { SettingsRoutingModule } from './settings-routing-module';
import { Settings } from './settings';


@NgModule({
  declarations: [
    Settings
  ],
  imports: [CommonModule, SharedModule, SettingsRoutingModule]
})
export class SettingsModule { }
