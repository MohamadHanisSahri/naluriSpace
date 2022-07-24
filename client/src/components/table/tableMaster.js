import React from "react";
import "antd/dist/antd.css";
import { Table, Space, Button, Modal, Form, Input, InputNumber } from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  ProfileOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default class TableMaster extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    isViewModalVisible: false,
    isEditModalVisible: false,
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters, confirm) => {
    clearFilters();
    this.setState({ searchText: "" });
    this.setState({ searchedColumn: "" });
    confirm();
  };

  render() {
    const columns = [
      {
        title: "Planet Name",
        dataIndex: "Planet_Name",
        key: "Planet_ID",
        filterSearch: true,
        onFilter: (value, record) => record.Planet_Name.startWith(value),
        sorter: (a, b) => a.Planet_Name.length - b.Planet_Name.length,
        ...this.getColumnSearchProps("Planet_Name"),
      },
      {
        title: "Planet Diameter",
        dataIndex: "Planet_Diameter",
        key: "Planet_ID",
        filterSearch: true,
        onFilter: (value, record) => record.Planet_Diameter.startWith(value),
        sorter: (a, b) => a.Planet_Diameter - b.Planet_Diameter,
        ...this.getColumnSearchProps("Planet_Diameter"),
      },
      {
        title: "Planet Ciscumference",
        dataIndex: "Planet_Circumference",
        key: "Planet_ID",
        filterSearch: true,
        onFilter: (value, record) =>
          record.Planet_Circumference.startWith(value),
        sorter: (a, b) => a.Planet_Circumference - b.Planet_Circumference,
        ...this.getColumnSearchProps("Planet_Circumference"),
      },
      {
        title: "Pi Digit",
        dataIndex: "Pi_Digit",
        key: "Planet_ID",
        filterSearch: true,
        onFilter: (value, record) => record.Pi_Digit.startWith(value),
        sorter: (a, b) => a.Pi_Digit - b.Pi_Digit,
        ...this.getColumnSearchProps("Pi_Digit"),
      },
      {
        title: "Pi Value Approximation",
        dataIndex: "Pi_ValueApproximation",
        key: "Planet_ID",
        filterSearch: true,
        onFilter: (value, record) =>
          record.Pi_ValueApproximation.startWith(value),
        sorter: (a, b) => a.Pi_ValueApproximation - b.Pi_ValueApproximation,
        ...this.getColumnSearchProps("Pi_ValueApproximation"),
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "Planet_ID",
        filterSearch: true,
        fixed: "right",
        width: 300,
        render: (text, rowData) => {
          let id = rowData.Planet_ID;
          let name = rowData.Planet_Name;
          let diameter = rowData.Planet_Diameter;
          let circumference = rowData.Planet_Circumference;
          let digit = rowData.Pi_Digit;
          let valueApprox = rowData.Pi_ValueApproximation;

          return (
            <>
              <div style={{ display: "flex" }}>
                <Button
                  size="medium"
                  variant="contained"
                  type="primary"
                  ghost
                  onClick={() =>
                    this.props.viewModal({
                      id,
                      name,
                      diameter,
                      circumference,
                      digit,
                      valueApprox,
                    })
                  }
                  icon={<ProfileOutlined />}
                >
                  View
                </Button>
                <Button
                  size="medium"
                  variant="primary"
                  type="primary"
                  onClick={() =>
                    this.props.editModal({
                      id,
                      name,
                      diameter,
                      circumference,
                      digit,
                      valueApprox,
                    })
                  }
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
                <Button
                  size="medium"
                  variant="primary"
                  type="danger"
                  onClick={() => this.props.deleteModal(id)}
                  icon={<DeleteOutlined />}
                >
                  Delete
                </Button>
              </div>
            </>
          );
        },
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={this.props.dataSource}
        scroll={{ x: 1300, y: 600 }}
      />
    );
  }
}
