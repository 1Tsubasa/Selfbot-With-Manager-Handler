const getNow = () => {
    return {
        time: new Date().toLocaleString("fr-FR", {
            timeZone: "Europe/Paris",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })
    };
};

module.exports = {
    name: "ready",
    once: true,
    run: async (client) => {
        console.clear();
        console.log(`----------------------------------------------------------------`)
        console.log(`[DATE] : ${getNow().time}`);
        console.log(`[CLIENT] : ${client.user.username}`);
        console.log(`[VERSION] : ${client.version.version}`);
        console.log(`[GUILDS]: ${client.guilds.cache.size}`);
        console.log(`[CHANNELS]: ${client.channels.cache.size}`);
        console.log(`[USERS] ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0).toLocaleString()}`);
        console.log(`----------------------------------------------------------------`)

        let users = await client.db.get(`client_${client.user.id}`) || [];
        let premiumUsers = await client.db.get(`revoluty_premium`) || [];
        let status = [
            `👑 Revoluty - Manager`,
            `👑 Revoluty v2`,
            `👑 Users : ${users.length}`,
            `👑 Premium Users : ${premiumUsers.length}`,
            `👑 https://github.com/1Tsubasa`
        ]
        setInterval(() => {
            // client.user.setPresence({ activities: [{ name: status, type: 4 }], status: 'dnd' });
            client.user.setPresence({ activities: [{ name: status[Math.floor(Math.random() * status.length)], type: 4 }], status: 'dnd' });
        }, client.ms("10s"))
    }
}
