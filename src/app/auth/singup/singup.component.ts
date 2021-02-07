import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  isLoading = false;
  constructor(public authService : AuthService,public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '250px',
      height:'300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit(): void {
  }

  onSingup(fm:NgForm){
    if(fm.invalid) return;
    this.isLoading=true
    this.authService.createUser(fm.value.email,fm.value.password)
    fm.reset()
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'success.component.html',
})
export class DialogOverview {

  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}