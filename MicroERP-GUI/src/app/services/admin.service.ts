import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080'; //todo-P2 : use env files

  constructor(
    private http: HttpClient
  ) { }

  public getAllRestaurants(): Observable<any> {
    return this.http.get<{ response: any }>(`${this.apiUrl}/restaurants/getAll`);
  }
  public getAllUsers(hideCode?: boolean): Observable<any> {
    return this.http.get<{ response: any }>(`${this.apiUrl}/users/getAll/${hideCode ? 'secret' : ''}`);
  }
  public getAllStockItems(): Observable<any> {
    return this.http.get<{ response: any }>(`${this.apiUrl}/stockItems/getAll`);
  }

  public createUser(def: any): Observable<any> {
    return this.http.post<{ response: any }>(`${this.apiUrl}/users/create`, def);
  }
  public createRestaurant(def: any): Observable<any> {
    return this.http.post<{ response: any }>(`${this.apiUrl}/restaurants/create`, def);
  }
  public createSocketItem(def: any): Observable<any> {
    return this.http.post<{ response: any }>(`${this.apiUrl}/stockItems/create`, def);
  }

  public deleteRestaurantById(id: any): Observable<any> {
    return this.http.get<{ response: any }>(`${this.apiUrl}/restaurants/deleteById/${id}`);
  } public deleteUserById(id: any): Observable<any> {
    return this.http.get<{ response: any }>(`${this.apiUrl}/users/deleteById/${id}`);
  }
  public deleteStockItemById(id: any): Observable<any> {
    return this.http.get<{ response: any }>(`${this.apiUrl}/stockItems/deleteById/${id}`);
  }

  public updateRestaurantById(def: any, id: string): Observable<any> {
    return this.http.put<{ response: any }>(`${this.apiUrl}/restaurants/updateById/${id}`, def);
  }
  public updateUserById(def: any, id: string): Observable<any> {
    return this.http.put<{ response: any }>(`${this.apiUrl}/users/updateById/${id}`, def);
  }
  public updateStockItemById(def: any, id: string): Observable<any> {
    return this.http.put<{ response: any }>(`${this.apiUrl}/stockItems/updateById/${id}`, def);
  }

  public checkCode(code: string, id: string): Observable<any> {
    return this.http.get<{ response: any }>(`${this.apiUrl}/users/checkCode/${id}/${code}`);
  }

  public submitReport(data: any): Observable<any> {
    return this.http.post<{ response: any }>(`${this.apiUrl}/users/submitReport`, data);
  }
}
