// import Guild from '#models/guild'
// import { inject } from '@adonisjs/core'
// import GW2Service from '#services/gw2_service'

// const LIMIT = 30

// @inject()
// export default class GuildService {
//   constructor(private gw2Service: GW2Service) {}

//   async findAll(page: number) {
//     const guilds = await Guild.query().preload('owner').paginate(page, LIMIT)

//     const guildsWithDetails = await Promise.all(
//       guilds.map(async (guild) => {
//         return {
//           ...guild,
//           details: await this.gw2Service.getGuild(
//             auth.user?.gw2ApiKey ?? env.get('GW2_API_KEY'),
//             guild.gw2GuildId
//           ),
//         }
//       })
//     )

//     return
//   }
// }
