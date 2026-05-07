# App Angular para Tarea

Proyecto Angular para la gestión de una tienda de música con carrito de compra y panel de administración.

## Requisitos previos
- Node.js (versión 18 o superior)
- npm

## Instalación
1. Clonar el repositorio:
   git clone [URL_DEL_REPOSITORIO]
2. Entrar en la carpeta:
   cd app-tarea-unidad1
3. Instalar dependencias:
   npm install
4. Arrancar el servidor de desarrollo:
   ng serve

## Estructura del proyecto
- `/src/app/servicios`: Lógica centralizada (Tienda)
- `/src/app/main`: Componente contenedor de la tienda
- `/src/app/admin-productos`: Formulario reactivo de gestión
- `/src/app/listado-productos`: Catálogo visible
- `/src/app/carrito-compra`: Gestión del carrito

## Autor
Adrián Lara Moncayo

## Arquitectura del proyecto

        ┌─────────────────────────────────┐
        │         COMPONENTE MAIN         │
        │  (Coordina, no gestiona datos)  │
        ├─────────────────────────────────┤
        │ • Inyecta TiendaService         │
        │ • Obtiene datos: getProductos() │
        │ • Recibe eventos de hijos       │
        │ • Delega operaciones al servicio│
        └────────┬────────────────────────┘
                 │ @Input() / @Output()
                 ▼
┌────────────────────────┐  ┌───────────────────────────┐
│   LISTADO-PRODUCTOS    │  │       CARRITO-COMPRA      │
│  (Presenta catálogo)   │  │     (Presenta carrito)    │
├────────────────────────┤  ├───────────────────────────┤
│ • @Input() productos   │  │ • @Input() carrito        │
│ • @Output() addToCart  │  │ • @Output() removeFromCart│
│ • No accede al servicio│  │ • No accede al servicio   │
└────────┬───────────────┘  └────────┬──────────────────┘
         │                       │
         ▼                       ▼
        ┌──────────────────────────────────────┐
        │           TIENDA SERVICE             │
        │      (Única fuente de verdad)        │
        ├──────────────────────────────────────┤
        │ • Datos privados: productos, carrito │
        │ • Métodos públicos:                  │
        │   - getProductos(), getCarrito()     │
        │   - addToCart(), removeFromCart()    │
        └──────────────────────────────────────┘