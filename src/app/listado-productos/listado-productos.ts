// ./src/app/listado-productos/listado-productos.ts


import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-listado-productos',
  standalone: false,
  templateUrl: './listado-productos.html',
  styleUrl: './listado-productos.scss',
})

export class ListadoProductos {

  /*  
  Punto de entrada de datos:
  Para poder recibir datos desde nuestro componente padre utilizamos @Input
  */
  @Input() productos: any[] = [];

  /* 
  Evento de salida
  'addToCart' lo usaremos en el HTML del padre para escuchar
  */
  @Output() addToCart = new EventEmitter<any>();

  // Función que se ejecuta al hacer clic en el botón
  onAddToCart(producto: any) {
    
    // Disparamos el evento y envía el objeto al componente padre
    this.addToCart.emit(producto);
    
  }

}