import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para usar [(ngModel)]
import { FormsModule } from '@angular/forms';
// Para usar [(ngModel)]

// Para requisições http
import { HttpClientModule } from '@angular/common/http';
// Para requisições http

// Material Imports
import { MaterialComponentsModule } from './material-components/material-components.module';
// Material Imports

// Pages
import { AboutComponent } from './views/about/about.component';
import { TaskBoardComponent } from './views/task-board/task-board.component';
import { CategoryComponent } from './views/category/category.component';
import { LoadingComponent } from './views/loading/loading.component';
// Pages

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TaskBoardComponent,
    CategoryComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
