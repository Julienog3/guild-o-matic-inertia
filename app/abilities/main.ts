/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import Guild from '#models/guild'
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'

/**
 * Delete the following ability to start from
 * scratch
 */
export const editUser = Bouncer.ability(() => {
  return true
})

export const editGuild = Bouncer.ability((user: User, guild: Guild) => {
  return user.id === guild.ownerId
})

export const removeGuild = Bouncer.ability((user: User, guild: Guild) => {
  return user.id === guild.ownerId
})
