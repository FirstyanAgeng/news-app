import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";

const Save = () => {
  const savedArticles = useSelector((state) => state.articles.savedArticles);

  const columns = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Saved Articles</h2>
      <Table
        dataSource={savedArticles}
        columns={columns}
        rowKey={(record) => record.title}
      />
    </div>
  );
};

export default Save;
