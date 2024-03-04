/* tslint:disable */
/* eslint-disable */
/**
 * Izi Crawler API
 * server-api-v1
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AuthUpdatePasswordDto
 */
export interface AuthUpdatePasswordDto {
    /**
     * 
     * @type {string}
     * @memberof AuthUpdatePasswordDto
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUpdatePasswordDto
     */
    confirmPassword: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUpdatePasswordDto
     */
    oldPassword: string;
}

/**
 * Check if a given object implements the AuthUpdatePasswordDto interface.
 */
export function instanceOfAuthUpdatePasswordDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "password" in value;
    isInstance = isInstance && "confirmPassword" in value;
    isInstance = isInstance && "oldPassword" in value;

    return isInstance;
}

export function AuthUpdatePasswordDtoFromJSON(json: any): AuthUpdatePasswordDto {
    return AuthUpdatePasswordDtoFromJSONTyped(json, false);
}

export function AuthUpdatePasswordDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthUpdatePasswordDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'password': json['password'],
        'confirmPassword': json['confirmPassword'],
        'oldPassword': json['oldPassword'],
    };
}

export function AuthUpdatePasswordDtoToJSON(value?: AuthUpdatePasswordDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'password': value.password,
        'confirmPassword': value.confirmPassword,
        'oldPassword': value.oldPassword,
    };
}
