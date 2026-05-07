import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-carrito-compra',
  standalone: false,
  templateUrl: './carrito-compra.html',
  styleUrl: './carrito-compra.scss',
})

export class CarritoCompra {

  /*  
  Punto de entrada de datos:
  Para poder recibir datos desde nuestro componente padre utilizamos @Input
  */
  @Input() carrito: any[] = [];

  /* 
  Evento de salida
  'removeFromCart' lo usaremos en el HTML del padre para escuchar
  cuando se quiere eliminar un producto
  */
  @Output() removeFromCart = new EventEmitter<any>();

  // Función llamada al hacer clic en "Eliminar"
  onRemoveFromCart(producto: any) {
    this.removeFromCart.emit(producto);
  }  



}
