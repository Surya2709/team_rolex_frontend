/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Switch, Route, Redirect } from "react-router-dom";
// import Tables from "./pages/Tables";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Overview from "./pages/Overview";
import GoogleMap from "./pages/GoogleMap";
import ProductList from "./pages/ProductList";
import MarketComparison from "./pages/MarketComparison";

function App() {
  return (
    <div className="App">
      <Switch>
        <Main>
          <Route exact path="/overview" component={Overview} />
          <Route exact path="/exploremarket" component={GoogleMap} />
          <Route exact path="/productlist" component={ProductList} />
          <Route exact path="/marketcomparison" component={MarketComparison} />
          <Redirect from="*" to="/overview" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
