// ./src/app/servicios/usuario.ts
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable ({ providedIn: 'root' })

export class Usuarios {

  // URL base de la API pública de prueba
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  // Inyectar servicio HttpClient mediante el constructor
  // Para permitir realizar peticiones HTTP desde este servicio
  constructor(private http: HttpClient) { }

  // Obtener lista completa de usuarios desde la API con endpoint /users
  // Retornar un 'Observable' que emite un array de objetos usuario
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/users').pipe(
      catchError(this.handleError),
    );
  }

  // Manejar errores de petición HTTP de forma centralizada
  // Construir mensaje para el usuario y relanzar error controlado
  private handleError(error: HttpErrorResponse) {
    
    // Definir mensaje de error por defecto
    let mensaje = 'Ha ocurrido un error al conectar con el servidor.';

    // Definir mensajes personalizados según tipo de error
    if (error.status === 0) {
      
      // Error de red: sin conexión o servidor inaccesible
      mensaje = 'Error de conexión. Verifica tu conexión a internet.';
    } else if (error.status === 404) {
      
      // Recurso no encontrado en la API
      mensaje = 'No se encontró el recurso solicitado.';
    } 

    // Registrar error en consola para depuración
    console.error('Error HTTP:', error);

    // Retornar Observable de error con mensaje personalizado
    return throwError(() => new Error(mensaje));
  }
}