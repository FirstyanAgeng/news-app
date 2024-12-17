import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Skeleton, Alert, Typography, Row, Col, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveArticle, unsaveArticle } from "../redux/articlesSlice";

const { Title, Paragraph, Link } = Typography;

const Articles = ({ category, searchTerm }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const savedArticles = useSelector((state) => state.articles.savedArticles);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiKey = "pXoeHirdswj7Y4STH4IEBrrnzjJJgfqr";
        let url;

        // Daftar kategori khusus yang memiliki logika berbeda
        const specialCategories = ["programming", "indonesia", "mostPopular"];

        if (specialCategories.includes(category)) {
          // Logika untuk kategori khusus (tetap sama seperti sebelumnya)
          if (category === "programming") {
            url = searchTerm
              ? `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(
                  searchTerm
                )}&api-key=${apiKey}`
              : `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=programming&api-key=${apiKey}`;
          } else if (category === "indonesia") {
            url = searchTerm
              ? `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(
                  searchTerm
                )}&api-key=${apiKey}`
              : `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Indonesia&api-key=${apiKey}`;
          } else if (category === "mostPopular") {
            url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`;
          }
        } else {
          // Untuk kategori lain atau pencarian bebas
          url = searchTerm
            ? `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(
                searchTerm
              )}&api-key=${apiKey}`
            : `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(
                category
              )}&api-key=${apiKey}`;
        }

        const response = await axios.get(url);

        if (
          category === "programming" ||
          category === "indonesia" ||
          !specialCategories.includes(category)
        ) {
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
        setLoading(false);
      }
    };

    fetchData();
  }, [category, searchTerm]);

  // Render loading skeleton
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

  // Render error message
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
          : category === "mostPopular"
          ? "Most Popular Articles"
          : `${category.charAt(0).toUpperCase() + category.slice(1)} Articles`}
      </Title>
      <Row gutter={[16, 16]}>
        {data.map((article, index) => {
          const headline =
            ["programming", "indonesia"].includes(category) ||
            !["mostPopular"].includes(category)
              ? article.headline
              : article;

          const isSaved = savedArticles.some(
            (saved) =>
              saved.title ===
              (category === "mostPopular"
                ? article.title
                : headline?.main || headline?.title)
          );

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
                  type={isSaved ? "dashed" : "primary"}
                  onClick={() =>
                    isSaved
                      ? dispatch(
                          unsaveArticle(
                            category === "mostPopular"
                              ? article.title
                              : headline?.main || headline?.title
                          )
                        )
                      : dispatch(
                          saveArticle({
                            source:
                              article.source || article.section || "Unknown",
                            title:
                              category === "mostPopular"
                                ? article.title
                                : headline?.main || "No Title Available",
                            description:
                              article.abstract ||
                              article.abstract ||
                              "No description available.",
                          })
                        )
                  }
                  style={{ marginTop: "10px" }}
                >
                  {isSaved ? "Unsave" : "Save"}
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
