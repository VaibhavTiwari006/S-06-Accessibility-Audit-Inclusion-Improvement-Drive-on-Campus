import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-cards border-t border-gray-200 p-4 text-center text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} AccessAudit. A CUSOC S-06 Project for Chandigarh University.</p>
    </footer>
  );
};

export default Footer;
