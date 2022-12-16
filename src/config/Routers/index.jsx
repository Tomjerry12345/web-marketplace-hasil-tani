import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Login, Register } from "../../pages";
import Admin from "../../pages/Admin";
import LupaPassword from "../../pages/LupaPassword";
import RecoveryPassword from "../../pages/LupaPassword/RecoveryPassword";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/lupa-password" component={LupaPassword} />
        <Route path="/recovery-password" component={RecoveryPassword} />
        <Route path="/" component={Home} exact/>
        <Route path="/admin" component={Admin} exact />
      </Switch>
    </Router>
  );
};

export default Routes;
