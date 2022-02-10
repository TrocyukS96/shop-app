import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Logo.module.scss';

export const Logo = () => {
    return (
            <div className={s.logo}>
                <NavLink className={s.logoLink} color="inherit"  to={'/products'}>SHOP-APP</NavLink>
            </div>
    )
}


