import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Skeleton, Alert, Typography, Row, Col, Button } from "antd";
import { useDispatch } from "react-redux";
import { saveArticle } from "../redux/articlesSlice"; // Update import

const { Title, Paragraph, Link } = Typography;

const Articles = ({ category, searchTerm }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Local loading state
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const apiKey = "pXoeHirdswj7Y4STH4IEBrrnzjJJgfqr"; // Replace with your actual API key
        let url;

        if (category === "programming") {
          url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=programming&api-key=${apiKey}`;
        } else if (category === "indonesia") {
          url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Indonesia&&api-key=${apiKey}`;
        } else if (category === "mostPopular") {
          url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`;
        }

        const response = await axios.get(url);

        // Check the response structure based on the category
        if (category === "programming" || category === "indonesia") {
          if (
            response.data &&
            response.data.response &&
            response.data.response.docs
          ) {
            setData(response.data.response.docs);
          } else {
            setData([]);
            console.error("No articles found in response:", response.data);
          }
        } else if (category === "mostPopular") {
          if (response.data && response.data.results) {
            setData(response.data.results);
          } else {
            setData([]);
            console.error("No articles found in response:", response.data);
          }
        }
      } catch (err) {
        if (err.response && err.response.status === 429) {
          setError("Too many requests. Please try again later.");
        } else {
          setError(err.message);
        }
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [category]);

  const filteredData = searchTerm
    ? data.filter((article) => {
        const headline =
          category === "programming" || category === "indonesia"
            ? article.headline
            : article;
        return (
          headline &&
          headline.main &&
          headline.main.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : data;

  // Show loading skeleton while data is being fetched
  if (loading) {
    return (
      <Row gutter={[16, 16]}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card>
              <Skeleton active />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  // Show error message if there was an error fetching data
  if (error) {
    return (
      <Alert
        message="Error"
        description={`Something went wrong: ${error}`}
        type="error"
        showIcon
      />
    );
  }

  // Render articles
  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>
        {category === "programming"
          ? "Programming Articles"
          : category === "indonesia"
          ? "Indonesian Articles"
          : "Most Popular Articles"}
      </Title>
      <Row gutter={[16, 16]}>
        {filteredData.map((article, index) => {
          const headline =
            category === "programming" || category === "indonesia"
              ? article.headline
              : article;
          return (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                title={
                  headline?.main || headline?.title || "No Title Available"
                }
                bordered={true}
                hoverable
                body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {category === "mostPopular" ? (
                  article.media && article.media.length > 0 ? (
                    <img
                      src={article.media[0]["media-metadata"][2].url}
                      alt="Article image"
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                      width="100%"
                      height={150}
                    />
                  ) : (
                    <div
                      style={{
                        height: 150,
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                    >
                      <Paragraph style={{ color: "#999" }}>
                        No Image Available
                      </Paragraph>
                    </div>
                  )
                ) : article.multimedia && article.multimedia.length > 0 ? (
                  <img
                    src={`https://static01.nyt.com/${article.multimedia[0].url}`}
                    alt="Article image"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                    width="100%"
                    height={150}
                  />
                ) : (
                  <div
                    style={{
                      height: 150,
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <Paragraph style={{ color: "#999" }}>
                      No Image Available
                    </Paragraph>
                  </div>
                )}
                <Paragraph ellipsis={{ rows: 3 }}>
                  {article.abstract || "No description available."}
                </Paragraph>
                <Link
                  href={article.web_url || article.url}
                  target="_blank"
                  style={{ marginRight: "20px" }}
                >
                  Read More
                </Link>
                <Button
                  type="primary"
                  onClick={() =>
                    dispatch(
                      saveArticle({
                        source: article.source || "Unknown",
                        title: headline?.main || "No Title Available",
                        description:
                          article.abstract || "No description available.",
                      })
                    )
                  }
                  style={{ marginTop: "10px" }}
                >
                  Save
                </Button>
                <Paragraph
                  style={{ marginTop: "10px", fontSize: "12px", color: "#888" }}
                >
                  Source: {article.source || "Unknown"}
                </Paragraph>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Articles;
