import React, { useState, useContext } from "react";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

const Theme = ({ modal, setModal }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  // const [color, setColor] = useState("");
  return modal ? (
    <Modal>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Theme</h4>
          </div>
          <div className="modal-body">
            <p className="lead">Select a theme</p>

            <form>
              <div className="form-group">
                <select
                  className="form-control"
                  name=""
                  value={theme}
                  onChange={e => setTheme(e.target.value)}
                  onBlur={e => setTheme(e.target.value)}
                >
                  <option value="#4762ad">Sky</option>
                  <option value="#ffc857">Sunny</option>
                  <option value="#60d394">Grass</option>
                  <option value="#ff477e">Sweet</option>
                  <option value="#00bbf9">Flow</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              style={{ backgroundColor: theme, color: "#fff" }}
              type="button"
              className="btn btn-default"
              onClick={() => {
                setModal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default Theme;
