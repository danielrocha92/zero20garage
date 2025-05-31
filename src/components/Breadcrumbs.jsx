import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <li key={to} aria-current="page">
              {decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1))}
            </li>
          ) : (
            <li key={to}>
              <Link to={to}>{decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1))}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;