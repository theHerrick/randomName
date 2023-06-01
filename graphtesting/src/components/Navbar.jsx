import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { callMsGraph } from '../graph';

const ProfileContent = ({ graphValue }) => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
  
    function RequestProfileData() {
      // Silently acquires an access token which is then attached to a request for MS Graph data
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          callMsGraph(response.accessToken).then((response) =>
            setGraphData(response)
          );
        });
    }
  
    let profileValue = null;
    if (graphData && graphData.hasOwnProperty(graphValue)) {
      profileValue = graphData[graphValue];
    }
  
    // Call RequestProfileData wherever you want to execute it
    RequestProfileData();
  
    return profileValue;
  };
  

const Navbar = () => {
const { accounts } = useMsal();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          Logo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Services
              </a>
            </li>
            {accounts.length > 0 && (
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <ProfileContent graphValue={'givenName'} />
                  <ProfileContent graphValue={'surname'} />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
