import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { User } from '../../models/user';
import { Zone } from 'zone.js/lib/zone-impl';
import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../services/notification.service';
import { StockItem } from '../../models/stockItem';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  restaurants: Restaurant[] = [];
  stockItems: StockItem[] = [];
  displayedStockItems: StockItem[] = [];
  users: User[] = [];

  restaurantForm: FormGroup;
  userForm: FormGroup;
  stockItemForm: FormGroup;

  isEditing = false;
  showModal = false;

  restaurantModal: boolean = false;
  userModal: boolean = false;
  stockItemModal: boolean = false;

  restaurantsAccordianOn: boolean = false;
  usersAccordianOn: boolean = false;
  stockItemsAccordianOn: boolean = false;

  editedRestaurantId: string | null = null;
  editedUserId: string | null = null;
  editedStockItemId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    // Initialize the form with default values
    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required]],
    });
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
    this.stockItemForm = this.fb.group({
      name: ['', [Validators.required]],
      restaurant: ['', [Validators.required]],
      minimum: ['', [Validators.required]],
    });
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
          this.users = val.defs.map((user: any) => {
            if (this.getRestaurantById(user.restaurant) == 'NOK') {
              user.confNok = true;
            }
            return user;
          });
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
          this.stockItems = val.defs.map((stockItem: any) => {
            if (this.getRestaurantById(stockItem.restaurant) == 'NOK') {
              stockItem.confNok = true;
            }
            return stockItem;
          });
          this.displayedStockItems = this.stockItems;
        }
      },
      error: (error: any) => {
        this.notificationService.showNotification({ type: 'error', title: 'error', body: 'Error fetching Stock Items' })
      }
    })
  }

  openAccordian(accordianType: string): void {
    switch (accordianType) {
      case 'restaurants':
        this.restaurantsAccordianOn = !this.restaurantsAccordianOn;
        break;
      case 'users':
        this.usersAccordianOn = !this.usersAccordianOn;
        break;
      case 'stockItems':
        this.stockItemsAccordianOn = !this.stockItemsAccordianOn;
        break;
      default:
        break;
    }
  }

  openModal(modalType: string): void {
    this.showModal = true;
    switch (modalType) {
      case 'restaurants':
        this.restaurantModal = true;
        this.userModal = false;
        this.stockItemModal = false;
        break;
      case 'users':
        this.restaurantModal = false;
        this.userModal = true;
        this.stockItemModal = false;
        break;
      case 'stockItems':
        this.restaurantModal = false;
        this.userModal = false;
        this.stockItemModal = true;
        break;
      default:
        break;
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.restaurantModal = false;
    this.userModal = false;
    this.stockItemModal = false;
    this.resetForm();
  }

  private markAllAsTouched(form: FormGroup) {
    Object.values(form.controls).forEach((control: any) => {
      control.markAsTouched();
    });
  }

  addRestaurant(): void {
    this.markAllAsTouched(this.restaurantForm);
    if (this.restaurantForm.valid) {
      const newRestaurant: Restaurant = {
        ...this.restaurantForm.value
      };
      this.adminService.createRestaurant(newRestaurant).subscribe({
        next: (val) => {
          if (val.title != "error") {
            this.restaurants.push(val.new);
          }
        },
        error: (error) => {
          this.notificationService.showNotification({ type: 'error', title: 'error', body: 'Error creating new "Restaurant"' })
        }
      })
      this.closeModal();
    }
  }
  addUser(): void {
    this.markAllAsTouched(this.userForm);
    if (this.userForm.valid) {
      const newUser: User = {
        ...this.userForm.value
      };
      this.adminService.createUser(newUser).subscribe({
        next: (val) => {
          if (val.title != "error") {
            this.users.push(val.new);
          }
        },
        error: (error) => {
          this.notificationService.showNotification({ type: 'error', title: 'error', body: 'Error creating new "User"' })
        }
      })
      this.closeModal();
    }
  }
  addStockItem(): void {
    this.markAllAsTouched(this.stockItemForm);
    if (this.stockItemForm.valid) {
      const newStockItem: StockItem = {
        ...this.stockItemForm.value
      };
      this.adminService.createSocketItem(newStockItem).subscribe({
        next: (val) => {
          if (val.title != "error") {
            this.stockItems.push(val.new);
          }
        },
        error: (error) => {
          this.notificationService.showNotification({ type: 'error', title: 'error', body: 'Error creating new "StockItem"' })
        }
      })
      this.closeModal();
    }
  }

  editRestaurant(restaurant: Restaurant): void {
    this.isEditing = true;
    this.editedRestaurantId = restaurant.id;
    this.restaurantForm.setValue({
      name: restaurant.name ?? '',
    });
    this.openModal('restaurants');
  }
  editUser(user: User): void {
    this.isEditing = true;
    this.editedUserId = user.id;
    this.userForm.setValue({
      name: user.name ?? '',
      code: user.code ?? '',
    });
    this.openModal('users');
  }
  editStockItem(stockItem: StockItem): void {
    this.isEditing = true;
    this.editedStockItemId = stockItem.id;
    this.stockItemForm.setValue({
      name: stockItem.name ?? '',
      restaurant: stockItem.restaurant ?? '',
      minimum: stockItem.minimum ?? '',
    });
    this.openModal('stockItems');
  }

  updateRestaurant(): void {
    this.markAllAsTouched(this.restaurantForm);
    const tempEditedId = this.editedRestaurantId;
    if (this.restaurantForm.valid && tempEditedId !== null) {
      const editedRestaurantIndex = this.restaurants.findIndex(restaurant => restaurant.id === tempEditedId);
      if (editedRestaurantIndex !== -1) {
        const updatedRestaurant: any = {
          ...this.restaurantForm.value,
        };
        this.adminService.updateRestaurantById(updatedRestaurant, tempEditedId).subscribe({
          next: (val) => {
            if (val.title != "error") {
              updatedRestaurant.id = tempEditedId;
              this.restaurants[editedRestaurantIndex] = { id: tempEditedId, ...updatedRestaurant };
            }
          },
          error: (error) => {
            this.notificationService.showNotification({ type: 'error', title: 'error', body: 'Error Updating "Restaurant"' })
          }
        })
      }
      this.closeModal();
    }
  }
  updateUser(): void {
    this.markAllAsTouched(this.userForm);
    const tempEditedId = this.editedUserId;
    if (this.userForm.valid && tempEditedId !== null) {
      const editedUserIndex = this.users.findIndex(user => user.id === tempEditedId);
      if (editedUserIndex !== -1) {
        const updatedUser: any = {
          ...this.userForm.value,
        };
        this.adminService.updateUserById(updatedUser, tempEditedId).subscribe({
          next: (val) => {
            if (val.title != "error") {
              updatedUser.id = tempEditedId;
              this.users[editedUserIndex] = { id: tempEditedId, ...updatedUser };
            }
          },
          error: (error) => {
            this.notificationService.showNotification({ type: 'error', title: 'error', body: 'Error Updating "User"' })
          }
        })
      }
      this.closeModal();
    }
  }
  updateStockItem(): void {
    this.markAllAsTouched(this.stockItemForm);
    const tempEditedId = this.editedStockItemId;
    if (this.stockItemForm.valid && tempEditedId !== null) {
      const editedStockItemIndex = this.stockItems.findIndex(stockItem => stockItem.id === tempEditedId);
      if (editedStockItemIndex !== -1) {
        const updatedStockItem: any = {
          ...this.stockItemForm.value,
        };
        this.adminService.updateStockItemById(updatedStockItem, tempEditedId).subscribe({
          next: (val) => {
            if (val.title != "error") {
              updatedStockItem.id = tempEditedId;
              this.stockItems[editedStockItemIndex] = { id: tempEditedId, ...updatedStockItem };
            }
          },
          error: (error) => {
            this.notificationService.showNotification({ type: 'error', title: 'error', body: 'Error Updating "StockItem"' })
          }
        })
      }
      this.closeModal();
    }
  }

  deleteRestaurant(restaurantId: string): void {
    this.adminService.deleteRestaurantById(restaurantId).subscribe({
      next: (val) => {
        if (val.title != "error") {
          this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId);
          this.users = this.users.map((user: any) => {
            if (this.getRestaurantById(user.restaurant) == 'NOK') {
              user.confNok = true;
            } else {
              user.confNok = false;
            }
            return user;
          });
          this.stockItems = this.stockItems.map((stockItem: any) => {
            if (this.getRestaurantById(stockItem.restaurant) == 'NOK') {
              stockItem.confNok = true;
            } else {
              stockItem.confNok = false;
            }
            return stockItem;
          });
        }
      },
      error: (error) => {
        this.notificationService.showNotification({ type: 'error', title: 'error', body: 'Error deleting "Restaurant"' })
      }
    })
  }
  deleteUser(userId: string): void {
    this.adminService.deleteUserById(userId).subscribe({
      next: (val) => {
        if (val.title != "error") {
          this.users = this.users.filter(user => user.id !== userId);
        }
      },
      error: (error) => {
        this.notificationService.showNotification({ type: 'error', title: 'error', body: 'Error deleting "User"' })
      }
    })
  }
  deleteStockItem(stockItemId: string): void {
    this.adminService.deleteStockItemById(stockItemId).subscribe({
      next: (val) => {
        if (val.title != "error") {
          this.stockItems = this.stockItems.filter(stockItem => stockItem.id !== stockItemId);
        }
      },
      error: (error) => {
        this.notificationService.showNotification({ type: 'error', title: 'error', body: 'Error deleting "StockItem"' })
      }
    })
  }

  private resetForm(): void {
    this.restaurantForm.reset();
    this.userForm.reset();
    this.stockItemForm.reset();
    this.isEditing = false;
    this.editedRestaurantId = null;
    this.editedUserId = null;
    this.editedStockItemId = null;
  }

  public getRestaurantById(id: string) {
    let found: any = this.restaurants.find((restaurant: Restaurant) => restaurant.id == id);
    if (found) {
      return found.name
    }
    return 'NOK';
  }
  
  navigateToHomePage() {
    this.router.navigate(['/home']);
  }

  onFilterChange(event: any) {
    if (event.target.value == 'All') {
      setTimeout(() => {
        this.displayedStockItems = this.stockItems;
      }, 250);
    }
    this.displayedStockItems = this.stockItems.filter(item => item.restaurant == event.target.value);
  }
}