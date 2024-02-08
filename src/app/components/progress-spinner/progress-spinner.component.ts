import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ProgressSpinnerComponent>) { }
  close(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

}


