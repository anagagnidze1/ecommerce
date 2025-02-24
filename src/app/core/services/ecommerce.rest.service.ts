import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiUrls } from "../apiUrls";
import { Observable } from "rxjs";
import { IFurniture } from "../../shared/interface/interfaces";

@Injectable({
    providedIn: 'root',
})

export class EcommerceRestService{
    constructor(private http: HttpClient){}
    public getFurniture(): Observable<IFurniture[]>{
        return this.http.get<IFurniture[]>(apiUrls.furniture);
    }
    public getFurnitureById(id: number): Observable<IFurniture>{
        return this.http.get<IFurniture>(`${apiUrls.furniture}/${id}`);
    }
    public createFurniture(furniture: IFurniture): Observable<IFurniture> {
        return this.http.post<IFurniture>(apiUrls.furniture, furniture);
    }
    public updateFurniture(furniture: IFurniture): Observable<IFurniture> {
        return this.http.put<IFurniture>(
          `${apiUrls.furniture}/${furniture.id}`,
          furniture
        );
    }
    public deleteFurniture(id: number): Observable<IFurniture> {
        return this.http.delete<IFurniture>(`${apiUrls.furniture}/${id}`);
    }
}