/**
 * @see https://manual.calibre-ebook.com/customize.html#environment-variables
 */
export interface ICalibreEnv {
    CALIBRE_CONFIG_DIRECTORY?: string;
    CALIBRE_TEMP_DIR?: string;
    CALIBRE_CACHE_DIRECTORY?: string;
    CALIBRE_OVERRIDE_DATABASE_PATH?: string;
    CALIBRE_DEVELOP_FROM?: string;
    CALIBRE_OVERRIDE_LANG?: string;
    CALIBRE_TEST_TRANSLATION?: string;
    CALIBRE_NO_NATIVE_FILEDIALOGS?: string;
    CALIBRE_NO_NATIVE_MENUBAR?: string;
    CALIBRE_USE_SYSTEM_THEME?: string;
    CALIBRE_SHOW_DEPRECATION_WARNINGS?: string;
    CALIBRE_NO_DEFAULT_PROGRAMS?: string;
    CALIBRE_USE_DARK_PALETTE?: string;
    SYSFS_PATH?: string;
    CALIBRE_LIBRARY_DIRECTORY?: string;
    CALIBRE_PATH?: string;
}
declare global {
    namespace NodeJS {
        interface ProcessEnv extends ICalibreEnv {
        }
    }
}
export declare function calibreEnv(env?: Record<any, any> | ICalibreEnv): ICalibreEnv;
export declare function envCalibrePath(env?: Record<any, any>): string;
export default calibreEnv;
