import React, { useState, useEffect, useContext, createContext } from "react";
import Auth0 from "auth0-js";

/*
    SETUP INSTRUCTIONS:
    - Create a new Auth0 application and choose type "Single Page Web Applications"
    - Go to your news app's setting and add the domain and clientId to the code below
      where it says "Replace me".
    - In your new apps settings scroll to the bottom, click "Show Advanced Settings",
      go to the "Grant Types" tab, check the "Password" option, then click save.
    - In you Auth0 application settings you must add your domain in both the 
      "Allowed Web Origins" and "Allowed Origins (CORS)" sections. For example, 
      to enable auth for local development, CodeSandbox, and production you'd 
      add the following: http://localhost:3000, https://*.csb.app, https://mydomain.com
    - Users will be asked to verify their email after signing up. You can customize 
      this email template in Dashboard → Emails → Templates.
      Keep in mind you'll need to specify an email provider before custom templates work.
    - When a user requests to reset their password (calls the sendPasswordResetEmail method), 
      they will receive an email from Auth0 that takes them to an Auth0 hosted interface for 
      changing their password. You can customize 
      this email template in Dashboard → Emails → Templates.
    - By default Auth0 has strict password rules (must be 8 or more chars, etc). 
      You can adjust this in your Auth0 dashboard → Connections → Database → 
      Username-Password-Authentication → Password Policy.
  */

const auth0Realm = "Username-Password-Authentication";
const auth0 = new Auth0.WebAuth({
  domain: "dev-646wg9mg.auth0.com", // Replace me
  clientID: "uLk8AYBk02Exm14gk8GQpYDmrCxeKTcx", // Replace me
  responseType: "id_token",
  scope: "openid profile email"
});

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and update when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    return new Promise((resolve, reject) => {
      auth0.client.login(
        {
          realm: auth0Realm,
          username: email,
          password: password
        },
        (error, response) => {
          if (error) {
            reject(new CustomError(error.code, error.description));
          } else {
            // Store access token in local storage
            window.localStorage.setItem("access_token", response.accessToken);

            getCurrentUser().then(user => {
              setUser(user);
              resolve(user);
            });
          }
        }
      );
    });
  };

  const signup = (email, password) => {
    return new Promise((resolve, reject) => {
      auth0.signup(
        {
          connection: auth0Realm,
          email: email,
          password: password
        },
        (error, response) => {
          if (error) {
            reject(new CustomError(error.code, error.message));
          } else {
            // Automatically signin the user
            signin(email, password).then(() => {
              resolve();
            });
          }
        }
      );
    });
  };

  const signout = () => {
    window.localStorage.removeItem("access_token");
    setUser(false);
  };

  const sendPasswordResetEmail = email => {
    return new Promise((resolve, reject) => {
      auth0.changePassword(
        {
          connection: "Username-Password-Authentication",
          email: email
        },
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(true);
          }
        }
      );
    });
  };

  // This method is not needed with Auth0 but added in case your exported Divjoy ...
  // ... template makes a call to auth.confirmPasswordReset().
  const confirmPasswordReset = (password, code) => {
    return Promise.reject(
      new CustomError(
        "not_needed",
        "Auth0 handles the password reset flow for you. You can remove this section or page."
      )
    );
  };

  // Get the current user using stored access_token
  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const accessToken = window.localStorage.getItem("access_token");
      if (accessToken) {
        auth0.client.userInfo(accessToken, (error, user) => {
          if (error) {
            reject(error);
          } else {
            resolve(user);
          }
        });
      } else {
        resolve(false);
      }
    });
  };

  // Get user on mount
  useEffect(() => {
    getCurrentUser().then(user => {
      setUser(user);
    });
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset
  };
}

function CustomError(code, message) {
  // Auth0 doesn't always give us a human readable error message ...
  // ... so as a backup we display the error code ("invalid_password", etc).
  const displayMessage = typeof message === "string" ? message : code;
  const error = new Error(displayMessage);
  error.code = code;
  return error;
}
