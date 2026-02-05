import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Shiwangi ltd.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
