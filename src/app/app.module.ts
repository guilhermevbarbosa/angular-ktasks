import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Material Imports
import { MaterialComponentsModule } from './material-components/material-components.module';
// Material Imports

// Pages
import { AboutComponent } from './views/about/about.component';
import { TaskBoardComponent } from './views/task-board/task-board.component';
import { BoardsComponent } from './views/boards/boards.component';
// Pages

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TaskBoardComponent,
    BoardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
