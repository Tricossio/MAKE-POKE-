# Make Poké, arma tu bowl

## Título del Proyecto
**Make Poké - Arma tu Bowl**

## Descripción General
Make Poké es una página web tipo *e-commerce/constructor* en la que el usuario puede **armar su bowl personalizado de Poké** eligiendo base, proteína, salsa y vegetales. El proyecto simula el proceso de construcción de un producto final y su **carrito de compras**, calculando el precio total en tiempo real.

## Tecnologías Utilizadas
- **HTML**: estructura de la página (secciones, menú y formulario del bowl).
- **CSS**: estilos, layout responsive y diseño de la interfaz.
- **JavaScript**: lógica del constructor del bowl, cálculo de precios y carrito dinámico.
- Uso de diseño responsivo con media queries (estilo “mobile-first”).
- **IA / Asistencia**: se usó **Gemini** dentro de **Visual Studio Code** para apoyar el desarrollo.

## Funcionalidades
- **Constructor dinámico de bowl**: selección de ingredientes (radio buttons y checkboxes) y actualización de resumen.
- **Cálculo automático de precio**: suma de valores por base, proteína, salsa y vegetales seleccionados.
- **Carrito de compras dinámico**:
  - Agregar bowls personalizados.
  - Manejo de **cantidad** (+/-) por ítem.
  - **Eliminar** ítems.
  - Persistencia usando **localStorage**.
  - **Subtotal** y **total** calculados en el carrito.
- **Finalizar pedido**: vacía el carrito y muestra un mensaje de confirmación.

## Instrucciones de Uso

### Sitio desplegado (Netlify)
- https://6a21f664842bc62e2b58b953--beautiful-seahorse-5cf8b4.netlify.app/

### Ejecutar localmente
1. Clona o descarga el proyecto.
2. Abre el archivo **`index.html`** en tu navegador.
   - Alternativa: si usas un servidor local (Live Server en VS Code), ejecútalo para ver los cambios en tiempo real.

## Estructura del Proyecto (resumen)
- `index.html`: contenido principal de la landing y el constructor del bowl.
- `css/styles.css`: estilos globales y responsive.
- `js/script.js`: lógica del constructor, cálculo de precios y carrito (renderizado y localStorage).
- `assets/`: recursos gráficos (por ejemplo, imágenes SVG).

## Autor
**Triana Maria Cossio Czermak**  
**Correo institucional:** cbbe.trianamaria.cossio.cz@unifranz.edu.bo

