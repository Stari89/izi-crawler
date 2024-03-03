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
 * @interface AuthResetPasswordDto
 */
export interface AuthResetPasswordDto {
    /**
     * 
     * @type {string}
     * @memberof AuthResetPasswordDto
     */
    accessToken: string;
    /**
     * 
     * @type {string}
     * @memberof AuthResetPasswordDto
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof AuthResetPasswordDto
     */
    confirmPassword: string;
}

/**
 * Check if a given object implements the AuthResetPasswordDto interface.
 */
export function instanceOfAuthResetPasswordDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "accessToken" in value;
    isInstance = isInstance && "password" in value;
    isInstance = isInstance && "confirmPassword" in value;

    return isInstance;
}

export function AuthResetPasswordDtoFromJSON(json: any): AuthResetPasswordDto {
    return AuthResetPasswordDtoFromJSONTyped(json, false);
}

export function AuthResetPasswordDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthResetPasswordDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'accessToken': json['accessToken'],
        'password': json['password'],
        'confirmPassword': json['confirmPassword'],
    };
}

export function AuthResetPasswordDtoToJSON(value?: AuthResetPasswordDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'accessToken': value.accessToken,
        'password': value.password,
        'confirmPassword': value.confirmPassword,
    };
}

