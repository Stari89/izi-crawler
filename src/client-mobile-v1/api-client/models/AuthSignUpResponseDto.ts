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
 * @interface AuthSignUpResponseDto
 */
export interface AuthSignUpResponseDto {
    /**
     * 
     * @type {string}
     * @memberof AuthSignUpResponseDto
     */
    obfuscatedEmail: string;
}

/**
 * Check if a given object implements the AuthSignUpResponseDto interface.
 */
export function instanceOfAuthSignUpResponseDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "obfuscatedEmail" in value;

    return isInstance;
}

export function AuthSignUpResponseDtoFromJSON(json: any): AuthSignUpResponseDto {
    return AuthSignUpResponseDtoFromJSONTyped(json, false);
}

export function AuthSignUpResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthSignUpResponseDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'obfuscatedEmail': json['obfuscatedEmail'],
    };
}

export function AuthSignUpResponseDtoToJSON(value?: AuthSignUpResponseDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'obfuscatedEmail': value.obfuscatedEmail,
    };
}
