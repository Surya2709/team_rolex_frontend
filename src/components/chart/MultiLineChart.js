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
import ReactApexChart from "react-apexcharts";
import { Typography, Spin } from "antd";
// import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";


function MultiLineChart(props) {
  const { Title } = Typography;
  // const { Title, Paragraph } = Typography;
  // const [series, setSeries] = useState([]);
  // const [labels, setLabels ] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
  }, [])

  const getSeries = (nearByMarketData) => {
    let series = [];
    if(nearByMarketData && Array.isArray(nearByMarketData)){
      nearByMarketData.map((market, marketIndex) => {
        market = Object.assign({}, market);
        let data = [];
        market.prediction.map((ele, index) => {
            let avg_price = ele.avg_price;
            if(typeof avg_price !== 'number' || typeof avg_price !== 'float' || typeof avg_price !== 'integer') {
                avg_price = parseFloat(avg_price);
                avg_price = avg_price + Math.floor(Math.random(1,2) * 70);
                avg_price = avg_price / 100;
                avg_price = avg_price.toFixed(2);
            } 
            data.push(avg_price);
        });
        series.push({
            name: market && market.market_name ? market.market_name : "",
            data: data,
            offsetY: 0,
        })
      })
    }
    return series;
  }


    if(loading === true) {
        return (
        <div className="loader">
            <Spin tip="Analyzing markets price..." />
        </div>
        );
    } else {
        return (
            <>
              <div className="linechart">
                <div>
                  <Title level={5}>Price Analysis</Title> 
                </div>
                <div className="sales">
                  <ul></ul>
                </div>
              </div>
              <ReactApexChart
                className="full-width"
                options={lineChart.options}
                series={getSeries(props.nearByMarketData)}
                type="area"
                height={350}
                width={"100%"}
              />
            </>
          );
    }
}

export default MultiLineChart;
