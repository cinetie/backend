import { expect } from "chai";
import { describe, it } from "mocha";
import { get, set } from "../helpers/redis";


describe("Webhooks", () => {
    it("it should return undefined if no element with the such key exists", async () => {
        const res = await get("uuuid");
        expect(res).to.be.null;
    });
    it("It should return a value if an element with such key exists", async () => {
        const raw = [{ val: 0, val1: 1 }];
        await set('uuid', raw);
        const setValue = await get('uuid');
        expect(setValue[0].val).to.be.equals(raw[0].val);
        expect(setValue[0].val1).to.be.equals(raw[0].val1);
    })
})