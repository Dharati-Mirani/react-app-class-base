import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div>
        <div className="card my-2" style={{ width: "18rem" }}>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://thumbs.dreamstime.com/b/world-news-pages-12126033.jpg"
            }
            className="card-img-top"
            alt="..."
            height="150"
            width="20"
          />
          <div className="card-body">
            <h5 className="card-title">{title && title.slice(0, 15)}...</h5>
            <p className="card-text">
              {description && description.slice(0, 50)}...
            </p>
            <a href={newsUrl} className="btn btn-dark">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }
}
