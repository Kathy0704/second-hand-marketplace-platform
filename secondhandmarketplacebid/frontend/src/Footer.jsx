import React from 'react';

function Footer() {
  const cur = new Date();
  return (
    <footer>
      <p>Copyright © {cur.getFullYear()} </p>
    </footer>
  );
}

export default Footer;
