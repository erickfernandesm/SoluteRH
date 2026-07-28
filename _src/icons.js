/* =============================================================================
   SOLUTE RH — biblioteca de icones SVG inline
   Todos herdam currentColor (essencial no tema escuro e nos estados de hover).
   Uso:  icon('target')  ·  icon('arrow', 'class-extra')
   ========================================================================== */

const P = {
  /* --- interface ------------------------------------------------------- */
  arrow:      '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUp:    '<path d="M12 19V5M6 11l6-6 6 6"/>',
  arrowDown:  '<path d="M12 5v14M18 13l-6 6-6-6"/>',
  chevron:    '<path d="M6 9l6 6 6-6"/>',
  chevronR:   '<path d="M9 6l6 6-6 6"/>',
  close:      '<path d="M18 6L6 18M6 6l12 12"/>',
  check:      '<path d="M20 6L9 17l-5-5"/>',
  checkCircle:'<circle cx="12" cy="12" r="10"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
  x:          '<circle cx="12" cy="12" r="10"/><path d="M14.8 9.2l-5.6 5.6M9.2 9.2l5.6 5.6"/>',
  plus:       '<path d="M12 5v14M5 12h14"/>',
  external:   '<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6M10 14L21 3"/>',
  play:       '<path d="M6 4l14 8-14 8V4z" fill="currentColor" stroke="none"/>',

  /* --- contato --------------------------------------------------------- */
  phone:      '<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/>',
  mail:       '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2.5 6.5l9.5 7 9.5-7"/>',
  pin:        '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z"/><circle cx="12" cy="10" r="3"/>',
  clock:      '<circle cx="12" cy="12" r="10"/><path d="M12 6.5V12l3.5 2"/>',
  calendar:   '<rect x="3" y="4.5" width="18" height="17" rx="2"/><path d="M3 10h18M8 2.5v4M16 2.5v4"/>',

  /* --- servicos -------------------------------------------------------- */
  target:     '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  scale:      '<path d="M12 3v18M7 21h10M5.5 6.5l13-1.6"/><path d="M5.5 6.5L3 13a3 3 0 005 0L5.5 6.5zM18.5 4.9L16 11.4a3 3 0 005 0l-2.5-6.5z"/>',
  shield:     '<path d="M12 22s8-3.6 8-10V5.4l-8-3-8 3V12c0 6.4 8 10 8 10z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
  users:      '<path d="M17 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.9M16.5 3.1a4 4 0 010 7.8"/>',
  chart:      '<path d="M3 3v16.5a1.5 1.5 0 001.5 1.5H21"/><path d="M7.5 15.5l3.5-4 3 2.6 4.5-6"/>',
  pulse:      '<path d="M3 12h4l2.5-6 4.5 12 2.5-6h4.5"/>',
  puzzle:     '<path d="M11 3.5a2 2 0 114 0V5h2.5A1.5 1.5 0 0119 6.5V9h1.5a2 2 0 110 4H19v3.5a1.5 1.5 0 01-1.5 1.5H14v-1.5a2 2 0 10-4 0V18H6.5A1.5 1.5 0 015 16.5V13H3.5a2 2 0 010-4H5V6.5A1.5 1.5 0 016.5 5H11V3.5z"/>',
  search:     '<circle cx="11" cy="11" r="7"/><path d="M20.5 20.5L16.2 16.2"/>',
  bolt:       '<path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z"/>',
  heart:      '<path d="M20.3 5.3a5 5 0 00-7.1 0L12 6.5l-1.2-1.2a5 5 0 10-7.1 7.1l8.3 8.3 8.3-8.3a5 5 0 000-7.1z"/>',
  star:       '<path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9L12 2.6z"/>',
  starFill:   '<path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9L12 2.6z" fill="currentColor"/>',
  book:       '<path d="M4 4.5A2.5 2.5 0 016.5 2H20v18H6.5A2.5 2.5 0 004 22.5z"/><path d="M4 17.5A2.5 2.5 0 016.5 15H20"/>',
  cap:        '<path d="M22 9.5L12 4 2 9.5l10 5.5 10-5.5z"/><path d="M6 11.7v4.6c0 1.7 2.7 3.2 6 3.2s6-1.5 6-3.2v-4.6"/>',
  mic:        '<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3.5M8.5 21.5h7"/>',
  sparkles:   '<path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2zM5.5 14l.6 1.5 1.5.6-1.5.6L5.5 18l-.6-1.5L3.4 16l1.5-.6.6-1.4z"/>',
  layers:     '<path d="M12 2.5L2.5 7.5 12 12.5l9.5-5-9.5-5z"/><path d="M2.5 12.5L12 17.5l9.5-5M2.5 17l9.5 5 9.5-5"/>',
  compass:    '<circle cx="12" cy="12" r="9.5"/><path d="M15.8 8.2l-2 5.6-5.6 2 2-5.6 5.6-2z"/>',
  handshake:  '<path d="M11 17l2 2a1.4 1.4 0 002-2l-.6-.6"/><path d="M14.4 16.4l1.6 1.6a1.4 1.4 0 002-2L14.5 12"/><path d="M2.5 10.5l3-3.5h5l3 3.5"/><path d="M21.5 10.5l-3-3.5h-3l-4 3.5a1.6 1.6 0 002.2 2.3L16 11"/><path d="M2.5 10.5L6 14a1.5 1.5 0 002.2 0"/>',
  building:   '<rect x="4" y="2.5" width="16" height="19" rx="1.5"/><path d="M9 7h1.5M13.5 7H15M9 11h1.5M13.5 11H15M9 15h1.5M13.5 15H15M10 21.5v-3h4v3"/>',
  file:       '<path d="M14 2.5H7A2 2 0 005 4.5v15a2 2 0 002 2h10a2 2 0 002-2v-11l-5-6z"/><path d="M13.5 2.5v6H19"/>',
  quote:      '<path d="M9.5 6.5C6.5 8 5 10.5 5 14v3.5h5.5V12H8c0-2 .8-3.4 2.5-4.2l-1-1.3zM19 6.5C16 8 14.5 10.5 14.5 14v3.5H20V12h-2.5c0-2 .8-3.4 2.5-4.2l-1-1.3z" fill="currentColor" stroke="none"/>',
  refresh:    '<path d="M21 12a9 9 0 11-2.6-6.4"/><path d="M21 3.5V9h-5.5"/>',
  eye:        '<path d="M1.8 12S5.5 5 12 5s10.2 7 10.2 7-3.7 7-10.2 7S1.8 12 1.8 12z"/><circle cx="12" cy="12" r="3"/>',
  megaphone:  '<path d="M3 11v2a1 1 0 001 1h2l6 4.5V6.5L6 11H4a1 1 0 00-1 1z"/><path d="M16.5 8.5a5 5 0 010 7M19.5 6a9 9 0 010 12"/>',
  ticket:     '<path d="M3 9.5V7a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0121 7v2.5a2.5 2.5 0 000 5V17a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17v-2.5a2.5 2.5 0 000-5z"/><path d="M14 5.5v13"/>',

  /* --- redes sociais (marcas: preenchidas) ------------------------------ */
  whatsapp:
    '<path fill="currentColor" stroke="none" d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1a8 8 0 01-2.4-1.5 9 9 0 01-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.3 4.6.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"/><path fill="currentColor" stroke="none" d="M12 2.2A9.8 9.8 0 003.6 17l-1.4 5.1 5.2-1.4A9.8 9.8 0 1012 2.2zm0 17.9c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.1 8.1 0 1111.4 2.9 8 8 0 01-4.3 1z"/>',
  instagram:
    '<rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" stroke="none"/>',
  linkedin:
    '<path fill="currentColor" stroke="none" d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.46 2.5h.03A2.5 2.5 0 007.5 6a2.5 2.5 0 00-2.52-2.5zM3 21h4V9.5H3V21zm7.5 0h4v-6.4c0-1.7.6-2.8 2-2.8 1.2 0 1.8.8 1.8 2.6V21h4v-7.2c0-3.4-1.8-5-4.2-5-1.9 0-2.8 1.1-3.3 1.9h.03V9.5H10.5c.05 1.1 0 11.5 0 11.5z"/>',
  youtube:
    '<path fill="currentColor" stroke="none" d="M22.5 7.4a2.7 2.7 0 00-1.9-1.9C18.9 5 12 5 12 5s-6.9 0-8.6.5A2.7 2.7 0 001.5 7.4 28 28 0 001 12a28 28 0 00.5 4.6 2.7 2.7 0 001.9 1.9C5.1 19 12 19 12 19s6.9 0 8.6-.5a2.7 2.7 0 001.9-1.9A28 28 0 0023 12a28 28 0 00-.5-4.6zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z"/>',
  spotify:
    '<circle cx="12" cy="12" r="9.6"/><path d="M7.4 9.6c2.9-.8 6.2-.5 8.9 1M8 12.6c2.4-.6 5-.4 7.2.9M8.6 15.4c1.9-.5 3.9-.3 5.6.7"/>',
  radio:
    '<circle cx="12" cy="13" r="8.5"/><circle cx="12" cy="13" r="3"/><path d="M6.5 4.8L16 2.2"/>',
  google:
    '<path fill="currentColor" stroke="none" d="M21.6 12.2c0-.7-.06-1.4-.18-2H12v3.9h5.4a4.6 4.6 0 01-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z"/><path fill="currentColor" stroke="none" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5a6 6 0 01-9-3.2H3.1v2.6A10 10 0 0012 22z"/><path fill="currentColor" stroke="none" d="M6.4 13.9a6 6 0 010-3.8V7.5H3.1a10 10 0 000 9l3.3-2.6z"/><path fill="currentColor" stroke="none" d="M12 6a5.4 5.4 0 013.8 1.5l2.85-2.85A9.6 9.6 0 0012 2a10 10 0 00-8.9 5.5l3.3 2.6A6 6 0 0112 6z"/>',
};

/**
 * Devolve o markup do icone.
 * @param {string} name   chave em P
 * @param {string} extra  classes adicionais
 */
function icon(name, extra) {
  const d = P[name];
  if (!d) throw new Error('Icone inexistente: ' + name);
  const cls = extra ? ' class="' + extra + '"' : '';
  // width/height explicitos: sem eles, um SVG dentro de um flex container
  // sem regra de tamanho no CSS estica e ocupa a tela inteira.
  // Qualquer regra de CSS com width/height continua tendo prioridade.
  return (
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"' + cls + '>' +
    d + '</svg>'
  );
}

module.exports = { icon, PATHS: P };
