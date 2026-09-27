import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowLeftRight, ChartNoAxesCombined, Check, ChevronLeft, ChevronRight, ContactRound, Expand, Globe2, Grid2X2, Hourglass, Info, KeyRound, Layers3, ListFilter, Luggage, Maximize2, Minimize2, Plane, ScanSearch, Search, ShieldCheck, ShoppingCart, Ticket, X, ZoomIn, ZoomOut } from 'lucide-react';
import '@fontsource-variable/manrope';
import '@fontsource-variable/dm-sans';
import logo from './assets/logo.webp';
import cover from './assets/cover.png';
import { filters, glossary, imageFor, journey, rules, slides } from './slides';
import './styles.css';

const icons = { KeyRound, Search, ListFilter, ScanSearch, ShoppingCart, Hourglass, ContactRound, ChartNoAxesCombined, Luggage, ArrowLeftRight, ShieldCheck };
const pad = n => String(n).padStart(2, '0');
function Reveal({ children, delay = 0, className = '', disabled = false, style }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} style={style} initial={disabled ? false : { opacity: 0, y: reduced ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? .12 : .45, delay: disabled ? 0 : delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
function SlideFooter({ index, dark = false }) { return <footer className={`slide-footer ${dark ? 'light' : ''}`}><span>TE LO RESUELVO <b>VIAJES</b></span><span>{pad(index + 1)} <i>/</i> 18</span></footer>; }
function SlideHeader({ slide, disabled }) { return <Reveal disabled={disabled} className="slide-heading"><div className="kicker"><span />{slide.section}</div><h1>{slide.title}</h1></Reveal>; }
function CaptureImage({ slide, className = '' }) {
  const [x, y, width, height] = slide.crop;
  return <div className={`capture-image ${className}`} style={{ aspectRatio: `${width} / ${height}` }}><img src={imageFor(slide.image)} alt={`Interfaz de referencia: ${slide.title}`} style={{ width: `${1600 / width * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} /></div>;
}
function Capture({ slide, openZoom, disabled }) {
  return <Reveal delay={.12} disabled={disabled} className="capture-wrap" style={{'--capture-ratio':slide.crop[2]/slide.crop[3]}}><button className="capture-button" onClick={() => openZoom?.(slide)} disabled={disabled} aria-label={`Ampliar ${slide.short}`}><CaptureImage slide={slide} /><span className="zoom-label"><Expand size={17} /> Ampliar</span></button><div className="capture-caption">Pantalla de referencia del módulo original</div></Reveal>;
}
function Notes({ slide, disabled }) { return <div className={`notes ${slide.wide ? 'horizontal-notes' : ''}`}>{slide.notes.map(([number, title, text], i) => <Reveal disabled={disabled} delay={.16 + i * .055} className="note" key={number}><span className="note-number">{number}</span><div><h2>{title}</h2><p>{text}</p></div></Reveal>)}</div>; }
function Tip({ children, disabled }) { return <Reveal disabled={disabled} delay={.32} className="tip"><Info size={24} /><p>{children}</p></Reveal>; }
function Cover({ closing = false, index, disabled, navigate }) {
  return <><img className="cover-photo" src={cover} alt="" /><div className="cover-shade" /><div className="cover-content"><Reveal disabled={disabled} className="cover-brand"><img src={logo} alt="Te Lo Resuelvo Viajes" /><div><strong>Te Lo Resuelvo</strong><span>VIAJES</span></div></Reveal><Reveal disabled={disabled} delay={.1} className="cover-copy"><div className="kicker"><span />{closing ? 'Te Lo Resuelvo Viajes' : 'Curso de bienvenida'}</div>{closing ? <h1>¡Bienvenido<br />al equipo!</h1> : <h1>Conoce la<br />plataforma<br /><em>TLR Travel</em></h1>}<p>{closing ? 'En los próximos módulos practicamos cada paso con casos reales.' : 'Cómo buscar, cotizar, reservar y emitir un boleto aéreo paso a paso.'}</p></Reveal><Reveal disabled={disabled} delay={.25} className="cover-bottom">{closing ? <><p><b>Tú te ocupas de vender.</b><br />Nosotros te damos las herramientas.</p><button className="cover-action" onClick={() => navigate?.(2)} disabled={disabled}>Volver al recorrido <ArrowRight size={22} /></button></> : <><span className="cover-site">tlrtravel.it</span><span className="cover-meta">18 diapositivas<br /><b>Una venta en 8 pasos</b></span></>}</Reveal></div><SlideFooter index={index} dark /></>;
}
function Platform({ disabled }) {
  return <><div className="platform-features">{[
    [Plane, 'Portal B2B de vuelos', 'Un espacio para que los agentes busquen, comparen y preparen reservas.'],
    [Layers3, 'Varios proveedores', 'La referencia muestra Sabre y conexiones NDC. Revisa el proveedor de cada tarifa.'],
    [Globe2, 'Interfaz multilingüe', 'El material utiliza la interfaz en italiano. El glosario acompaña las etiquetas.']
  ].map(([Icon, title, text], i) => <Reveal disabled={disabled} delay={.1 + i * .08} className="platform-feature" key={title}><span className="feature-icon"><Icon strokeWidth={1.6} /></span><h2>{title}</h2><p>{text}</p></Reveal>)}</div><Reveal disabled={disabled} delay={.3}><h3 className="area-heading">Dos áreas de trabajo</h3><div className="work-areas"><div className="work-area"><Search /><div><h2>Buscador de vuelos</h2><p>Búsqueda, comparación, selección y reserva.</p></div><span className="area-number">01</span></div><div className="work-area copper"><ChartNoAxesCombined /><div><h2>Backoffice</h2><p>Expedientes, estados y fechas límite.</p></div><span className="area-number">02</span></div></div></Reveal></>;
}
function Journey({ disabled, navigate }) { return <><div className="journey-grid">{journey.map(([title, text, target, name], i) => { const Icon = icons[name]; return <Reveal disabled={disabled} delay={.06 + i * .045} key={title}><button className={`journey-step ${i > 3 ? 'warm' : ''}`} onClick={() => navigate?.(target)} disabled={disabled} aria-label={`Ir al paso ${i + 1}: ${title}`}><span className="journey-top"><Icon strokeWidth={1.7} /><b>{pad(i + 1)}</b></span><h2>{title}</h2><p>{text}</p><ArrowRight className="journey-arrow" size={25} /></button></Reveal>; })}</div><p className="journey-hint">Puedes abrir cualquier paso o continuar en orden.</p></>; }
function Filters({ slide, disabled, openZoom }) { return <div className="filters-layout"><Capture slide={slide} openZoom={openZoom} disabled={disabled} /><Reveal disabled={disabled} delay={.14} className="filters-content"><div className="filter-head"><span>Filtro en italiano</span><span>Qué hace</span></div>{filters.map(([term, text]) => <div className="filter-row" key={term}><strong>{term}</strong><span>{text}</span></div>)}<Tip disabled={disabled}>Empieza por las necesidades del cliente: equipaje, escalas u horario.</Tip></Reveal></div>; }
function Fares({ disabled }) {
  const fares = [
    ['LIGHT', '1.397 €', ['Equipaje de mano', 'Bolso o laptop'], ['Maleta en bodega', 'Cambios y asiento'], 'Sin reembolso'],
    ['STANDARD', '1.541 €', ['Una maleta de 23 kg', 'Equipaje de mano', 'Bolso o laptop'], ['Cambios y asiento'], 'Sin reembolso'],
    ['FULL', '1.728 €', ['Una maleta de 23 kg', 'Cambios según condiciones', 'Reembolso antes de salir', 'Asiento básico'], ['Asiento premium', 'Segunda maleta'], 'Sin embarque prioritario'],
    ['PREMIUM BUSINESS FULL', 'Precio superior', ['Dos maletas de 23 kg', 'Cambios y reembolso', 'Asiento premium', 'Embarque prioritario'], ['Tercera maleta'], 'Sin reembolso tras la salida']
  ];
  return <><div className="fares-grid">{fares.map(([name, price, included, paid, unavailable], i) => <Reveal disabled={disabled} delay={.08 + i * .07} className={`fare ${i === 1 ? 'fare-featured' : ''}`} key={name}><div className="fare-top"><h2>{name}</h2><strong className={i === 3 ? 'price-text' : ''}>{price}</strong></div><div className="fare-details"><h3>Incluido</h3><ul>{included.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul><h3 className="paid-label">Con pago</h3><ul>{paid.map(item => <li key={item}><span className="plus">+</span>{item}</li>)}</ul><p className="unavailable">{unavailable}</p></div></Reveal>)}</div><p className="fare-disclaimer"><b>Ejemplo del material original.</b> Lima–Roma, 15–29 oct. 2026, un adulto. Estos precios no son una cotización vigente. Equipaje, cambios y reembolsos dependen de la tarifa concreta y sus condiciones.</p></>;
}
function Booking({ disabled }) { return <><div className="booking-grid"><Reveal disabled={disabled} delay={.1} className="booking-option"><Hourglass className="booking-icon" strokeWidth={1.4} /><span className="booking-term">OPZIONA VOLI</span><h2>Reservar en opción</h2><p>Una reserva pendiente de emisión,<br />cuando esa modalidad está disponible.</p><ul><li>Revisa la fecha y la hora límite.</li><li>Comprueba las condiciones de la opción.</li><li>Verifica el precio antes de emitir.</li></ul><div className="booking-use"><b>Cuándo consultarla</b><span>El cliente todavía necesita decidir o completar el proceso de pago.</span></div></Reveal><Reveal disabled={disabled} delay={.2} className="booking-option copper"><Ticket className="booking-icon" strokeWidth={1.4} /><span className="booking-term">EMISSIONE IMMEDIATA</span><h2>Solicitar la emisión</h2><p>Continúa con la emisión<br />de la selección elegida.</p><ul><li>Revisa el total y las condiciones.</li><li>Verifica los datos requeridos.</li><li>Comprueba el resultado del boleto.</li></ul><div className="booking-use"><b>Antes de confirmar</b><span>Pago y datos verificados según el procedimiento de tu agencia.</span></div></Reveal></div><p className="booking-disclaimer"><Info size={22} />Una opción no garantiza por sí sola el precio ni equivale a un boleto emitido.</p></>; }
function Glossary({ disabled }) { return <div className="glossary-grid">{[glossary.slice(0, 12), glossary.slice(12)].map((group, index) => <Reveal disabled={disabled} delay={.1 + index * .1} className="glossary-column" key={index}><div className="glossary-head"><span>Italiano</span><span>Español</span></div>{group.map(([it, es]) => <div className="glossary-row" key={it}><strong>{it}</strong><span>{es}</span></div>)}</Reveal>)}</div>; }
function Rules({ disabled }) { return <><div className="rules-grid">{rules.map(([title, text, iconName], i) => { const Icon = icons[iconName]; return <Reveal disabled={disabled} delay={.08 + i * .07} className={`rule ${i % 2 ? 'warm' : ''}`} key={title}><span className="rule-icon"><Icon strokeWidth={1.5} /></span><span className="rule-number">{pad(i + 1)}</span><h2>{title}</h2><p>{text}</p></Reveal>; })}</div><p className="rules-bottom">Una revisión breve antes de emitir puede evitar un error costoso.</p></>; }
function Slide({ index, disabled = false, navigate, openZoom }) {
  const slide = slides[index];
  const dark = slide.kind === 'cover' || slide.kind === 'closing';
  return <article className={`slide ${dark ? 'slide-dark' : ''} slide-${slide.kind}`} aria-label={`Diapositiva ${index + 1} de 18: ${slide.title}`}>
    {dark ? <Cover closing={slide.kind === 'closing'} index={index} disabled={disabled} navigate={navigate} /> : <>
      <SlideHeader slide={slide} disabled={disabled} />
      {slide.kind === 'platform' && <Platform disabled={disabled} />}
      {slide.kind === 'journey' && <Journey disabled={disabled} navigate={navigate} />}
      {slide.kind === 'capture' && <><div className={`capture-layout ${slide.wide ? 'wide-capture' : ''}`}><Capture slide={slide} disabled={disabled} openZoom={openZoom} /><Notes slide={slide} disabled={disabled} /></div>{slide.tip && <Tip disabled={disabled}>{slide.tip}</Tip>}</>}
      {slide.kind === 'filters' && <Filters slide={slide} disabled={disabled} openZoom={openZoom} />}
      {slide.kind === 'fares' && <Fares disabled={disabled} />}
      {slide.kind === 'booking' && <Booking disabled={disabled} />}
      {slide.kind === 'glossary' && <Glossary disabled={disabled} />}
      {slide.kind === 'rules' && <Rules disabled={disabled} />}
      <SlideFooter index={index} />
    </>}
  </article>;
}
function useFrame() {
  const ref = useRef(null);
  const [frame, setFrame] = useState({ scale: .7, portrait: false });
  useEffect(() => {
    const calculate = () => { const el = ref.current; if (!el) return; const portrait = matchMedia('(max-width: 700px) and (orientation: portrait)').matches; const r = el.getBoundingClientRect(); setFrame({ portrait, scale: Math.min((r.width - 48) / 1600, (r.height - 32) / 900, 1.3) }); };
    const observer = new ResizeObserver(calculate); observer.observe(ref.current); window.addEventListener('resize', calculate); calculate();
    return () => { observer.disconnect(); window.removeEventListener('resize', calculate); };
  }, []);
  return [ref, frame];
}
function initialSlide() { const number = Number(location.hash.replace('#/', '')); return Number.isInteger(number) && number >= 1 && number <= 18 ? number - 1 : 0; }
function App() {
  const [current, setCurrent] = useState(initialSlide);
  const [direction, setDirection] = useState(1);
  const [overview, setOverview] = useState(false);
  const [zoomSlide, setZoomSlide] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [message, setMessage] = useState('');
  const [animating, setAnimating] = useState(false);
  const [areaRef, frame] = useFrame();
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const touchStart = useRef(null);
  const reduced = useReducedMotion();
  const modalOpen = overview || !!zoomSlide;
  const navigate = useCallback(index => { const next = Math.max(0, Math.min(17, index)); if (next === current) { setOverview(false); return; } setDirection(next > current ? 1 : -1); setCurrent(next); setOverview(false); history.replaceState(null, '', `#/${next + 1}`); }, [current]);
  const toggleFullscreen = useCallback(async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); } catch { setMessage('La pantalla completa no está disponible aquí. Puedes abrir el HTML en otro navegador.'); } }, []);
  const openZoom = slide => { setZoomSlide(slide); setZoom(1); };
  const closeModal = () => { setOverview(false); setZoomSlide(null); };
  useEffect(() => { document.title = `${slides[current].short} · Bienvenida TLR Travel`; }, [current]);
  useEffect(() => { const sync = () => setCurrent(initialSlide()); window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync); }, []);
  useEffect(() => { const change = () => setFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', change); return () => document.removeEventListener('fullscreenchange', change); }, []);
  useEffect(() => { const el = overlayRef.current; if (modalOpen && !el.open) el.showModal(); if (!modalOpen && el.open) el.close(); }, [modalOpen]);
  useEffect(() => { if(!overview)return; const observer=new ResizeObserver(entries=>entries.forEach(entry=>entry.target.style.setProperty('--preview-scale',String(entry.contentRect.width/1600)))); document.querySelectorAll('.overview-preview').forEach(el=>observer.observe(el)); return()=>observer.disconnect(); },[overview]);
  useEffect(() => {
    const key = event => {
      if (event.target.matches('input,textarea,select') || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'Escape') { closeModal(); return; }
      if (modalOpen) return;
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { if (event.key === ' ' && event.target.closest('button,a')) return; event.preventDefault(); if (!animating) navigate(current + 1); }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); if (!animating) navigate(current - 1); }
      if (event.key === 'Home') { event.preventDefault(); navigate(0); }
      if (event.key === 'End') { event.preventDefault(); navigate(17); }
      if (event.key.toLowerCase() === 'g') setOverview(true);
      if (event.key.toLowerCase() === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, [current, modalOpen, navigate, toggleFullscreen, animating]);
  const onTouchStart = event => { if (event.target.closest('button')) return; touchStart.current = [event.touches[0].clientX, event.touches[0].clientY]; };
  const onTouchEnd = event => { if (!touchStart.current || modalOpen) return; const [x,y] = touchStart.current; touchStart.current = null; const dx = event.changedTouches[0].clientX - x, dy = event.changedTouches[0].clientY - y; if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) navigate(current + (dx < 0 ? 1 : -1)); };
  return <div className={`presentation ${frame.portrait ? 'portrait' : ''}`}>
    <a className="skip-link" href="#slide-content" onClick={event => { event.preventDefault(); titleRef.current?.focus(); }}>Saltar a la diapositiva</a>
    <header className="viewer-header"><div className="viewer-brand"><img src={logo} alt="Te Lo Resuelvo Viajes" /><div><strong>Te Lo Resuelvo</strong><span>VIAJES</span></div></div><span className="viewer-course">MÓDULO DE BIENVENIDA</span><div className="viewer-tools"><button onClick={() => setOverview(true)} title="Vista general (G)" aria-label="Vista general"><Grid2X2 size={19}/><span>Diapositivas</span></button><button onClick={toggleFullscreen} title="Pantalla completa (F)" aria-label={fullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}>{fullscreen ? <Minimize2 size={19}/> : <Maximize2 size={19}/>}</button></div></header>
    <main className="deck-area" ref={areaRef} id="slide-content" tabIndex={-1} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} aria-label="Presentación" >
      <div className="canvas-shell" style={frame.portrait ? {} : { width: 1600 * frame.scale, height: 900 * frame.scale }}>
        <div className="canvas" style={frame.portrait ? {} : { transform: `scale(${frame.scale})` }}>
          <AnimatePresence mode="wait" custom={direction} onExitComplete={() => setAnimating(false)}>
            <motion.div className="slide-motion" key={current} custom={direction} initial={{ opacity: 0, x: reduced ? 0 : direction * 26 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : direction * -18 }} transition={{ duration: reduced ? .12 : .22, ease: 'easeOut' }} onAnimationStart={() => setAnimating(true)} onAnimationComplete={() => setAnimating(false)} ref={titleRef} tabIndex={-1}>
              <Slide index={current} navigate={navigate} openZoom={openZoom} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
    <footer className="viewer-footer"><div className="viewer-progress"><motion.div initial={false} animate={{ width: `${(current + 1) / 18 * 100}%` }} transition={{ duration: .25 }}/></div><div className="footer-left"><strong>{pad(current + 1)} <span>/ 18</span></strong><p aria-live="polite">{slides[current].short}</p></div><nav className="slide-dots" aria-label="Ir a una diapositiva">{slides.map((slide, i) => <button key={slide.title} onClick={() => navigate(i)} aria-label={`Diapositiva ${i + 1}: ${slide.short}`} aria-current={current === i ? 'step' : undefined} className={current === i ? 'active' : ''}><span/></button>)}</nav><div className="footer-controls"><button className="prev" onClick={() => navigate(current - 1)} disabled={current === 0 || animating} aria-label="Anterior"><ChevronLeft size={21}/><span>Anterior</span></button><button className="next" onClick={() => navigate(current === 17 ? 0 : current + 1)} disabled={animating} aria-label={current === 17 ? 'Volver al inicio' : 'Siguiente'}><span>{current === 17 ? 'Volver al inicio' : 'Siguiente'}</span><ChevronRight size={21}/></button></div></footer>
    <div className="keyboard-help"><span><kbd>←</kbd><kbd>→</kbd> Navegar</span><span><kbd>G</kbd> Vista general</span><span><kbd>F</kbd> Pantalla completa</span></div>
    {message && <div className="viewer-message" role="status">{message}<button onClick={() => setMessage('')} aria-label="Cerrar mensaje"><X size={15}/></button></div>}
    <dialog ref={overlayRef} className={`overlay ${overview ? 'overview' : 'zoom-overlay'}`} aria-labelledby="overlay-title" onCancel={closeModal} onClose={closeModal} onClick={event => { if (event.target !== overlayRef.current) return; const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeModal(); }}>
      <div className="overlay-heading"><div><span>{overview ? 'EL MÓDULO COMPLETO' : 'DETALLE DE LA INTERFAZ'}</span><h2 id="overlay-title">{overview ? '18 diapositivas. Un recorrido.' : zoomSlide?.title}</h2></div><button onClick={closeModal} aria-label="Cerrar"><X/></button></div>
      {overview && <div className="overview-grid">{slides.map((slide, index) => <div role="button" tabIndex={0} className={`overview-item ${index === current ? 'active' : ''}`} key={slide.title} onClick={() => navigate(index)} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();navigate(index);}}} aria-label={`Abrir diapositiva ${index + 1}: ${slide.short}`}><div className="overview-preview" aria-hidden="true"><div className="overview-canvas"><Slide index={index} disabled /></div></div><span><b>{pad(index + 1)}</b>{slide.short}</span></div>)}</div>}
      {zoomSlide && <><div className="zoom-toolbar"><span>Amplía y desplázate para ver los detalles.</span><div><button onClick={() => setZoom(v => Math.max(.75, v - .25))} disabled={zoom <= .75} aria-label="Reducir zoom"><ZoomOut size={20}/></button><output aria-label="Nivel de zoom">{Math.round(zoom * 100)} %</output><button onClick={() => setZoom(v => Math.min(3, v + .25))} disabled={zoom >= 3} aria-label="Aumentar zoom"><ZoomIn size={20}/></button></div></div><div className="zoom-viewport"><div style={{ width: `${zoom * 100}%`, minWidth: frame.portrait ? 720 * zoom : undefined }}><CaptureImage slide={zoomSlide}/></div></div><p className="zoom-source">Referencia del material original. La interfaz actual puede variar.</p></>}
    </dialog>
  </div>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><MotionConfig reducedMotion="user"><App /></MotionConfig></React.StrictMode>);
