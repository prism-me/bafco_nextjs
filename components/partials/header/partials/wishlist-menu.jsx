import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { actions as globalAction } from '~/store/global';
import ALink from '~/components/features/alink';

function WishlistMenu(props) {
    const router = useRouter();
    const { wishlist } = props;
    const [authtoken, setAuthtoken] = useState('');

    useEffect(() => {
        setAuthtoken(localStorage.getItem('authtoken'));
    }, [authtoken]);

    // function onWishlistClick(e) {
    //     e.preventDefault();
    //     if (authtoken === "" || authtoken === null || authtoken === undefined) {

    //         props.showPopup(true);

    //     } else {

    //         router.push('/wishlist');

    //     }
    // }

    return (
        <div className="wishlist">
            <a
                href="/wishlist"
                // onClick={onWishlistClick}
                title="Wishlist"
            >
                <div className="icon">
                    <i className="icon-heart-o"></i>
                    <span className="wishlist-count badge">{wishlist.length}</span>
                </div>
                <p>Wishlist</p>
            </a>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        wishlist: state.wishlist.data,
        LoginModal: state.globalReducer.popupShow
    }
}

export default connect(mapStateToProps, { ...globalAction })(WishlistMenu);