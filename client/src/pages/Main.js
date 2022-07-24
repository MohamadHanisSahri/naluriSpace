import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Button, Layout, Modal, Form, Input, InputNumber } from "antd";
import logo from "../assets/NaluriLogo.png";
import TableMaster from "../components/table/tableMaster";
import {
  useGetAllPlanetQuery,
  usePostPlanetMutation,
  usePutPlanetMutation,
  useDeletePlanetMutation,
} from "../services/naluriEndpoints";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const Main = () => {
  const [form] = Form.useForm();
  const { data: allPlanet } = useGetAllPlanetQuery();
  const [postPlanet] = usePostPlanetMutation();
  const [putPlanet] = usePutPlanetMutation();
  const [deletePlanet] = useDeletePlanetMutation();
  const [planetNameState, setPlanetNameState] = useState("");
  const [planetIdState, setPlanetIdState] = useState("");
  const [planetDiameterState, setPlanetDiameterState] = useState("");
  const [planetCircumferenceState, setPlanetCircumferenceState] = useState("");
  const [piDigitState, setPiDigitState] = useState("");
  const [piValueApproxState, setPiValueApproxState] = useState("");

  // ------------------------------------------------------------------Delete
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const showDeleteModal = (planetId) => {
    Modal.confirm({
      title: "Delete Planet",
      icon: <ExclamationCircleOutlined />,
      content: "Confirm to delete this planet?",
      onOk: () => deletePlanet(planetId),
    });
  };
  const handleDeleteModalOk = (planetId) => {
    deletePlanet(planetId);
    setIsDeleteModalVisible(false);
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
  };

  // ------------------------------------------------------------------Edit
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const showEditModal = (planetDataEditProps) => {
    setPlanetNameState(planetDataEditProps.name);
    setPlanetIdState(planetDataEditProps.id);
    setPlanetDiameterState(planetDataEditProps.diameter);
    setPlanetCircumferenceState(planetDataEditProps.circumference);
    setPiDigitState(planetDataEditProps.digit);
    setPiValueApproxState(planetDataEditProps.valueApprox);
    setIsEditModalVisible(true);
  };
  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };
  // ------------------------------------------------------------------Add
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
  };
  // ------------------------------------------------------------------View
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const showViewModal = (planetDataViewProps) => {
    setPlanetNameState(planetDataViewProps.name);
    setPlanetIdState(planetDataViewProps.id);
    setPlanetDiameterState(planetDataViewProps.diameter);
    setPlanetCircumferenceState(planetDataViewProps.circumference);
    setPiDigitState(planetDataViewProps.digit);
    setPiValueApproxState(planetDataViewProps.valueApprox);
    setIsViewModalVisible(true);
  };

  const handleViewModalCancel = () => {
    setIsViewModalVisible(false);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
    calculate: {},
  };
  /* eslint-enable no-template-curly-in-string */

  useEffect(() => {
    form.setFieldsValue({
      name: planetNameState,
      diameter: planetDiameterState,
    });
  }, [form, planetIdState]);

  const onFinish = (values) => {
    setIsAddModalVisible(false);
    form.resetFields();
    postPlanet(values.planet);
  };

  const onFinishEdit = (values) => {
    setIsEditModalVisible(false);
    form.resetFields();
    putPlanet({ ...values, id: planetIdState, digit: piDigitState });
  };
  return (
    <>
      {/* --------------------------------------------------------------------Modal Delete */}
      <Modal
        title="Delete Planet"
        visible={isDeleteModalVisible}
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
      >
        <p>Confirm to delete planet?</p>
      </Modal>
      {/* --------------------------------------------------------------------Modal View */}

      <Modal
        title="View Planet Details"
        visible={isViewModalVisible}
        onCancel={handleViewModalCancel}
        footer={null}
      >
        <Form {...layout} name="view-planet">
          <Form.Item label="Planet Name">{planetNameState}</Form.Item>
          <Form.Item label="Planet Diameter">{planetDiameterState}</Form.Item>
          <Form.Item label="Planet Circumference">
            {planetCircumferenceState}
          </Form.Item>
          <Form.Item label="Pi Digit">{piDigitState}</Form.Item>
          <Form.Item label="Pi Value Approximation">
            {piValueApproxState}
          </Form.Item>
        </Form>
      </Modal>
      {/* --------------------------------------------------------------------Modal Edit */}
      <Modal
        title="Edit Planet"
        visible={isEditModalVisible}
        footer={null}
        onCancel={handleEditModalCancel}
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={onFinishEdit}
          initialValues={{
            name: planetNameState,
            diameter: planetDiameterState,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={"name"}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"diameter"}
            label="Diameter"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          {/* <Form.Item
            name={"digit"}
            label="Digit"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                max: 15,
              },
            ]}
          >
            <InputNumber />
          </Form.Item> */}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={(e) => {
                this.props.form.resetFields();
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* --------------------------------------------------------------------Modal Add */}
      <Modal
        title="Add New Discovered Planet"
        visible={isAddModalVisible}
        footer={null}
        onCancel={handleAddModalCancel}
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["planet", "name"]}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["planet", "diameter"]}
            label="Diameter"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          {/* <Form.Item
            name={["planet", "digit"]}
            label="Digit"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                max: 15,
              },
            ]}
          >
            <InputNumber />
          </Form.Item> */}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div src={logo}>
            <img className="logo" width="150" src={logo} alt="naluriLogo"></img>
          </div>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 114 }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 765,
            }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showAddModal}
            >
              Add New Discovered Planet
            </Button>
            <TableMaster
              dataSource={allPlanet}
              addModal={showAddModal}
              editModal={showEditModal}
              viewModal={showViewModal}
              deleteModal={showDeleteModal}
            />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Naluri Space Sdn. Bhd.
        </Footer>
      </Layout>
    </>
  );
};

export default Main;
