export const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function toLocal(dateIso) {
  const d = new Date(dateIso);
  return {
    date: d,
    weekday: d.toLocaleDateString(undefined, { weekday: "long" }),
    dayKey: d.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" }),
    timeLabel: d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
  };
}

export function groupByDay(isoList) {
  const map = new Map();
  isoList
    .map(toLocal)
    .sort((a, b) => a.date - b.date)
    .forEach(s => {
      const key = s.dayKey;
      if (!map.has(key)) map.set(key, { label: `${capitalize(s.weekday)} ${formatDay(s.date)}`, slots: [] });
      map.get(key).slots.push(s);
    });
  return Array.from(map.entries()).map(([k, v]) => ({ key: k, ...v }));
}

function formatDay(d) {
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "2-digit" });
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
