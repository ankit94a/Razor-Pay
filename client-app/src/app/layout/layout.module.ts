import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderModule } from "../../shared-library/components/header/header.module";
import { SidebarModule } from 'src/shared-library/components/sidebar/sidebar.module';
import { SharedLibraryModule } from 'src/shared-library/shared-library.module';
import { DashboardModule } from './dashboard/dashboard.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedLibraryModule,
    SidebarModule,
    HeaderModule,
    DashboardModule
]
})
export class LayoutModule { }
