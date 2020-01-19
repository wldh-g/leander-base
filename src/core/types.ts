/* Leander is subject to the terms of the Mozilla Public License 2.0.
 * You can obtain a copy of MPL at LICENSE.md of repository root. */

type AppDirMaker = (structuredPath: string[]) => string
interface AppDir {
  DATA: string;
  RES: string;
  data: AppDirMaker;
  res: AppDirMaker;
}

interface AppFnItem {
  keyword: string;
  abbr?: string;
  description: string;
  options: string[];
}
interface AppOptItem {
  flags: string[];
  type: 'string' | 'number' | 'flag';
  description: string;
  required: boolean;
  multiple?: boolean;
  inputCount?: number;
}
interface AppArg {
  fn: {
    default: AppFnItem;
    [key: string]: AppFnItem;
  };
  opt: {
    [key: string]: AppOptItem;
  };
}
interface AppArgAnalyzed {
  fn?: AppFnItem & {
    isDefault: boolean;
  };
  [key: string]: boolean | number | string | string[] | AppFnItem;
}

interface AppName {
  full: string;
  abbr: string;
}

type AppConfig = PackageJSON & {
  name?: AppName;
  dir?: AppDir;
  arg?: AppArg;
}

type ErrorInstance = Error & {
  more?: string;
}

// Package.json data types by https://gist.github.com/iainreid820/5c1cc527fe6b5b7dba41fec7fe54bf6e
interface PackageJSON extends Object {
  readonly name?: string;
  readonly version?: string;
  readonly description?: string;
  readonly keywords?: string[];
  readonly homepage?: string;
  readonly bugs?: string|PKGBugs;
  readonly license?: string;
  readonly author?: string|PKGAuthor;
  readonly contributors?: string[]|PKGAuthor[];
  readonly files?: string[];
  readonly main?: string;
  readonly bin?: string|PKGBinMap;
  readonly man?: string|string[];
  readonly directories?: PKGDirectories;
  readonly repository?: string|PKGRepository;
  readonly scripts?: PKGScriptsMap;
  readonly config?: PKGConfig;
  readonly dependencies?: PKGDependencyMap;
  readonly devDependencies?: PKGDependencyMap;
  readonly peerDependencies?: PKGDependencyMap;
  readonly optionalDependencies?: PKGDependencyMap;
  readonly bundledDependencies?: string[];
  readonly engines?: PKGEngines;
  readonly os?: string[];
  readonly cpu?: string[];
  readonly preferGlobal?: boolean;
  readonly private?: boolean;
  readonly publishConfig?: PKGPublishConfig;
}
interface PKGAuthor {
  name: string;
  email?: string;
  homepage?: string;
}
interface PKGBinMap {
  [commandName: string]: string;
}
interface PKGBugs {
  email: string;
  url: string;
}
interface PKGConfig {
  name?: string;
  config?: object;
}
interface PKGDependencyMap {
  [dependencyName: string]: string;
}
interface PKGDirectories {
  lib?: string;
  bin?: string;
  man?: string;
  doc?: string;
  example?: string;
}
interface PKGEngines {
  node?: string;
  npm?: string;
}
interface PKGPublishConfig {
  registry?: string;
}
interface PKGRepository {
  type: string;
  url: string;
}
interface PKGScriptsMap {
  [scriptName: string]: string;
}
