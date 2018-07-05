export interface IValidator<T> {

    getMessages(obj: T): string[];

    validate(obj: T): boolean;

}
