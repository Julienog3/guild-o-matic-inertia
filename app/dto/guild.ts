import Guild from "#models/guild"

export default class GuildDto {
    constructor (private guild: Guild) {}

    toJson() {
        return {
            id: this.guild.id,
            gw2GuildId: this.guild.gw2GuildId,
            discordLink: this.guild.discordLink,
            description: this.guild.description,
            isRecruiting: this.guild.isRecruiting,
            thumbnail: this.guild.thumbnail,
            ownerId: this.guild.ownerId,
            owner: this.guild.owner,
            categories: this.guild.categories,
            excerpt: this.guild.excerpt,
            createdAt: this.guild.createdAt,
            updatedAt: this.guild.updatedAt
        }
    }
}