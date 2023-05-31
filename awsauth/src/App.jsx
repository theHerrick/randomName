import React from 'react';
import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate} from '@azure/msal-react';
import { PageLayout } from './components/PageLayout';
import { SignInButton } from './components/SignInButton';
import { SignOutButton } from './components/SignOutButton';
import NameSelector from './NameSelector';


/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <NameSelector />
                <SignOutButton />
            </AuthenticatedTemplate>
    
            <UnauthenticatedTemplate>
            <div class="wrapper fadeInDown">
              <div id="formContent">

                <div class="fadeIn first">
                  <img src="aws.svg" id="icon" alt="User Icon" />
                </div>

                <form>
                  <SignInButton />
                </form>

              </div>
            </div>
            </UnauthenticatedTemplate>
        </div>
    );
};
    
export default function App() {
    return (
        <PageLayout>
                <MainContent />
        </PageLayout>
    );
}