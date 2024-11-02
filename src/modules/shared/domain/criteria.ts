export abstract class Criteria {
  public static createEmpty<T extends Criteria>(this: new () => T): T {
    return new this();
  }
}
