import React from 'react';
import { Playlist } from 'modules/chat-room/components';

import './style.scss';
import { Row, Col } from 'antd';

export function ChatRoomPage() {
    return (
        <div className="chat-room">
            <Row gutter={14}>
                <Col xs={24} md={12} lg={8}>
                    <Playlist />
                </Col>
                <Col xs={24} md={12} lg={16}>
                    ChatRoomHere
                </Col>
            </Row>
        </div>
    );
}
