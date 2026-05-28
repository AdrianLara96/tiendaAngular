# App Angular para Tarea

Proyecto Angular para la gestión de una tienda de música con carrito de compra y panel de administración.

## Requisitos previos
- Node.js (versión 18 o superior)
- npm
- Angular CLI (versión 18 o superior)

## Instalación
1. Clonar el repositorio:
   git clone https://github.com/AdrianLara96/tiendaAngular
2. Entrar en la carpeta:
   cd tiendaAngular
3. Instalar dependencias:
   npm install
4. Arrancar el servidor de desarrollo:
   ng serve

## Estructura del proyecto
src/app/
├── servicios/
│   ├── tienda.ts              # Servicio centralizado para gestión de productos y carrito
│   └── usuario.ts             # Servicio para consumo de API REST de usuarios
├── main/                      # Componente contenedor de la tienda (catálogo + carrito)
├── admin-productos/           # Formulario reactivo para gestión de productos
├── listado-productos/         # Catálogo de productos visible para el usuario
├── carrito-compra/            # Gestión del carrito de compra
├── lista-usuarios/            # Listado de usuarios consumido desde API REST externa
├── menu/                      # Barra de navegación principal
├── footer/                    # Pie de página global
├── app.module.ts              # Módulo raíz con configuración de HttpClient y rutas
└── app-routing.module.ts      # Configuración del enrutador

## Funcionalidades implementadas

### Gestión de productos (Tienda)
- Listado de productos con imagen, nombre, precio, stock y categoría.
- Filtro visual para productos sin stock (opacidad reducida, botón desactivado).
- Añadir productos al carrito con actualización automática del stock.
- Eliminar productos del carrito con restauración automática del stock.
- Diseño responsive con tarjetas que se adaptan al tamaño de pantalla.

### Administración de productos
- Formulario reactivo con validaciones en tiempo real:
  - **Nombre**: obligatorio, mínimo 3 caracteres.
  - **Precio**: obligatorio, mayor que 0.
  - **Stock**: obligatorio, mayor o igual a 0.
- Mensajes de error personalizados bajo cada campo.
- Botón de envío desactivado mientras el formulario es inválido.
- Tabla de productos existentes con opción de eliminación.
- Diseño responsive con scroll horizontal para la tabla en pantallas pequeñas.

### Módulo de usuarios (API REST)
- Consumo de API pública JSONPlaceholder ([https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)).
- Configuración de HttpClient mediante `provideHttpClient()` en AppModule.
- Método `getUsuarios()` en servicio que retorna `Observable<any[]>`.
- Suscripción al Observable con gestión del ciclo de vida (`ngOnInit`/`ngOnDestroy`).
- Manejo de errores centralizado con operador `catchError()` y método `handleError()`.
- Mensajes de error amigables para el usuario según tipo de fallo (red, 404, 500).
- Indicador visual de carga mientras se obtienen los datos.
- Listado de usuarios en formato de tarjetas con avatar, nombre, email y username.

### Navegación y enrutamiento
- Menú de navegación con enlaces a: Tienda, Administración y Usuarios.
- Indicador visual de ruta activa mediante `routerLinkActive`.
- Redirección de rutas no definidas a `/tienda`.
- Navegación sin recarga de página mediante Angular Router.

## Arquitectura del proyecto
┌─────────────────────────────────┐
│         COMPONENTE MAIN         │
│  (Coordina, no gestiona datos)  │
├─────────────────────────────────┤
│ • Inyecta Tienda                │
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
└────────┬───────────────┘  └────┬──────────────────────┘
         │                       │
         ▼                       ▼
         ┌──────────────────────────────────────┐
         │              TIENDA                  │
         │      (Única fuente de verdad)        │
         ├──────────────────────────────────────┤
         │ • Datos privados: productos, carrito │
         │ • Métodos públicos:                  │
         │   - getProductos(), getCarrito()     │
         │   - addToCart(), removeFromCart()    │
         │   - addProducto(), deleteProducto()  │
         └──────────────────────────────────────┘

┌─────────────────────────────────┐
│      COMPONENTE LISTA-USUARIOS  │
│  (Consume API REST externa)     │
├─────────────────────────────────┤
│ • Inyecta Usuarios (servicio)   │
│ • Suscribe a getUsuarios()      │
│ • Gestiona estados: carga/error │
│ • Muestra datos con *ngFor      │
└────────┬────────────────────────┘
         │
         ▼
         ┌──────────────────────────────────────┐
         │            USUARIOS                  │
         │      (Servicio HTTP dedicado)        │
         ├──────────────────────────────────────┤
         │ • HttpClient inyectado               │
         │ • Método getUsuarios(): Observable   │
         │ • Manejo de errores con catchError() │
         │ • Método privado handleError()       │
         └──────────────────────────────────────┘

## Autor
Adrián Lara Moncayo