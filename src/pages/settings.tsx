const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "autumn",
  "business",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

const Settings = () => {
  const handleThemeChange = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Choose Theme 🎨</h1>

      <select
        className="select select-bordered w-full"
        onChange={(e) => handleThemeChange(e.target.value)}
        defaultValue={localStorage.getItem("theme") || "light"}
      >
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Settings;
