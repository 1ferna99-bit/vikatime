import { useMemo, useState } from "react";
import { DAYS, MENU_BY_DAY, PLANS } from "./menu";

function createEmptySelections() {
  return DAYS.reduce((acc, d) => {
    acc[d] = { enabled: false, protein: "", carb: "", veggies: [] };
    return acc;
  }, {});
}

export default function App() {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    plan: "",
  });

  const [activeDay, setActiveDay] = useState(DAYS[0]);
  const [selections, setSelections] = useState(createEmptySelections());

  const selectedPlan = PLANS.find((p) => p.id === customer.plan);
  const currentMenu = MENU_BY_DAY[activeDay];
  const current = selections[activeDay];

  const enabledCount = useMemo(
    () => DAYS.filter((d) => selections[d].enabled).length,
    [selections]
  );

  const updateCustomer = (f, v) =>
    setCustomer((p) => ({ ...p, [f]: v }));

  const toggleDay = (d) => {
    setSelections((prev) => {
      if (
        !prev[d].enabled &&
        selectedPlan &&
        enabledCount >= selectedPlan.lunches
      ) return prev;

      return {
        ...prev,
        [d]: { ...prev[d], enabled: !prev[d].enabled },
      };
    });
    setActiveDay(d);
  };

  const update = (f, v) => {
    setSelections((p) => ({
      ...p,
      [activeDay]: { ...p[activeDay], [f]: v },
    }));
  };

  const toggleVeg = (v) => {
    const list = current.veggies;
    update(
      "veggies",
      list.includes(v)
        ? list.filter((x) => x !== v)
        : [...list, v]
    );
  };

  const selectedDays = DAYS.filter((d) => selections[d].enabled);

  const send = () => {
    const msg = `Pedido VikaTime

${customer.name}
${customer.phone}

${selectedDays
  .map((d) => {
    const m = MENU_BY_DAY[d];
    const s = selections[d];
    return `${d}
- ${m.proteins.find((x) => x.id === s.protein)?.name}
- ${m.carbs.find((x) => x.id === s.carb)?.name}`;
  })
  .join("\n\n")}`;

    window.open(`https://wa.me/56900000000?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div style={s.page}>
      <div style={s.container}>
        <h1 style={s.title}>🍱 VikaTime</h1>

        <div style={s.card}>
          <h2>Datos</h2>
          <input placeholder="Nombre" style={s.input} onChange={(e)=>updateCustomer("name",e.target.value)} />
          <input placeholder="Teléfono" style={s.input} onChange={(e)=>updateCustomer("phone",e.target.value)} />
          <input placeholder="Dirección" style={s.input} onChange={(e)=>updateCustomer("address",e.target.value)} />
        </div>

        <div style={s.card}>
          <h2>Plan</h2>
          <div style={s.row}>
            {PLANS.map(p=>(
              <button key={p.id} style={s.btn} onClick={()=>updateCustomer("plan",p.id)}>
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div style={s.card}>
          <h2>Días</h2>
          <div style={s.row}>
            {DAYS.map(d=>(
              <button key={d} style={s.btn} onClick={()=>toggleDay(d)}>
                {d} {selections[d].enabled && "✅"}
              </button>
            ))}
          </div>
        </div>

        <div style={s.card}>
          <h2>{activeDay}</h2>

          {current.enabled && (
            <>
              <h3>Proteína</h3>
              <div style={s.row}>
                {currentMenu.proteins.map(p=>(
                  <button style={s.btn} onClick={()=>update("protein",p.id)}>
                    {p.emoji} {p.name}
                  </button>
                ))}
              </div>

              <h3>Carbo</h3>
              <div style={s.row}>
                {currentMenu.carbs.map(c=>(
                  <button style={s.btn} onClick={()=>update("carb",c.id)}>
                    {c.emoji} {c.name}
                  </button>
                ))}
              </div>

              <h3>Verduras</h3>
              <div style={s.row}>
                {currentMenu.veggies.map(v=>(
                  <button style={s.btn} onClick={()=>toggleVeg(v)}>
                    {v}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button style={s.cta} onClick={send}>
          Enviar pedido
        </button>
      </div>
    </div>
  );
}

const s = {
  page:{background:"#fff7ed",minHeight:"100vh",padding:20},
  container:{maxWidth:600,margin:"auto"},
  title:{textAlign:"center"},
  card:{background:"#fff",padding:16,borderRadius:12,marginBottom:16},
  input:{display:"block",width:"100%",marginBottom:10,padding:10},
  row:{display:"flex",flexWrap:"wrap",gap:8},
  btn:{padding:"8px 12px",borderRadius:8,border:"1px solid #ddd",cursor:"pointer"},
  cta:{width:"100%",padding:14,background:"#16a34a",color:"#fff",border:"none",borderRadius:10,fontWeight:"bold"}
};
