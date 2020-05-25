import React from 'react';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faSearch, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navBarMobileShow: false
        }
    }

    renderMenuLinks() {
        const links = [
            {
                src: '/',
                label: 'Главная',
                icon: faHome,
                className: '',
                exact: true
            },
            {
                src: '/search',
                label: 'Поиск',
                icon: faSearch,
                className: '',
                exact: false,
                // visibility: !!localStorage.getItem('username') && !!localStorage.getItem('password')
            },
            {
                src: '/auth',
                label: 'Вход',
                icon: faSignInAlt,
                className: '',
                exact: false
            },
        ];

        return links.map(({src, label, icon, className, exact, visibility = true}, index) => {

            // if(!visibility) return;

            return (
                <li className={`nav-item ${className}`} key={src + index}>
                    <NavLink
                        className="nav-link"
                        to={src}
                        onClick={() => this.navBarMobileToggle()}
                        exact={exact}>
                        <FontAwesomeIcon
                            icon={icon}
                            className={"mr-2"}
                        />{label}</NavLink>
                </li>
            )
        })
    }

    navBarMobileToggle() {
        this.setState({
            navBarMobileShow: !this.state.navBarMobileShow
        })
    }

    render() {
        return (
            <header className={"header"}>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <NavLink className="navbar-brand h1 mb-0" to="/" exact>RummageGo</NavLink>

                    <button className="navbar-toggler" type="button" onClick={() => this.navBarMobileToggle()}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${this.state.navBarMobileShow ? 'show' : ''}`}>
                        <ul className="navbar-nav ml-auto">
                            {this.renderMenuLinks()}
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;