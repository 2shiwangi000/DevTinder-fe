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
