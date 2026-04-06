export const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export const MENU_BY_DAY = {
  Lunes: {
    proteins: [
      { id: "pollo_plancha", name: "Pollo a la plancha", kcal: 220, emoji: "🍗" },
      { id: "carne_mechada", name: "Carne mechada", kcal: 260, emoji: "🥩" },
      { id: "salmon", name: "Salmón grillado", kcal: 280, emoji: "🐟" },
    ],
    carbs: [
      { id: "arroz", name: "Arroz", kcal: 200, emoji: "🍚" },
      { id: "pure", name: "Puré", kcal: 240, emoji: "🥔" },
      { id: "quinoa", name: "Quinoa", kcal: 210, emoji: "🌾" },
    ],
    veggies: ["Lechuga", "Tomate", "Pepino", "Zanahoria", "Palta"],
  },

  Martes: {
    proteins: [
      { id: "pollo_teriyaki", name: "Pollo teriyaki", kcal: 250, emoji: "🍗" },
      { id: "alb_meat", name: "Albóndigas", kcal: 270, emoji: "🍖" },
      { id: "merluza", name: "Merluza", kcal: 230, emoji: "🐟" },
    ],
    carbs: [
      { id: "fideos", name: "Fideos", kcal: 300, emoji: "🍝" },
      { id: "arroz_arabe", name: "Arroz árabe", kcal: 260, emoji: "🍚" },
      { id: "papas_dore", name: "Papas doré", kcal: 290, emoji: "🥔" },
    ],
    veggies: ["Repollo", "Tomate", "Pepino", "Choclo", "Palta"],
  },

  Miércoles: {
    proteins: [
      { id: "pollo_horno", name: "Pollo al horno", kcal: 240, emoji: "🍗" },
      { id: "vacuno_jugo", name: "Vacuno al jugo", kcal: 290, emoji: "🥩" },
      { id: "atun", name: "Atún", kcal: 210, emoji: "🐟" },
    ],
    carbs: [
      { id: "couscous", name: "Couscous", kcal: 220, emoji: "🌾" },
      { id: "pure_camote", name: "Puré de camote", kcal: 250, emoji: "🍠" },
      { id: "arroz_primavera", name: "Arroz primavera", kcal: 240, emoji: "🍚" },
    ],
    veggies: ["Lechuga", "Tomate cherry", "Zanahoria", "Betarraga", "Pepino"],
  },

  Jueves: {
    proteins: [
      { id: "pavo", name: "Pavo grillado", kcal: 230, emoji: "🦃" },
      { id: "cerdo", name: "Cerdo agridulce", kcal: 310, emoji: "🍖" },
      { id: "salmon_cubos", name: "Salmón en cubos", kcal: 285, emoji: "🐟" },
    ],
    carbs: [
      { id: "arroz_jazmin", name: "Arroz jazmín", kcal: 210, emoji: "🍚" },
      { id: "quinoa_roja", name: "Quinoa roja", kcal: 215, emoji: "🌾" },
      { id: "fetuccini", name: "Fetuccini", kcal: 320, emoji: "🍝" },
    ],
    veggies: ["Espinaca", "Tomate", "Zanahoria", "Palta", "Pepino"],
  },

  Viernes: {
    proteins: [
      { id: "pollo_crispy", name: "Pollo crispy", kcal: 300, emoji: "🍗" },
      { id: "lasana_carne", name: "Lasaña de carne", kcal: 340, emoji: "🥩" },
      { id: "reineta", name: "Reineta", kcal: 240, emoji: "🐟" },
    ],
    carbs: [
      { id: "papas_rusticas", name: "Papas rústicas", kcal: 310, emoji: "🥔" },
      { id: "arroz_cilantro", name: "Arroz con cilantro", kcal: 220, emoji: "🍚" },
      { id: "fideos_arroz", name: "Fideos de arroz", kcal: 260, emoji: "🍜" },
    ],
    veggies: ["Lechuga", "Tomate", "Choclo", "Porotos verdes", "Pepino"],
  },
};

export const PLANS = [
  { id: "plan_5", name: "Plan 5 almuerzos", lunches: 5 },
  { id: "plan_4", name: "Plan 4 almuerzos", lunches: 4 },
  { id: "plan_3", name: "Plan 3 almuerzos", lunches: 3 },
  { id: "plan_2", name: "Plan 2 almuerzos", lunches: 2 },
];
