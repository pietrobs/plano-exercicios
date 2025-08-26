import { useEffect, useMemo, useState } from "react";
import type { Activity } from "../types";

const STORAGE_KEY = "fitnessChecklist-v1";

/** format ISO yyyy-mm-dd em horário local */
export function toISODateLocal(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

type CheckMap = Record<string, boolean>;
type StorageShape = Record<string, CheckMap>; // por data

export function useLocalChecklist(date: Date, activities: Activity[]) {
  const [checks, setChecks] = useState<CheckMap>({});

  const idList = useMemo(
    () => activities.map((a) => `${a.time} ${a.title}`),
    [activities]
  );

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: StorageShape = raw ? JSON.parse(raw) : {};
    const iso = toISODateLocal(date);
    setChecks(parsed[iso] || {});
  }, [date]);

  function toggle(id: string) {
    const iso = toISODateLocal(date);
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: StorageShape = raw ? JSON.parse(raw) : {};
    const prev = parsed[iso] || {};
    const next = { ...prev, [id]: !prev[id] };
    parsed[iso] = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    setChecks(next);
  }

  function resetDay() {
    const iso = toISODateLocal(date);
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: StorageShape = raw ? JSON.parse(raw) : {};
    parsed[iso] = {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    setChecks({});
  }

  const progress =
    idList.length === 0
      ? 0
      : Math.round(
          (idList.reduce((acc, id) => acc + (checks[id] ? 1 : 0), 0) /
            idList.length) *
            100
        );

  return { checks, toggle, resetDay, progress, idList };
}
