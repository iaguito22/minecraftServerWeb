# 🛠️ Feixismo MC - Portal Web Premium

![Minecraft Version](https://img.shields.io/badge/Minecraft-1.21.1-blue?style=for-the-badge&logo=minecraft&logoColor=white)
![Loader](https://img.shields.io/badge/NeoForge-Latest-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Style](https://img.shields.io/badge/CSS-Vanilla-1572B6?style=for-the-badge&logo=css3&logoColor=white)

Bienvenido al portal oficial de **Feixismo MC**, un servidor de Minecraft técnico, industrial y de supervivencia extrema diseñado para ofrecer una experiencia sin concesiones. Este portal sirve como centro de recursos, guías y descargas de modpacks optimizados para los jugadores del servidor.

---

## 🌟 Características Clave del Portal

### 1. Panel de Control y Estado del Servidor
* **Estadísticas en Tiempo Real**: Visualización dinámica de latencia, consumo de RAM, rendimiento de CPU y cantidad de jugadores activos.
* **Indicadores Visuales**: Animaciones dinámicas de respiración y pulsos en el estado de conexión del servidor.

### 2. Selector de Modpacks Optimizado
Ofrece tres perfiles de rendimiento y estética adaptados a cualquier hardware:
* **Potato (Vanilla + Optimización)**: Rendimiento puro, ideal para equipos de bajos recursos.
* **Balance (Sildur's E-Lite)**: Equilibrio perfecto entre estética moderna y rendimiento.
* **High (Solas / Photon / Bliss)**: Calidad gráfica cinematográfica con trazado de rayos simulado e iluminación avanzada.

### 3. Directrices de Supervivencia y Meta
Guía interactiva que detalla las bases tecnológicas y mecánicas del servidor:
* **Ingeniería Automática (`Create`)**: Construcción de fábricas automáticas y redes de transporte ferroviario.
* **Aeronáutica Dinámica (`Create: Aeronautics`)**: Diseño y vuelo de naves físicas personalizadas.
* **Defensa de Posiciones (`Create Big Cannons`)**: Protección táctica mediante artillería y defensas mecánicas.

### 4. Guía y Protocolo de Instalación Premium
* **Línea de Tiempo Anti-Deformación**: Un timeline de instalación fluido de 3 pasos numerados e interactivos, maquetados con burbujas de vidrio circulares que nunca se deforman en resoluciones móviles o de escritorio.
* **Alertas de Conflicto y Seguridad**: Paneles dedicados con información crucial para evitar fallos de versiones de mods y pautas de seguridad para contraseñas de acceso al servidor.

---

## 🎨 Sistema de Diseño: Estética Circular & Glassmorphism

El portal destaca por un acabado visual sumamente premium y moderno:
* **Efecto de Cristal de Alta Calidad**: Fondos con transparencias combinadas, desenfoques profundos (`backdrop-filter: blur(24px)`), relieves internos y bordes de cristal dinámicos que se iluminan al pasar el cursor.
* **Esquinas Ultra-Redondeadas**: Curvatura consistente en todo el sitio utilizando un sistema de diseño con border-radius optimizados de `32px` (`rounded-xl`) y `48px` (`rounded-2xl` / `.glass-card`), evitando cualquier esquina recta rígida.
* **Paleta de Colores de Alta Tecnología**: Eliminación de colores saturados en favor de tonos celestes, púrpuras y azules translúcidos de alta tecnología, reservando el color ámbar exclusivamente para alertas críticas.
* **Compatibilidad de Temas**: Soporte impecable y con alta legibilidad para temas **Oscuro** (predeterminado) y **Claro**.

---

## 🛠️ Tecnologías y Estructura

El frontend está desarrollado con un stack ágil y ligero que elimina dependencias pesadas:
* **Núcleo**: [React 19](https://react.dev/) y [Vite](https://vite.dev/) para un hot-reload instantáneo y builds ultrarrápidos.
* **Iconografía**: [Lucide React](https://lucide.dev/) para iconos vectoriales limpios y adaptables.
* **Estilos**: Vanilla CSS (`src/index.css`) con variables de diseño personalizadas para bordes, sombras, transiciones y paddings consistentes.

### Estructura de Archivos Principal:
* `src/App.jsx`: Componentes estructurados, lógica de navegación y pestañas de la aplicación.
* `src/index.css`: Sistema de variables de diseño, sombras de cristal, curvas y estilos específicos (como `.step-row` y `.circular-icon-container`).

---

## 💻 Desarrollo e Instalación Local

Asegúrate de tener instalado [Node.js](https://nodejs.org/). Luego, sigue estos pasos:

1. **Clonar el repositorio e ingresar a la carpeta**:
   ```bash
   git clone <url-del-repositorio>
   cd web
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la aplicación.

4. **Compilar para producción**:
   ```bash
   npm run build
   ```
   Esto compila y genera los archivos optimizados dentro del directorio `dist/` en menos de 1 segundo.

5. **Desplegar en GitHub Pages**:
   ```bash
   npm run deploy
   ```

---

## 🔧 Optimización Recomendada del Servidor (JVM Arguments)
Para evitar alertas de Garbage Collector (recolector de basura) causadas por mods de carga pesada como *Distant Horizons*, se incluye la siguiente configuración recomendada para el Launcher de Minecraft:

```text
-Xms6G -Xmx6G -XX:+UseZGC -XX:+ZGenerational -XX:+AlwaysPreTouch -XX:+UseStringDeduplication
```
*(Nota: Ajusta `-Xms6G -Xmx6G` a `8G` u otros valores según la memoria RAM disponible de tu sistema).*

---
Desarrollado con ❤️ para la comunidad técnica de **Feixismo MC**.
