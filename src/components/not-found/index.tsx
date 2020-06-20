import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
    return (
        <Result
            status="404"
            title="Not found"
            subTitle="Sorry, the page you visited does not exist."
            extra={[
                <Link to="/"><Button type="primary">Go Home</Button></Link>,
                <Button onClick={() => window.location.reload()}>Try Again</Button>,
            ]}
        />
    );
}
