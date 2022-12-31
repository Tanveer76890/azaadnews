import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// import { articles } from "./sampleData";

class News extends Component {
  // propsTypes code here
  static defaultProps = {
    pageSize: 9,
    country: "in",
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  // first letter capitalize method
  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("this is constrauctor in newsItems class componenet!");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0,
    
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - Azaad News `;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    console.log(parseData);
    this.props.setProgress(70);
    this.setState({ articles: parseData.articles,
      totalResults: parseData.totalResults,
    loading: false });
    this.props.setProgress(100)
  }

  // infinite scroll method define here
  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
  page:this.state.page + 1});
  }



  // Next button method
  // handleNext = async () => {
  //   if (
  //     !(
  //       this.state.page + 1 >
  //       Math.ceil(this.state.totalResults / this.props.pageSize)
  //     )
  //   ) {
  //     console.log("Next button click here!");
  //     let url = `https://newsapi.org/v2/top-headlines?country=${
  //       this.props.country
  //     }&category=${
  //       this.props.category
  //     }&apiKey=${this.props.apiKey}&page=
  //     ${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     let parseData = await data.json();
  //     console.log(parseData);
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parseData.articles,
  //       totalResults: parseData.totalResults,
  //       loading: false,
  //     });
  //   }
  // };

  // previous button method
  // handlePrev = async () => {
  //   console.log("previous button click here!");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=${this.props.apiKey}&page=
  //   ${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   console.log(parseData);
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parseData.articles,
  //     loading: false,
  //   });
  // };

  render() {
    return (
      <>
          <h1 className="text-capitalize text-center fw-bolder ">
            AzaadNews - top {this.capitalizeFirstLetter(this.props.category)}
            headlines
          </h1>
           {this.state.loading && <Spinner />}
            

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={this.state.articles.length > this.state.totalResults ? <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all News</b>
          </p> : <Spinner /> }
            
          >
            <div className="container ">
              <div className="row">
                { 
                  this.state.articles.map((element) => {
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
                          date={
                            element.publishedAt
                              ? element.publishedAt
                              : "unknown"
                          }
                          source={
                            element.source.name
                              ? element.source.name
                              : "unknown"
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
              onClick={this.handlePrev}
              disabled={this.state.page <= 1}
            >
              &larr; Previous
            </button>
            <button
              className="btn btn-info"
              onClick={this.handleNext}
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
            >
              Next &rarr;
            </button>
          </div>
            */}
        
      </>
    );
  }
}

export default News;
