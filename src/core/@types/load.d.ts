/* Leander is subject to the terms of the Mozilla Public License 2.0.
 * You can obtain a copy of MPL at LICENSE.md of repository root. */

// Package.json data types by https://gist.github.com/iainreid820/5c1cc527fe6b5b7dba41fec7fe54bf6e
interface IPackageJSON extends Object {

  readonly name?: string;

  readonly version?: string;

  readonly description?: string;

  readonly keywords?: string[];

  readonly homepage?: string;

  readonly bugs?: string|IBugs;

  readonly license?: string;

  readonly author?: string|IAuthor;

  readonly contributors?: string[]|IAuthor[];

  readonly files?: string[];

  readonly main?: string;

  readonly bin?: string|IBinMap;

  readonly man?: string|string[];

  readonly directories?: IDirectories;

  readonly repository?: string|IRepository;

  readonly scripts?: IScriptsMap;

  readonly config?: IConfig;

  readonly dependencies?: IDependencyMap;

  readonly devDependencies?: IDependencyMap;

  readonly peerDependencies?: IDependencyMap;

  readonly optionalDependencies?: IDependencyMap;

  readonly bundledDependencies?: string[];

  readonly engines?: IEngines;

  readonly os?: string[];

  readonly cpu?: string[];

  readonly preferGlobal?: boolean;

  readonly private?: boolean;

  readonly publishConfig?: IPublishConfig;

}

/**
 * An author or contributor
 */
interface IAuthor {
  name: string;
  email?: string;
  homepage?: string;
}

/**
 * A map of exposed bin commands
 */
interface IBinMap {
  [commandName: string]: string;
}

/**
 * A bugs link
 */
interface IBugs {
  email: string;
  url: string;
}

interface IConfig {
  name?: string;
  config?: Object;
}

/**
 * A map of dependencies
 */
interface IDependencyMap {
  [dependencyName: string]: string;
}

/**
 * CommonJS package structure
 */
interface IDirectories {
  lib?: string;
  bin?: string;
  man?: string;
  doc?: string;
  example?: string;
}

interface IEngines {
  node?: string;
  npm?: string;
}

interface IPublishConfig {
  registry?: string;
}

/**
 * A project repository
 */
interface IRepository {
  type: string;
  url: string;
}

interface IScriptsMap {
  [scriptName: string]: string;
}

type AppConfig = IPackageJSON & {
  name?: AppName
  dir?: AppDir
  arg?: AppArg
}
