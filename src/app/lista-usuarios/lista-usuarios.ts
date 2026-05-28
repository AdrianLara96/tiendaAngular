// ./src/app/lista-usuarios/lista-usuarios.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuarios } from '../servicios/usuarios';

@Component({
  selector: 'app-lista-usuarios',
  standalone: false,
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.scss',
})

export class ListaUsuarios {

  // Almacenar lista de usuarios obtenidos de la API
  usuarios: any[] = [];

  // Indicar si se está cargando datos
  cargando: boolean = false;

  // Almacenar mensaje de error si la petición falla
  error: string | null = null;

  // Almacenar la suscripción
  private suscripcion!: Subscription;


  constructor(private usuariosService: Usuarios) {}

  ngOnInit(): void{
    this.cargarUsuarios();
  }
  
  // Método para cargar usuarios desde la API
  cargarUsuarios(): void {
    
    this.cargando = true;
    this.error = null;
    
    // Implementación temporal: solo establecer estado de carga
    // La lógica HTTP se implementará en pasos posteriores
    this.suscripcion = this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (error) => {
        console.log('Error al cargar los usuarios: ', error)
        this.cargando = false;
      },
    });
  }
  
  ngOnDestroy(): void{
      if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }
  
}
