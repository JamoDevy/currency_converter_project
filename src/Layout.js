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
                    <span className="mr-3 text-secondary">Created by <a href='https://papaya-bubblegum-8f7570.netlify.app'>Devin Clarke</a> through <a href='https://www.altcademy.com/'> Altcademy</a></span>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Layout;