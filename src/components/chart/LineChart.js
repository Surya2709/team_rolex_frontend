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

import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";

function LineChart(props) {
  const { Title } = Typography;
  // const { Title, Paragraph } = Typography;

  const getSeries = (salesOverTime, productPrediction) => {
    debugger
    let data = [];
    if(salesOverTime) {
      data = salesOverTime && salesOverTime.data;
    }
    if(productPrediction) {
      data = productPrediction && productPrediction.data;
    }
    let series = [];
    let series_obj = {
      name: salesOverTime && salesOverTime.prodcut_name ? salesOverTime.prodcut_name : "",
      data: [],
      offsetY: 0,
    };
    if(data && Array.isArray(data)){
      let series_obj_data = [];
      data.map((ele, index) => {
        let avg_price = ele.avg_price;
        if(typeof avg_price !== 'number' || typeof avg_price !== 'float' || typeof avg_price !== 'integer') {
          avg_price = parseFloat(avg_price);
          avg_price = avg_price / 100;
          avg_price = avg_price.toFixed(2);
        } 
        series_obj_data.push(avg_price);
      })
      series_obj.data = series_obj_data;
      series.push(series_obj);
    }
    return series;
  }

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>{`${props && props.salesOverTime && props.salesOverTime.prodcut_name ? "Price Analysis" : "" }`}</Title>
        </div>
        <div className="sales">
          <ul>
            <li>
              <MinusOutlined /> {"  "}
              {`${props && props.salesOverTime && props.salesOverTime.market_id  ? "Tomato" : "" }`}
            </li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={getSeries(props.salesOverTime, props.productPrediction)}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
