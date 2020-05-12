import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const baseUrl = '/api/currency';

export interface Currency {
  type: string,
  rate: number,
  date: string,
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {
  }

  public getCurrencies(): Observable<Currency[]> {
    return this.http
      .get<Currency[]>(`${baseUrl}`).pipe(
        tap((resp) => {
          // console.log(resp);
        }),
        catchError(CurrencyService.handleError.bind(this)),
      );
  }

  private static handleError(error) {
    let errorMessage = 'Error occured';
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }
    switch (error.error.error) {
      case 'known_error_code':
        errorMessage = 'Known Error occured';
    }
    return throwError(errorMessage);
  };
}
