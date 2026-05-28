import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// RA3_b: Importar provideHttpClient
import { provideHttpClient } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ListadoProductos } from './listado-productos/listado-productos';
import { CarritoCompra } from './carrito-compra/carrito-compra';
import { Main } from './main/main';
import { Menu } from './menu/menu';
import { AdminProductos } from './admin-productos/admin-productos';
import { ListaUsuarios } from './lista-usuarios/lista-usuarios';
import { Footer } from './footer/footer';

@NgModule({
  declarations: [
    App,
    ListadoProductos,
    CarritoCompra,
    Main,
    Menu,
    AdminProductos,
    ListaUsuarios,
    Footer,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    provideHttpClient(),

    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
  bootstrap: [App],
})
export class AppModule {}
