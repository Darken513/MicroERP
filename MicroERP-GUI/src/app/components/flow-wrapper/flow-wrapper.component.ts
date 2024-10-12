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
  public forceDisplay: boolean = false;
  public selectedRestaurant: any;
  public selectedUser: any;
  public selectedCode: any;
  public reportData: any;
  public restaurants: any[] = [];
  public users: any[] = [];
  public stockItems: any[] = [];
  public itemsInput: any[] = [];
  public generatedReport: any;

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
        this.notificationService.showNotification({ type: 'error', title: 'Erreur', body: 'Erreur lors de la récupération des restaurants' })
        this.initUsersList();
      }
    })
  }
  initUsersList() {
    this.adminService.getAllUsers(true).subscribe({
      next: (val) => {
        if (val.title != "error") {
          this.users = val.defs;
        }
        this.initStockItemsList();
      },
      error: (error) => {
        this.notificationService.showNotification({ type: 'error', title: 'Erreur', body: 'Erreur lors de la récupération des Utilisateurs' })
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
        this.notificationService.showNotification({ type: 'error', title: 'Erreur', body: 'Erreur lors de la récupération des articles' })
      }
    })
  }

  navigateToAdminPage() {
    this.router.navigate(['/admin']);
  }

  public goBackToPrevStep() {
    if (this.userStep) {
      this.userStep -= 1;
      this.forceDisplay = false;
      if (this.userStep == 3) {
        this.forceDisplay = true;
      }
    }
  }
  public displayGoBackBtn() {
    if (this.forceDisplay) {
      return true
    }
    if (this.userStep == 3) {
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
    this.adminService.checkCode(this.selectedCode, this.selectedUser.id).subscribe({
      next: (val) => {
        if (val.continue) {
          this.userStep += 1;
          this.forceDisplay = true;
          this.generatedReport = undefined;
          this.itemsInput = this.stockItems.filter(d => this.selectedRestaurant.id == d.restaurant)
        } else {
          this.notificationService.showNotification({ type: 'error', title: 'Erreur', body: 'Code incorrect' })
        }
      },
      error: (error) => {
        this.notificationService.showNotification({ type: 'error', title: 'Erreur', body: 'Code incorrect' })
      }
    })
  }

  public onItemChainEvent(event: any) {
    if (event.step0) {
      this.forceDisplay = true;
    } else if (event.notStep0) {
      this.forceDisplay = false;
    } else if (event.generatedReport) {
      this.generatedReport = event.generatedReport;
      this.userStep += 1;
    }
  }

  public onReportSubmit(event: any) {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dateString = `${month < 9 ? '0' + month : month}/${day < 9 ? '0' + day : day
      }/${year} ${hours < 9 ? '0' + hours : hours}:${minutes < 9 ? '0' + minutes : minutes
      }`;

    let tosend = {
      user: this.selectedUser,
      restaurant: this.selectedRestaurant,
      dateTime: dateString,
      generatedReport: this.generatedReport
    };
    this.adminService.submitReport(tosend).subscribe({
      next: (val) => {
        this.notificationService.showNotification({ type: 'success', title: 'Succès', body: "Rapport envoyé avec succès" })
        this.userStep = 0;
        this.userStep = 0;
        this.forceDisplay = false;
        this.selectedRestaurant = undefined;
        this.selectedUser = undefined;
        this.selectedCode = undefined;
        this.reportData = undefined;
        this.restaurants = [];
        this.users = [];
        this.stockItems = [];
        this.itemsInput = [];
        this.generatedReport = undefined;
      },
      error: (error) => {
        this.notificationService.showNotification({ type: 'error', title: 'Erreur', body: "Le rapport n'a pas été soumis" })
      }
    })
  }
}
