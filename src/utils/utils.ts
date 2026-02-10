export const genderBadgeClass = (gender: string) => {
  switch (gender) {
    case "male":
      return "badge-info";
    case "female":
      return "badge-secondary";
    case "lgbtq":
      return "badge-accent";
    default:
      return "badge-ghost";
  }
};

export const genderLabel = (gender: string) => {
  switch (gender) {
    case "male":
      return "♂ Male";
    case "female":
      return "♀ Female";
    case "lgbtq":
      return "⚧ LGBTQ";
    default:
      return gender;
  }
};

export const completion = (fields: Record<string, boolean>) => {
  const BASE = 20;
  const PER_FIELD = 20; // because 4 fields → 80% / 4 = 20%

  const completedCount = Object.values(fields).filter(Boolean).length;

  return BASE + completedCount * PER_FIELD;
};

