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
import { NavLink } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Typography,
  // Tooltip,
  // Progress,
  // Upload,
  // message,
  // Button,
  // Timeline,
  // Radio,
  Table,
  DatePicker,
  Space,
  Spin,
  // Alert,
} from "antd";
import {
  // ToTopOutlined,
  // MenuUnfoldOutlined,
  // RightOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
// import Paragraph from "antd/lib/typography/Paragraph";
import moment from "moment";
// import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";
import GoogleMap from "./GoogleMap";
import "./style.css";
// import Search from "../components/layout/Search";
import Select from "react-select";
const { RangePicker } = DatePicker;

function Overview() {
  const { Title } = Typography;
  const [topSellingProductsLoading, setTopSellingProductsLoading] =
    useState(false);
  const [head_card, setHeaderCard] = useState({
    market_id: "",
    total_sales: 0,
    total_expenses: 0,
    total_products: 0,
    todays_sales: 0,
  });
  const [salesOverTime, setSalesOverTime] = useState({
    prodcut_name: "",
    market_id: "",
    market_name: "",
    data: [],
  });
  const [topSellingProducts, setTopSellingProducts] = useState({
    columns: [],
    data: [],
  });
  const [product_id, setProductID] = useState("i3iii3434343409343ewpewopie3");
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const options = [
    {
      value: "Tomato",
      label: "Tomato",
      product_id: "i3iii3434343409343ewpewopie3",
    },
  ];

  // const tempHeadCard = {
  //   market_id: "skdj9932-0wl-3o2=w=3-",
  //   total_products: 18,
  //   total_sales: 15,
  //   total_expenses: 5,
  //   todays_sales: 3,
  // };

  // const tempSalesOverTime = {
  //   prodcut_name: "Wheat",
  //   market_id: "skdj9932-0wl-3o2=w=3-",
  //   market_name: "Chickpet",
  //   data: [
  //     {
  //       time: "8:00",
  //       avg_price: "40",
  //     },
  //     {
  //       time: "9:00",
  //       avg_price: "42",
  //     },
  //     {
  //       time: "10:00",
  //       avg_price: "45",
  //     },
  //     {
  //       time: "11:00",
  //       avg_price: "44",
  //     },
  //     {
  //       time: "12:00",
  //       avg_price: "41",
  //     },
  //     {
  //       time: "1:00",
  //       avg_price: "38",
  //     },
  //     {
  //       time: "2:00",
  //       avg_price: "39",
  //     },
  //     {
  //       time: "3:00",
  //       avg_price: "43",
  //     },
  //     {
  //       date_time: "4:00",
  //       avg_price: "48",
  //     },
  //     {
  //       time: "5:00",
  //       avg_price: "50",
  //     },
  //     {
  //       time: "6:00",
  //       avg_price: "43",
  //     },
  //     {
  //       time: "7:00",
  //       avg_price: "42",
  //     },
  //     {
  //       time: "8:00",
  //       avg_price: "47",
  //     },
  //   ],
  // };

  const tempTopSellingProducts = {
    columns: [
      {
        title: "",
        dataIndex: "img",
        key: "img",
        width: "100px",
      },
      {
        title: "Product Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
      },
      {
        title: "Sub Category",
        dataIndex: "subcategory",
        key: "subcategory",
      },
      {
        title: "Price (₹)",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Sold (₹)",
        dataIndex: "sold",
        key: "sold",
      },
    ],
    data: [
      {
        img: "https://images.unsplash.com/photo-1553395572-0ef353a212bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
        name: "Tomato",
        category: "Vegetable",
        subcategory: "Salad",
        price: "16.01",
        sold: "17.81",
      },
      {
        img: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
        name: "Apple",
        category: "Fruit",
        subcategory: "",
        price: "17.31",
        sold: "17.14",
      },
      {
        img: "https://cdn.shopify.com/s/files/1/0592/9884/0756/products/Bangalorebluegrapes_9a4f5dc4-c11f-4bb7-802a-834bd86652c6_300x.jpg?v=1653647503",
        name: "Grapes",
        category: "Fruit",
        subcategory: "Black",
        price: "17.68",
        sold: "16.9",
      },
    ],
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const geoSuccess = (position) => {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    setLat(lat);
    setLng(lng);
  };

  const geoError = () => {
    alert("Geocoder failed.");
  };

  useEffect(() => {
    getLocation();
    if(lat && lng) {
      getData();
    }
  }, [lat, lng]);

  const getData = () => {
    setLoading(true);
    // setHeaderCard(tempHeadCard);
    // setSalesOverTime(tempSalesOverTime);
    setTopSellingProducts(tempTopSellingProducts);
    // return; // TODO : Once API integrated remove above lines
    debugger
    // getOverViewData
    return fetch(`https://hackathon-team-rolex-backend-i7cl3cs44q-uc.a.run.app/api/v1/home/getOverViewData?lat=${lat}&lng=${lng}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"eyJ0eXAiOiJKV1QiLCPRASHanthGVudGl0eSI6IlRFTVAzODEzODE4MjIxNjI2NjY3OTI1IiwiZXreddyfGiHsHJniGqehU5cUPx"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        //body: JSON.stringify({ lat: lat, lng: lng, product_id: product_id }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res && res.content && res.content.head_card) {
          setHeaderCard(res.content.head_card);
        }
        return res && res.head_card && res.head_card.market_id
          ? res.head_card.market_id
          : "";
      })
      .then((market_id) => {
        // topSellingProductPredictionGraph
        return fetch(`https://hackathon-team-rolex-backend-i7cl3cs44q-uc.a.run.app/api/v1/product/topSellingProductPredictionGraph?product_id=${product_id}`,  {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "Authorization":"eyJ0eXAiOiJKV1QiLCPRASHanthGVudGl0eSI6IlRFTVAzODEzODE4MjIxNjI2NjY3OTI1IiwiZXreddyfGiHsHJniGqehU5cUPx"
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          //body: JSON.stringify({ lat: lat, lng: lng, product_id: product_id }),
      });
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res && res.content) {
          setSalesOverTime(res.content);
        }
        return res && res.content && res.content.market_id ? res.content.market_id : "";
      })
      .then((market_id) => {
        // getTopSellingProducts
        return fetch(
          `${`api_endpoint`}/getTopSellingProducts?market_id=${market_id}`
        );
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res && res.data && res.data.length) {
          setSalesOverTime(res);
        }
      }).catch(err => {
        return err;
      }).finally(() => {
        setLoading(false);
      })
  };

  const getLoader = () => {
    return (
      <div className="loader">
        <Spin tip="Loading..." />
      </div>
    );
  };

  const parseColumns = (table) => {
    let columns = table && table.columns ? table.columns : [];
    let data = table && table.data ? table.data : [];
    if (!columns || !columns.length || !data || !data.length) {
      return [];
    }
    let filterOptions = {
      name: [],
      category: [],
      subcategory: [],
    };
    data.map((ele) => {
      ele = Object.assign({}, ele);
      for (let field in ele) {
        let value = ele[field];
        if (field === "name") {
          let name = filterOptions.name;
          let status = name.filter((obj) => obj.value === value);
          if ((!status || !status.length) && value) {
            name.push({ text: value, value: value });
          }
          filterOptions.name = name;
        }
        if (field === "category") {
          let category = filterOptions.category;
          let status = category.filter((obj) => obj.value === value);
          if ((!status || !status.length) && value) {
            category.push({ text: value, value: value });
          }
          filterOptions.category = category;
        }
        if (field === "subcategory") {
          let subcategory = filterOptions.subcategory;
          let status = subcategory.filter((obj) => obj.value === value);
          if ((!status || !status.length) && value) {
            subcategory.push({ text: value, value: value });
          }
          filterOptions.subcategory = subcategory;
        }
      }
    });
    columns.map((ele, index) => {
      ele = Object.assign({}, ele);
      if (ele.key === "name") {
        ele["filters"] = filterOptions.name;
        ele["filterMode"] = "tree";
        ele["filterSearch"] = true;
        ele["onFilter"] = (value, record) =>
          record && record.name && record.name.includes(value);
      }
      if (ele.key === "category") {
        ele["filters"] = filterOptions.category;
        ele["filterMode"] = "tree";
        ele["filterSearch"] = true;
        ele["onFilter"] = (value, record) =>
          record && record.category && record.category.includes(value);
      }
      if (ele.key === "subcategory") {
        ele["filters"] = filterOptions.subcategory;
        ele["filterMode"] = "tree";
        ele["filterSearch"] = true;
        ele["onFilter"] = (value, record) =>
          record && record.subcategory && record.subcategory.includes(value);
      }
      columns[index] = ele;
    });
    return columns;
  };

  const parseData = (table) => {
    if(!salesOverTime || !salesOverTime.data || !salesOverTime.data.length) {
      return [];
    }
    // let columns = table && table.columns ? table.columns : [];
    let data = table && table.data ? table.data : [];
    if (!data || !data.length) {
      return [];
    }
    data.map((ele, index) => {
      ele = Object.assign({}, ele);
      if (ele && ele.img) {
        ele["img"] = (
          <img src={`${ele.img}`} alt="" className="avatar-sm mr-10" />
        );
      }
      data[index] = ele;
    });
    return data;
  };

  if(loading === true) {
    return (
      <div className="loader">
        <Spin tip="Loading product..." />
      </div>
    );
 } 


  return (
    <>
      <div className="layout-content">
        <div style={{ top: "30px", right: "190px", position: "absolute" }}>
          <Select
            placeholder="Select Product"
            defaultValue={product_id}
            onChange={(event) => {
              setProductID(event && event.product_id ? event.product_id : "i3iii3434343409343ewpewopie3")
              getData(event);
            }}
            options={options}
          />
        </div>
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={4} xl={4} className="mb-24">
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col>
                    <span>Total Product</span>
                    <Title level={3}>
                     {head_card && head_card.total_products}
                    </Title>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={5} xl={5} className="mb-24">
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col>
                    <span>Total Sales Target</span>
                    <Title level={3}>
                    ₹ {head_card && head_card.total_sales}
                    </Title>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={5} xl={5} className="mb-24">
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col>
                    <span>Total Sales</span>
                    <Title level={3}>
                    ₹ {head_card && head_card.todays_sales}
                    </Title>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={5} xl={5} className="mb-24">
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col>
                    <span>Total Expenses</span>
                    <Title level={3}>
                    ₹ {head_card && head_card.total_expenses}
                    </Title>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={5} xl={5} className="mb-24">
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col>
                    <span>Total Profit</span>
                    <Title level={3}>
                    ₹ {head_card && head_card.total_profit}
                    </Title>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart salesOverTime={salesOverTime} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <GoogleMap height="350px" list={false} />
              <div
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                <NavLink 
                  to="/exploremarket"
                >
                  {" "}
                  Explore Market <ArrowRightOutlined />
                </NavLink>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Top Selling Products"
              extra={
                <Space direction="vertical" size={12}>
                  <RangePicker
                    onChange={(range) => {
                      let startDate = new Date().getTime();
                      let endDate = new Date().getTime();
                      if (range) {
                        startDate = range[0];
                        endDate = range[1];
                        startDate = moment(startDate).toDate();
                        startDate = `${new Date(
                          startDate
                        ).getFullYear()}-${new Date(
                          startDate
                        ).getMonth()}-${new Date(startDate).getDate()}`;
                        startDate = new Date(startDate).getTime();
                        endDate = moment(endDate).toDate();
                        endDate = `${new Date(
                          endDate
                        ).getFullYear()}-${new Date(
                          endDate
                        ).getMonth()}-${new Date(endDate).getDate()}`;
                        endDate = new Date(endDate).getTime();
                        console.log(startDate, endDate);
                      }
                      // TODO: Make API Call and get Top Selling Products and set the state
                      setTopSellingProductsLoading(true);
                      setTimeout(() => {
                        setTopSellingProductsLoading(false);
                      }, 2000);
                    }}
                  />
                </Space>
              }
            >
              <div className="table-responsive">
                {topSellingProductsLoading ? (
                  getLoader()
                ) : (
                  <Table
                    columns={parseColumns(topSellingProducts)}
                    dataSource={parseData(topSellingProducts)}
                    pagination={false}
                    className="ant-border-space"
                  />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Overview;
