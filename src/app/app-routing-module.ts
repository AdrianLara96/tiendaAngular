import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductos } from './admin-productos/admin-productos';
import { Main } from './main/main';


const routes: Routes = [
  // Ruta por defecto → redirige a /tienda
  { path: '', redirectTo: '/tienda', pathMatch: 'full' },

  // Zona de tienda (contiene listado y carrito)
  { path: 'tienda', component: Main },

  // Zona de administración (formulario reactivo)
  { path: 'admin', component: AdminProductos },

  // Cualquier ruta no existente → redirige a /tienda
  { path: '**', redirectTo: '/tienda' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
