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
  Row,
  Col,
  Card,
  // Radio,
  Table,
  // Upload,
  // message,
  // Progress,
  Button,
  // Avatar,
  // Typography,
  Modal,
  Form,
  Input,
  notification,
  // Spin,
  // Alert,
} from "antd";
import {  CheckCircleOutlined } from "@ant-design/icons";
// import { ToTopOutlined, SmileOutlined, CheckCircleOutlined } from "@ant-design/icons";
import './style.css';

function ProductList() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState({ name: "", img: "", category: "", subcategory: "", price: ""});
  const [shouldValidate, setShouldValidate] = useState(0);
  const [formLoading, setFormLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const table = {
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
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
    ],
    data: [
      {
        img: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-250x250.jpg",
        name: "Apple",
        category: "Fruit",
        subcategory: "",
        price: "₹16.8",
      },
      {
        img: "https://images.unsplash.com/photo-1553395572-0ef353a212bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
        name: "Tomato",
        category: "Vegetable",
        subcategory: "Salad",
        price: "₹17.00",
      },
      {
        img: "https://cdn.shopify.com/s/files/1/0592/9884/0756/products/Bangalorebluegrapes_9a4f5dc4-c11f-4bb7-802a-834bd86652c6_300x.jpg?v=1653647503",
        name: "Grapes",
        category: "Fruit",
        subcategory: "Black",
        price: "₹16.89",
      },
    ],
  };

  useEffect(() => {
    // TODO: Make API Call to get Products and then set loading to false
    if(loading) {
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    }
  }, [loading]);
  
  // const getLoader = () => {
  //   return (
  //     <div className="loader">
  //       <Spin tip="Refreshing..." />
  //     </div>
  //   )
  // }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const getModal = () => {
    return (
      <Modal
        title="Product Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        style={{
          top: 10,
        }}
        okText={formLoading ? 'Adding Product' : 'Add Product'}
        confirmLoading={formLoading}
      >
        <Form layout="vertical" autoComplete="off">
          <Form.Item label="Product Name" validateStatus="success">
            <Input
              placeholder="Name"
              id="name"
              onChange={(e) => handleInputChange(e)}
            />
            <span className="required_field_missing">
              {shouldValidate && (!form.name || !form.name.length)
                ? `Product name is missing`
                : ""}
            </span>
          </Form.Item>
          <Form.Item label="Product Image" validateStatus="success">
            <Input
              placeholder="URL link"
              id="img"
              onChange={(e) => handleInputChange(e)}
            />
            <span className="required_field_missing">
              {shouldValidate && (!form.img || !form.img.length)
                ? "URL link is missing"
                : ""}
            </span>
          </Form.Item>
          <Form.Item label="Category" validateStatus="success">
            <Input
              placeholder="Category"
              id="category"
              onChange={(e) => handleInputChange(e)}
            />
            <span className="required_field_missing">
              {shouldValidate && (!form.category || !form.category.length)
                ? "Category is missing"
                : ""}
            </span>
          </Form.Item>
          <Form.Item label="Sub Category" validateStatus="success">
            <Input
              placeholder="Sub Category"
              id="subcategory"
              onChange={(e) => handleInputChange(e)}
            />
            <span className="required_field_missing">
              {shouldValidate && (!form.subcategory || !form.subcategory.length)
                ? ""
                : ""}
            </span>
          </Form.Item>
          <Form.Item label="Price" validateStatus="success">
            <Input
              placeholder="Price"
              id="price"
              onChange={(e) => handleInputChange(e)}
              type="number"
              min={0}
            />
            <span className="required_field_missing">
              {shouldValidate && (!form.price || !form.price.length)
                ? "Price is missing"
                : ""}
            </span>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const handleInputChange = (e) => {
    const id = e && e.target && e.target.id;
    const value = e && e.target && e.target.value;
    if (id) {
      let updatedForm = form;
      updatedForm[id] = value;
      setForm(updatedForm);
    }
  };

  const openNotification = (message, description, color) => {
    notification.open({
      message: message,
      description: description,
      icon: (
        <CheckCircleOutlined
          style={{
            color: color,
          }}
        />
      ),
      placement: 'bottomRight'
    });
  };

  const handleOk = () => {
    if (!form || !Object.keys(form).length) {
      return;
    }
    let shouldValidateStatus = false;
    for (let key in form) {
      let value = form[key];
      if (!value && key !== "subcategory") {
        shouldValidateStatus = shouldValidate + 1;
      }
    }
    if (shouldValidateStatus) {
      setShouldValidate(shouldValidateStatus);
      return;
    } else {
      setShouldValidate(0);
    }

    // TODO: Set API call to add new product
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setIsModalVisible(false);
      setLoading(true);
      setForm({ name: "", img: "", category: "", subcategory: "", price: ""});
      openNotification('Successfully added the product.', 'Refresh to view.', '#198754');
    }, 3000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          let status = name.filter(obj => obj.value === value);
          if((!status || !status.length) && (value)){
            name.push({ text: value, value: value });
          }
          filterOptions.name = name;
        }
        if (field === "category") {
          let category = filterOptions.category;
          let status = category.filter(obj => obj.value === value);
          if((!status || !status.length) && (value)){
            category.push({ text: value, value: value });
          }
          filterOptions.category = category;
        }
        if (field === "subcategory") {
          let subcategory = filterOptions.subcategory;
          let status = subcategory.filter(obj => obj.value === value);
          if((!status || !status.length) && (value)){
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
  }

  const parseData = (data) => {
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

  // if(loading) {
  //   return getLoader();
  // }

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Products"
              extra={
                <>
                  <Col xs={24} md={24} lg={24} className="d-flex">
                    <Button type="primary" onClick={showModal}>
                      ADD NEW PRODUCT
                    </Button>
                  </Col>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={parseColumns(table)}
                  dataSource={parseData(table && table.data)}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              {getModal()}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProductList;
