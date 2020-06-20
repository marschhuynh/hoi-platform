import React from 'react';
import { getConfig } from 'config';

export function Footer() {
    return (
        <div className="footer">
            Copyright © {(new Date()).getFullYear()} <strong>{getConfig('BRANCH_NAME')}</strong>.
        </div>
    );
}
