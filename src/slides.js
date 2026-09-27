const imageModules = import.meta.glob('./assets/original/*.jpg', { eager: true, query: '?url', import: 'default' });
export const imageFor = n => imageModules[`./assets/original/slide-${String(n).padStart(2, '0')}.jpg`];
export const slides = [
  { title:'Conoce la plataforma TLR Travel', short:'Bienvenida', section:'Módulo de bienvenida', kind:'cover' },
  { title:'¿Qué es TLR Travel?', short:'La plataforma', section:'Antes de empezar', kind:'platform' },
  { title:'Una venta en 8 pasos', short:'El recorrido', section:'El mapa del módulo', kind:'journey' },
  { title:'El acceso a la plataforma', short:'Acceso', section:'Paso 1 · Entrar', kind:'capture', image:4, crop:[70,184,960,670], notes:[
    ['1','Usuario y contraseña','Usa las credenciales asignadas a tu cuenta. Son personales.'],
    ['2','Accedi subito','Significa «Entrar ahora». Es el acceso que muestra la referencia.'],
    ['3','Nuova registrazione','Registro de una agencia nueva. Si ya tienes usuario, utiliza tu acceso.'],
    ['4','¿Olvidaste tus datos?','En la referencia, «Clicca qui» permite recuperar el acceso.']
  ] },
  { title:'La barra superior', short:'Tu espacio de trabajo', section:'Paso 1 · Ubicarte', kind:'capture', wide:true, image:5, crop:[70,184,1460,315], notes:[
    ['1','Sei loggato come','Comprueba la agencia con la que estás trabajando.'],
    ['2','Idioma','Selector de idioma de la interfaz.'],
    ['3','My Cart','El carrito de los vuelos seleccionados.'],
    ['4','Tu usuario','Acceso a BACKOFFICE y Esci (salir).'],
    ['5','VOLI','El módulo de vuelos que usamos en este curso.']
  ] },
  { title:'El formulario de búsqueda', short:'Buscador', section:'Paso 2 · Buscar', kind:'capture', image:6, crop:[70,184,960,660], notes:[
    ['1','Tipo de viaje','Andata e Ritorno: ida y vuelta. Andata: solo ida. Multi tratta: multidestino.'],
    ['2','Origen y destino','Elige la ciudad o un aeropuerto concreto. Comprueba los códigos IATA.'],
    ['3','Fechas y horario','Revisa la ida (Andata), la vuelta (Ritorno) y los horarios.'],
    ['4','Pasajeros','Adulti, Bambini y Neonati: adultos, niños y bebés. Confirma la cantidad.'],
    ['5','Cerca','Lanza la búsqueda. Azzera la ricerca borra el formulario.']
  ] },
  { title:'La búsqueda avanzada', short:'Búsqueda avanzada', section:'Paso 2 · Afinar', kind:'capture', image:7, crop:[70,184,970,680], notes:[
    ['1','Compagnie aeree','Aerolíneas preferidas o excluidas.'],
    ['2','Tipologia tariffe','Tipos de tarifa. Verifica condiciones y elegibilidad de cada opción.'],
    ['3','Fornitori','Fuentes de las tarifas: Sabre y los canales NDC de la referencia.'],
    ['4','Tipologia volo','Filtros como equipaje, vuelos directos o fechas flexibles.'],
    ['5–6','Escalas y clase','Tiempo máximo de conexión y cabina del vuelo.']
  ] },
  { title:'La pantalla de resultados', short:'Resultados', section:'Paso 3 · Comparar', kind:'capture', image:8, crop:[70,184,960,660], notes:[
    ['1','Matriz de aerolíneas','Compara precios por aerolínea y cantidad de escalas.'],
    ['2','Ordina','Ordena las opciones por precio, duración o escalas.'],
    ['3','La tarjeta del vuelo','Revisa ida y vuelta: horarios, duración, escalas, clase y equipaje.'],
    ['4','Tarifa y proveedor','Identifica el tipo de tarifa y la fuente de la selección.'],
    ['5','Precio y carrito','Comprueba a qué pasajeros corresponde el total antes de elegir.']
  ] },
  { title:'Los filtros de los resultados', short:'Filtros', section:'Paso 3 · Comparar', kind:'filters', image:9, crop:[70,184,435,670] },
  { title:'Las 3 pestañas de cada vuelo', short:'Detalles del vuelo', section:'Paso 4 · Analizar', kind:'capture', image:10, crop:[70,184,960,670], notes:[
    ['1','Dettagli volo','Vuelos, aeropuertos, horarios, conexiones y datos de la selección.'],
    ['2','Regole tariffarie','Condiciones de cambios, reembolsos y penalidades.'],
    ['3','Fare Family','Familias disponibles y servicios de cada opción.'],
    ['4','El icono «i»','Desglose del precio: tarifa, tasas y total.']
  ], tip:'Las condiciones de la selección concreta son las que debes revisar antes de ofrecerla.' },
  { title:'Fare Family: qué incluye cada tarifa', short:'Fare Family', section:'Paso 4 · Analizar', kind:'fares' },
  { title:'La selección y tu cargo de servicio', short:'Carrito', section:'Paso 5 · Carrito', kind:'capture', image:12, crop:[70,184,960,660], notes:[
    ['1','Resumen del vuelo','Ruta, fechas, pasajeros, clase y equipaje.'],
    ['2','Costo emissione','Cargo de servicio de la agencia. Comprueba cómo se refleja en el total.'],
    ['3','Rimuovi','Quita el vuelo seleccionado del carrito.'],
    ['4','Torna alla lista','Vuelve a los resultados. Nuova ricerca inicia otra búsqueda.'],
    ['5','Procedi con la prenotazione','Continúa con la modalidad de reserva y los datos del pasajero.']
  ] },
  { title:'Opción o emisión inmediata', short:'Modalidad de reserva', section:'Paso 6 · Tipo de reserva', kind:'booking' },
  { title:'Los datos del pasajero', short:'Pasajero', section:'Paso 7 · Pasajero', kind:'capture', image:14, crop:[70,184,960,660], notes:[
    ['1','Cerca viaggiatore','Busca pasajeros guardados cuando corresponda.'],
    ['2','Nombre y apellido','Según el documento de viaje. Revisa la escritura antes de confirmar.'],
    ['3','Documento y contacto','Comprueba los campos requeridos para la selección.'],
    ['4','Servizi aggiuntivi','Servicios adicionales: revisa disponibilidad y confirmación por trayecto.'],
    ['5','Conferma','Revisa la modalidad, los datos y los términos aplicables antes de confirmar.']
  ] },
  { title:'El Backoffice y cada expediente', short:'Backoffice', section:'Paso 8 · Seguimiento', kind:'capture', image:15, crop:[70,184,1000,680], notes:[
    ['1','Menú lateral','Expedientes, clientes, estadísticas y otras herramientas de la referencia.'],
    ['2','Pratiche › Voli','Localiza los expedientes de vuelos y sus fechas límite.'],
    ['3','Fatturato · Costi · Profitto','Facturación, costos y beneficio del período.'],
    ['4','Estado del boleto','Emesso: emitido. Da emettere: por emitir. Scaduta: vencida. Cancellata: cancelada.']
  ], tip:'Una reserva pendiente de emisión necesita seguimiento de su fecha y hora límite.' },
  { title:'Glosario italiano–español', short:'Glosario', section:'Para no perderse', kind:'glossary' },
  { title:'5 reglas de oro del agente TLR', short:'Reglas de oro', section:'Antes de terminar', kind:'rules' },
  { title:'¡Bienvenido al equipo!', short:'Bienvenido', section:'Te Lo Resuelvo Viajes', kind:'closing' }
];
export const journey = [
  ['Entrar','Usuario y contraseña',3,'KeyRound'],['Buscar','Ruta, fechas y pasajeros',5,'Search'],['Comparar','Resultados y filtros',7,'ListFilter'],['Analizar','Detalles, reglas y tarifa',9,'ScanSearch'],['Carrito','Selección y cargo de servicio',11,'ShoppingCart'],['Opción o emisión','Modalidad y fecha límite',12,'Hourglass'],['Pasajero','Datos y servicios',13,'ContactRound'],['Backoffice','Seguimiento del expediente',14,'ChartNoAxesCombined']
];
export const filters = [
  ['Prezzo','Rango de precio mínimo y máximo.'],['Tariffe','Tipos de tarifa disponibles.'],['Scali','Sin escalas, una o varias.'],['Durata degli scali','Duración de las conexiones.'],['Durata Andata / Ritorno','Duración total de cada trayecto.'],['Orario Andata / Ritorno','Horario de salida.'],['Compagnie aeree','Aerolínea.'],['Bagaglio','Equipaje incluido o no incluido.'],['Fornitore','Fuente de la tarifa.']
];
export const glossary = [
  ['Andata','Ida'],['Ritorno','Vuelta / regreso'],['Multi tratta','Multidestino'],['Aeroporto di partenza / arrivo','Aeropuerto de salida / llegada'],['Passeggeri · Adulti','Pasajeros · adultos'],['Bambini · Neonati','Niños · bebés'],['Cerca','Buscar'],['Azzera la ricerca','Borrar la búsqueda'],['Scalo · Coincidenza','Escala · conexión'],['Volo diretto','Vuelo directo'],['Bagaglio (non) incluso','Equipaje (no) incluido'],['Tariffa · Tasse','Tarifa · tasas'],
  ['Regole tariffarie','Reglas de la tarifa'],['Fornitore','Proveedor'],['Carrello · Rimuovi','Carrito · quitar'],['Costo emissione','Cargo de emisión'],['Prenotazione','Reserva'],['Opziona voli','Reservar en opción'],['Emissione immediata','Emisión inmediata'],['Scadenza · Deadline','Vencimiento · fecha límite'],['Pratica','Expediente'],['Emesso · Da emettere','Emitido · por emitir'],['Scaduta · Cancellata','Vencida · cancelada'],['Conferma','Confirmar']
];
export const rules = [
  ['Nombre y documento','Verifica los datos contra el documento de viaje antes de emitir.','ContactRound'],
  ['Fechas límite','Revisa las opciones pendientes y su fecha y hora de vencimiento.','Hourglass'],
  ['Equipaje y Fare Family','Confirma servicios y condiciones de la selección concreta.','Luggage'],
  ['Conexiones','Comprueba el tiempo de escala y los cambios de aeropuerto.','ArrowLeftRight'],
  ['Seguridad','Protege tus credenciales y los datos de tus clientes.','ShieldCheck']
];
