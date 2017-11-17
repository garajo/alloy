/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
export class PatternValidator {
    // tslint:disable-next-line:function-name
    public static unsignedInteger(): string {
        return '[+]?[0-9]+';
    }
    // tslint:disable-next-line:function-name
    public static signedInteger(): string {
        return '[+-]?[0-9]+';
    }
    // tslint:disable-next-line:function-name
    public static floatNumber(): string {
        return '[+-]?([0-9]*\.[0-9]+|[0-9]+)';
    }
    // tslint:disable-next-line:function-name
    public static validStringWithNoZ(): string {
        return '^[^Z]([0-9a-zA-Z!@#$&()\\-`.+,/\"_ ]+)';
    }
}
