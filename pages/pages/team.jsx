import { useEffect, useState } from "react";
import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import { countTo } from '~/utils';
const axios = require('axios');

function Team() {

    const [teamList, setTeamList] = useState();

    useEffect(() => {

        countTo();

        axios.get('https://prismcloudhosting.com/BAFCO_APIs/public/v1/api/teams').then(function (response) {
            // handle success
            setTeamList(response.data)
        }).catch(function (error) {
            // handle error
            console.log(error);
        })

    }, []);

    return (
        <div className="main">
            <PageHeader
                title="Our Teams"
                subTitle=""
                backgroundImage="images/banners/banner-fullwidth.jpg"
                buttonText=""
                buttonUrl="#"
            />

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item active">Team</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-3">
                <div className="bg-light-2 pt-6 pb-7">
                    <div className="container">
                        <h2 className="title text-center mb-2">Meet Our Team</h2>
                        <p className="text-center mb-4">We’re a furniture-loving, creative bunch who love to sing and dance, listen to music, bake cakes, and cuddle with our pets.</p>
                        <div className="row">
                            {teamList?.map((item, index) => (
                                <div className="col-sm-6 col-lg-3" key={index}>
                                    <div className="member member-2 text-center">
                                        <figure className="member-media">
                                            <img src={item.image} class="Sirv image-main" alt={item.name} />
                                            <img src={item.gif} class="Sirv image-hover" alt={item.name} />
                                        </figure>
                                        <div className="member-content">
                                            <h3 className="member-title">{item.name}<span>{item.designation}</span></h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default React.memo(Team);