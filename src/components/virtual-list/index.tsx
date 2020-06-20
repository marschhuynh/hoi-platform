import React from 'react';
import { List } from 'react-virtualized';
import './style.scss';

type VirtualList<T> = {
    data: T[]
    Item: React.ComponentType<{ data: T }>
    height?: number
    width?: number
    rowHeight?: number
}
export function VirtualList<T>({ data, Item, width, height, rowHeight }: VirtualList<T>) {
    // function rowRenderer({
    //     key,
    //     index,
    //     isScrolling,
    //     isVisible,
    //     style,
    // }: any) {
    //     return (
    //         <div key={key} style={style}>
    //             <Item data={data[index]} />
    //         </div>
    //     );
    // }
    return (
        // <List
        //     rowCount={data.length}
        //     width={width}
        //     height={height}
        //     rowHeight={rowHeight}
        //     rowRenderer={rowRenderer}
        // />
        <div className="virtual-list">
            {data.map(item => {
                return <Item data={item} />;
            })}
        </div>
    );
}

