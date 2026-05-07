import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ListadoProductos } from './listado-productos/listado-productos';
import { CarritoCompra } from './carrito-compra/carrito-compra';
import { Main } from './main/main';
import { Menu } from './menu/menu';
import { AdminProductos } from './admin-productos/admin-productos';


@NgModule({
  declarations: [
    App, 
    ListadoProductos, 
    CarritoCompra, 
    Main, 
    Menu, 
    AdminProductos
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
  bootstrap: [
    App
  ],
})

export class AppModule {}
