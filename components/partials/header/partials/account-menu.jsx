import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { actions as globalAction } from '~/store/global';

function AccountMenu(props) {
    const router = useRouter();
    const [authtoken, setAuthtoken] = useState('');

    useEffect(() => {
        setAuthtoken(localStorage.getItem('authtoken'));
    }, [authtoken]);

    function onAccountClick(e) {
        e.preventDefault();
        if (authtoken === "" || authtoken === null || authtoken === undefined) {

            props.showPopup(true);

        } else {

            router.push('/account');

        }
    }

    return (
        <div className="account">
            <a
                href="#"
                onClick={onAccountClick}
                title="account"
            >
                <div className="icon">
                    <i className="icon-user"></i>
                </div>
                <p>account</p>
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

export default connect(mapStateToProps, { ...globalAction })(AccountMenu);