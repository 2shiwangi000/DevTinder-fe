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

