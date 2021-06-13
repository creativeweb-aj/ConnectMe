import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    MatButtonModule, 
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports:[
    CommonModule,
    LayoutModule,
    MatButtonModule, 
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
