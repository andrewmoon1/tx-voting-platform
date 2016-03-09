const React = require('react');

const MediaCard = ({ id, data }) => {
  return (
    <div className="column is-third">
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <a href="#" title={ data.title }><img src="http://placehold.it/300x225&text=Video Thumb" alt={ data.title } /></a>
        </figure>
      </div>
      <div className="card-content">
        <small>{ data.publishedAt }</small>
        <p className="title is-5"><a href="#" title={ data.title }>{ data.title }</a></p>
        <div className="content">
          { data.description }
        </div>
        <div className="media">
          <div className="media-left">
            <figure className="image is-32x32 avatar">
              <a href="#"><img className="is-round" src="http://placehold.it/64x64&text=C" alt="Image" /></a>
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-5"><a href="#">Clay Branch</a></p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

module.exports = MediaCard;