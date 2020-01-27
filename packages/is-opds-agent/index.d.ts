/**
 * Created by user on 2020/1/27.
 */
export declare const enum EnumOPDSAgent {
    None = 0,
    OPDS = 1,
    MoonPlusReader = 2,
    Stanza = 4,
    Aldiko = 8
}
/**
 * this ua from Moon+ Reader
 */
export declare const LAZY_OPDS_UA = "OPDS/Stanza iPhone/Aldiko/Moon+ Reader(Android)";
export declare function isOPDSAgent(ua: string): EnumOPDSAgent;
export declare function hasFlag(result: number | EnumOPDSAgent, flag: EnumOPDSAgent): boolean;
export default isOPDSAgent;
