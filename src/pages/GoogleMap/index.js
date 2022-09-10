import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import {  useLocation } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import {
  UserOutlined,
  // CloseCircleOutlined,
  // UserDeleteOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import { Popover, Spin, Row, Col, Card, Modal, Table } from "antd";
// import { Button} from "antd";
import LineChart from "../../components/chart/LineChart";

export default function GoogleMap(props) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sellerLoading, setSellerLoading] = useState(false);
  const [activeSellerIndex, setActiveSellerIndex] = useState(-1);
  const [priceLoading, setPriceLoading] = useState(false);
  const [activePriceIndex, setActivePriceIndex] = useState(-1);
  const [nearByMarketData, setNearByMarketData] = useState([]);
  const [productSalesDetail, setProductSalesDetail] = useState({});
  const [productPrediction, setProductPrediction] = useState([]);
  const [isSellersModalVisible, setIsSellersModalVisible] = useState(false);
  const [isPriceAnalysisModalVisible, setIsPriceAnalysisModalVisible] = useState(false);
  const [product_id, setProductID] = useState("i3iii3434343409343ewpewopie3");
  const [market_id, setMarketID] = useState('');
  const seller_columns = [
    {
      title: "Seller Name",
      dataIndex: "seller_name",
      key: "seller_name",
      width: '33%'
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: '33%'
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      width: '33%'
    }
  ]

  // const tempNearByMarketData = {
  //   nearby_markets: [
  //     {
  //       lat: "12.958184",
  //       lng: "77.6421466",
  //       distance: "2.1",
  //       opening_time: "6:30pm",
  //       is_open: true,
  //       market_name: "Shivaji Nagar",
  //       market_id: "ksdioiw-02ow-20wo2-w2-w0w2-0w",
  //       products: [
  //         {
  //           product_name: "wheat",
  //           product_id: "i3iii3434343409343ewpewopie3",
  //           product_img:
  //             "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
  //         },
  //         {
  //           product_name: "wheat",
  //           product_id: "i3iii3434343409343ewpewopie3",
  //           product_img:
  //             "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
  //         },
  //       ],
  //     },
  //     {
  //       lat: "12.95176",
  //       lng: "77.641456",
  //       distance: "4.1",
  //       opening_time: "7:10pm",
  //       is_open: true,
  //       market_name: "Domlur By Pass Market",
  //       market_id: "ksdioiw-02ow-20wo2-w2-w0w2-0w",
  //       products: [
  //         {
  //           product_name: "wheat",
  //           product_id: "i3iii3434343409343ewpewopie3",
  //           product_img:
  //             "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
  //         },
  //         {
  //           product_name: "wheat",
  //           product_id: "i3iii3434343409343ewpewopie3",
  //           product_img:
  //             "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
  //         },
  //       ],
  //     },
  //     {
  //       lat: "12.957184",
  //       lng: "77.6221466",
  //       distance: "6.1",
  //       opening_time: "6:40pm",
  //       is_open: true,
  //       market_name: "Indiranagar Sabji Mandi",
  //       market_id: "ksdioiw-02ow-20wo2-w2-w0w2-0w",
  //       products: [
  //         {
  //           product_name: "wheat",
  //           product_id: "i3iii3434343409343ewpewopie3",
  //           product_img:
  //             "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
  //         },
  //         {
  //           product_name: "wheat",
  //           product_id: "i3iii3434343409343ewpewopie3",
  //           product_img:
  //             "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
  //         },
  //       ],
  //     },
  //     {
  //       lat: "12.948184",
  //       lng: "77.6411466",
  //       distance: "1.1",
  //       opening_time: "7:00pm",
  //       is_open: true,
  //       market_name: "Silk Board",
  //       market_id: "ksdioiw-02ow-20wo2-w2-w0w2-0w",
  //       products: [
  //         {
  //           product_name: "wheat",
  //           product_id: "i3iii3434343409343ewpewopie3",
  //           product_img:
  //             "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
  //         },
  //         {
  //           product_name: "wheat",
  //           product_id: "i3iii3434343409343ewpewopie3",
  //           product_img:
  //             "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
  //         },
  //       ],
  //     },
  //     {
  //       lat: "12.918184",
  //       lng: "77.6221466",
  //       distance: "2.1",
  //       opening_time: "5:00pm",
  //       is_open: true,
  //       market_name: "Raja Ji Nagar",
  //       market_id: "ksdioiw-02ow-20wo2-w2-w0w2-0w",
  //       products: [
  //         {
  //           product_name: "wheat",
  //           product_id: "i3iii3434343409343ewpewopie3",
  //           product_img:
  //             "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
  //         },
  //         {
  //           product_name: "wheat",
  //           product_id: "i3iii3434343409343ewpewopie3",
  //           product_img:
  //             "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
  //         },
  //       ],
  //     },
  //     {
  //       lat: "12.938184",
  //       lng: "77.6621466",
  //       distance: "11.1",
  //       opening_time: "6:00pm",
  //       is_open: true,
  //       market_name: "Shiv Mohan Nagar",
  //       market_id: "ksdioiw-02ow-20wo2-w2-w0w2-0w",
  //       products: [
  //         {
  //           product_name: "wheat",
  //           product_id: "i3iii3434343409343ewpewopie3",
  //           product_img:
  //             "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
  //         },
  //         {
  //           product_name: "wheat",
  //           product_id: "i3iii3434343409343ewpewopie3",
  //           product_img:
  //             "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
  //         },
  //       ],
  //     },
  //   ],
  // };


  // const tempProductSalesDetail = {
  //   "product_name": "Wheat",
  //   "avg_sale_price_lower": "155.",
  //   "avg_sale_price_upper": "155.",
  //   "last_sold_price": "167.50",
  //   "selling_data": [
  //     {
  //       "seller_name": "Surya",
  //       "quantity": "238273789",
  //       "price": ""
  //     },
  //     {
  //       "seller_name": "Surya",
  //       "quantity": "238273789",
  //       "price": ""
  //     },
  //     {
  //       "seller_name": "Surya",
  //       "quantity": "238273789",
  //       "price": ""
  //     }
  //   ]
  // }

  // const tempProductPrediction = {
  //   "total_products" : "",
  //   "total_sales" : "",
  //   "prediction" : [
  //       {
  //         time : "8:00",
  //         avg_price : "40",
  //       },
  //       {
  //         time : "9:00",
  //         avg_price : "42",
  //       }, {
  //         time : "10:00",
  //         avg_price : "45",
  //       }, {
  //         time : "11:00",
  //         avg_price : "44",
  //       }, {
  //         time : "12:00",
  //         avg_price : "41",
  //       }, {
  //         time : "1:00",
  //         avg_price : "38",
  //       }, {
  //         time : "2:00",
  //         avg_price : "39",
  //       }, {
  //         time : "3:00",
  //         avg_price : "43",
  //       }, {
  //         date_time : "4:00",
  //         avg_price : "48",
  //       },  {
  //         time : "5:00",
  //         avg_price : "50",
  //       }, {
  //         time : "6:00",
  //         avg_price : "43",
  //       }, {
  //         time : "7:00",
  //         avg_price : "42",
  //       }, {
  //         time : "8:00",
  //         avg_price : "47",
  //       }
  //     ],
  //   "topselling_poducts" : 
  //     [
  //       {
  //       product_name : "wheat",
  //       category : "Veg",
  //       sold_quantity : "1000",
  //       avg_price_below : "2344",
  //       avg_price_above : "2370"
  //       },{
  //       product_name : "wheat",
  //       category : "Veg",
  //       sold_quantity : "1000",
  //       avg_price_below : "2344",
  //       avg_price_above : "2370"
  //       },{
  //       product_name : "wheat",
  //       category : "Veg",
  //       sold_quantity : "1000",
  //       avg_price_below : "2344",
  //       avg_price_above : "2370"
  //       }
  //     ]
  // }

  useEffect(() => {
    getLocation();
    if (lat && lng) {
      getData();
    }
  }, [lat, lng]);

  const getData = () => {
    setLoading(true);
    // setNearByMarketData(tempNearByMarketData.nearby_markets);
    // setProductSalesDetail(tempProductSalesDetail);
    // setProductPrediction(tempProductPrediction);
    // setLoading(false);
    // return; // TODO: Need to remove once api integerated

    // getnearbymarketdata
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
      body: JSON.stringify({ "lat": lat, "lng": lng, "product_id": product_id}),
    }).then(res => {
      return res.json()
    })
    .then((res) => {
        if (res && res.content) {
          setNearByMarketData(res.content);
        }
        return res;
      }).catch((err) => {
        return err;
      }).finally(() => {
        setLoading(false);
      })
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

  const defaultProps = {
    center: { lat: lat, lng: lng },
  };

  const getMarker = (market) => {
    
    if (!market) {
      return (
        <Popover
          content={
            <div>
              <div>Can't find the current location.</div>
              <div>Check the device has access to map.</div>
            </div>
          }
          title="Lost"
        >
          <div
            style={{
              color: "white",
              background: "#000000D9",
              padding: "10px 10px",
              display: "inline-flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "100%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <UserOutlined />
          </div>
        </Popover>
      );
    }
    const {market_id, ...cords} = market;
    return (
      <div
        key={market && market_id}
        {...cords}
        >
      <Popover
        content={
          <div style={{fontFamily:"poppins"}}>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              {market && market.market_name}
            </div>
            <div>
              <span style={{ fontSize: "16px" }}>
                {(market && market.distance.toFixed(2)) || "0"} km  | 
              </span>{" "}
              {" "}
              <span style={{ fontSize: "16px", color: "#6236FF" }}>
                {" "}
               Open till {(market && market.opening_time) || "0:00 AM"}
              </span>
            </div>
          </div>
        }
        title={
          <img
            height={120}
            width={200}
            alt="Product"
            src={
              market &&
              market.products &&
              market.products[0] &&
              market.products[0].product_img
                ? market.products[0].product_img
                : "https://images.unsplash.com/photo-1553395572-0ef353a212bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                
            }
          />
        }
      >
        <div
          style={{
            color: "white",
            background: "#000000D9",
            padding: "10px 10px",
            display: "inline-flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
          }}
        >
          <UserOutlined />
        </div>
      </Popover>
      </div>
    );
  };

  const getNearByMarketsMarker = (nearByMarketData) => {
    if (!nearByMarketData || !nearByMarketData.length) {
      return getMarker();
    }
    let markets_markers = [];
    nearByMarketData.map((market, marketIndex) => {
      markets_markers.push(getMarker(market));
    });
    return markets_markers;
  };

  const getSellerDetails = () => {
    if(!product_id || !market_id) {
      return;
    }
    setSellerLoading(true);
    return fetch(`https://server2hackathon-i7cl3cs44q-el.a.run.app/api/v1/product/productSalesDetail?product_id=${product_id}`, {
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
      //body: JSON.stringify({  }),
    }).then(res => {
      return res.json();
    }).then(res => {
      if(res && res.content) {
        setProductSalesDetail(res.content);
        setIsSellersModalVisible(true);
      }
      return res;
    }).catch(err => {
      return err
    }).finally(() => {
      setSellerLoading(false);
    })
  }

  const getSellersModal = (productSalesDetail) => {
    return (
      <Modal
        title={<div style={{ fontSize: "18px", fontWeight: "bold" }}>Product detail</div>}
        visible={isSellersModalVisible}
        onOk={() => {setIsSellersModalVisible(false); setActiveSellerIndex(-1); setSellerLoading(false); }}
        onCancel={() => {setIsSellersModalVisible(false); setActiveSellerIndex(-1); setSellerLoading(false); }}
        width={700}
        style={{
          top: 10,
        }}
      >
        <Row>
         <Col span={4}>
          <img
            height={70}
            width={70}
            src={"https://images.unsplash.com/photo-1553395572-0ef353a212bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"}
              />
          </Col>
         <Col span={11} style={{marginTop: '10px'}}>
          <div style={{ fontSize: "14px", fontWeight: "600"}}>{productSalesDetail && productSalesDetail.product_name ? productSalesDetail.product_name : "-" }</div>
          <div style={{ fontSize: "12px", color: 'grey'}}>{productSalesDetail && productSalesDetail.category ? productSalesDetail.category : "--" }</div>
         </Col>
         <Col span={9} style={{marginTop: '10px'}}>
          <div><span><text style={{color: 'grey'}}>Price: </text> {productSalesDetail && productSalesDetail.avg_sale_price_upper ? "₹" + productSalesDetail.avg_sale_price_lower + " - " + "₹" + productSalesDetail.avg_sale_price_upper : "-" }</span> <span style={{marginLeft: '20px'}}><text style={{color: 'grey'}}>Sold: </text> {productSalesDetail && productSalesDetail.last_sold_price ? " ₹" +productSalesDetail.last_sold_price  : "-" }</span></div>
         </Col>
        </Row>
        <div className="table-responsive" style={{backgroundColor: 'yellow', marginTop: '20px'}}>
          <Table
            columns={seller_columns}
            dataSource={productSalesDetail && productSalesDetail.selling_data ? productSalesDetail.selling_data : [] }
            pagination={false}
            className="ant-border-space"
          />
        </div>
      </Modal>
    );
  };

  const getPriceAnalysisDetails = () => {
    if(!product_id || !market_id) {
      return;
    }
    setPriceLoading(true);
    return fetch(`https://server2hackathon-i7cl3cs44q-el.a.run.app/api/v1/product/getProductPrediction`, {
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
      body: JSON.stringify({ product_id: product_id, market_id: market_id })
    }).then(res => {
      return res.json();
    }).then(res => {
      if(res && res.content) {
        setProductPrediction(res.content);
        setIsPriceAnalysisModalVisible(true);
      }
      return res;
    }).catch(err => {
      return err
    }).finally(() => {
      setPriceLoading(false);
    })
  }

  const getPriceAnalysisModal = (productPrediction) => {
    return (
      <Modal
        title={<div style={{ fontSize: "18px", fontWeight: "bold"}}>Price Analysis</div>}
        visible={isPriceAnalysisModalVisible}
        onOk={() => {setIsPriceAnalysisModalVisible(false); setPriceLoading(false); setActivePriceIndex(-1); }}
        onCancel={() => {setIsPriceAnalysisModalVisible(false); setPriceLoading(false); setActivePriceIndex(-1); }}
        width={700}
        style={{
          top: 10,
        }}
      >
        <LineChart productPrediction={productPrediction} />
      </Modal>
    );
  };

  const getNearByMarketsList = () => {
    if (!nearByMarketData || !nearByMarketData.length) {
      return <div style={{flex: '1', flexDirection: 'row', justifyContent: 'center', verticalAlign: 'center', marginLeft: '100px', marginTop: '250px'}}>Couldn't find any market.</div>;
    }
    let markets_list = [];
    nearByMarketData.map((market, marketIndex) => {
      markets_list.push(
        <>
          <div style={{ height: "10px" }}></div>
          <Card bordered={true} className="criclebox" style={{marginRight: '10px'}}>
            <div className="number">
              <Row align="middle" gutter={[24, 0]}>
                <Col span={8}>
                  <img
                    height={120}
                    width={200}
                    src={
                      market &&
                      market.products &&
                      market.products[0] && 
                      market.products[0].product_img
                        ? market.products[0].product_img
                        : "https://images.unsplash.com/photo-1553395572-0ef353a212bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                    }
                  />
                </Col>
                <Col span={16}>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                      {market && market.market_name}
                    </div>
                    <div>
                      <span style={{ fontSize: "14px" }}>
                        {(market && market.distance.toFixed(2)) || "--"} km
                      </span>{" "}
                      |{" "}
                      <span style={{ fontSize: "14px" }}>
                        {" "}
                        Open till {(market && market.opening_time) || "0:00 AM"}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: "12px", color: "#6236FF", cursor: "pointer" }} onClick={(event) => {
                        setMarketID(market && market.market_id);
                        setActivePriceIndex(marketIndex)
                        getPriceAnalysisDetails();
                      }}>
                         {priceLoading && activePriceIndex === marketIndex? 'loading...' : 'Price Analysis'}
                      </span>{" "}
                      |{" "}
                      <span style={{ fontSize: "12px", color: "#6236FF",cursor: "pointer"  }} onClick={(event) => {
                        setMarketID(market && market.market_id);
                        setActiveSellerIndex(marketIndex)
                        getSellerDetails();
                      }}>
                        {" "}
                        {sellerLoading && activeSellerIndex === marketIndex? 'loading...' : 'Sellers'}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </>
      );
    });
    return (
      <Card bordered={false} className="criclebox" style={{height: '82vh',}}>
        <div style={{ height: "30px", fontSize: "18px", fontWeight: "bold" }}>
          {" "}
          Markets near you 
          <NavLink 
            to={{
              pathname:'/marketcomparison',
              product_id: 'i3iii3434343409343ewpewopie3',
              lat: lat, 
              lng: lng
            }}
          >
            <span style={{textAlign: 'center', fontSize: "12px", fontWeight: "bold", color: "#6236FF", marginLeft : '60px'}}>Compare {" "} <ArrowRightOutlined style={{marginLeft: '5px'}} /> </span></NavLink>
        </div>
        <div style={{height: '80vh', overflowY: 'scroll'}}>
          {markets_list}
        </div>
      </Card>
    );
  };

  const getLoader = () => {
    return (
      <div className="loader">
        <Spin tip="Loading nearby market places..." />
      </div>
    );
  };

  if (loading) {
    return getLoader();
  }

  return (
    <>
      {props && props.list === false ? (
        <div
          style={{
            height: props.height ? props.height : "100vh",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyAEOh1BzaTAkKGmvIKyvfXrBGbW9_q3uAI" }}
            defaultCenter={defaultProps.center}
            defaultZoom={12}
          >
            {getNearByMarketsMarker(nearByMarketData)}
          </GoogleMapReact>
        </div>
      ) : (
        <Row>
          <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
            <div
              style={{
                height: props.height ? props.height : "100vh",
                width: "100%",
                marginBottom: "30px",
              }}
            >
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAEOh1BzaTAkKGmvIKyvfXrBGbW9_q3uAI" }}
                defaultCenter={defaultProps.center}
                defaultZoom={10}
              >
                {getNearByMarketsMarker(nearByMarketData)}
              </GoogleMapReact>
            </div>
          </Col> 
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            {getNearByMarketsList(nearByMarketData)}
          </Col>
        </Row>
      )}

      {getSellersModal(productSalesDetail)}
      {getPriceAnalysisModal(productPrediction)}
    </>
  );
}
