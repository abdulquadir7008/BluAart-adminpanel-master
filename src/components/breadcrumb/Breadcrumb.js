import { Link } from "react-router-dom";

export default function Breadcrumb(props) {
    const { breadcrumbTitle, breadcrumbNav } = props;

    const breadcrumbNavList = breadcrumbNav.map((item, index) => (
        <li className="breadcrumb-item text-capitalize" key={index}>
            <Link to={item.path} >
                {item.navText}
            </Link>
        </li>
    ))

    return(
        <div className="breadcrumb-wrapper">
            <div className="container">
                <div className="breadcrumb-content">
                    <h2 className="breadcrumb-title text-capitalize">
                        {breadcrumbTitle}
                    </h2>
                </div>
            </div>
        </div>
    )
}