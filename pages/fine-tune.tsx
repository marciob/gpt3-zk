import { Button, Table, Form, Input } from "antd";

import { useEffect } from "react";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import styles from "../styles/Home.module.css";

function FineTune() {
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const data = [];
    for (let index = 0; index < 7; index++) {
      data.push({
        key: `${index}`,
        name: `Name ${index}`,
        address: `Address ${index}`,
      });
    }
    setDataSource(data);
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="address">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  name: record.name,
                  address: record.address,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
          </>
        );
      },
    },
  ];
  const onFinish = (values) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
    setDataSource(updatedDataSource);
    setEditingRow(null);
  };
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className="bg-white p-4 lg:col-span-1 text-center">
        <h1 className="text-2xl font-medium">Fine Tune</h1>
        <p className="text-lg">
          Here you can fine-tune the model by providing additional prompts and
          expected completions.
        </p>
        <div>
          <Table
            className="w-1/2 mx-auto mt-5"
            columns={columns}
            dataSource={dataSource}
          ></Table>
        </div>
      </div>
    </div>
  );
}

export default FineTune;
