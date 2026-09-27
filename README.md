# Bienvenida TLR Travel

Presentación HTML de 18 diapositivas basada en la primera versión del usuario. Mantiene el recorrido, los títulos y la mezcla de azul oscuro, blanco y terracota. Los textos nuevos son editables en `src/slides.js` y `src/main.jsx`.

## Uso

```sh
npm install
npm run dev
npm run build
```

`dist/index.html` es un HTML autónomo con JavaScript, fuentes, logo e imágenes incluidos. Puede abrirse directamente en un navegador, sin servidor ni conexión.

- Flechas, espacio o Page Up/Page Down para navegar.
- Home y End para ir a la primera o última diapositiva.
- G para la vista general y F para pantalla completa.
- Clic en las capturas para ampliar. El visor permite aumentar o reducir el zoom.
- Deslizamiento horizontal en pantallas táctiles. En móviles en vertical, el contenido se adapta para poder leerlo.

## Tecnología

React, Motion (antes Framer Motion), Vite y vite-plugin-singlefile. Fuentes locales: Manrope y DM Sans, instaladas con Fontsource. Iconos: Lucide.

## Criterios de diseño investigados

- [W3C: preparación de diapositivas accesibles](https://www.w3.org/WAI/teach-advocate/accessible-presentations/#slides): reducir texto, emplear tipografía sencilla, dar tamaño suficiente a los elementos y limitar movimiento innecesario. Aplicación: jerarquía tipográfica, máximo de cinco explicaciones en las pantallas operativas y visor de imágenes.
- [reveal.js: tamaño de presentación](https://revealjs.com/presentation-size/): conservar proporciones al escalar. Aplicación: composición original de 1600 × 900, ajustada al espacio disponible en escritorio. En móvil vertical se prioriza lectura con una composición adaptada.
- [reveal.js: fragmentos](https://revealjs.com/fragments/): entradas progresivas para organizar el contenido. Aplicación: entradas suaves escalonadas, sin obligar al usuario a pulsar para revelar cada frase.
- [Motion: accesibilidad](https://motion.dev/docs/react-accessibility): respetar la preferencia de movimiento reducido. Aplicación: `MotionConfig reducedMotion="user"` y `useReducedMotion`; el contenido permanece disponible con o sin animación.
- [Motion: instalación](https://motion.dev/docs/react-installation): dependencia `motion` e importación desde `motion/react`.

Los tiempos, fuentes y colores específicos son decisiones de diseño de esta versión, no valores prescritos por esas fuentes.

## Material

- Referencia original: https://claude.ai/artifact/B5iqasxknekxvXtnC1V3PQ
- Logo original proporcionado por el usuario, conservado sin alteraciones.
- Capturas extraídas de las diapositivas originales. Los recortes CSS eliminan el texto exterior de la diapositiva y conservan el área de interfaz.
- Precios y servicios de Fare Family son ejemplos del material original. No representan cotizaciones vigentes ni condiciones universales. No se han validado contra TLR en vivo.
- Fondo de portada y cierre: imagen decorativa generada con ImageGen. Prompt en `IMAGE-PROMPT.md`.

No se conecta con el sistema de reservas ni transmite datos de pasajeros.
