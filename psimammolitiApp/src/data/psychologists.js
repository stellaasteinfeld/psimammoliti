// Disponibilidades en ISO UTC
export const psychologists = [
  {
    id: "p1",
    name: "Dra. Ana Pereira",
    topics: ["Ansiedad", "Fobias", "Relaciones"],
    availability: [
      "2025-08-18T13:00:00Z", "2025-08-18T15:00:00Z",
      "2025-08-20T14:00:00Z", "2025-08-20T16:30:00Z",
      "2025-08-22T12:00:00Z"
    ]
  },
  {
    id: "p2",
    name: "Lic. Bruno Sosa",
    topics: ["Depresión", "Autoestima", "Relaciones"],
    availability: [
      "2025-08-19T12:00:00Z", "2025-08-19T14:30:00Z",
      "2025-08-21T13:00:00Z", "2025-08-21T17:00:00Z",
      "2025-08-23T15:00:00Z"
    ]
  },
  {
    id: "p3",
    name: "Dra. Camila Núñez",
    topics: ["Duelo", "Estrés", "Ansiedad"],
    availability: [
      "2025-08-18T17:00:00Z",
      "2025-08-20T12:30:00Z", "2025-08-20T18:00:00Z",
      "2025-08-24T14:00:00Z"
    ]
  }
];

export const allTopics = Array.from(
  new Set(psychologists.flatMap(p => p.topics))
).sort();
