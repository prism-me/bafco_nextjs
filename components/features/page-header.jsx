import React from 'react';
import ALink from '~/components/features/alink';

function PageHeader(props) {
    const { title, subTitle, backgroundImage, buttonText, buttonUrl } = props;

    return (
        <div className="page-header text-center" style={{ backgroundImage: `url(${backgroundImage !== "" || backgroundImage !== undefined ? backgroundImage : "images/page-header-bg.jpg"})` }} >
            <div className="container">
                <h1 className="page-title"><span>{subTitle}</span>{title}</h1>
                <ALink href={"#"} className="btn btn-dark btn-outline-darker">
                    <span>{buttonText}</span>
                    <i className="icon-long-arrow-right"></i>
                </ALink>
            </div>
        </div>
    );
}

export default React.memo(PageHeader);