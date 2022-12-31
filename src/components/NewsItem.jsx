import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsurl, author, date, source } =
    props;
  return (
    <div className="my-4">
      <div className="card" style={{ margin: "1rem " }}>
        <div className="badge-Data d-flex justify-content-end position-relative">
          <span className="badge rounded-pill bg-danger fw-bold position-absolute top-0 start-100 ">
            {source}
          </span>
        </div>
        <img
          src={!imageUrl ? " https://picsum.photos/200" : imageUrl}
          className="card-img-top"
          alt="newsImages"
        />
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}..</p>
          <p className="card-text">
            <small className="text-success">
              by {author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsurl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
