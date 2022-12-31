import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// import { articles } from "./sampleData";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // first letter capitalize method
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateNews = async () => {
    props.setProgressFun(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgressFun(30);
    let parseData = await data.json();
    console.log(parseData);
    props.setProgressFun(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgressFun(100);
  };
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - Azaad News `;
    updateNews();
    // eslint-disable-next-line
  }, []);

  // infinite scroll method define here
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    // setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };

  // Next button method
  // const handleNext = async () => {
  //   if (
  //     !(
  //       page + 1 >
  //       Math.ceil(totalResults / props.pageSize)
  //     )
  //   ) {
  //     console.log("Next button click here!");
  //     let url = `https://newsapi.org/v2/top-headlines?country=${
  //       props.country
  //     }&category=${
  //       props.category
  //     }&apiKey=${props.apiKey}&page=
  //     ${page + 1}&pageSize=${props.pageSize}`;
  //      setLoading(true);
  //     let data = await fetch(url);
  //     let parseData = await data.json();
  //     console.log(parseData);
  // setPage(page + 1)
  // setArticles(parseData.articles);
  // setTotalResults(parseData.totalResults);
  // setLoading(false);
  //   }
  // };

  // previous button method
  // const handlePrev = async () => {
  //   console.log("previous button click here!");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     props.country
  //   }&category=${
  //     props.category
  //   }&apiKey=${props.apiKey}&page=
  //   ${page - 1}&pageSize=${props.pageSize}`;
  //   setLoading(true);
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   console.log(parseData);
  // setPage(page - 1)
  // setArticles(parseData.articles);
  // setLoading(false);
  // };

  return (
    <>
      <h1 className="text-capitalize text-center fw-bolder ">
        AzaadNews - top {capitalizeFirstLetter(props.category)}
        headlines
      </h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={
          articles.length > totalResults ? (
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all News</b>
            </p>
          ) : (
            <Spinner />
          )
        }
      >
        <div className="container ">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-6 col-lg-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 120)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author ? element.author : "unknown"}
                    date={element.publishedAt ? element.publishedAt : "unknown"}
                    source={
                      element.source.name ? element.source.name : "unknown"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/*<div className="container d-flex justify-content-between">
            <button
              className="btn btn-info"
              onClick={handlePrev}
              disabled={state.page <= 1}
            >
              &larr; Previous
            </button>
            <button
              className="btn btn-info"
              onClick={handleNext}
              disabled={
                state.page + 1 >
                Math.ceil(state.totalResults / props.pageSize)
              }
            >
              Next &rarr;
            </button>
          </div>
            */}
    </>
  );
};

// propsTypes code here
News.defaultProps = {
  pageSize: 9,
  country: "in",
  category: "general",
};

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
