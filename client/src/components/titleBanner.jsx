import React from 'react';

import backArrow from 'public/backArrow.svg'

export default function TitleBanner(props) {
    const {setValue, title} = props
    return (
      <div className="titleBanner">
        <img src={backArrow} alt="Back arrow" height="50" width="50" onClick={() => setValue(null)} />
        <h2>{title}</h2>
      </div>
    );
}