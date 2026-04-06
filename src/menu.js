import { useMemo, useState } from "react";
import { DAYS, MENU_BY_DAY, PLANS } from "./menu";

function createEmptySelections() {
  return DAYS.reduce((acc, dayName) => {
    acc[dayName] = {
      enabled: false,
      protein: "",
      carb: "",
      veggies: [],
    };
    return acc;
  }, {});
}

export default function App() {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
    plan: "",
  });

  const [activeDay, setActiveDay] = useState(DAYS[0]);
  const [selections, setSelections] = useState(createEmptySelections());

  const selectedPlan = PLANS.find((p) => p.id === customer.plan) || null;
  const currentMenu = MENU_BY_DAY[activeDay];
  const currentSelection = selections[activeDay];

  const enabledDaysCount = useMemo(
    () => DAYS.filter((day) => selections[day].enabled).length,
    [selections]
  );

  const canSelectMoreDays = selectedPlan
    ? enabledDaysCount < selectedPlan.lunches
    : false;

  function updateCustomer(field, value) {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  }

  function toggleDay(dayName) {
    setSelections((prev) => {
      const isCurrentlyEnabled = prev[dayName].enabled;

      if (!isCurrentlyEnabled && selectedPlan && enabledDaysCount >= selectedPlan.lunches) {
        alert(`Este plan permite seleccionar solo ${selectedPlan.lunches} días.`);
        return prev;
      }

      return {
        ...prev,
        [dayName]: {
          ...prev[dayName],
          enabled: !isCurrentlyEnabled,
        },
      };
    });

    setActiveDay(dayName);
  }

  function updateDaySelection(field, value) {
    setSelections((prev) => ({
      ...prev,
      [activeDay]: {
        ...prev[activeDay],
        [field]: value,
      },
    }));
  }

  function toggleVeggie(veggie) {
    const currentVeggies = currentSelection.veggies || [];
    const exists = currentVeggies.includes(veggie);

    const nextVeggies = exists
      ? currentVeggies.filter((v) => v !== veggie)
      : [...currentVeggies, veggie];

    updateDaySelection("veggies", nextVeggies);
  }

  const selectedDays = DAYS.filter((day) => selections[day].enabled);

  const isFormValid =
    customer.name.trim() &&
    customer.phone.trim() &&
    customer.address.trim() &&
    customer.plan &&
    selectedDays.length > 0 &&
    selectedDays.every((day) => {
      const d = selections[day];
      return d.protein && d.carb && d.veggies.length > 0;
    });

  const summaryText = selectedDays
    .map((day) => {
      const menu = MENU_BY_DAY[day];
      const pick = selections[day];
      const proteinName = menu.proteins.find((p) => p.id === pick.protein)?.name || "-";
      const carbName = menu.carbs.find((c) => c.id === pick.carb)?.name || "-";
      const veggiesText = pick.veggies.join(", ") || "-";

      return `${day}
- Proteína: ${proteinName}
- Acompañamiento: ${carbName}
- Verduras: ${veggiesText}`;
    })
    .join("\n\n");

  function handleWhatsApp() {
    const message = `Hola, quiero pedir mi plan de almuerzos.

Nombre: ${customer.name}
Teléfono: ${customer.phone}
Dirección: ${customer.address}
Plan: ${selectedPlan?.name || "-"}
Notas: ${customer.notes || "-"}

Detalle:
${summaryText}`;

    const encoded = encodeURIComponent(message);

    // Cambia este número por el tuyo en formato internacional
    const phoneNumber = "56900000000";

    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.badge}>VikaTime</div>
          <h1 style={styles.title}>Arma tu plan de almuerzos</h1>
          <p style={styles.subtitle}>
            Elige tu plan, selecciona los días y personaliza cada plato según el menú de ese día.
          </p>
        </header>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>1. Datos del cliente</h2>

          <div style={styles.grid2}>
            <Input
              label="Nombre"
              value={customer.name}
              onChange={(e) => updateCustomer("name", e.target.value)}
              placeholder="Tu nombre"
            />
            <Input
              label="Teléfono"
              value={customer.phone}
              onChange={(e) => updateCustomer("phone", e.target.value)}
              placeholder="+56 9..."
            />
          </div>

          <div style={{ marginTop: 14 }}>
            <Input
              label="Dirección"
              value={customer.address}
              onChange={(e) => updateCustomer("address", e.target.value)}
              placeholder="Dirección de despacho"
            />
          </div>

          <div style={{ marginTop: 14 }}>
            <label style={styles.label}>Notas</label>
            <textarea
              value={customer.notes}
              onChange={(e) => updateCustomer("notes", e.target.value)}
              placeholder="Ej: sin cebolla, dejar en conserjería, etc."
              style={{ ...styles.input, minHeight: 90, resize: "vertical" }}
            />
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>2. Elige tu plan</h2>

          <div style={styles.optionsGrid}>
            {PLANS.map((plan) => {
              const isActive = customer.plan === plan.id;

              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => updateCustomer("plan", plan.id)}
                  style={{
                    ...styles.optionCard,
                    ...(isActive ? styles.optionCardActive : {}),
                  }}
                >
                  <div style={styles.optionTitle}>{plan.name}</div>
                  <div style={styles.optionSub}>
                    Puedes elegir {plan.lunches} {plan.lunches === 1 ? "día" : "días"}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>3. Selecciona los días</h2>
          <p style={styles.helperText}>
            {selectedPlan
              ? `Has elegido ${enabledDaysCount} de ${selectedPlan.lunches} días.`
              : "Primero selecciona un plan."}
          </p>

          <div style={styles.daysRow}>
            {DAYS.map((dayName) => {
              const isOn = selections[dayName].enabled;
              const isBlocked =
                !isOn &&
                selectedPlan &&
                enabledDaysCount >= selectedPlan.lunches;

              return (
                <button
                  key={dayName}
                  type="button"
                  onClick={() => toggleDay(dayName)}
                  disabled={!selectedPlan || isBlocked}
                  style={{
                    ...styles.dayButton,
                    ...(isOn ? styles.dayButtonActive : {}),
                    ...((!selectedPlan || isBlocked) ? styles.dayButtonDisabled : {}),
                  }}
                >
                  {dayName}
                </button>
              );
            })}
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>4. Configura el menú por día</h2>

          <div style={styles.daysTabs}>
            {DAYS.map((dayName) => (
              <button
                key={dayName}
                type="button"
                onClick={() => setActiveDay(dayName)}
                style={{
                  ...styles.tabButton,
                  ...(activeDay === dayName ? styles.tabButtonActive : {}),
                }}
              >
                {dayName}
                {selections[dayName].enabled ? " ✅" : ""}
              </button>
            ))}
          </div>

          {!currentSelection.enabled ? (
            <div style={styles.infoBox}>
              Activa <strong>{activeDay}</strong> en la sección anterior para poder armar ese plato.
            </div>
          ) : (
            <>
              <div style={{ marginTop: 18 }}>
                <h3 style={styles.blockTitle}>Proteína de {activeDay}</h3>
                <div style={styles.optionsGrid}>
                  {currentMenu.proteins.map((item) => {
                    const isActive = currentSelection.protein === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => updateDaySelection("protein", item.id)}
                        style={{
                          ...styles.optionCard,
                          ...(isActive ? styles.optionCardActive : {}),
                        }}
                      >
                        <div style={styles.emoji}>{item.emoji}</div>
                        <div style={styles.optionTitle}>{item.name}</div>
                        <div style={styles.optionSub}>{item.kcal} kcal</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: 22 }}>
                <h3 style={styles.blockTitle}>Acompañamiento de {activeDay}</h3>
                <div style={styles.optionsGrid}>
                  {currentMenu.carbs.map((item) => {
                    const isActive = currentSelection.carb === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => updateDaySelection("carb", item.id)}
                        style={{
                          ...styles.optionCard,
                          ...(isActive ? styles.optionCardActive : {}),
                        }}
                      >
                        <div style={styles.emoji}>{item.emoji}</div>
                        <div style={styles.optionTitle}>{item.name}</div>
                        <div style={styles.optionSub}>{item.kcal} kcal</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: 22 }}>
                <h3 style={styles.blockTitle}>Verduras de {activeDay}</h3>
                <div style={styles.chipsWrap}>
                  {currentMenu.veggies.map((veggie) => {
                    const isActive = currentSelection.veggies.includes(veggie);
                    return (
                      <button
                        key={veggie}
                        type="button"
                        onClick={() => toggleVeggie(veggie)}
                        style={{
                          ...styles.chip,
                          ...(isActive ? styles.chipActive : {}),
                        }}
                      >
                        {veggie}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>5. Resumen del pedido</h2>

          {selectedDays.length === 0 ? (
            <p style={styles.helperText}>Aún no has seleccionado días.</p>
          ) : (
            <div style={styles.summaryWrap}>
              {selectedDays.map((day) => {
                const menu = MENU_BY_DAY[day];
                const pick = selections[day];
                const proteinName =
                  menu.proteins.find((p) => p.id === pick.protein)?.name || "Sin elegir";
                const carbName =
                  menu.carbs.find((c) => c.id === pick.carb)?.name || "Sin elegir";

                return (
                  <div key={day} style={styles.summaryCard}>
                    <div style={styles.summaryDay}>{day}</div>
                    <div style={styles.summaryLine}>
                      <strong>Proteína:</strong> {proteinName}
                    </div>
                    <div style={styles.summaryLine}>
                      <strong>Acompañamiento:</strong> {carbName}
                    </div>
                    <div style={styles.summaryLine}>
                      <strong>Verduras:</strong>{" "}
                      {pick.veggies.length ? pick.veggies.join(", ") : "Sin elegir"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: 20 }}>
            <button
              type="button"
              disabled={!isFormValid}
              onClick={handleWhatsApp}
              style={{
                ...styles.ctaButton,
                ...(isFormValid ? {} : styles.ctaButtonDisabled),
              }}
            >
              Enviar pedido por WhatsApp
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      <input {...props} style={styles.input} />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #fff7ed 0%, #ffffff 35%, #f8fafc 100%)",
    padding: "24px 16px 60px",
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#0f172a",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: 24,
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: 999,
    background: "#fed7aa",
    color: "#9a3412",
    fontWeight: 700,
    fontSize: 13,
    marginBottom: 12,
  },
  title: {
    margin: 0,
    fontSize: 36,
    lineHeight: 1.1,
  },
  subtitle: {
    margin: "12px auto 0",
    maxWidth: 720,
    color: "#475569",
    fontSize: 16,
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    padding: 22,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
    marginBottom: 18,
  },
  sectionTitle: {
    margin: "0 0 16px",
    fontSize: 22,
  },
  label: {
    display: "block",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 600,
    color: "#334155",
  },
  input: {
    width: "100%",
    border: "1px solid #cbd5e1",
    borderRadius: 12,
    padding: "12px 14px",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 14,
  },
  helperText: {
    margin: "0 0 14px",
    color: "#64748b",
    fontSize: 14,
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: 14,
  },
  optionCard: {
    border: "1px solid #cbd5e1",
    background: "#fff",
    borderRadius: 16,
    padding: 16,
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  optionCardActive: {
    border: "2px solid #f97316",
    background: "#fff7ed",
  },
  optionTitle: {
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 6,
  },
  optionSub: {
    color: "#64748b",
    fontSize: 14,
  },
  daysRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  dayButton: {
    border: "1px solid #cbd5e1",
    background: "#fff",
    color: "#0f172a",
    borderRadius: 999,
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: 600,
  },
  dayButtonActive: {
    background: "#f97316",
    color: "#fff",
    border: "1px solid #f97316",
  },
  dayButtonDisabled: {
    opacity: 0.45,
    cursor: "not-allowed",
  },
  daysTabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 8,
  },
  tabButton: {
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    borderRadius: 12,
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 600,
  },
  tabButtonActive: {
    background: "#0f172a",
    color: "#fff",
    border: "1px solid #0f172a",
  },
  infoBox: {
    marginTop: 14,
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    color: "#1e3a8a",
    padding: 14,
    borderRadius: 14,
  },
  blockTitle: {
    margin: "0 0 12px",
    fontSize: 18,
  },
  chipsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    border: "1px solid #cbd5e1",
    background: "#fff",
    borderRadius: 999,
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 600,
  },
  chipActive: {
    background: "#dcfce7",
    border: "1px solid #22c55e",
    color: "#166534",
  },
  emoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  summaryWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 12,
  },
  summaryCard: {
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 16,
    background: "#f8fafc",
  },
  summaryDay: {
    fontWeight: 800,
    fontSize: 18,
    marginBottom: 10,
  },
  summaryLine: {
    fontSize: 14,
    marginBottom: 8,
    color: "#334155",
  },
  ctaButton: {
    width: "100%",
    border: "none",
    background: "#16a34a",
    color: "#fff",
    borderRadius: 14,
    padding: "16px 18px",
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
  },
  ctaButtonDisabled: {
    background: "#94a3b8",
    cursor: "not-allowed",
  },
};
