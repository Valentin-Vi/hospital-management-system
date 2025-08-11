var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Stock_stockId, _Stock_itemId, _Stock_quantity, _Stock_updated_at;
import { InvalidIdError } from "authentication_project";
class Stock {
    constructor({ stockId, quantity, updated_at }) {
        _Stock_stockId.set(this, 0);
        _Stock_itemId.set(this, 0);
        _Stock_quantity.set(this, 0);
        _Stock_updated_at.set(this, void 0);
        __classPrivateFieldSet(this, _Stock_stockId, stockId, "f");
        __classPrivateFieldSet(this, _Stock_quantity, quantity, "f");
        __classPrivateFieldSet(this, _Stock_updated_at, updated_at, "f");
        return this;
    }
    get stockId() {
        return __classPrivateFieldGet(this, _Stock_stockId, "f");
    }
    get quantity() {
        return __classPrivateFieldGet(this, _Stock_quantity, "f");
    }
    get updated_at() {
        return __classPrivateFieldGet(this, _Stock_updated_at, "f");
    }
    set stockId(value) {
        if (value <= 0)
            throw new InvalidIdError('Stock', 'stockId');
        __classPrivateFieldSet(this, _Stock_stockId, value, "f");
    }
    set quantity(value) {
        if (value <= 0)
            throw new InvalidIdError('Stock', 'quantity');
        __classPrivateFieldSet(this, _Stock_quantity, value, "f");
    }
    set updated_at(value) {
        __classPrivateFieldSet(this, _Stock_updated_at, value, "f");
    }
    toString() {
        return `Stock { stockId: ${this.stockId}, quantity: ${this.quantity}, updated_at: ${this.updated_at} }`;
    }
    toJSON() {
        return JSON.stringify({
            stockId: this.stockId,
            quantity: this.quantity,
            updated_at: this.updated_at
        });
    }
}
_Stock_stockId = new WeakMap(), _Stock_itemId = new WeakMap(), _Stock_quantity = new WeakMap(), _Stock_updated_at = new WeakMap();
;
export default Stock;
