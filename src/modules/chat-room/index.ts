import { Module } from 'core';
import { ChatRoomPage } from './pages';

export function setup(module: Module) {
    console.log('Setup chat room');
    module.route({
        path: '/',
        exact: true,
        component: ChatRoomPage
    });
    module.route({
        path: '/home',
        exact: true,
        component: ChatRoomPage
    });
}