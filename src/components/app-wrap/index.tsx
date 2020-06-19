import React from 'react';
import { NavBar, Footer } from 'components';
import './style.scss';

export function AppWrapper({ children }: any) {
    return (
        <div className="app-wrap">
            <NavBar />
            <div className="body">
                {children}
            </div>
            <Footer />
        </div>
    );
}
