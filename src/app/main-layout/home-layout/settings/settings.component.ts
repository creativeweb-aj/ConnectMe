import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private snakBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.snakBar.open('The setting is under construction', 'Ok', {
      duration: 3000,
    })
  }

}
