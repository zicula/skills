# Prompts de narrativa con IA — Español (12 prompts)

> Pega primero el BLOQUE DE REGLAS (de `00-how-to-use.md`) y sustituye cada `[PEGA: …]`
> con tus datos reales. La salida es un borrador: revísala siempre antes de enviarla al cliente.

```
Escribes para un informe mensual para un cliente. Reglas innegociables:
1. Usa SOLO los números que te doy. No inventes, estimes ni extrapoles. Si falta un
   dato, escribe [FALTA DATO: cuál] en lugar de suponer.
2. Lenguaje claro para un dueño de negocio, sin tecnicismos sin explicar.
3. Tono profesional, tranquilo y específico. Sin exageraciones.
4. Voz activa. Nombra la página, la consulta, el canal o la campaña concretos.
5. Separa observación de hipótesis: las hipótesis empiezan con "creemos" o "probablemente".
6. Variaciones con signo (+12,4% / -3,1%), un decimal. La posición media: menor es mejor.
7. Respeta la extensión exacta que te pida.
```

**1 — Resumen ejecutivo.** `[PEGA: tabla de KPI del mes vs mes anterior + trabajo entregado]`

```
Redacta el resumen ejecutivo del informe mensual. Cliente: [NOMBRE], [SECTOR]. Mes: [MES AAAA].
[PEGA: tabla de KPI] Trabajo entregado: [PEGA: 1–3 puntos]
Escribe 3–4 frases: (1) la cifra que define el mes con su variación exacta; (2) el principal
motor, ligado a una página/consulta/campaña concreta; (3) el contrapunto honesto (qué fue peor
o se quedó plano); (4) qué deja preparado el mes siguiente, sin promesas. Cierra con 3 viñetas:
los tres números que el cliente debe recordar.
```

**2 — Movimiento mes a mes.** `[PEGA: sesiones por canal + top 5 landing pages]`

```
Explica el movimiento de tráfico mes a mes. [PEGA: datos]
Escribe 4–6 frases: qué canal explica la mayor parte del cambio (calcula la proporción con mis
datos), qué páginas lo causan (por nombre), distingue lo estacional de lo nuevo, y si algo cayó,
di hacia dónde se fueron esas sesiones. No inventes causas: si mis datos no muestran el porqué,
escribe "lo estamos investigando".
```

**3 — Explicar una caída de tráfico.** `[PEGA: sesiones por semana/día de ambos meses, canales, cambios conocidos]`

```
El tráfico del cliente cayó. Redacta la explicación. Cliente: [NOMBRE]. Caída: [p. ej. -18,4%].
[PEGA: datos]
Escribe 4–6 frases: (1) di la caída con claridad y la cifra exacta; (2) aísla CUÁNDO ocurrió y si
fue súbita o gradual; (3) separa con mis datos las tres posibles causas —cambio de medición,
cambio en el sitio, demanda/estacionalidad— y di cuál respalda la evidencia; (4) termina con el
paso de diagnóstico ya en marcha. Tono: tranquilo y con control.
```

**4 — Explicar un pico de tráfico.** `[PEGA: sesiones por semana/día, páginas top, canales]`

```
Hubo un pico de tráfico. Redacta la explicación sin atribuirnos el mérito de más.
[PEGA: datos]
Escribe 4–6 frases: cuantifica el pico (variación exacta + cuándo), atribúyelo con precisión
(páginas, canal, consulta si es visible), separa causas puntuales (mención viral, prensa,
temporada) de repetibles (nuevos rankings, campaña), y cierra con una frase sobre cómo
comprobaremos si se mantiene. No afirmes causas que mis datos no demuestren.
```

**5 — Narrativa de rendimiento en buscadores.** `[PEGA: clics, impresiones, CTR, posición media (ambos meses), top 5 consultas, top 5 páginas]`

```
Redacta la interpretación de la página de Search Console. No repitas la tabla: interprétala.
[PEGA: datos]
Responde en 4–6 frases: (1) ¿los clics subieron por más impresiones (más demanda cubierta) o por
mejor CTR (nuestros títulos ganan)? Explica el cálculo en palabras simples; (2) qué consulta o
página explica la mayor parte del cambio; (3) qué hizo la posición media y qué significa en la
práctica (recuerda: menor es mejor); (4) una mirada al futuro ligada a las consultas de la
página 2 si las aporté.
```

**6 — Oportunidades de palabras clave.** `[PEGA: 5–10 consultas en posiciones 11–20 con impresiones y página]`

```
Redacta un breve informe de "victorias rápidas" desde la página 2. [PEGA: datos]
Para cada consulta (máx. 5), 2 frases: por qué es ganable (posición actual + impresiones) y la
mejora concreta que haríamos (añadir FAQ, mejorar el título para el CTR, enlaces internos desde
[relacionada], ampliar la sección que responde a la intención). Cierra: son hipótesis; las
posiciones suelen moverse en semanas, no en días. Ordena por impresiones.
```

**7 — Historia de conversiones.** `[PEGA: tabla de eventos clave, conversiones por canal, tasa de conversión de ambos meses]`

```
Redacta la historia de conversiones. Cliente: [NOMBRE], [TIPO DE NEGOCIO]. [PEGA: datos]
Escribe 5–7 frases: (1) titular con la conversión total y su variación exacta, y si la tasa fue
con ella (¿más tráfico o mejor tráfico?); (2) qué tipo de conversión lo impulsó y en qué páginas;
(3) el canal más fuerte y el más débil por tasa de conversión, nombrados sin rodeos; (4) una
frase puente hacia el plan del mes siguiente. Si cayeron: dilo en la primera frase, da la causa
más probable apoyada en datos y la contramedida ya planificada. Sin maquillaje.
```

**8 — Recomendaciones del mes siguiente.** `[PEGA: KPI, consultas página 2, notas de conversión, recursos disponibles]`

```
Propón el plan del mes siguiente (3–5 puntos, no más) para [CLIENTE]. Restricciones:
[p. ej. ~20 horas, sin desarrollo]. [PEGA: datos]
Para cada punto, exactamente: ACCIÓN (un entregable concreto), PORQUE (el dato que ataca),
ESPERO (rango honesto + supuesto del que depende), PRIMER PASO (qué ocurre el día 1).
Ordena por impacto esperado. Elimina todo lo que no cite un dato de mi pegado.
```

**9 — Reescritura en lenguaje llano.** `[PEGA: el párrafo demasiado técnico]`

```
Reescribe este párrafo para un dueño de negocio sin conocimientos de marketing. Mantén cada
número exactamente igual, mismos hechos y orden. Cambia los tecnicismos por palabras llanas
(una explicación corta por término como máximo). Frases de menos de 22 palabras de media.
No añadas afirmaciones nuevas. [PEGA: párrafo]
```

**10 — Logros y vigilancia.** `[PEGA: KPI + 3–5 movimientos notables de páginas/consultas]`

```
Escribe (a) tres logros y (b) tres puntos de vigilancia para el resumen ejecutivo. [PEGA: datos]
Logros: resultado cuantificado + una frase sobre por qué ocurrió, solo lo que mis datos muestran.
Vigilancia: el riesgo con su número + la acción ya en marcha (nunca una preocupación sin plan).
Máx. 20 palabras por punto.
```

**11 — Preparar la reunión con el cliente.** `[PEGA: el informe completo o sus tablas + preguntas pendientes]`

```
Prepárame la llamada mensual con [CLIENTE]. [PEGA: datos]
Devuelve: (1) las 3 preguntas que más probable hará, redactadas como las diría un no-marketer;
(2) respuesta de 2 frases para cada una, basada solo en mis datos; (3) el punto débil del mes que
podría criticar y su encuadre honesto (asumirlo + mostrar el plan); (4) una pregunta que YO
debería hacerle para entender contexto de negocio que los datos no muestran.
```

**12 — Correo de entrega.** `[PEGA: los 3 logros + nombre del informe + foco del mes siguiente]`

```
Escribe el correo de entrega del informe mensual. Destinatario: [NOMBRE], [ROL]. De: [TU NOMBRE].
1) Asunto: el número más importante del mes (nunca "Tu informe mensual"). 2) Saludo + una línea
con el resultado principal. 3) Dos viñetas con los logros que más le importan. 4) Una línea:
informe adjunto, "lectura de tres minutos". 5) Una línea: en qué nos centramos el mes próximo.
6) Despedida ofreciendo 15 minutos de llamada. Menos de 120 palabras. Sin emojis ni exclamaciones.
```
