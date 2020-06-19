type RouteConfig = {
    path: string,
    component: React.ComponentType,
    exact: boolean
}

export class Module {
    name: string;
    private __route: Record<string, RouteConfig> = {}

    constructor(name: string) {
        this.name = name;
    }

    route(config: RouteConfig) {
        this.__route[config.path] = config;
    }

    getRoute() {
        return this.__route;
    }
}

export class RootModule {
    private __module: Record<string, Module> = {}

    register(module: Module) {
        if (this.__module[module.name]) {
            throw Error(`Module ${module.name} already registered`);
        }
        this.__module[module.name] = module;
    }

    routes(): Record<string, RouteConfig> {
        let allRoutes = {};
        Object.entries(this.__module).forEach(([key, module]) => {
            console.log('=>', module.getRoute());
            allRoutes = Object.assign({}, module.getRoute());
        });
        return allRoutes;
    }
}