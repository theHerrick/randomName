import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';

const Navbar = () => {
  const { accounts } = useMsal();

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top navbar-custom">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">AWS Engineering</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Name Selector</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/editnames">Edit Names</a>
            </li>
            <AuthenticatedTemplate>
              {accounts.length > 0 && (
                <li className="nav-item">
                  <span className="nav-link">{accounts[0].name}</span>
                </li>
              )}
            </AuthenticatedTemplate>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
