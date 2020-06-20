type HandlerFunction = (topic: string, data: any) => void
type TopicFunction<T> = (topic: T) => string

export interface PubSubInterface {
    subscribe(topic: string, callback: HandlerFunction): void
    publish(topic: string, payload: object): void
}

export class InternalBus implements PubSubInterface {
    key: string;
    connection: Record<string, Record<string, HandlerFunction>>

    constructor(key: string) {
        this.key = key;
        this.connection = {};
    }

    _randomId() {
        return Math.random().toString().substring(2);
    }

    subscribe(topic: string, callback: HandlerFunction) {
        if (!this.connection[topic]) {
            this.connection[topic] = {};
        }
        const token = this._randomId();
        this.connection[topic][token] = callback;
        console.log('InternalBus:subscribe', topic);
        return () => {
            delete this.connection[topic][token];
        };
    }

    publish(topic: string, payload: object) {
        if (!this.connection[topic]) return;
        console.log('InternalBus:publish', topic, payload);
        Object.keys(this.connection[topic]).forEach(token => {
            const handler = this.connection[topic][token];
            handler(topic, payload);
        });
    }
}