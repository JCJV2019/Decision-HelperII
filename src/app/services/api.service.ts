import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Positive } from '../shared/clases/positives';
import { Negative } from '../shared/clases/negatives';
import { Pregunta } from '../shared/clases/preguntas';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = `${environment.API_URL}`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPregunta$(idPregunta) {
    return this.http.get(`${this.apiURL}pregunta/${idPregunta}`);
  }

  getPreguntas$(idUser) {
    return this.http.get(`${this.apiURL}pregunta/usuario/${idUser}`);
  }

  getItemsPositivos$(idPregunta) {
    return this.http.get(`${this.apiURL}positivos/pregunta/${idPregunta}`);
  }

  getItemsNegativos$(idPregunta) {
    return this.http.get(`${this.apiURL}negativos/pregunta/${idPregunta}`);
  }

  addPregunta$(pregunta: any) {
    return this.http.post<Pregunta>(`${this.apiURL}pregunta/`, pregunta)
      .pipe(tap((pregunta: any) => console.log(`added Pregunta`)),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
  }

  addPositivo$(itemP: Positive) {
    return this.http.post<Positive>(`${this.apiURL}positivos/`, itemP)
      .pipe(tap((itemP: Positive) => console.log(`added Positive Item`)),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
  }

  addNegativo$(itemN: Negative) {
    return this.http.post<Negative>(`${this.apiURL}negativos/`, itemN)
      .pipe(tap((itemN: Negative) => console.log(`added Negative Item`)),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
  }

  editPregunta$(itemPregunta: Pregunta) {
    return this.http.put<Pregunta>(`${this.apiURL}pregunta/${itemPregunta.id}`, itemPregunta)
      .pipe(tap((itemPregunta: any) => console.log(`edited Pregunta: id=${itemPregunta._id}`)),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  editPositivo$(itemP: any) {
    return this.http.put<Positive>(`${this.apiURL}positivos/${itemP.id}`, itemP)
      .pipe(tap((itemP: any) => console.log(`edited Positive Item: id=${itemP._id}`)),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  editNegativo$(itemN: any) {
    return this.http.put<Negative>(`${this.apiURL}negativos/${itemN.id}`, itemN)
      .pipe(tap((itemN: any) => console.log(`edited Negative Item: id=${itemN._id}`)),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  deletePregunta$(idPregunta: any) {
    return this.http.delete(`${this.apiURL}pregunta/${idPregunta}`)
      .pipe(tap((idPregunta: any) => console.log(`deleted Query: id=${idPregunta._id}`)),
        catchError(error => {
          console.log(error);
          return throwError(error);
    }));
  }

  deletePositivo$(id: any) {
    return this.http.delete(`${this.apiURL}positivos/${id}`)
      .pipe(tap((id: any) => console.log(`deleted Positive Item: id=${id._id}`)),
        catchError(error => {
          console.log(error);
          return throwError(error);
    }));
  }

  deleteNegativo$(id: any) {
    return this.http.delete(`${this.apiURL}negativos/${id}`)
      .pipe(tap((id: any) => console.log(`deleted Negative Item: id=${id._id}`)),
    catchError(error => {
      console.log(error);
      return throwError(error);
    }));

  }

  deletePositivos$(idPregunta: any) {
    return this.http.delete(`${this.apiURL}positivos/pregunta/${idPregunta}`)
      .pipe(tap((idPregunta: any) => console.log(`deleted Positive Items: id_q=${idPregunta._id}`)),
        catchError(error => {
          console.log(error);
          return throwError(error);
    }));
  }

  deleteNegativos$(idPregunta: any) {
    return this.http.delete(`${this.apiURL}negativos/pregunta/${idPregunta}`)
      .pipe(tap((idPregunta: any) => console.log(`deleted Negative Items: id_q=${idPregunta._id}`)),
    catchError(error => {
      console.log(error);
      return throwError(error);
    }));

  }
}

