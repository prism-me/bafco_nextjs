import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function WishlistMenu(props) {
  const [authtoken, setAuthtoken] = useState("");

  const wishlist = useSelector((state) => state.wishlist.data);

  useEffect(() => {
    setAuthtoken(localStorage.getItem("authtoken"));
  }, [authtoken]);

  // console.log("wishlists :: ", wishlist);

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

export default WishlistMenu;
