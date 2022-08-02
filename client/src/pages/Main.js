import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import {
  Button,
  Layout,
  Modal,
  Form,
  Input,
  InputNumber,
  Spin,
  notification,
  Tabs,
} from "antd";
import logo from "../assets/NaluriLogo.png";
import TableMaster from "../components/table/tableMaster";
import {
  useGetAllPlanetQuery,
  usePostPlanetMutation,
  usePutPlanetMutation,
  useDeletePlanetMutation,
  useGetPlanets_PGSQLQuery,
  usePostPlanet_PGSQLMutation,
  usePutPlanet_PGSQLMutation,
  useDeletePlanet_PGSQLMutation,
} from "../services/naluriEndpoints";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import TableMasterVersion2 from "../components/table/tableMasterVersion2";
import { useSelector, useDispatch } from "react-redux";
import { planetActions } from "../store/planet-slice";

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

const Main = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const diameter = useSelector((state) => state.planet.diameter);
  const [planetNameState, setPlanetNameState] = useState("");
  const [planetIdState, setPlanetIdState] = useState("");
  const [planetDiameterState, setPlanetDiameterState] = useState("");
  const [planetCircumferenceState, setPlanetCircumferenceState] = useState("");
  const [piDigitState, setPiDigitState] = useState("");
  const [piValueApproxState, setPiValueApproxState] = useState("");
  const [planetRadiusState, setPlanetRadiusState] = useState("");
  const [spinLoadingState, setSpinLoadingState] = useState(false);
  const componentFirstLoad = useRef(true);

  // ---------------------------------------------------------------------for pgsql

  // --------------------------------------------get for pgsql
  const {
    data: getPlanets_PGSQL,
    isSuccess: getPlanetsIsSuccess_PGSQL,
    isLoading: getPlanetsIsLoading_PGSQL,
    isError: getPlanetsIsError_PGSQL,
    error: getPlanetsError_PGSQL,
  } = useGetPlanets_PGSQLQuery();

  useEffect(() => {
    if (componentFirstLoad.current) {
      componentFirstLoad.current = false;
      return;
    }
    if (getPlanetsIsLoading_PGSQL) {
      setSpinLoadingState(true);
    }
    if (getPlanetsIsSuccess_PGSQL) {
      setSpinLoadingState(false);
    }
    if (getPlanetsIsError_PGSQL) {
      notification["error"]({
        message: "Error Occur!",
        description: `${getPlanetsError_PGSQL.data.errorMessage}`,
      });
      setSpinLoadingState(false);
    }
  }, [
    getPlanetsIsLoading_PGSQL,
    getPlanetsIsSuccess_PGSQL,
    getPlanetsIsError_PGSQL,
    getPlanetsError_PGSQL,
  ]);

  // --------------------------------------------view modal for pgsql
  const [isViewModalVisible_PGSQL, setIsViewModalVisible_PGSQL] =
    useState(false);
  const showViewModal_PGSQL = (props) => {
    setPlanetNameState(props.name);
    setPlanetIdState(props.id);
    setPlanetDiameterState(props.diameter);
    setPlanetCircumferenceState(props.circumference);
    setPiDigitState(props.digit);
    setPlanetRadiusState(+props.diameter / 2);
    setPiValueApproxState(props.valueApprox);
    setIsViewModalVisible_PGSQL(true);
  };

  const handleViewModalCancel_PGSQL = () => {
    setPlanetNameState("");
    setPlanetIdState("");
    setPlanetDiameterState("");
    setPlanetCircumferenceState("");
    setPiDigitState("");
    setPiValueApproxState("");
    setPlanetRadiusState("");
    setIsViewModalVisible_PGSQL(false);
  };

  // --------------------------------------------post for pgsql
  const [
    postPlanet_PGSQL,
    {
      data: postPlanetData_PGSQL,
      isSuccess: postPlanetIsSuccess_PGSQL,
      isError: postPlanetIsError_PGSQL,
      error: postPlanetError_PGSQL,
      isLoading: postPlanetIsLoading_PGSQL,
    },
  ] = usePostPlanet_PGSQLMutation();

  useEffect(() => {
    if (componentFirstLoad.current) {
      componentFirstLoad.current = false;
      return;
    }
    if (postPlanetIsLoading_PGSQL) {
      setSpinLoadingState(true);
    }
    if (postPlanetIsSuccess_PGSQL) {
      notification["success"]({
        message: "Successful!",
        description: `${postPlanetData_PGSQL.successMessage}`,
      });
      setSpinLoadingState(false);
    }
    if (postPlanetIsError_PGSQL) {
      notification["error"]({
        message: "Error Occur!",
        description: `${postPlanetError_PGSQL.data}`,
      });
      setSpinLoadingState(false);
    }
  }, [
    postPlanetIsLoading_PGSQL,
    postPlanetIsError_PGSQL,
    postPlanetIsSuccess_PGSQL,
    postPlanetData_PGSQL,
    postPlanetError_PGSQL,
  ]);

  // -------------------------------------------- add modal for pgsql
  const [isAddModalVisible_PGSQL, setIsAddModalVisible_PGSQL] = useState(false);
  const showAddModal_PGSQL = () => {
    setIsAddModalVisible_PGSQL(true);
  };
  const handleAddModalCancel_PGSQL = () => {
    setIsAddModalVisible_PGSQL(false);
  };

  // --------------------------------------------put for pgsql
  const [
    putPlanet_PGSQL,
    {
      isSuccess: putPlanetIsSuccess_PGSQL,
      data: putPlanetData_PGSQL,
      isLoading: putPlanetIsLoading_PGSQL,
      isError: putPlanetIsError_PGSQL,
      error: putPlanetError_PGSQL,
    },
  ] = usePutPlanet_PGSQLMutation();

  useEffect(() => {
    if (componentFirstLoad.current) {
      componentFirstLoad.current = false;
      return;
    }
    if (putPlanetIsLoading_PGSQL) {
      setSpinLoadingState(true);
    }
    if (putPlanetIsSuccess_PGSQL) {
      notification["success"]({
        message: "Successful!",
        description: `${putPlanetData_PGSQL.successMessage}`,
      });
      setSpinLoadingState(false);
    }
    if (putPlanetIsError_PGSQL) {
      notification["error"]({
        message: "Error Occur!",
        description: `${putPlanetError_PGSQL.data.errorMessage}`,
      });
      setSpinLoadingState(false);
    }
  }, [
    putPlanetIsLoading_PGSQL,
    putPlanetIsSuccess_PGSQL,
    putPlanetIsError_PGSQL,
    putPlanetData_PGSQL,
    putPlanetError_PGSQL,
  ]);

  // --------------------------------------------put Modal for pgsql
  const [isEditModalVisible_PGSQL, setIsEditModalVisible_PGSQL] =
    useState(false);
  const showEditModal_PGSQL = (props) => {
    dispatch(planetActions.diameterHandler(props.diameter));
    setPlanetNameState(props.name);
    setPlanetIdState(props.id);
    setPlanetDiameterState(props.diameter);
    setPlanetCircumferenceState(props.circumference);
    setPiDigitState(props.digit);
    setPiValueApproxState(props.valueApprox);
    setPlanetRadiusState(+props.diameter / 2);
    setIsEditModalVisible_PGSQL(true);
  };
  const handleEditModalCancel_PGSQL = () => {
    setPlanetNameState("");
    setPlanetIdState("");
    setPlanetDiameterState("");
    setPlanetCircumferenceState("");
    setPiDigitState("");
    setPiValueApproxState("");
    setPlanetRadiusState("");
    setIsEditModalVisible_PGSQL(false);
  };

  // --------------------------------------------delete for pgsql
  const [
    deletePlanet_PGSQL,
    {
      data: deletePlanetData_PGSQL,
      isSuccess: deletePlanetIsSuccess_PGSQL,
      isLoading: deletePlanetIsLoading_PGSQL,
      isError: deletePlanetIsError_PGSQL,
      error: deletePlanetError_PGSQL,
    },
  ] = useDeletePlanet_PGSQLMutation();

  useEffect(() => {
    if (componentFirstLoad.current) {
      componentFirstLoad.current = false;
      return;
    }
    if (deletePlanetIsLoading_PGSQL) {
      setSpinLoadingState(true);
    }
    if (deletePlanetIsSuccess_PGSQL) {
      notification["success"]({
        message: "Successful!",
        description: `${deletePlanetData_PGSQL.successMessage}`,
      });
      setSpinLoadingState(false);
    }
    if (deletePlanetIsError_PGSQL) {
      notification["error"]({
        message: "Error Occur!",
        description: `${deletePlanetError_PGSQL.data.errorMessage}`,
      });
      setSpinLoadingState(false);
    }
  }, [
    deletePlanetIsLoading_PGSQL,
    deletePlanetIsSuccess_PGSQL,
    deletePlanetIsError_PGSQL,
    deletePlanetData_PGSQL,
    deletePlanetError_PGSQL,
  ]);

  // --------------------------------------------delete modal for pgsql
  const [isDeleteModalVisible_PGSQL, setIsDeleteModalVisible_PGSQL] =
    useState(false);
  const showDeleteModal_PGSQL = (planet_Id) => {
    Modal.confirm({
      title: "Delete Planet",
      icon: <ExclamationCircleOutlined />,
      content: "Confirm to delete this planet?",
      onOk: () => deletePlanet_PGSQL(planet_Id),
    });
  };
  const handleDeleteModalOk_PGSQL = (planet_Id) => {
    deletePlanet(planet_Id);
    setIsDeleteModalVisible_PGSQL(false);
  };
  const handleDeleteModalCancel_PGSQL = () => {
    setIsDeleteModalVisible_PGSQL(false);
  };

  // -----------------------------------------------------------------------------for mysql

  // --------------------------------------------get for mysql
  const {
    data: allPlanet,
    isSuccess: getPlanetsIsSuccess,
    isLoading: getPlanetsIsLoading,
    isError: getPlanetsIsError,
    error: getPlanetsError,
  } = useGetAllPlanetQuery();

  useEffect(() => {
    if (componentFirstLoad.current) {
      componentFirstLoad.current = false;
      return;
    }
    if (getPlanetsIsLoading) {
      setSpinLoadingState(true);
    }
    if (getPlanetsIsSuccess) {
      setSpinLoadingState(false);
    }
    if (getPlanetsIsError) {
      notification["error"]({
        message: "Error Occur!",
        description: `${getPlanetsError.data.errorMessage}`,
      });
      setSpinLoadingState(false);
    }
  }, [
    getPlanetsIsLoading,
    getPlanetsIsSuccess,
    getPlanetsIsError,
    getPlanetsError,
  ]);

  // --------------------------------------------view modal for mysql
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const showViewModal = (props) => {
    setPlanetNameState(props.name);
    setPlanetIdState(props.id);
    setPlanetDiameterState(props.diameter);
    setPlanetCircumferenceState(props.circumference);
    setPiDigitState(props.digit);
    setPiValueApproxState(props.valueApprox);
    setIsViewModalVisible(true);
  };

  const handleViewModalCancel = () => {
    setPlanetNameState("");
    setPlanetIdState("");
    setPlanetDiameterState("");
    setPlanetCircumferenceState("");
    setPiDigitState("");
    setPiValueApproxState("");
    setIsViewModalVisible(false);
  };

  // --------------------------------------------post for mysql
  const [
    postPlanet,
    {
      data: postPlanetData,
      isSuccess: postPlanetIsSuccess,
      isError: postPlanetIsError,
      error: postPlanetError,
      isLoading: postPlanetIsLoading,
    },
  ] = usePostPlanetMutation();

  useEffect(() => {
    if (componentFirstLoad.current) {
      componentFirstLoad.current = false;
      return;
    }
    if (postPlanetIsLoading) {
      setSpinLoadingState(true);
    }
    if (postPlanetIsSuccess) {
      notification["success"]({
        message: "Successful!",
        description: `${postPlanetData.successMessage}`,
      });
      setSpinLoadingState(false);
    }
    if (postPlanetIsError) {
      notification["error"]({
        message: "Error Occur!",
        description: `${postPlanetError.data.errorMessage}`,
      });
      setSpinLoadingState(false);
    }
  }, [
    postPlanetIsLoading,
    postPlanetIsError,
    postPlanetIsSuccess,
    postPlanetData,
    postPlanetError,
  ]);

  // --------------------------------------------post Modal for mysql
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
  };

  // --------------------------------------------put for mysql
  const [
    putPlanet,
    {
      isSuccess: putPlanetIsSuccess,
      data: putPlanetData,
      isLoading: putPlanetIsLoading,
      isError: putPlanetIsError,
      error: putPlanetError,
    },
  ] = usePutPlanetMutation();

  useEffect(() => {
    if (componentFirstLoad.current) {
      componentFirstLoad.current = false;
      return;
    }
    if (putPlanetIsLoading) {
      setSpinLoadingState(true);
    }
    if (putPlanetIsSuccess) {
      notification["success"]({
        message: "Successful!",
        description: `${putPlanetData.successMessage}`,
      });
      setSpinLoadingState(false);
    }
    if (putPlanetIsError) {
      notification["error"]({
        message: "Error Occur!",
        description: `${putPlanetError.data.errorMessage}`,
      });
      setSpinLoadingState(false);
    }
  }, [
    putPlanetIsLoading,
    putPlanetIsSuccess,
    putPlanetIsError,
    putPlanetData,
    putPlanetError,
  ]);

  // --------------------------------------------put Modal for mysql
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const showEditModal = (props) => {
    setPlanetNameState(props.name);
    setPlanetIdState(props.id);
    setPlanetDiameterState(props.diameter);
    setPlanetCircumferenceState(props.circumference);
    setPiDigitState(props.digit);
    setPiValueApproxState(props.valueApprox);
    setIsEditModalVisible(true);
  };
  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  // --------------------------------------------delete for mysql
  const [
    deletePlanet,
    {
      data: deletePlanetData,
      isSuccess: deletePlanetIsSuccess,
      isLoading: deletePlanetIsLoading,
      isError: deletePlanetIsError,
      error: deletePlanetError,
    },
  ] = useDeletePlanetMutation();

  useEffect(() => {
    if (componentFirstLoad.current) {
      componentFirstLoad.current = false;
      return;
    }
    if (deletePlanetIsLoading) {
      setSpinLoadingState(true);
    }
    if (deletePlanetIsSuccess) {
      notification["success"]({
        message: "Successful!",
        description: `${deletePlanetData.successMessage}`,
      });
      setSpinLoadingState(false);
    }
    if (deletePlanetIsError) {
      notification["error"]({
        message: "Error Occur!",
        description: `${deletePlanetError.data.errorMessage}`,
      });
      setSpinLoadingState(false);
    }
  }, [
    deletePlanetIsLoading,
    deletePlanetIsSuccess,
    deletePlanetIsError,
    deletePlanetData,
    deletePlanetError,
  ]);

  // --------------------------------------------delete modal for mysql
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

  // ----------------------------------------------------general form
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
  }, [form, planetIdState, planetNameState, planetDiameterState]);

  const onFinish_PGSQL = () => {
    setIsAddModalVisible_PGSQL(false);
    setPlanetNameState("");
    setPlanetIdState("");
    setPlanetDiameterState("");
    setPlanetCircumferenceState("");
    setPiDigitState("");
    setPiValueApproxState("");
    postPlanet_PGSQL({
      planet_name: planetNameState,
      planet_diameter: diameter,
    });
    // form.resetFields();
    dispatch(planetActions.calculateDiameterHandler(""));
  };

  const onFinishEdit_PGSQL = () => {
    putPlanet_PGSQL({
      planet_id: planetIdState,
      planet_name: planetNameState,
      planet_diameter: diameter,
    });
    setPlanetNameState("");
    setPlanetIdState("");
    setPlanetDiameterState("");
    setPlanetCircumferenceState("");
    setPiDigitState("");
    setPiValueApproxState("");
    // form.resetFields();
    setIsEditModalVisible_PGSQL(false);
  };

  const onFinish = () => {
    console.log(planetNameState, planetDiameterState, "post mysql");
    setIsAddModalVisible(false);
    setPlanetNameState("");
    setPlanetIdState("");
    setPlanetDiameterState("");
    setPlanetCircumferenceState("");
    setPiDigitState("");
    setPiValueApproxState("");
    // form.resetFields();
    postPlanet({
      planet_name: planetNameState,
      planet_diameter: planetDiameterState,
    });
  };

  const onFinishEdit = (values) => {
    setIsEditModalVisible(false);
    // form.resetFields();
    putPlanet({
      name: planetNameState,
      diameter: planetDiameterState,
      id: planetIdState,
      digit: piDigitState,
    });
    setPlanetNameState("");
    setPlanetIdState("");
    setPlanetDiameterState("");
    setPlanetCircumferenceState("");
    setPiDigitState("");
    setPiValueApproxState("");
  };
  return (
    <>
      {/* --------------------------------------------------------------------modal for pgsql */}

      {/* ------------------------------------modal add for pgsql */}
      <Modal
        title="Add New Discovered Planet"
        visible={isAddModalVisible_PGSQL}
        footer={null}
        onCancel={handleAddModalCancel_PGSQL}
      >
        <Form
          {...layout}
          form={form}
          name="add-planet-pgsql"
          onFinish={{}}
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
            <Input onChange={(e) => setPlanetNameState(e.target.value)} />
          </Form.Item>
          <Form.Item
            name={["planet", "radius"]}
            label="Radius"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              onChange={(value) =>
                dispatch(planetActions.calculateDiameterHandler(value))
              }
            />
          </Form.Item>
          <Form.Item label="Diameter">{diameter}</Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => onFinish_PGSQL()}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* ------------------------------------modal view for pgsql */}
      <Modal
        title="View Planet Details"
        visible={isViewModalVisible_PGSQL}
        onCancel={handleViewModalCancel_PGSQL}
        footer={null}
      >
        <Form {...layout} name="view-planet">
          <Form.Item label="Planet Name">{planetNameState}</Form.Item>
          <Form.Item label="Planet Radius">{planetRadiusState}</Form.Item>
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

      {/* ------------------------------------modal edit for pgsql */}
      <Modal
        title="Edit Planet"
        visible={isEditModalVisible_PGSQL}
        footer={null}
        onCancel={handleEditModalCancel_PGSQL}
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          initialValues={{
            name: planetNameState,
            diameter: planetDiameterState,
            radius: planetRadiusState,
            approximation: piValueApproxState,
            circumference: planetCircumferenceState,
            digit: piDigitState,
          }}
          onFinish={{}}
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
            <Input onChange={(e) => setPlanetNameState(e.target.value)} />
          </Form.Item>
          <Form.Item
            name={"radius"}
            label="Radius"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              onChange={(value) =>
                dispatch(planetActions.calculateDiameterHandler(value))
              }
            />
          </Form.Item>
          <Form.Item name={"diameter"} label="Diameter">
            {diameter}
          </Form.Item>
          <Form.Item name={"circumference"} label="Planet Circumference">
            {planetCircumferenceState}
          </Form.Item>
          <Form.Item name={"digit"} label="PI Digit">
            {piDigitState}
          </Form.Item>
          <Form.Item name={"approximation"} label="PI Value Approximation">
            {piValueApproxState}
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => onFinishEdit_PGSQL()}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* ------------------------------------modal delete for pgsql */}
      <Modal
        title="Delete Planet"
        visible={isDeleteModalVisible_PGSQL}
        onOk={handleDeleteModalOk_PGSQL}
        onCancel={handleDeleteModalCancel_PGSQL}
      >
        <p>Confirm to delete planet?</p>
      </Modal>

      {/* --------------------------------------------------------------------modal for mysql */}

      {/* ------------------------------------modal delete for mysql */}
      <Modal
        title="Delete Planet"
        visible={isDeleteModalVisible}
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
      >
        <p>Confirm to delete planet?</p>
      </Modal>

      {/* ------------------------------------modal view for mysql */}
      <Modal
        title="View Planet Details"
        visible={isViewModalVisible}
        onCancel={handleViewModalCancel}
        footer={null}
      >
        <Form {...layout} name="view-planet-mysql">
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

      {/* ------------------------------------modal edit for mysql */}
      <Modal
        title="Edit Planet"
        visible={isEditModalVisible}
        footer={null}
        onCancel={handleEditModalCancel}
      >
        <Form
          {...layout}
          form={form}
          name="edit-planet-mysql"
          onFinish={{}}
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
            <Input onChange={(e) => setPlanetNameState(e.target.value)} />
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
            <InputNumber onChange={(value) => setPlanetDiameterState(value)} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => onFinishEdit()}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* ------------------------------------modal add for mysql */}
      <Modal
        title="Add New Discovered Planet"
        visible={isAddModalVisible}
        footer={null}
        onCancel={handleAddModalCancel}
      >
        <Form
          {...layout}
          form={form}
          name="add-planet-mysql"
          onFinish={{}}
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
            <Input onChange={(e) => setPlanetNameState(e.target.value)} />
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
            <InputNumber onChange={(value) => setPlanetDiameterState(value)} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" onClick={() => onFinish()}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* -------------------------------------------------------------------------main layout */}
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div src={logo}>
            <img className="logo" width="150" src={logo} alt="naluriLogo"></img>
          </div>
        </Header>
        <Content
          className="site-layout"
          style={{
            padding: "0 50px",
            marginTop: 114,
            minHeight: "800px",
          }}
        >
          <Tabs defaultActiveKey="2">
            <TabPane tab="Localhost MySQL" key="1">
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  minHeight: "800px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <h1>Localhost MySQL</h1>
                </div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showAddModal}
                >
                  Add New Discovered Planet
                </Button>
                <Spin tip="Updating..." spinning={spinLoadingState}>
                  <TableMaster
                    dataSource={allPlanet}
                    addModal={showAddModal}
                    editModal={showEditModal}
                    viewModal={showViewModal}
                    deleteModal={showDeleteModal}
                  />
                </Spin>
              </div>
            </TabPane>
            <TabPane tab="AWS RDS PostgreSQL" key="2">
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  minHeight: "800px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <h1>AWS RDS PostgreSQL</h1>
                </div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showAddModal_PGSQL}
                >
                  Add New Discovered Planet
                </Button>
                <Spin tip="Updating..." spinning={spinLoadingState}>
                  <TableMasterVersion2
                    dataSource={getPlanets_PGSQL}
                    addModal={showAddModal_PGSQL}
                    editModal={showEditModal_PGSQL}
                    viewModal={showViewModal_PGSQL}
                    deleteModal={showDeleteModal_PGSQL}
                  />
                </Spin>
              </div>
            </TabPane>
          </Tabs>
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
