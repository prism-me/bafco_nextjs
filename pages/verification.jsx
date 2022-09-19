import React, { useState } from 'react';
import { API } from '~/http/API';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { actions as globalAction } from '~/store/global';

function Verification(props) {
    const router = useRouter();
    const [verificationCode, setVerifiCationCode] = useState('');

    const handleVerificationCodeChange = (e) => {
        setVerifiCationCode(e.target.value)
    }

    const handleSubmit = () => {
        let formdata = { "code": verificationCode }
        API.post(`/auth/email-verification`, formdata).then((response) => {
            if (response?.data?.error) {
                toast.error(response?.data?.message);
            } else {
                localStorage.setItem('authtoken', response?.headers?.x_auth_token);
                toast.success(response?.data);
                // router.push('/account');
                props.verificationPageHide(false);
                props.hidePopup(false);
            }
        }).catch((error) => { toast.error(error?.response?.data); });
    }

    if (props.VerificationPage === false) {
        return window.history.back()
    }

    return (
        <div className="verification">
            <div className="modal-content">
                <div className="modal-body">
                    <div className="form-box">
                        <div className="form-tab text-center">
                            <h3>Authenticate your account</h3>
                            <p>Protecting your account is our top priority. Please confirm your account by entering the outhorization code set to in your email.</p>
                            <form method="post">
                                <div className="form-code-box">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="singin-email-2"
                                        name="code1"
                                        placeholder="0000"
                                        value={verificationCode}
                                        onChange={(e) => handleVerificationCodeChange(e)}
                                    />
                                </div>
                                <button type="button" onClick={handleSubmit} className="btn btn-outline-primary-2">
                                    <span>Submit</span>
                                    <i className="icon-long-arrow-right"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        LoginModal: state.globalReducer.hidePopup,
        VerificationPage: state.globalReducer.verificationshow
    }
}

export default connect(mapStateToProps, { ...globalAction })(Verification);