import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-flow-wrapper',
  templateUrl: './flow-wrapper.component.html',
  styleUrl: './flow-wrapper.component.scss'
})
export class FlowWrapperComponent {
  public userStep: number = 0;
  public selectedRestaurant: any;
  public selectedUser: any;
  public selectedCode: any;
  public reportData: any;
  public restaurants: any[] = [];
  public users: any[] = [];
  public stockItems: any[] = [];

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initDataLists()
  }
  initDataLists() {
    this.initRestaurantsList(); // this will call the rest but once a res is recieved ( ugly code )
  }
  initRestaurantsList() {
    this.adminService.getAllRestaurants().subscribe({
      next: (val) => {
        if (val.title != "error") {
          this.restaurants = val.defs;
        }
        this.initUsersList();
      },
      error: (error) => {
        this.notificationService.showNotification({ type: 'error', title: 'error', body: 'Error fetching Restaurants' })
        this.initUsersList();
      }
    })
  }
  initUsersList() {
    this.adminService.getAllUsers().subscribe({
      next: (val) => {
        if (val.title != "error") {
          this.users = val.defs;
        }
        this.initStockItemsList();
      },
      error: (error) => {
        this.notificationService.showNotification({ type: 'error', title: 'error', body: 'Error fetching Users' })
        this.initStockItemsList();
      }
    })
  }
  initStockItemsList() {
    this.adminService.getAllStockItems().subscribe({
      next: (val: any) => {
        if (val.title != "error") {
          this.stockItems = val.defs;
        }
      },
      error: (error: any) => {
        this.notificationService.showNotification({ type: 'error', title: 'error', body: 'Error fetching Stock Items' })
      }
    })
  }

  navigateToAdminPage() {
    this.router.navigate(['/admin']);
  }

  public goBackToPrevStep() {
    if (this.userStep) {
      this.userStep -= 1;
    }
  }
  public displayGoBackBtn() {
    if (this.userStep == 4) {
      return false;
    } else {
      return this.userStep != 0;
    }
  }

  public onRestaurantEvent(event: any) {
    this.selectedRestaurant = event;
    this.userStep += 1;
  }

  public onUserSelectionEvent(event: any) {
    this.selectedUser = event;
    this.userStep += 1;
  }

  public onCodeSelectionEvent(event: any) {
    this.selectedCode = event;
    let topost = {
      restaurant: this.selectedRestaurant,
      user: {
        id: this.selectedUser.id,
        name: this.selectedUser.name,
        code: this.selectedCode,
      },
      currentTime: new Date(),
    }
    /* this.userService.checkCodeAndSubmitAction(topost).subscribe({
      next: (val) => {
        if (val.title == "error") {
          this.notifService.showNotification(val.title, val.body);
          return;
        }
        this.reportData = {
          restaurant: this.selectedRestaurant,
          user: this.selectedUser,
          vehicles: this.vehicles,
          docId: val.id,
          actionDone: this.selectedAction!.checkkingIn ? 'Pointage' : 'Depointage',
          currentTime: new Date(),
        };
        this.userStep += 1;
        setTimeout((val: any) => {
          if (val == 'Pointage') {
            this.onReportEvent()
          }
        }, 5000, this.selectedAction!.checkkingIn ? 'Pointage' : 'Depointage');
      },
      error: (error) => {
        console.log(error);
      }
    }) */
  }
}
