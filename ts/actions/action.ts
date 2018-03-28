export interface IAction<T> {
    run(state: T): T;
}
