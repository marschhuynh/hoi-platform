import React from 'react';
import { RcFile } from 'antd/lib/upload';
import { CloseCircleOutlined, PlayCircleTwoTone } from '@ant-design/icons';

export function PlaylistItem({ data, onRemove, onPlay }: { data: RcFile, onRemove?: (data: any) => void, onPlay?: (data: any) => void }) {
    function handleOnClickRemove(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        event.preventDefault();
        onRemove?.(data);
    }
    function handleOnClickPlay(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        event.preventDefault();
        onPlay?.(data);
    }
    return (
        <div className="playlist-item">
            <PlayCircleTwoTone style={{ fontSize: 30 }} onClick={handleOnClickPlay} />
            <div className="meta-info">
                <span className="file-name">{data.name}</span>
                <span className="file-author"><strong>{data.uid}</strong>{` - ${data.size}`}</span>
            </div>
            <CloseCircleOutlined style={{ color: 'red' }} onClick={handleOnClickRemove} />
        </div>
    );
}
