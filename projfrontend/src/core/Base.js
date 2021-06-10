import React from 'react'

const Base = ({
    title = "My Title",
    description = "My Description",
    className = "bg-dark text-white p-4",
    children
}) => {
    return (
        <div>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
                {/* decomes base component and becomes too much resuable. */}
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you got any questions, reacg me out at Instagram</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                    <div className="container">
                        <span className="text-white">
                            An Amazing Django React Course
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Base;