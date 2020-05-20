import { LatLngLiteral } from '@agm/core';

export interface Waypoints {
    location: LatLngLiteral;
    stopover: boolean;
}