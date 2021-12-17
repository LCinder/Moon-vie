
import "mocha";
import {assert} from "chai";
import {Etcd3} from "etcd3";
import {EtcdService} from "../src/etcd-service";
import exp from "constants";


describe("Test basicos Etcd3", async () => {
    let service: EtcdService = new EtcdService();
    it("Deberia existir",() => {
        assert.exists(service);
    });
    it("Deberia devolver un cliente", () => {
        const res = service.client;
        assert.instanceOf(res, Etcd3);
    });
    it("Deberia funcionar etcd3", async () => {
        const key: string = "Testing";
        const expected: string = "Ok";
        process.env[key] = expected;

        const res = await service.get(key);
        assert.equal(res, expected);
    });
});
