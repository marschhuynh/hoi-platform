export function configFactory() {
    function getConfig(key: string, def: any = '') {
        let value = def;
        if (typeof def === 'function') {
            value = def(process.env[`REACT_APP_${key}`] || '');
        }
        return process.env[`REACT_APP_${key}`] || value;
    }
    return {
        getConfig,
    };
}
