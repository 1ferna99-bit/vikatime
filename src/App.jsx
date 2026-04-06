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

  function updateCustomer(field, value) {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  }

  function toggleDay(dayName) {
    setSelections((prev) => {
      const isOn = prev[dayName].enabled;

      if (!isOn && selectedPlan && enabledDaysCount >= selectedPlan.lunches) {
        alert(`Este plan permite solo ${selectedPlan.lunches} días`);
        return prev;
      }

      return {
        ...prev,
        [dayName]: { ...prev[dayName], enabled: !isOn },
      };
    });

    setActiveDay(dayName);
  }

  function updateDay(field, value) {
    setSelections((prev) => ({
      ...prev,
      [activeDay]: {
        ...prev[activeDay],
        [field]: value,
      },
    }));
  }

  function toggleVeggie(v) {
    const current = currentSelection.veggies;
    const exists = current.includes(v);
    updateDay(
      "veggies",
      exists ? current.filter((x) => x !== v) : [...current, v]
    );
  }

  const selectedDays = DAYS.filter((d) => selections[d].enabled);

  function sendWhatsApp() {
    const msg = `Pedido VikaTime

Nombre: ${customer.name}
Teléfono: ${customer.phone}
Dirección: ${customer.address}

${selectedDays
  .map((d) => {
    const menu = MENU_BY_DAY[d];
    const pick = selections[d];
    const p = menu.proteins.find((x) => x.id === pick.protein)?.name;
    const c = menu.carbs.find((x) => x.id === pick.carb)?.name;

    return `${d}
- ${p}
- ${c}
- ${pick.veggies.join(", ")}`;
  })
  .join("\n\n")}
`;

    window.open(`https://wa.me/56900000000?text=${encodeURIComponent(msg)}`);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>VikaTime</h1>

      <h2>Datos</h2>
      <input placeholder="Nombre" onChange={(e) => updateCustomer("name", e.target.value)} />
      <input placeholder="Teléfono" onChange={(e) => updateCustomer("phone", e.target.value)} />
      <input placeholder="Dirección" onChange={(e) => updateCustomer("address", e.target.value)} />

      <h2>Plan</h2>
      {PLANS.map((p) => (
        <button key={p.id} onClick={() => updateCustomer("plan", p.id)}>
          {p.name}
        </button>
      ))}

      <h2>Días</h2>
      {DAYS.map((d) => (
        <button key={d} onClick={() => toggleDay(d)}>
          {d} {selections[d].enabled ? "✅" : ""}
        </button>
      ))}

      <h2>{activeDay}</h2>

      {currentSelection.enabled && (
        <>
          <h3>Proteínas</h3>
          {currentMenu.proteins.map((p) => (
            <button key={p.id} onClick={() => updateDay("protein", p.id)}>
              {p.name}
            </button>
          ))}

          <h3>Carbos</h3>
          {currentMenu.carbs.map((c) => (
            <button key={c.id} onClick={() => updateDay("carb", c.id)}>
              {c.name}
            </button>
          ))}

          <h3>Verduras</h3>
          {currentMenu.veggies.map((v) => (
            <button key={v} onClick={() => toggleVeggie(v)}>
              {v}
            </button>
          ))}
        </>
      )}

      <br /><br />
      <button onClick={sendWhatsApp}>Enviar pedido</button>
    </div>
  );
}
