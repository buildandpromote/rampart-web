// Automated full-game test. Run in the page console (or the browser tool's javascript_exec)
// with the game served over http (python3 -m http.server) and index.html loaded.
// Plays the human side with a simple bot; the computer plays itself. Time is stepped manually,
// because the browser pane only runs animation frames while screenshotting.
//
// Options: set window.__opts = {diff:0|1|2, stopRound:N} before running.
(() => {
  const G = window.__G, F = window.__fn, cv = document.getElementById('c');
  const opts = Object.assign({ diff: 1, stopRound: 99 }, window.__opts || {});
  const click = (x, y) => {
    const r = cv.getBoundingClientRect();
    const o = { clientX: r.left + x * r.width / cv.width, clientY: r.top + y * r.height / cv.height, button: 0, bubbles: true };
    cv.dispatchEvent(new PointerEvent('pointermove', o));
    cv.dispatchEvent(new PointerEvent('pointerdown', o));
  };
  document.getElementById('menuBtn').click();
  document.getElementById('d' + opts.diff).checked = true;
  document.getElementById('startBtn').click();
  const errs = []; let ticks = 0;
  try {
    while (ticks < 60000 && G.phase !== 'over') {
      ticks++; const ph = G.phase;
      if (ph === 'select' && G.cur === 0) { const c = G.castles[0]; click((c.x + 1) * 22, (c.y + 1) * 22); }
      if (ph === 'cannons' && G.cur === 0 && G.left > 0 && ticks % 3 === 0) click((8 + Math.floor(Math.random() * 5)) * 22, (5 + Math.floor(Math.random() * 5)) * 22 + 22);
      if (ph === 'battle' && G.cur === 0 && ticks % 10 === 0) click((35 + Math.random() * 4) * 22, (20 + Math.random() * 4) * 22);
      if (ph === 'rebuild' && G.cur === 0 && ticks % 4 === 0) {
        const l = [...G.pl[0].lost].filter(i => G.wall[i] < 0);
        if (l.length) F.placeWalls(0, l.map(i => [i % 44, Math.floor(i / 44)]));
        else if (G.timer < 12) F.endPhase();
      }
      if (G.round >= opts.stopRound && ph === 'battle') break;
      F.update(0.05);
    }
  } catch (e) { errs.push(e.stack); }
  F.draw();
  return JSON.stringify({
    ticks, errs, phase: G.phase, round: G.round, score: G.pl.map(p => p.score),
    castles: G.castles.map(c => c.owner + (c.dead ? 'x' : '')),
    result: document.getElementById('overT').textContent + ' | ' + document.getElementById('overS').textContent
  });
})();
