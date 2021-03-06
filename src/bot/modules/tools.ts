/* Leander is subject to the terms of the Mozilla Public License 2.0.
 * You can obtain a copy of MPL at LICENSE.md of repository root. */

import * as DISCORD from 'discord.js';

class Tools implements LNDRModule {
  public name = 'tools';

  public acts = {
    getMember: (guild: DISCORD.Guild, memberLike: string): DISCORD.GuildMember => {
      let member;
      if (memberLike.indexOf('<@!') === 0) {
        member = guild.member(memberLike.substring(3, memberLike.length - 1));
      } else {
        member = guild.member(memberLike);
      }
      return member;
    },

    from: (obj): string => {
      let name;
      if (obj instanceof DISCORD.User) {
        name = obj.username;
      } else if (obj instanceof DISCORD.GuildMember) {
        name = obj.nickname || obj.user.username;
      } else if (obj.member) {
        name = obj.member.nickname || obj.author.username;
      } else if (obj.author) {
        name = obj.author.username;
      } else {
        name = 'Unknown';
      }
      return name;
    },

    isURL: (urlLike): boolean => {
      try {
        // eslint-disable-next-line no-new
        new URL(urlLike);
        return true;
      } catch (_) {
        return false;
      }
    },

    mention: (obj): string => {
      let user;
      if (obj instanceof DISCORD.User) {
        user = obj;
      } else if (obj instanceof DISCORD.Message || obj.author) {
        user = obj.author;
      } else if (typeof obj === 'string') {
        user = { id: obj };
      } else {
        user = { id: 'unknown' };
        this.core.log.warn('etc::mention - 알 수 없는 객체입니다.');
      }
      return `<@!${user.id}>`;
    },
  };

  public init = (core: AppCore, lndr: LNDRBase): Promise<void> => new Promise((resolve) => {
    this.core = core;
    this.lndr = lndr;
    resolve();
  });

  private core: AppCore;

  private lndr: LNDRBase;
}

export default Tools;
