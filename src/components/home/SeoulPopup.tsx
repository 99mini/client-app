import React from 'react';

import './SeoulPopup.css';

interface PopupProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const SeoulPopup = ({ children, style }: PopupProps) => {
  return (
    <div className="seoul-map-popup" style={style}>
      <div className="seoul-map-popup-inner">{children}</div>
    </div>
  );
};

export default SeoulPopup;
