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
 * @interface UserDto
 */
export interface UserDto {
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    uuid: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    email: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserDto
     */
    isActive: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UserDto
     */
    emailConfirmed: boolean;
}

/**
 * Check if a given object implements the UserDto interface.
 */
export function instanceOfUserDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "uuid" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "isActive" in value;
    isInstance = isInstance && "emailConfirmed" in value;

    return isInstance;
}

export function UserDtoFromJSON(json: any): UserDto {
    return UserDtoFromJSONTyped(json, false);
}

export function UserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'uuid': json['uuid'],
        'email': json['email'],
        'isActive': json['isActive'],
        'emailConfirmed': json['emailConfirmed'],
    };
}

export function UserDtoToJSON(value?: UserDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'uuid': value.uuid,
        'email': value.email,
        'isActive': value.isActive,
        'emailConfirmed': value.emailConfirmed,
    };
}

