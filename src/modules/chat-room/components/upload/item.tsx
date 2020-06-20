import React from 'react';
import { RcFile } from 'antd/lib/upload';
import { CloseCircleOutlined } from '@ant-design/icons';

export function PlaylistItem({ data, onRemove }: { data: RcFile, onRemove?: (data: any) => void }) {
    function handleOnClick(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        event.preventDefault();
        onRemove?.(data);
    }
    return (
        <div className="playlist-item">
            <span>{data.name}</span>
            <CloseCircleOutlined style={{ color: 'red' }} onClick={handleOnClick} />
        </div>
    );
}
