import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-base-content/70">
        {/* Left */}
        <div className="text-center sm:text-left">
          <p className="font-medium text-base-content">
            👩‍💻 Dev<span className="text-pink-400">Tinder</span>
          </p>
          <p className="text-xs opacity-60">Connecting developers smarter 🚀</p>
        </div>

        {/* Middle */}
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-pink-400 transition">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-pink-400 transition">
            Terms
          </Link>
        </div>

        {/* Right */}
        <p className="text-xs opacity-60">
          🔒 Secure payments powered by Razorpay
        </p>
      </div>
    </footer>
  );
};

export default Footer;
