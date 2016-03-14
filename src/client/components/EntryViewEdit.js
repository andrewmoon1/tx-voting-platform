import React, { PropTypes } from 'react';

const EntryViewEdit = ({ isSaving, onCreatEntryClick, entry }) => {
  const loadingClass = isSaving ? 'is-loading' : '';
  return (
    <div className="columns">
      <div className="column is-8 is-offset-2">
        <div className="box">
          <div className="video-wrapper">
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${entry.embedID}`} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
        <br /><br />
        <p className="control">
          <input className="input is-large" type="text" value={entry.title} />
        </p>
        <p className="control">
          <textarea className="textarea">{entry.description}</textarea>
        </p>
        <p className="control">
          <button onClick={() => onCreatEntryClick(entry)} className={`button is-primary ${loadingClass}`}>Create Entry</button>
          &nbsp;
          <a href="/entry/new" className="button">Cancel</a>
        </p>
      </div>
    </div>
  );
};

EntryViewEdit.propTypes = {
  onCreatEntryClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

module.exports = EntryViewEdit;