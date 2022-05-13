import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: null,
      page: 1,
      totalResults: 0,
      loading: false,
    };
  }
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=794e085b7a784779aacd7e8e13063edb&page=1";
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=794e085b7a784779aacd7e8e13063edb&page=${
      this.state.page + 1
    }&pagesize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: this.state.page + 1,
      nextDisabled: false,
    });
  };
  render() {
    return (
      <>
        <div className="container">
          <h1 className="text-center my-2">News</h1>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles && this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={
              this.state.articles &&
              this.state.articles.length !== this.state.totalResults
            }
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles &&
                  this.state.articles.map((element) => {
                    return (
                      <div className="col-md-3" key={element.url}>
                        <NewsItem
                          title={element.title}
                          description={element.description}
                          imageUrl={element.urlToImage}
                          newsUrl={element.url}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}
