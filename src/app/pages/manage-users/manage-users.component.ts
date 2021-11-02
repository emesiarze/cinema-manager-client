import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {filter, switchMap, tap} from "rxjs/operators";
import {GenericDataSource} from "../../models/generic-data-source";
import {MatDialog} from "@angular/material/dialog";
import {UserDetailsComponent} from "../../components/user-details/user-details.component";
import {ItemDetailsData} from "../../models/item-details-data";
import {Observable} from "rxjs";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  private _dataSource = new GenericDataSource<User>([]);
  private _requestCount = 0;

  constructor(private _usersService: UserService, private _dialogService: MatDialog) { }

  get dataSource(): GenericDataSource<User> {
    return this._dataSource;
  }

  get isLoading(): boolean {
    return this._requestCount > 0;
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this._requestCount++;
    this._usersService.getAllItems().pipe(
      tap(() => this._requestCount--),
      filter(items => !!items),
      tap(items => this._dataSource.data.next(items!))
    ).subscribe();
  }

  public onEditItem(user: User) {
    this.openDialogAndWaitForClosure(false, user).pipe(
      filter(value => !!value),
      tap(() => this._requestCount++),
      switchMap(user => this._usersService.updateItem(user)),
      tap(() => this._requestCount--),
      filter(value => !!value),
      tap(() => this.loadData())
    ).subscribe()
  }

  private openDialogAndWaitForClosure(create = true, user?: User): Observable<any> {
    return this._dialogService.open(UserDetailsComponent, {
      data: {
        create: create,
        user: user
      } as ItemDetailsData,
      width: '50vw',
      maxHeight: '90vh'
    }).afterClosed()
  }

  public onDeleteItem(id: string) {
    this._usersService.deleteItem(id).pipe(
      tap(() => {
        this._requestCount--;
        this.loadData();
      })
    ).subscribe();
  }

  public onAddItem(): void {
    this.openDialogAndWaitForClosure().pipe(
      filter(value => !!value),
        tap(() => this._requestCount++),
        switchMap(user => this._usersService.addItem(user)),
        tap(() => this._requestCount--),
        filter(value => !!value),
        tap(() => this.loadData())
    ).subscribe()
  }
}
