import React, { useState } from 'react';
import { Upload } from 'antd';
import { InboxOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import { VirtualList } from 'components';

import { PlaylistItem } from './item';
import './style.scss';

const { Dragger } = Upload;

const defaultPlayList = {
    song: [],
    addSong: () => { },
    removeSong: () => { }
};

const PlaylistContext = React.createContext(defaultPlayList);

function usePlaylist(): [Array<RcFile>, (newSong: RcFile) => void, (index: number) => void] {
    const [all_song, setSong] = useState<Array<RcFile>>([]);

    function addSong(newSong: RcFile) {
        setSong(prev => [...prev, newSong]);
    }

    function removeSong(index: number) {
        setSong(prev => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1)
        ]);
    }

    return [all_song, addSong, removeSong];
}


export function UploadStream() {
    const [songs, addSong, removeSong] = usePlaylist();

    function handleBeforeUpload(file: RcFile, FileList: RcFile[]) {
        console.log('Current file', file, FileList);
        addSong(file);
        return false;
    }
    function handleRemove(file: any) {
        const index = songs.findIndex(current => current.uid === file.uid);
        console.log('Remove', file, index);
        removeSong(index);
    }
    return (
        <div className="panel playlist">
            <div className="panel-header">
                <UnorderedListOutlined />
                &nbsp;
                Playlist
            </div>
            <div className="panel-body">
                <Dragger
                    multiple
                    beforeUpload={handleBeforeUpload}
                    onRemove={handleRemove}
                    showUploadList={false}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
                <div className="playlist">
                    <VirtualList<RcFile>
                        data={songs}
                        Item={({ data }) => <PlaylistItem data={data} onRemove={handleRemove} />}
                    />
                </div>
            </div>
        </div>
    );
}
