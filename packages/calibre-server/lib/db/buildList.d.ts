import Bluebird from 'bluebird';
import { IFindLibrarys } from 'calibre-db/lib/types';
import { IServerOpotions } from '../server/options';
import { IFindLibrarysServer } from '../types';
import { ITSPickExtra } from 'ts-type/lib/type/record';
export declare function findLibraryFromPaths(options: ITSPickExtra<IServerOpotions, 'cwd' | 'calibrePaths', 'dbFilter'>): Bluebird<IFindLibrarys[]>;
export declare function buildLibraryList(options: ITSPickExtra<IServerOpotions, 'cwd' | 'calibrePaths', 'dbFilter'>): Bluebird<Record<string, IFindLibrarysServer>>;
