export type Activity = {
  time: string;
  title: string;
  note?: string;
  responsible?: "Pietro" | "Leila" | "Família";
  optional?: boolean;
};

export type DayPlan = Activity[];
