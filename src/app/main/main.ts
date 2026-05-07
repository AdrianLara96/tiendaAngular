// ./src/app/main/main.ts

import { Component } from '@angular/core';
// Importamos el servicio
import { Tienda } from '../servicios/tienda';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.html',
  styleUrl: './main.scss',
})

export class Main {

  // Referenciamos los arrays del servicio
  productos: any[] = [];
  carrito: any[] = [];

  /**
   * Inyección de dependencias mediante el constructor
   * Inyectamos la instancia y la almacenamos para usarla en los métodos
   * 
   * @param tiendaService - Instancia del servicio inyectada
   */
  constructor(private tiendaService: Tienda) {
    // Obtenemos los datos del servicio al inicializar el componente
    this.productos = this.tiendaService.getProductos();
    this.carrito = this.tiendaService.getCarrito();
  }  

  /**
   * Método que recibe el evento 'addToCart' emitido por el componente hijo 'listado-productos'
   * Como nos pide el enunciado de la tarea: "el servicio centralice toda la información y la lógica de negocio de la aplicación"
   * por lo que delegamos la lógica de negocio al servicio en lugar de ejecutarla aquí
   * 
   * @param productoSeleccionado - El producto que el usuario quiere añadir al carrito
   */
  anadirAlCarrito(productoSeleccionado: any): void {
    this.tiendaService.addToCart(productoSeleccionado);
  }

  /**
   * Método que recibe el evento 'removeFromCart' emitido por el componente hijo 'carrito-compra'
   * Al igual que en el método anadirAlCarrito, delegamos la lógica de negocio al servicio en lugar de ejecutarla aquí
   * 
   * @param productoAEliminar - El producto que el usuario quiere eliminar del carrito
   */
  eliminarDelCarrito(productoAEliminar: any): void {
    this.tiendaService.removeFromCart(productoAEliminar);
  }
}
