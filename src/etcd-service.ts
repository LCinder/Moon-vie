
import {Etcd3} from "etcd3";

export class EtcdService {
    private readonly _client: Etcd3;

    constructor() {
        this._client = new Etcd3({
            hosts: `${process.env["ETCD_HOST"]}:${process.env["ETCD_PORT"]}`
        });
    }

    get client() {
        return this._client;
    }

    async get(key: string) {
        let result;

        try {
            result  = await this._client.get(key)
        } catch (e) {
            result = process.env[key];
        }

        return result;
    }
}
