import moment from "moment";
import React from "react";
import "../utils/Comment.scss";
const UserComments = ({ name, body, createdAt, msg }) => {
  const formattedDate = createdAt
    ? moment(createdAt.toDate()).format("LLLL")
    : null;

  return (
    <div style={{ width: "100%" }}>
      <div className="row">
        <div className="col-lg-12">
          <div className="comments-list">
            <div className="media">
              {msg ? (
                <h4 className="mt-5">{msg}</h4>
              ) : (
                <>
                  <div className="media-left">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="user"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="media-body">
                    <h3 className="text-start media-heading user_name">
                      {name} <small style={{    color: "darkgray",fontSize:"12px"}}>{formattedDate}</small>
                    </h3>
                    <p className="text-start">{body}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComments;
