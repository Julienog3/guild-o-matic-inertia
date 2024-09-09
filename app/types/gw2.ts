export type GW2Extension = 'GuildWars2'| 'HeartOfThorns' | 'PathOfFire' | 'EndOfDragons'
export type GW2FlagsValues = 'FlipBackgroundHorizontal' | 'FlipBackgroundVertical'

export type GW2Account = {
  id: string
  age: number
  name: string
  world: number
  guilds: string[]
  guild_leader: string[]
  created: string
  access: GW2Extension[]
  commander: boolean
  fractal_level: number
  daily_ap: number
  monthly_ap: number
  wvw_rank: number
  last_modified: string
  build_storage_slots: number
}

export interface GW2Guild {
  id: string
  name: string
  tag: string
  emblem: {
    background: {
      id: number
      colors: number[]
    }
    foreground: {
      id: number
      colors: number[]
    }
    flags: GW2FlagsValues[]
  }
}

export interface GW2GuildAuthenticated extends GW2Guild {
  level: number
  motd: string
  influence: number
  aetherium: string
  favor: number
  member_count: number
  member_capacity: number
}