import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
import useNavLock from "./useNavLock";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const CustomPrompt = ({ show, message, cancel, confirm }) => {
  if (!show) return null;
  return (
    <div className="prompt">
      <h3>Custom Prompt</h3>
      <div>Message: {message}</div>
      <div>
        <button onClick={cancel}>Cancel</button>
        <button onClick={confirm}>Confirm</button>
      </div>
    </div>
  );
};

const AskUs = () => {
  const [input, setInput] = React.useState("");
  const { block, unBlock, proceed, isBlocked, show, cancel } = useNavLock(
    false
  );

  React.useEffect(() => {
    if (input && !isBlocked) {
      block();
    } else if (!input && isBlocked) {
      unBlock();
    }
  }, [input]);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const submitInput = e => {
    //submission logic should be here
    setInput("");
  };

  return (
    <div>
      <h4>Submit</h4>
      <em>
        Enter an text to start blocking navigation. If there is no text, the
        user is not blocked.
      </em>

      <div className="inputGroup">
        <input value={input} onChange={handleChange} />
        <button onClick={submitInput}>Submit</button>
      </div>
      <CustomPrompt
        show={show}
        message="You will lose unsaved form data if you navigate away from this page."
        confirm={proceed}
        cancel={cancel}
      />
    </div>
  );
};

export default function App() {
  return (
    <div className="app">
      <Router history={history}>
        <div className="root">
          <div>Links</div>
          <div className="menu">
            <Link to="/">Index</Link>
            <Link to="/ask">Submit an Inquiry</Link>
            <Link to="/goals">Goals</Link>
          </div>
        </div>
        <div className="view">
          <Switch>
            <Route path="/ask">
              <AskUs />
            </Route>
            <Route path="/goals">
              <h4>Goals</h4>
              <div>
                We are a mushroom people bent on going places to the west maybe
                today.
              </div>
            </Route>
            <Route path="/">
              <h4>Index</h4>
              <div>This is the home page.</div>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
