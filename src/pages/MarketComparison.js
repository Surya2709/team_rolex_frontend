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
import { useEffect, useState } from "react";

import {
  // Card,
  // Col,
  // Row,
  // Typography,
  // Tooltip,
  // Progress,
  // Upload,
  // message,
  // Button,
  // Timeline,
  // Radio,
  Spin,
} from "antd";
import {
  // ToTopOutlined,
  // MenuUnfoldOutlined,
  // RightOutlined,
} from "@ant-design/icons";
import MultiLineChart from "../components/chart/MultiLineChart";

function MarketComparison(props) {
  const [loading, setLoading] = useState(false);
  const [nearByMarketData, setNearByMarketData] = useState({});
  
  useEffect(() => {
      let product_id = props && props.location && props.location.product_id;
      let lat = props && props.location &&  props.location.lat;
      let lng = props && props.location && props.location.lng;
      if(product_id && lat && lng) {
        getData(product_id, lat, lng);
      }
  }, [])

  const getData = (product_id, lat, lng) => {
    return fetch(`https://hackathon-team-rolex-backend-i7cl3cs44q-uc.a.run.app/api/v1/market/getNearbyMarket`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"eyJ0eXAiOiJKV1QiLCPRASHanthGVudGl0eSI6IlRFTVAzODEzODE4MjIxNjI2NjY3OTI1IiwiZXreddyfGiHsHJniGqehU5cUPx"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ lat: lat, lng: lng, product_id: product_id }),
    }).then(res => {
      return res && res.json()
    }).then((res) => {
        if (res && res.content) {
          setNearByMarketData(res.content);
        }
        return res;
    }).catch(err => {
        return err;
    }).finally(() => {
      setLoading(false);
    })
  }

  if(loading === true) {
      return (
        <div className="loader">
          <Spin tip="Loading nearby market places..." />
        </div>
      );
  } else {
    return (
        <div className="layout-content">
          <MultiLineChart nearByMarketData={nearByMarketData}  />
        </div>
    );
  }

}

export default MarketComparison;
