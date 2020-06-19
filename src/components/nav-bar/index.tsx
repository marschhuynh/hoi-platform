import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import './style.scss';

export function NavBar() {
    const [show, showMenu] = useState(false);
    return (
        <div className={`nav-bar ${show && 'nav-open'}`}>
            <div className="branch-name">
                LOGO
                <MenuOutlined className="menu-toggle" onClick={() => showMenu(state => !state)} />
            </div>
            <div className="nav-item nav-item-right">Login&nbsp;&nbsp;&nbsp;</div>
        </div>
    );
}
