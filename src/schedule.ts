import type { DayPlan } from "./types";

/**
 * Cronograma SEMANAL base (repetido ao longo do mês)
 * 0=domingo ... 6=sábado (getDay padrão JS)
 */
export const WEEKLY_SCHEDULE: Record<number, DayPlan> = {
  0: [
    {
      time: "09:00",
      title: "Passeio família (bike/caminhada)",
      responsible: "Família",
    },
    { time: "Tarde", title: "Livre / alongamento leve", optional: true },
  ],
  1: [
    { time: "07:30", title: "Caminhada com o bebê", responsible: "Família" },
    {
      time: "20:30",
      title: "Treino individual (força/corrida)",
      responsible: "Pietro",
    },
  ],
  2: [
    { time: "07:30", title: "Caminhada com o bebê", responsible: "Família" },
    {
      time: "12:30",
      title: "Academia rápida (cardio + força)",
      responsible: "Leila",
    },
    {
      time: "20:30",
      title: "Treino individual (yoga/HIIT leve)",
      responsible: "Leila",
    },
  ],
  3: [
    { time: "07:30", title: "Caminhada com o bebê", responsible: "Família" },
    {
      time: "20:30",
      title: "Treino individual (força/corrida)",
      responsible: "Pietro",
    },
  ],
  4: [
    { time: "07:30", title: "Caminhada com o bebê", responsible: "Família" },
    {
      time: "12:30",
      title: "Academia rápida (cardio + força)",
      responsible: "Leila",
    },
    {
      time: "20:30",
      title: "Treino individual (yoga/HIIT leve)",
      responsible: "Leila",
    },
  ],
  5: [
    { time: "07:30", title: "Caminhada com o bebê", responsible: "Família" },
    {
      time: "20:30",
      title: "Treino individual (força/corrida)",
      responsible: "Pietro",
    },
  ],
  6: [
    {
      time: "09:00",
      title: "Beach tênis ou pedal (revezar)",
      responsible: "Família",
    },
    { time: "17:00", title: "Caminhada em família", responsible: "Família" },
  ],
};

/** util: retorna o plano para uma data específica (JS Date local) */
export function getPlanForDate(d: Date) {
  const day = d.getDay(); // 0..6
  return WEEKLY_SCHEDULE[day] ?? [];
}
