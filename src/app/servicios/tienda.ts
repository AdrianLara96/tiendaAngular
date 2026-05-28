// ./src/app/servicios/tienda.ts

import { Injectable } from '@angular/core';

/**
 * El decorador @Injectable indica que esta clase puede ser inyectada como dependencia en otros componentes
 * providedIn: 'root' significa que el servicio está disponible en toda la aplicación sin necesidad de registrarlo en app-module.ts
 */
@Injectable({
  providedIn: 'root',
})

export class Tienda {

  // Contador para generar IDs automáticamente
  private nextId: number = 4;

  // Lista principal de productos del catálogo
  // Se declara como private para encapsular y solo acceder mediante métodos

private productos: any[] = [
  { 
    id: 1,
    nombre: 'Flauta dulce', 
    precio: 7.50, 
    stock: 5,
    categoria: 'Viento-madera',
    imagen: 'assets/images/flauta.jpg'
  },
  { 
    id: 2,
    nombre: 'Guitarra clásica', 
    precio: 225.00, 
    stock: 3,
    categoria: 'Cuerda',
    imagen: 'assets/images/guitarra.jpg'
  },
  { 
    id: 3,
    nombre: 'Saxofón', 
    precio: 400.00, 
    stock: 1,
    categoria: 'Viento-metal',
    imagen: 'assets/images/saxofon.jpg'
  },
  { 
    id: 4,
    nombre: 'Clarinete', 
    precio: 320.00, 
    stock: 2,
    categoria: 'Viento-madera',
    imagen: 'assets/images/clarinete.jpg'
  },
  { 
    id: 5,
    nombre: 'Timbales', 
    precio: 180.00, 
    stock: 1,
    categoria: 'Percusión',
    imagen: 'assets/images/timbales.jpg'
  },
  { 
    id: 6,
    nombre: 'Teclado', 
    precio: 150.00, 
    stock: 4,
    categoria: 'Teclado',
    imagen: 'assets/images/teclado.jpg'
  }
];

  // Lista del carrito de compra
  private carrito: any[] = [];

  constructor() { 
    // Inicializamos el contador nextId basándonos en el último producto existente (3)
    if (this.productos.length > 0) {
      const maxId = Math.max(...this.productos.map(p => p.id));
      this.nextId = maxId + 1;
    }
  }

  /**
   * Método para obtener la lista completa de productos
   * @returns Array de los productos del catálogo de la tienda de música
   */
  getProductos(): any[] {
    return this.productos;
  }

  /**
   * Método para obtener la lista del carrito
   * @returns Array de productos en el carrito
   */
  getCarrito(): any[] {
    return this.carrito;
  }

  /**
   * Método para añadir un producto al carrito
   * Disminuirá el stock del producto en el catálogo
   * @param producto - El producto que se quiere añadir al carrito
   */
  addToCart(producto: any): void {
    // Buscamos el producto en el catálogo para verificar y modificar stock
    const productoEnCatalogo = this.productos.find(
      p => p.nombre === producto.nombre
    );

    // Solo añadimos si existe el producto y si hay stock disponible
    if (productoEnCatalogo && productoEnCatalogo.stock > 0) {
      // Restamos 1 el stock en el catálogo
      productoEnCatalogo.stock--;
      this.carrito.push({ ...producto });
    }
  }

  /**
   * Método para eliminar un producto del carrito
   * Incrementamos el stock del producto en el catálogo
   * @param producto - El producto que se quiere eliminar del carrito
   */
  removeFromCart(producto: any): void {
    // Buscamos el índice del producto en el carrito
    const indiceEnCarrito = this.carrito.findIndex(
      p => p.nombre === producto.nombre
    );

    // Si el producto está en el carrito, lo eliminamos
    if (indiceEnCarrito !== -1) {
      // Eliminamos el producto del carrito
      this.carrito.splice(indiceEnCarrito, 1);

      // Buscamos el producto en el catálogo para restaurar stock
      const productoEnCatalogo = this.productos.find(
        p => p.nombre === producto.nombre
      );

      // Incrementamos el stock si encontramos el producto
      if (productoEnCatalogo) {
        productoEnCatalogo.stock++;
      }
    }
  }

  /**
   * Metodo para añadir un nuevo producto al catálogo
   * @param nuevoProducto - Objeto con nombre, precio y stock
   */
  addProducto(nuevoProducto: any): void {
    // Asignamos el siguiente ID disponible
    const productoConId = {
      id: this.nextId,
      nombre: nuevoProducto.nombre,
      precio: nuevoProducto.precio,
      stock: nuevoProducto.stock
    };

    // Añadimos el producto al array productos
    this.productos.push(productoConId);

    // Incrementamos el contador para que se asigne al próximo producto
    this.nextId++;
  }

  /**
   * Método para eliminar un producto del catálogo por su ID
   * @param id - ID del producto a eliminar
   */
  deleteProducto(id: number): void {
    // Encontramos el índice del producto
    const indice = this.productos.findIndex(p => p.id === id);

    // Si existe, lo eliminamos del array
    if (indice !== -1) {
      this.productos.splice(indice, 1);
    }
  }
}
