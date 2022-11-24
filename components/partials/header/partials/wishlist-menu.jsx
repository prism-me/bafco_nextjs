import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { actions as globalAction } from "~/store/global";

function WishlistMenu(props) {
  const { wishlist } = props;
  const [authtoken, setAuthtoken] = useState("");

  useEffect(() => {
    setAuthtoken(localStorage.getItem("authtoken"));
  }, [authtoken]);

  return (
    <div className="wishlist">
      <a href="/wishlist" title="Wishlist">
        <div className="icon">
          <i className="icon-heart-o"></i>
          <span className="wishlist-count badge">{wishlist?.length}</span>
        </div>
        <p>Wishlist</p>
      </a>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data,
  };
}

export default connect(mapStateToProps, { ...globalAction })(WishlistMenu);
