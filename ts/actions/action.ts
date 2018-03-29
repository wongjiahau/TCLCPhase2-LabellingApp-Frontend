import { clone } from "../libs/clone";

export abstract class Action<T> {
    public run(state: T): T {
        return this.modifyState(clone(state));
    }

    protected abstract modifyState(state: T): T;
}
