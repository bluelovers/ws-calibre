/// <reference types="node" />
import { NetworkInterfaceInfo } from "os";
export declare function searchIPAddress(options?: {
    filterInterfacesNot: string | RegExp | ((interfaceName: string, interfaceData: NetworkInterfaceInfo[]) => boolean);
    filterIP: string | RegExp | ((ip: string) => boolean);
    defaultIP: string;
}): string;
export declare function defaultFilter(interfaceName: string, interfaceData: NetworkInterfaceInfo[]): boolean;
export declare function _handleInputCallback<T extends (s: string, ...argv: any) => boolean>(callback: string | RegExp | T, defaultCallback: T): T;
export default searchIPAddress;
