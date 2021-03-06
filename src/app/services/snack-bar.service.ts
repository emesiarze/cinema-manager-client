import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackBarComponent } from '../components/snack-bars/error-snack-bar/error-snack-bar.component';
import { InfoSnackBarComponent } from '../components/snack-bars/info-snack-bar/info-snack-bar.component';
import { SuccessSnackBarComponent } from '../components/snack-bars/success-snack-bar/success-snack-bar.component';
import { WarningSnackBarComponent } from '../components/snack-bars/warning-snack-bar/warning-snack-bar.component';
import { ActionSnackBarComponent } from '../components/snack-bars/action-snack-bar/action-snack-bar.component';
import { SUCCESS_SNACKBAR_DURATION, INFO_SNACKBAR_DURATION, WARNING_SNACKBAR_DURATION, ERROR_SNACKBAR_DURATION, ACTION_SNACKBAR_DURATION } from "../models/constants";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  public openActionSnackBar(message: string, actionFn: (param: any) => void, actionText?: string, details?: string,): void {
    this._snackBar.openFromComponent(ActionSnackBarComponent, {
      data: {
        message: message,
        details: details,
        actionFn: actionFn,
        actionText: actionText,
      },
      duration: ACTION_SNACKBAR_DURATION,
    });
  }

  public openSuccessSnackBar(message: string, details?: string): void {
    this._snackBar.openFromComponent(SuccessSnackBarComponent, {
      data: {
        message: message,
        details: details
      },
      duration: SUCCESS_SNACKBAR_DURATION,
    });
  }

  public openInfoSnackBar(message: string, details?: string): void {
    this._snackBar.openFromComponent(InfoSnackBarComponent, {
      data: {
        message: message,
        details: details
      },
      duration: INFO_SNACKBAR_DURATION,
    });
  }

  public openWarningSnackBar(message: string, details?: string): void {
    this._snackBar.openFromComponent(WarningSnackBarComponent, {
      data: {
        message: message,
        details: details
      },
      duration: WARNING_SNACKBAR_DURATION,
    });
  }

  public openErrorSnackBar(message: string, details?: string): void {
    this._snackBar.openFromComponent(ErrorSnackBarComponent, {
      data: {
        message: message,
        details: details
      },
      duration: ERROR_SNACKBAR_DURATION,
    });
  }
}
