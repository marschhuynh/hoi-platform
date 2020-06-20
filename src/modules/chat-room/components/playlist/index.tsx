import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { InboxOutlined, UnorderedListOutlined, PlayCircleFilled, SyncOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import { VirtualList } from 'components';

import { PlaylistItem } from './item';
import './style.scss';
import { connect } from 'mqtt';

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

function toBuffer(ab: any) {
    var buf = Buffer.alloc(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}

export function Playlist() {
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
    function handlePlay(file: any) {
        const currentFile: any = songs.find(current => current.uid === file.uid);

        var client = connect('wss://test.mosquitto.org', { port: 8081 });

        client.on('connect', async function () {
            const data = await currentFile?.arrayBuffer();
            // const bufferData = toBuffer(data);
            // console.log('PUBLISH', bufferData);
            // const uint8: any = new Uint8Array(data);
            // console.log('uint8', uint8);
            client.publish('hoi-stream-music', data, { qos: 2 }, (data: any) => {
                console.log('=>', data);
            });
        });

        // console.log('Play', currentFile, data);
    }
    return (
        <div className="panel playlist">
            <div className="panel-header">
                <UnorderedListOutlined />
                &nbsp;
                <span>Playlist</span>
                &nbsp;
                <span className="count">{songs.length} song(s)</span>
            </div>
            <div className="panel-body">
                <Dragger
                    multiple
                    beforeUpload={handleBeforeUpload}
                    onRemove={handleRemove}
                    showUploadList={false}
                    className="file-upload-drag"
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
                <div className="playlist">
                    <div className="play-util">
                        <Button icon={<PlayCircleFilled />} type="primary">Play All</Button>
                        <Button icon={<SyncOutlined />}>Sync</Button>
                    </div>
                    <VirtualList<RcFile>
                        data={songs}
                        Item={({ data }) => <PlaylistItem data={data} onRemove={handleRemove} onPlay={handlePlay} />}
                    />
                </div>
            </div>
        </div>
    );
}
