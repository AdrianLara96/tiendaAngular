import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductos } from './admin-productos/admin-productos';
import { Main } from './main/main';
import { ListaUsuarios } from './lista-usuarios/lista-usuarios';


const routes: Routes = [
  // Ruta por defecto → redirige a /tienda
  { path: '', redirectTo: '/tienda', pathMatch: 'full' },

  { path: 'tienda', component: Main },

  { path: 'admin', component: AdminProductos },

  { path: 'users', component: ListaUsuarios },

  // Cualquier ruta no existente → redirige a /tienda
  { path: '**', redirectTo: '/tienda' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
