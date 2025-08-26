import { useMemo, useState } from "react";
import { getPlanForDate } from "./schedule";
import { useLocalChecklist, toISODateLocal } from "./hooks/useLocalChecklist";
import type { Activity } from "./types";

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function ActivityRow({
  a,
  checked,
  onToggle,
}: {
  a: Activity;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={`flex items-start gap-3 rounded-lg p-4 ring-1 ring-slate-200 transition hover:bg-slate-50 ${
        checked ? "bg-emerald-50 ring-emerald-200" : "bg-white"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="mt-1 h-5 w-5 accent-emerald-600"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex min-w-[64px] justify-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
            {a.time}
          </span>
          <span className="font-medium text-slate-900">{a.title}</span>
        </div>
        <div className="mt-1 text-sm text-slate-600">
          {a.responsible && (
            <span className="mr-2 rounded bg-slate-100 px-2 py-0.5 text-xs">
              {a.responsible}
            </span>
          )}
          {a.optional && <span className="text-xs italic">opcional</span>}
          {a.note && <span className="ml-2">{a.note}</span>}
        </div>
      </div>
    </label>
  );
}

export default function App() {
  const [current, setCurrent] = useState(() => new Date());
  const plan = useMemo(() => getPlanForDate(current), [current]);
  const { checks, toggle, resetDay, progress } = useLocalChecklist(
    current,
    plan
  );

  const titleFmt = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Plano de Exercícios — Setembro
        </h1>
        <p className="text-sm text-slate-600">
          Hoje/selecionado:{" "}
          <span className="font-medium">
            {titleFmt.format(current)} ({toISODateLocal(current)})
          </span>
        </p>
      </header>

      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={() => setCurrent(addDays(current, -1))}
          className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
        >
          ◀ Ontem
        </button>
        <button
          onClick={() => setCurrent(new Date())}
          className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
        >
          Hoje
        </button>
        <button
          onClick={() => setCurrent(addDays(current, +1))}
          className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
        >
          Amanhã ▶
        </button>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm text-slate-700">Progresso:</span>
          <div className="w-40 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-emerald-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="w-10 text-right text-sm tabular-nums text-slate-700">
            {progress}%
          </span>
          <button
            onClick={resetDay}
            className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
            title="Limpar marcações do dia"
          >
            Resetar dia
          </button>
        </div>
      </div>

      <main className="card p-5">
        {plan.length === 0 ? (
          <p className="text-slate-600">Sem atividades definidas para hoje.</p>
        ) : (
          <ul className="grid gap-3">
            {plan.map((a) => {
              const id = `${a.time} ${a.title}`;
              return (
                <li key={id}>
                  <ActivityRow
                    a={a}
                    checked={Boolean(checks[id])}
                    onToggle={() => toggle(id)}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </main>

      <footer className="mt-6 text-xs text-slate-500">
        Dica: atividades curtas (20–30 min) e consistentes valem mais que um
        treino épico que não acontece.
      </footer>
    </div>
  );
}
