import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Module, RootModule } from 'core';
import { AppWrapper, NotFoundPage } from 'components';

const INSTALL_MODULE: any = {
    'chat-room': require('./modules/chat-room')
};

class RootApplication extends React.Component<{}, { loading: boolean }> {
    rootModule: RootModule;
    constructor(props: {}) {
        super(props);
        this.state = {
            loading: true
        };
        this.rootModule = new RootModule();
    }
    componentDidMount() {
        this.init();
    }
    setupModule() {
        for (let key in INSTALL_MODULE) {
            const module = new Module(key);
            INSTALL_MODULE[key].setup(module);
            this.rootModule.register(module);
        }
    }
    async init() {
        this.setState({ loading: true });

        // Setup module
        this.setupModule();

        this.setState({ loading: false });
    }
    renderRoute() {
        return Object.entries(this.rootModule.routes()).map(([key, route]) => {
            return <Route key={route.path} {...route} />;
        });
    }
    render() {
        if (this.state.loading) {
            return <span>Loading</span>;
        }
        return (
            <BrowserRouter basename="/">
                <AppWrapper>
                    <Switch>
                        {this.renderRoute()}
                        <Route component={NotFoundPage} />
                    </Switch>
                </AppWrapper>
            </BrowserRouter>
        );
    }
}

export { RootApplication };
