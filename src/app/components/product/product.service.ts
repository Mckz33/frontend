import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "./product.model";
import {catchError, EMPTY, Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    baseUrl = "http://localhost:3001/products"

    constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, 'close', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ['msg-error'] : ['msg-success']
        })
    }

    create(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl, product).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        )
    }

    errorHandler(e: any): Observable<any> {
        this.showMessage('Ocorreu um erro!', true)
        return EMPTY
    }

    read(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl)
    }

    readById(id: string | null): Observable<Product> {
        const url = `${this.baseUrl}/${id}`
        return this.http.get<Product>(url)
    }

    update(product: Product): Observable<Product> {
        const url = `${this.baseUrl}/${product.id}`
        return this.http.put<Product>(url, product)
    }

    delete(id: number | undefined): Observable<Product> {
        const url = `${this.baseUrl}/${id}`
        return this.http.delete<Product>(url)
    }

}
