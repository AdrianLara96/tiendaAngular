// ./src/app/admin-productos/admin-productos.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tienda } from '../servicios/tienda';

@Component({
  selector: 'app-admin-productos',
  standalone: false,
  templateUrl: './admin-productos.html',
  styleUrl: './admin-productos.scss',
})

export class AdminProductos {

  formularioProducto: FormGroup;

  /**
   * Constructor con inyección de dependencias
   * @param fb - FormBuilder para crear el formulario de manera simplificada
   * @param tiendaService - Servicio para gestionar los datos del catálogo
   */
  constructor(
    private fb: FormBuilder,
    private tiendaService: Tienda
  ) {
    // Inicializamos el formulario

    this.formularioProducto = this.fb.group({

      // Validaciones:

      // Campo 'nombre': obligatorio + mínimo 3 caracteres
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      
      // Campo 'precio': obligatorio + debe ser mayor que 0
      precio: ['', [Validators.required, Validators.min(0.01)]],
      
      // Campo 'stock': obligatorio + debe ser mayor o igual a 0
      stock: ['', [Validators.required, Validators.min(0)]]
    });
  }

  /**
   * Método que se ejecutará al enviar el formulario (onSubmit)
   * Valida los datos y, si son correctos, llama al servicio para añadir el producto
   */
  onSubmit(): void {
    // Marcamos todos los campos como 'touched' para forzar la validación
    // Esto hace que se muestren todo los mensajes de error si el formulario es inválido
    this.formularioProducto.markAllAsTouched();

    // Verificamos si el formulario es válido
    if (this.formularioProducto.valid) {
      // Obtenemos los valores del formulario
      const nuevoProducto = this.formularioProducto.value;

      // Llamamos al servicio para añadir el producto al catálogo
      this.tiendaService.addProducto(nuevoProducto);

      // Dejamos el formulario en blanco para permitir introducir nuevos datos
      this.formularioProducto.reset();
    }
  }

  /**
   * Método para eliminar un producto del catálogo
   * Se llama desde el botón de eliminar en la tabla de productos
   * @param id - ID del producto a eliminar
   */
  eliminarProducto(id: number): void {
    // Confirmación opcional antes de eliminar
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.tiendaService.deleteProducto(id);
    }
  }

  /**
   * Método para obtener la lista de productos desde el servicio
   * Se usa en el HTML para mostrar la tabla de productos
   * @returns Array de productos del catálogo
   */
  getProductos(): any[] {
    return this.tiendaService.getProductos();
  }
}
