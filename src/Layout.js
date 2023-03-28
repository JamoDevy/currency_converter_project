import React from 'react';
import { Link } from "react-router-dom";

const Layout = (props) => {
    return (
        <React.Fragment>
            <nav className='navbar navbar-light bg-light'>
                <Link to='/'><span className='navbar-brand mb-0 h1'>Currency Converter Project</span>
                </Link>
            </nav>

            <div className='container py-3'>
                {props.children}
            </div>

            <footer className='p-3 bg-light'>
                <div className='mb-2'>

                </div>
            </footer>
        </React.Fragment>
    )
}

export default Layout;