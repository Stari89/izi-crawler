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
 * @interface AuthEmailDto
 */
export interface AuthEmailDto {
    /**
     * 
     * @type {string}
     * @memberof AuthEmailDto
     */
    email: string;
}

/**
 * Check if a given object implements the AuthEmailDto interface.
 */
export function instanceOfAuthEmailDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "email" in value;

    return isInstance;
}

export function AuthEmailDtoFromJSON(json: any): AuthEmailDto {
    return AuthEmailDtoFromJSONTyped(json, false);
}

export function AuthEmailDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthEmailDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
    };
}

export function AuthEmailDtoToJSON(value?: AuthEmailDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
    };
}

