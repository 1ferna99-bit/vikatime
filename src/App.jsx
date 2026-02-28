import { useState } from "react";

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const PLAN_CONFIG = {
  Balance: { days: 3,  label: "3 almuerzos / semana" },
  Boost:   { days: 5,  label: "5 almuerzos / semana" },
  Fit:     { days: 5,  label: "5 almuerzos personalizados" },
};

const PROTEINS = [
  { id: "pollo",  name: "Pechuga de Pollo a la Plancha", kcal: 220, emoji: "🍗" },
  { id: "posta",  name: "Posta Rosada",                  kcal: 260, emoji: "🥩" },
  { id: "salmon", name: "Salmón a la Plancha",            kcal: 280, emoji: "🐟" },
  { id: "chef_p", name: "Sorpresa del Chef",              kcal: null, emoji: "⭐" },
];

const CARBS = [
  { id: "fettuccini_pesto", name: "Fettuccini Pesto",    kcal: 380, emoji: "🍝" },
  { id: "fettuccini_bech",  name: "Fettuccini Bechamel", kcal: 295, emoji: "🍝" },
  { id: "pastelera",        name: "Pastelera de Choclo", kcal: 320, emoji: "🌽" },
  { id: "pure_papas",       name: "Puré de Papas",       kcal: 250, emoji: "🥔" },
  { id: "pure_zanahoria",   name: "Puré de Zanahoria",   kcal: 210, emoji: "🥕" },
  { id: "chef_c",           name: "Sorpresa del Chef",   kcal: null, emoji: "⭐" },
];

const SALAD = [
  "Betarraga","Cebolla morada","Lechuga","Mango","Nuez","Pepino",
  "Pimentón","Rabanito","Repollo morado","Tomate cherry","Zanahoria rallada",
];

const HOURS = ["11:30–12:30","12:00–13:00","12:30–13:30","13:00–14:00"];
const VIKA_PHONE = "56945167881";

const initDay = () => ({ protein: null, carb: null, salad: [], hour: "12:00–13:00", notes: "" });

function buildWAMessage(name, plan, activeDays, days) {
  const L = [];
  L.push("🟠 *NUEVA CONFIGURACIÓN VIKA*");
  L.push(`👤 *Cliente:* ${name}`);
  L.push(`📋 *Plan:* ${plan} — ${PLAN_CONFIG[plan].label}`);
  L.push("");
  L.push("*📅 MENÚ DE LA SEMANA*");
  L.push("─────────────────────");
  activeDays.forEach((dayIdx) => {
    const d  = days[dayIdx];
    const pr = PROTEINS.find(p => p.id === d.protein);
    const cb = CARBS.find(c => c.id === d.carb);
    L.push("");
    L.push(`*${DAYS[dayIdx].toUpperCase()}*`);
    L.push(`${pr?.emoji ?? "❓"} Proteína: ${pr?.name ?? "—"}`);
    L.push(`${cb?.emoji ?? "❓"} Acompañamiento: ${cb?.name ?? "—"}`);
    if (d.salad.length) L.push(`🥗 Ensalada: ${d.salad.join(", ")}`);
    L.push(`🕐 Horario: ${d.hour}`);
    if (d.notes.trim()) L.push(`📝 Nota: ${d.notes.trim()}`);
  });
  L.push("");
  L.push("─────────────────────");
  L.push("_Enviado desde vikatime.app_");
  return L.join("\n");
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const OR = "#C85A12", ORL = "#F5E8DF", DK = "#181818", CR = "#F5F0EB";
const CR2 = "#EDE5DC", GR = "#888", LT = "#F9F6F3", BD = "#E8DDD4";
const GN = "#3A7D2C", WA = "#25D366";

const s = {
  page: { fontFamily: "system-ui,sans-serif", background: CR, minHeight: "100vh", color: DK },
  hdr: { background: DK, borderBottom: `3px solid ${OR}`, position: "sticky", top: 0, zIndex: 100 },
  hdrIn: { maxWidth: 780, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logoV: { fontSize: 20, fontWeight: 900, color: OR, letterSpacing: 3 },
  logoS: { fontSize: 7, color: "#666", letterSpacing: 2 },
  pWrap: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 },
  pLbl: { fontSize: 11, color: "#aaa" },
  pBar: { width: 140, height: 4, background: "#333", borderRadius: 2 },
  pFill: { height: "100%", background: OR, borderRadius: 2, transition: "width .4s" },
  body: { maxWidth: 780, margin: "0 auto", padding: "20px 14px 60px" },
  card: { background: "white", borderRadius: 14, border: `1px solid ${BD}`, marginBottom: 16, overflow: "hidden" },
  cRow: { display: "flex", gap: 20, padding: "20px 24px", flexWrap: "wrap" },
  fGrp: { display: "flex", flexDirection: "column", gap: 7, flex: 1, minWidth: 180 },
  fLbl: { fontSize: 10, fontWeight: 700, color: OR, letterSpacing: 1.2, textTransform: "uppercase" },
  inp: { padding: "10px 14px", border: `1.5px solid ${BD}`, borderRadius: 8, fontSize: 14, background: LT, outline: "none" },
  pRow: { display: "flex", gap: 8 },
  pChip: { padding: "8px 16px", borderRadius: 20, border: `1.5px solid ${BD}`, fontSize: 13, cursor: "pointer", background: LT, color: "#555", transition: "all .2s" },
  pChipOn: { background: OR, color: "white", borderColor: OR },
  tabs: { display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" },
  tab: { padding: "9px 18px", borderRadius: 20, border: `1.5px solid ${BD}`, fontSize: 13, cursor: "pointer", background: "white", color: "#666", transition: "all .2s" },
  tabOn: { background: DK, color: "white", borderColor: DK, fontWeight: 700 },
  tabDone: { borderColor: GN, color: GN },
  tabLocked: { opacity: 0.3, cursor: "not-allowed", background: "#f0f0f0" },
  dHdr: { background: ORL, padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `2px solid ${OR}` },
  dTitle: { margin: 0, fontSize: 22, fontWeight: 700, color: DK },
  dBadge: { fontSize: 12, background: GN, color: "white", padding: "4px 12px", borderRadius: 20 },
  sec: { padding: "18px 24px", borderBottom: `1px solid ${BD}` },
  secH: { display: "flex", alignItems: "center", gap: 8, marginBottom: 14 },
  secT: { fontSize: 14, fontWeight: 700, color: DK },
  tagOpt: { fontSize: 11, color: GR, background: LT, padding: "2px 8px", borderRadius: 10 },
  g4: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 10 },
  oCard: { padding: "14px 10px", borderRadius: 10, border: `1.5px solid ${BD}`, cursor: "pointer", background: LT, textAlign: "left", position: "relative", transition: "all .2s", outline: "none" },
  oCardOn: { border: `2px solid ${OR}`, background: ORL, boxShadow: `0 0 0 3px ${OR}22` },
  oName: { fontSize: 12, fontWeight: 700, color: DK, lineHeight: 1.3, marginBottom: 4 },
  oSub: { fontSize: 11, color: GR },
  oDot: { position: "absolute", top: 8, right: 8, width: 10, height: 10, borderRadius: "50%", background: OR },
  cGrid: { display: "flex", flexWrap: "wrap", gap: 8 },
  sChip: { padding: "7px 14px", borderRadius: 20, border: `1.5px solid ${BD}`, fontSize: 12, cursor: "pointer", background: LT, color: "#444" },
  sChipOn: { background: "#EBF5EB", borderColor: GN, color: GN, fontWeight: 700 },
  sChipDis: { opacity: 0.3, cursor: "not-allowed" },
  hChip: { padding: "8px 16px", borderRadius: 8, border: `1.5px solid ${BD}`, fontSize: 13, cursor: "pointer", background: LT, color: "#555" },
  hChipOn: { background: DK, color: "white", borderColor: DK },
  ta: { width: "100%", padding: "12px 14px", border: `1.5px solid ${BD}`, borderRadius: 8, fontSize: 13, resize: "vertical", background: LT, outline: "none", boxSizing: "border-box", color: DK },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", background: "#FAFAFA" },
  navBtn: { padding: "9px 16px", borderRadius: 8, border: `1px solid ${BD}`, fontSize: 13, cursor: "pointer", background: "white", color: "#555" },
  nxtBtn: { padding: "10px 22px", borderRadius: 8, border: "none", fontSize: 13, cursor: "pointer", background: OR, color: "white", fontWeight: 700 },
  waBtn: { background: WA, fontSize: 14 },
  disBtn: { background: "#ccc", cursor: "not-allowed" },
  sumHdr: { padding: "14px 20px", fontSize: 11, fontWeight: 700, color: OR, letterSpacing: 1.2, textTransform: "uppercase", background: ORL, borderBottom: `1px solid ${BD}` },
  sumRow: { display: "flex", alignItems: "center", gap: 10, padding: "11px 20px", borderBottom: `1px solid ${BD}`, cursor: "pointer" },
  sumRowOn: { background: `${OR}11` },
  sumRowLocked: { opacity: 0.35, cursor: "default", background: "#fafafa" },
  sumDayCol: { minWidth: 90, display: "flex", alignItems: "center", gap: 6 },
  sumDayNm: { fontSize: 13, fontWeight: 700, color: DK },
  sumItems: { flex: 1, display: "flex", gap: 6, flexWrap: "wrap" },
  tagO: { fontSize: 11, background: ORL, color: DK, padding: "3px 10px", borderRadius: 20 },
  tagB: { fontSize: 11, background: "#EEF3FF", color: "#3344AA", padding: "3px 10px", borderRadius: 20 },
  tagE: { fontSize: 11, color: "#ccc", fontStyle: "italic" },
  tagLocked: { fontSize: 11, color: "#ccc", background: "#f5f5f5", padding: "3px 10px", borderRadius: 20 },
  sumHour: { fontSize: 11, color: GR, whiteSpace: "nowrap" },
  subWrap: { padding: "20px 24px", textAlign: "center" },
  subBig: { width: "100%", padding: "16px", borderRadius: 10, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", background: WA, color: "white" },
  subHint: { marginTop: 10, fontSize: 12, color: OR, fontWeight: 600 },
  subNote: { marginTop: 8, fontSize: 11, color: GR, lineHeight: 1.7 },
  // Modal
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modal: { background: "white", borderRadius: 20, padding: "36px 32px", maxWidth: 440, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" },
  modalTitle: { margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: DK },
  modalSub: { margin: "0 0 24px", fontSize: 13, color: GR, lineHeight: 1.6 },
  modalDays: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 },
  modalDay: { display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 10, border: `1.5px solid ${BD}`, cursor: "pointer", background: LT, transition: "all .2s" },
  modalDayOn: { border: `2px solid ${OR}`, background: ORL },
  modalDayCheck: { width: 22, height: 22, borderRadius: 6, border: `2px solid ${BD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 },
  modalDayCheckOn: { background: OR, borderColor: OR, color: "white" },
  modalDayName: { fontSize: 15, fontWeight: 600, color: DK },
  modalDayNum: { fontSize: 11, color: GR, marginLeft: "auto" },
  modalBtn: { width: "100%", padding: "14px", borderRadius: 10, border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", background: OR, color: "white", transition: "opacity .2s" },
  modalBtnDis: { opacity: 0.4, cursor: "not-allowed" },
  modalCounter: { textAlign: "center", fontSize: 12, color: OR, fontWeight: 600, marginBottom: 16 },
  // Success
  sucWrap: { maxWidth: 560, margin: "60px auto", background: "white", borderRadius: 20, padding: "48px 36px", textAlign: "center", border: `1px solid ${BD}`, boxShadow: "0 8px 40px rgba(0,0,0,.07)" },
  sucIcon: { width: 64, height: 64, borderRadius: "50%", background: WA, color: "white", fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" },
  sucTitle: { margin: "0 0 8px", fontSize: 26, color: DK },
  sucSub: { fontSize: 14, color: GR, marginBottom: 24, lineHeight: 1.7 },
  sucPrev: { background: LT, borderRadius: 10, padding: 16, textAlign: "left", marginBottom: 24, maxHeight: 260, overflowY: "auto", border: `1px solid ${BD}` },
  sucPrevLbl: { fontSize: 10, fontWeight: 700, color: OR, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 8px" },
  sucPre: { margin: 0, fontSize: 11, color: "#444", whiteSpace: "pre-wrap", lineHeight: 1.7, fontFamily: "monospace" },
  sucActs: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" },
  sucWaBtn: { padding: "12px 24px", borderRadius: 8, border: "none", background: WA, color: "white", fontSize: 14, cursor: "pointer", fontWeight: 700 },
  sucReset: { padding: "12px 24px", borderRadius: 8, border: `1.5px solid ${BD}`, background: "white", color: "#555", fontSize: 14, cursor: "pointer" },
};

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function VikaConfigurador() {
  const [activeDay, setActiveDay]       = useState(0);
  const [days, setDays]                 = useState(DAYS.map(() => initDay()));
  const [name, setName]                 = useState("");
  const [plan, setPlan]                 = useState("Boost");
  const [submitted, setSubmitted]       = useState(false);
  // Balance modal
  const [showModal, setShowModal]       = useState(false);
  const [selectedDays, setSelectedDays] = useState([0,1,2,3,4]); // active day indices

  const maxDays   = PLAN_CONFIG[plan].days;
  const isBalance = plan === "Balance";

  const handlePlanChange = (p) => {
    setPlan(p);
    if (p === "Balance") {
      setSelectedDays([]);   // reset selection
      setShowModal(true);
    } else {
      setSelectedDays([0,1,2,3,4]);
      setActiveDay(0);
    }
    setDays(DAYS.map(() => initDay()));
  };

  const toggleModalDay = (i) => {
    if (selectedDays.includes(i)) {
      setSelectedDays(selectedDays.filter(d => d !== i));
    } else if (selectedDays.length < 3) {
      setSelectedDays([...selectedDays, i]);
    }
  };

  const confirmDays = () => {
    if (selectedDays.length !== 3) return;
    setShowModal(false);
    setActiveDay(selectedDays[0]);
  };

  // When navigating, skip to next active day
  const activeDaysSorted = [...selectedDays].sort((a,b) => a - b);
  const currentIdx       = activeDaysSorted.indexOf(activeDay);

  const goNext = () => {
    const next = activeDaysSorted[currentIdx + 1];
    if (next !== undefined) setActiveDay(next);
  };
  const goPrev = () => {
    const prev = activeDaysSorted[currentIdx - 1];
    if (prev !== undefined) setActiveDay(prev);
  };

  const day = days[activeDay];
  const completedDays = activeDaysSorted.filter(i => days[i].protein && days[i].carb).length;
  const isComplete    = completedDays === maxDays && name.trim().length > 0;
  const msg           = buildWAMessage(name || "Cliente", plan, activeDaysSorted, days);

  const update = (field, val) =>
    setDays(prev => prev.map((d, i) => i === activeDay ? { ...d, [field]: val } : d));

  const toggleSalad = (item) => {
    const sel = day.salad;
    if (sel.includes(item)) update("salad", sel.filter(x => x !== item));
    else if (sel.length < 3) update("salad", [...sel, item]);
  };

  const handleSend = () => {
    if (!isComplete) return;
    window.open(`https://wa.me/${VIKA_PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  // ── SUCCESS ─────────────────────────────────────────────────────────────────
  if (submitted) return (
    <div style={s.page}>
      <div style={s.sucWrap}>
        <div style={s.sucIcon}>✓</div>
        <h2 style={s.sucTitle}>¡Listo, {name}!</h2>
        <p style={s.sucSub}>Se abrió WhatsApp con tu pedido completo.<br />Solo aprieta <strong>Enviar</strong> y nosotros lo recibimos. 🟠</p>
        <div style={s.sucPrev}>
          <p style={s.sucPrevLbl}>Vista previa del mensaje</p>
          <pre style={s.sucPre}>{msg}</pre>
        </div>
        <div style={s.sucActs}>
          <button style={s.sucWaBtn} onClick={() => window.open(`https://wa.me/${VIKA_PHONE}?text=${encodeURIComponent(msg)}`, "_blank")}>📲 Reabrir WhatsApp</button>
          <button style={s.sucReset} onClick={() => { setSubmitted(false); setDays(DAYS.map(() => initDay())); setName(""); setSelectedDays([0,1,2,3,4]); setPlan("Boost"); }}>Nueva configuración</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={s.page}>

      {/* ── BALANCE DAY PICKER MODAL ── */}
      {showModal && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <h2 style={s.modalTitle}>¿Qué días quieres recibir?</h2>
            <p style={s.modalSub}>
              Tu plan <strong style={{ color: OR }}>VIKA Balance</strong> incluye <strong>3 almuerzos por semana</strong>.<br />
              Elige exactamente los 3 días que prefieres.
            </p>
            <div style={s.modalCounter}>
              {selectedDays.length}/3 días seleccionados
            </div>
            <div style={s.modalDays}>
              {DAYS.map((dayName, i) => {
                const sel = selectedDays.includes(i);
                const dis = !sel && selectedDays.length >= 3;
                return (
                  <button key={i}
                    style={{ ...s.modalDay, ...(sel ? s.modalDayOn : {}), ...(dis ? { opacity: 0.4, cursor: "not-allowed" } : {}) }}
                    onClick={() => !dis && toggleModalDay(i)}
                    disabled={dis}>
                    <div style={{ ...s.modalDayCheck, ...(sel ? s.modalDayCheckOn : {}) }}>
                      {sel && "✓"}
                    </div>
                    <span style={s.modalDayName}>{dayName}</span>
                    <span style={s.modalDayNum}>Almuerzo #{selectedDays.indexOf(i) + 1 || ""}</span>
                  </button>
                );
              })}
            </div>
            <button
              style={{ ...s.modalBtn, ...(selectedDays.length !== 3 ? s.modalBtnDis : {}) }}
              disabled={selectedDays.length !== 3}
              onClick={confirmDays}>
              Confirmar días →
            </button>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div style={s.hdr}>
        <div style={s.hdrIn}>
          <div>
            <div style={s.logoV}>VIKA</div>
            <div style={s.logoS}>FOOD AND LIFE</div>
          </div>
          <div style={s.pWrap}>
            <span style={s.pLbl}>{completedDays}/{maxDays} días completados</span>
            <div style={s.pBar}>
              <div style={{ ...s.pFill, width: `${completedDays / maxDays * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div style={s.body}>

        {/* CLIENTE */}
        <div style={s.card}>
          <div style={s.cRow}>
            <div style={s.fGrp}>
              <label style={s.fLbl}>Tu nombre</label>
              <input style={s.inp} placeholder="¿Cómo te llamamos?" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div style={s.fGrp}>
              <label style={s.fLbl}>Plan contratado</label>
              <div style={s.pRow}>
                {["Balance","Boost","Fit"].map(p => (
                  <button key={p}
                    style={{ ...s.pChip, ...(plan === p ? s.pChipOn : {}) }}
                    onClick={() => handlePlanChange(p)}>
                    {p}
                  </button>
                ))}
              </div>
              {isBalance && selectedDays.length === 3 && (
                <div style={{ fontSize: 11, color: OR, marginTop: 4 }}>
                  📅 Días: {activeDaysSorted.map(i => DAYS[i]).join(", ")}
                  <button onClick={() => setShowModal(true)}
                    style={{ marginLeft: 8, fontSize: 10, color: OR, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                    cambiar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={s.tabs}>
          {DAYS.map((dn, i) => {
            const active  = i === activeDay;
            const locked  = !activeDaysSorted.includes(i);
            const done    = !locked && days[i].protein && days[i].carb;
            return (
              <button key={i}
                style={{ ...s.tab, ...(active ? s.tabOn : {}), ...(done && !active ? s.tabDone : {}), ...(locked ? s.tabLocked : {}) }}
                disabled={locked}
                onClick={() => !locked && setActiveDay(i)}>
                {done && !active && <span>✓ </span>}
                {dn}
                {locked && " 🔒"}
              </button>
            );
          })}
        </div>

        {/* DAY CARD */}
        <div style={s.card}>
          <div style={s.dHdr}>
            <h2 style={s.dTitle}>{DAYS[activeDay]}</h2>
            {day.protein && day.carb && <span style={s.dBadge}>✓ Completo</span>}
          </div>

          {/* PROTEÍNA */}
          <div style={s.sec}>
            <div style={s.secH}>
              <span style={{ fontSize: 17 }}>🍗</span>
              <span style={s.secT}>Elige tu proteína</span>
              <span style={{ color: OR, fontSize: 16 }}>*</span>
            </div>
            <div style={s.g4}>
              {PROTEINS.map(p => (
                <button key={p.id}
                  style={{ ...s.oCard, ...(day.protein === p.id ? s.oCardOn : {}) }}
                  onClick={() => update("protein", p.id)}>
                  <div style={{ fontSize: 26, marginBottom: 6 }}>{p.emoji}</div>
                  <div style={s.oName}>{p.name}</div>
                  <div style={s.oSub}>{p.kcal ? `${p.kcal} kcal` : "varía cada semana"}</div>
                  {day.protein === p.id && <div style={s.oDot} />}
                </button>
              ))}
            </div>
          </div>

          {/* ACOMPAÑAMIENTO */}
          <div style={s.sec}>
            <div style={s.secH}>
              <span style={{ fontSize: 17 }}>🍝</span>
              <span style={s.secT}>Elige tu acompañamiento</span>
              <span style={{ color: OR, fontSize: 16 }}>*</span>
            </div>
            <div style={s.g4}>
              {CARBS.map(cb => (
                <button key={cb.id}
                  style={{ ...s.oCard, ...(day.carb === cb.id ? s.oCardOn : {}) }}
                  onClick={() => update("carb", cb.id)}>
                  <div style={{ fontSize: 26, marginBottom: 6 }}>{cb.emoji}</div>
                  <div style={s.oName}>{cb.name}</div>
                  <div style={s.oSub}>{cb.kcal ? `${cb.kcal} kcal` : "varía cada semana"}</div>
                  {day.carb === cb.id && <div style={s.oDot} />}
                </button>
              ))}
            </div>
          </div>

          {/* ENSALADA */}
          <div style={s.sec}>
            <div style={s.secH}>
              <span style={{ fontSize: 17 }}>🥗</span>
              <span style={s.secT}>Arma tu ensalada</span>
              <span style={s.tagOpt}>{day.salad.length}/3 seleccionados</span>
            </div>
            <div style={s.cGrid}>
              {SALAD.map(item => {
                const sel = day.salad.includes(item);
                const dis = day.salad.length >= 3 && !sel;
                return (
                  <button key={item}
                    style={{ ...s.sChip, ...(sel ? s.sChipOn : {}), ...(dis ? s.sChipDis : {}) }}
                    disabled={dis} onClick={() => toggleSalad(item)}>
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* HORARIO */}
          <div style={s.sec}>
            <div style={s.secH}>
              <span style={{ fontSize: 17 }}>🕐</span>
              <span style={s.secT}>Horario de entrega</span>
            </div>
            <div style={s.cGrid}>
              {HOURS.map(h => (
                <button key={h}
                  style={{ ...s.hChip, ...(day.hour === h ? s.hChipOn : {}) }}
                  onClick={() => update("hour", h)}>{h}</button>
              ))}
            </div>
          </div>

          {/* NOTAS */}
          <div style={s.sec}>
            <div style={s.secH}>
              <span style={{ fontSize: 17 }}>📝</span>
              <span style={s.secT}>Notas del día</span>
              <span style={s.tagOpt}>opcional</span>
            </div>
            <textarea style={s.ta} rows={2}
              placeholder="Ej: sin sal, extra proteína, salsa aparte..."
              value={day.notes} onChange={e => update("notes", e.target.value)} />
          </div>

          {/* NAV */}
          <div style={s.nav}>
            <button
              style={{ ...s.navBtn, opacity: currentIdx === 0 ? 0.3 : 1 }}
              disabled={currentIdx === 0} onClick={goPrev}>
              ← {currentIdx > 0 ? DAYS[activeDaysSorted[currentIdx - 1]] : ""}
            </button>
            {currentIdx < activeDaysSorted.length - 1
              ? <button style={s.nxtBtn} onClick={goNext}>
                  Siguiente: {DAYS[activeDaysSorted[currentIdx + 1]]} →
                </button>
              : <button
                  style={{ ...s.nxtBtn, ...(isComplete ? s.waBtn : s.disBtn) }}
                  disabled={!isComplete} onClick={handleSend}>
                  {isComplete ? "📲 Enviar por WhatsApp" : `Faltan ${maxDays - completedDays} días`}
                </button>
            }
          </div>
        </div>

        {/* RESUMEN */}
        <div style={s.card}>
          <div style={s.sumHdr}>Resumen de tu semana — {PLAN_CONFIG[plan].label}</div>
          {DAYS.map((dn, i) => {
            const locked = !activeDaysSorted.includes(i);
            const d  = days[i];
            const pr = PROTEINS.find(p => p.id === d.protein);
            const cb = CARBS.find(c => c.id === d.carb);
            return (
              <div key={i}
                style={{ ...s.sumRow, ...(i === activeDay ? s.sumRowOn : {}), ...(locked ? s.sumRowLocked : {}) }}
                onClick={() => !locked && setActiveDay(i)}>
                <div style={s.sumDayCol}>
                  <span style={s.sumDayNm}>{dn}</span>
                  {!locked && pr && cb && <span style={{ color: GN, fontSize: 11 }}>✓</span>}
                  {locked && <span style={{ fontSize: 10, color: "#ccc" }}>🔒</span>}
                </div>
                <div style={s.sumItems}>
                  {locked
                    ? <span style={s.tagLocked}>No incluido en tu plan</span>
                    : <>
                        {pr ? <span style={s.tagO}>{pr.emoji} {pr.name}</span> : <span style={s.tagE}>Sin proteína</span>}
                        {cb ? <span style={s.tagB}>{cb.emoji} {cb.name}</span> : <span style={s.tagE}>Sin acompañamiento</span>}
                      </>
                  }
                </div>
                {!locked && <span style={s.sumHour}>{d.hour}</span>}
              </div>
            );
          })}
          <div style={s.subWrap}>
            <button style={{ ...s.subBig, ...(!isComplete ? s.disBtn : {}) }}
              disabled={!isComplete} onClick={handleSend}>
              📲 Enviar configuración por WhatsApp
            </button>
            {!isComplete && (
              <p style={s.subHint}>
                {!name.trim() ? "⚠️ Ingresa tu nombre primero" : `⚠️ Faltan ${maxDays - completedDays} día(s) por completar`}
              </p>
            )}
            <p style={s.subNote}>Al hacer click se abrirá WhatsApp con tu pedido listo.<br />Solo presiona <strong>Enviar</strong>. 🟠</p>
          </div>
        </div>

      </div>
    </div>
  );
}
