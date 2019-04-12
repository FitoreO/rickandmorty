import React from "react";

import "./Modal.css";

const newApi = "https://rickandmortyapi.com/api/episode/";

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const episode = this.props.episode.map((episode, index) => {
      return (
        <p className="innerList" key={"episode" + index}>
          {episode}
        </p>
      );
    });
    return (
      <div>
        <div
          className="modal-wrapper"
          style={{
            transform: this.props.show
              ? "translateY(0vh)"
              : "translateY(-50vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          <div className="modal-header">
            <h3>Modal Header</h3>
            <span className="close-modal-btn" onClick={this.props.close}>
              x
            </span>
          </div>
          <div className="modal-body">
            <p>{this.props.children}</p>
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={this.props.close}>
              CLOSE
            </button>
            <button className="btn-continue">CONTINUE</button>
          </div>
          <div>{episode}</div>
        </div>
      </div>
    );
  }
}

export default Modal;
