# ✅ GUÍA DE PRUEBAS - Make Poké

## 🎯 CHECKLIST DE CARACTERÍSTICAS

### ✨ ANIMACIONES Y EFECTOS

- [ ] **Fade-in al Scroll**
  - Abre la página
  - Scrollea hacia abajo
  - Verifica que las secciones aparecen con efecto fade-in
  - **Esperado:** Las secciones se ven con transición suave

- [ ] **Hover en Botones**
  - Pasa el mouse sobre "Comienza Ahora"
  - Pasa el mouse sobre "Agregar al Carrito"
  - **Esperado:** Los botones se elevan con sombra

- [ ] **Hover en Tarjetas de Menú**
  - Pasa el mouse sobre cualquier bowl en "Nuestros Bowls Destacados"
  - **Esperado:** Las tarjetas se elevan suavemente

- [ ] **Transiciones Suaves**
  - Navega por la página
  - Interactúa con elementos
  - **Esperado:** Todos los cambios son suaves (0.3s)

- [ ] **Scroll Suave**
  - Haz clic en cualquier enlace de navegación
  - **Esperado:** La página se desplaza suavemente al destino

### 📱 RESPONSIVIDAD

- [ ] **Desktop (1200px+)**
  - Menú horizontal visible
  - Grid de 3 columnas en menú
  - Constructor de bowl en 2 columnas lado a lado
  - **Esperado:** Diseño completo

- [ ] **Tablet (768px - 1199px)**
  - Menú hamburguesa visible
  - Grid se adapta a 2 columnas
  - Constructor en 2 columnas (puede ser más compacto)
  - **Esperado:** Menú hamburguesa funcional

- [ ] **Móvil (< 768px)**
  - Menú hamburguesa obligatorio
  - Grid de 1 columna
  - Constructor de bowl en 1 columna
  - Resumen debajo del formulario
  - **Esperado:** Todo adaptado verticalmente

### 🍔 MENÚ HAMBURGUESA

- [ ] **Abrir/Cerrar**
  - En móvil, haz clic en el ícono ☰
  - **Esperado:** El menú se abre/cierra suavemente

- [ ] **Navegación desde Hamburguesa**
  - Haz clic en cada enlace del menú
  - **Esperado:** La página navega y el menú se cierra automáticamente

- [ ] **Cierre Automático**
  - Abre el menú hamburguesa
  - Haz clic en un enlace
  - **Esperado:** El menú se cierra automáticamente

### 🎨 CONSTRUCTOR DE BOWLS

#### Base (Radio Buttons)
- [ ] Selecciona **Arroz**
  - Verifica que "Arroz" aparece en el resumen
  - **Precio base:** S/. 8.00
  
- [ ] Selecciona **Lechuga**
  - Verifica que cambia a "Lechuga"
  - **Precio base:** S/. 6.00
  
- [ ] Selecciona **Quinua**
  - Verifica que cambia a "Quinua"
  - **Precio base:** S/. 10.00

#### Proteína (Radio Buttons)
- [ ] Prueba todas las proteínas:
  - **Pulpo:** S/. 12.00
  - **Ceviche:** S/. 14.00
  - **Paiche:** S/. 15.00
  - **Pollo:** S/. 10.00
  - **Esperado:** El resumen se actualiza al instante

#### Salsa (Radio Buttons)
- [ ] Prueba todas las salsas:
  - **Picante:** S/. 1.00
  - **Acevichada:** S/. 1.00
  - **Soya:** S/. 1.00
  - **Sriracha:** S/. 1.00
  - **Esperado:** El resumen se actualiza al instante

#### Vegetales (Checkboxes)
- [ ] Selecciona múltiples vegetales:
  - Zanahoria (S/. 0.50)
  - Pico de gallo (S/. 1.00)
  - Mango (S/. 2.00)
  - Durazno (S/. 2.00)
  - Chuchusmuti (S/. 1.00)
  - Nachos (S/. 1.50)
  - Pepino (S/. 0.50)
  - Repollo morado (S/. 0.50)
  - Palta (S/. 2.00)
  - **Esperado:** Todos los vegetales se muestran en el resumen

- [ ] Deselecciona un vegetal
  - **Esperado:** Se elimina del resumen automáticamente

- [ ] Sin vegetales seleccionados
  - **Esperado:** Muestra "Ninguno seleccionado"

### 💰 CÁLCULO DE PRECIOS

- [ ] **Precio Inicial**
  - Arroz (S/. 8) + Pulpo (S/. 12) + Picante (S/. 1) = **S/. 21.00**
  
- [ ] **Agregar Vegetales**
  - Selecciona: Zanahoria (0.50) + Palta (2.00) = +S/. 2.50
  - **Precio total:** S/. 23.50
  
- [ ] **Cambiar Proteína**
  - Cambia de Pulpo (S/. 12) a Paiche (S/. 15)
  - **Diferencia:** +S/. 3.00
  
- [ ] **Precio con Muchos Vegetales**
  - Selecciona todos los vegetales
  - Verifica que el precio se calcula correctamente
  - **Máximo aproximado:** S/. 30.00 (dependiendo de selecciones)

### 📝 RESUMEN DINÁMICO

- [ ] **Tarjeta Flotante (Desktop)**
  - Haz scroll hacia la sección "Arma tu bowl"
  - La tarjeta debe permanecer visible mientras scrolleas
  - **Esperado:** La tarjeta se mantiene pegada en el lado derecho

- [ ] **Actualización en Tiempo Real**
  - Cambia cualquier ingrediente
  - **Esperado:** El resumen se actualiza instantáneamente

- [ ] **Formato del Resumen**
  - Base: [ingrediente seleccionado]
  - Proteína: [ingrediente seleccionado]
  - Salsa: [ingrediente seleccionado]
  - Vegetales: [lista separada por comas]
  - Precio: S/. [monto calculado]

### 🛒 CARRITO

- [ ] **Agregar al Carrito**
  - Haz una selección completa de ingredients
  - Haz clic en "Agregar al Carrito"
  - **Esperado:** Aparece un alert confirmando la compra

- [ ] **Alert Correcto**
  - El alert debe mostrar:
    - Base seleccionada
    - Proteína seleccionada
    - Salsa seleccionada
    - Vegetales seleccionados
    - Precio final

- [ ] **Persistencia (localStorage)**
  - Agrega un bowl al carrito
  - Recarga la página (F5)
  - Abre la consola (F12) y ejecuta:
    ```javascript
    console.log(JSON.parse(localStorage.getItem('carrito')))
    ```
  - **Esperado:** Ves los datos del bowl guardado

### 📍 NAVEGACIÓN

- [ ] **Header Sticky**
  - Scrollea la página
  - El header debe permanecer en la parte superior
  - **Esperado:** Header siempre visible en la parte superior

- [ ] **Enlaces de Navegación**
  - Haz clic en "Inicio" → Va a hero
  - Haz clic en "Menú" → Va a sección de menú
  - Haz clic en "Arma tu Bowl" → Va al constructor
  - Haz clic en "Contacto" → Va al footer
  - **Esperado:** Scroll suave a cada sección

- [ ] **Logo Clickeable**
  - Haz clic en el logo "Make Poké"
  - **Esperado:** Navega a la parte superior (Inicio)

### 🔗 FOOTER

- [ ] **Información de Contacto**
  - Haz clic en el teléfono
  - **Esperado:** Abre la aplicación de llamadas (o muestra tel:)
  
- [ ] **Email**
  - Haz clic en el email
  - **Esperado:** Abre el cliente de correo (o muestra mailto:)

- [ ] **Redes Sociales**
  - Haz clic en Instagram
  - **Esperado:** Abre link en nueva pestaña
  
  - Haz clic en TikTok
  - **Esperado:** Abre link en nueva pestaña

- [ ] **Diseño**
  - Verifica que tiene fondo turquesa oscuro
  - Verifica que el texto es blanco
  - **Esperado:** Contraste suficiente para leer

### 📄 PÁGINAS CARGADAS

- [ ] **Sin Errores en Consola**
  - Abre F12 → Console
  - **Esperado:** No hay errores rojo (puede haber warnings)

- [ ] **Todos los Archivos Cargan**
  - Pestaña Network en DevTools
  - **Esperado:** Todos los recursos tienen status 200 o 304

### 🎨 DISEÑO Y ESTILOS

- [ ] **Colores Correctos**
  - Turquesa primario en botones
  - Turquesa oscuro en header y footer
  - Rojo en detalles

- [ ] **Tipografía**
  - Títulos grandes y legibles
  - Texto pequeño legible
  - Espaciado adecuado

- [ ] **Imágenes**
  - Las 9 imágenes SVG cargan correctamente
  - Tienen tamaño apropiado
  - Se ven bien en móvil

---

## 🧪 CASOS DE PRUEBA COMPLEJOS

### Caso 1: Bowl Premium Completo
1. Base: Quinua
2. Proteína: Paiche
3. Salsa: Sriracha
4. Vegetales: Mango + Palta
5. **Precio esperado:** 10 + 15 + 1 + 2 + 2 = S/. 30.00

### Caso 2: Bowl Económico
1. Base: Lechuga
2. Proteína: Pollo
3. Salsa: Soya
4. Sin vegetales
5. **Precio esperado:** 6 + 10 + 1 = S/. 17.00

### Caso 3: Responsividad Móvil
1. Abre DevTools (F12)
2. Haz clic en "Toggle device toolbar" 📱
3. Selecciona "iPhone SE" o similar
4. Navega por toda la página
5. **Esperado:** Todo funciona en vertical

### Caso 4: Múltiples Carrito
1. Agrega un bowl
2. Cambia opciones
3. Agrega otro bowl diferente
4. Recarga
5. Verifica localStorage
6. **Esperado:** Ambos bowls están guardados

---

## 📊 RESULTADOS

Una vez completes todas las pruebas, puedes marcar:

**Total de características:** 60+
**Puntos de prueba:** 200+

---

## 🎉 ¡LISTO!

Si todas las pruebas pasan, tu página está **100% funcional** y lista para presentar.

---

*Última actualización: Junio 2026*
