import React from "react";
import "antd/dist/antd.css";
import { Table, Space, Button, Input } from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  ProfileOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default class TableMasterVersion2 extends React.Component {
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
        dataIndex: "planet_name",
        key: "planet_id",
        filterSearch: true,
        onFilter: (value, record) => record.planet_name.startWith(value),
        sorter: (a, b) => a.planet_name.length - b.planet_name.length,
        ...this.getColumnSearchProps("planet_name"),
      },
      {
        title: "Planet Diameter",
        dataIndex: "planet_diameter",
        key: "planet_id",
        filterSearch: true,
        onFilter: (value, record) => record.planet_diameter.startWith(value),
        sorter: (a, b) => a.planet_diameter - b.planet_diameter,
        ...this.getColumnSearchProps("planet_diameter"),
      },
      {
        title: "Planet Circumference",
        dataIndex: "planet_circumference",
        key: "planet_id",
        filterSearch: true,
        onFilter: (value, record) =>
          record.planet_circumference.startWith(value),
        sorter: (a, b) => a.planet_circumference - b.planet_circumference,
        ...this.getColumnSearchProps("planet_circumference"),
      },
      {
        title: "Pi Digit",
        dataIndex: "pi_digit",
        key: "planet_id",
        filterSearch: true,
        onFilter: (value, record) => record.pi_digit.startWith(value),
        sorter: (a, b) => a.pi_digit - b.pi_digit,
        ...this.getColumnSearchProps("pi_digit"),
      },
      {
        title: "Pi Value Approximation",
        dataIndex: "pi_valueapproximation",
        key: "planet_id",
        filterSearch: true,
        onFilter: (value, record) =>
          record.pi_valueapproximation.startWith(value),
        sorter: (a, b) => a.pi_valueapproximation - b.pi_valueapproximation,
        ...this.getColumnSearchProps("pi_valueapproximation"),
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "planet_id",
        filterSearch: true,
        fixed: "right",
        width: 300,
        render: (text, rowData) => {
          let id = rowData.planet_id;
          let name = rowData.planet_name;
          let diameter = rowData.planet_diameter;
          let circumference = rowData.planet_circumference;
          let digit = rowData.pi_digit;
          let valueApprox = rowData.pi_valueapproximation;

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
