import React from "react";
import Navbar from "./../../components/Navbar";
import HomePage from "./../home";
import AboutPage from "./../about";
import ContactPage from "./../contact";
import { Switch, Route, Router } from "./../../util/router.js";
import Footer from "./../../components/Footer";
import analytics from "./../../util/analytics.js";
import { ProvideAuth } from "./../../util/auth.js";
import "./styles.scss";

function App(props) {
  return (
    <ProvideAuth>
      <Router>
        <>
          <Navbar
            color="white"
            spaced={true}
            logo="https://uploads.divjoy.com/logo.svg"
          />

          <Switch>
            <Route exact path="/" component={HomePage} />

            <Route exact path="/about" component={AboutPage} />

            <Route exact path="/contact" component={ContactPage} />

            <Route
              component={({ location }) => {
                return (
                  <div
                    style={{
                      padding: "50px",
                      width: "100%",
                      textAlign: "center"
                    }}
                  >
                    The page <code>{location.pathname}</code> could not be
                    found.
                  </div>
                );
              }}
            />
          </Switch>

          <Footer
            color="light"
            size="normal"
            logo="https://uploads.divjoy.com/logo.svg"
            copyright="© 2019 Company"
          />
        </>
      </Router>
    </ProvideAuth>
  );
}

export default App;
