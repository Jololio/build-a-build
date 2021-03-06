const sequelize = require('./database')

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        DROP TABLE IF EXISTS bab_builds;
        DROP TABLE IF EXISTS bab_users;
        DROP TABLE IF EXISTS bab_champions;
        DROP TABLE IF EXISTS bab_items;
        
        CREATE TABLE bab_users (
            user_id SERIAL PRIMARY KEY,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            username VARCHAR(100),
            password VARCHAR(100)
        );

        CREATE TABLE bab_champions (
            champion_id SERIAL PRIMARY KEY,
            champ_name VARCHAR(200)
        );

        CREATE TABLE bab_items (
            item_id SERIAL PRIMARY KEY,
            item_name VARCHAR(250)
        );

        CREATE TABLE bab_builds (
            build_id SERIAL PRIMARY KEY,
            build_name VARCHAR(100),
            user_id INTEGER REFERENCES bab_users(user_id),
            champion_id INTEGER REFERENCES bab_champions(champion_id),
            item_1 INTEGER,
            item_2 INTEGER,
            item_3 INTEGER,
            item_4 INTEGER,
            item_5 INTEGER,
            item_6 INTEGER
        );

        INSERT INTO bab_users (first_name, last_name, username, password)
        VALUES('Joseph', 'Al-Abudi', 'Jololio', '12345');

        
        INSERT INTO bab_champions (champ_name)
        VALUES('Aatrox'),
            ('Ahri'),
            ('Akali'),
            ('Akshan'),
            ('Alistar'),
            ('Amumu'),
            ('Anivia'),
            ('Annie'),
            ('Aphelios'),
            ('Ashe'),
            ('Aurelion Sol'),
            ('Azir'),
            ('Bard'),
            ('Blitzcrank'),
            ('Brand'),
            ('Braum'),
            ('Bel Veth'),
            ('Caitlyn'),
            ('Camille'),
            ('Cassiopeia'),
            ('Cho Gath'),
            ('Corki'),
            ('Darius'),
            ('Diana'),
            ('Dr. Mundo'),
            ('Draven'),
            ('Ekko'),
            ('Elise'),
            ('Evelynn'),
            ('Ezreal'),
            ('Fiddlesticks'),
            ('Fiora'),
            ('Fizz'),
            ('Galio'),
            ('Gangplank'),
            ('Garen'),
            ('Gnar'),
            ('Gragas'),
            ('Graves'),
            ('Gwen'),
            ('Hecarim'),
            ('Heimerdinger'),
            ('Illaoi'),
            ('Irelia'),
            ('Ivern'),
            ('Janna'),
            ('Jarvan IV'),
            ('Jax'),
            ('Jayce'),
            ('Jhin'),
            ('Jinx'),
            ('Kaisa'),
            ('Kalista'),
            ('Karma'),
            ('Karthus'),
            ('Kassadin'),
            ('Katarina'),
            ('Kayle'),
            ('Kayn'),
            ('Kennen'),
            ('Kha Zix'),
            ('Kindred'),
            ('Kled'),
            ('Kog Maw'),
            ('LeBlanc'),
            ('Lee Sin'),
            ('Leona'),
            ('Lillia'),
            ('Lissandra'),
            ('Lucian'),
            ('Lulu'),
            ('Lux'),
            ('Malphite'),
            ('Malzahar'),
            ('Maokai'),
            ('Master Yi'),
            ('Miss Fortune'),
            ('Mordekaiser'),
            ('Morgana'),
            ('Nami'),
            ('Nasus'),
            ('Nautilus'),
            ('Neeko'),
            ('Nidalee'),
            ('Nocturne'),
            ('Nunu & Willump'),
            ('Olaf'),
            ('Orianna'),
            ('Ornn'),
            ('Pantheon'),
            ('Poppy'),
            ('Pyke'),
            ('Qiyana'),
            ('Quinn'),
            ('Rakan'),
            ('Rammus'),
            ('Rek Sai'),
            ('Rell'),
            ('Renata Glasc'),
            ('Renekton'),
            ('Rengar'),
            ('Riven'),
            ('Rumble'),
            ('Ryze'),
            ('Samira'),
            ('Sejuani'),
            ('Senna'),
            ('Seraphine'),
            ('Sett'),
            ('Shaco'),
            ('Shen'),
            ('Shyvana'),
            ('Singed'),
            ('Sion'),
            ('Sivir'),
            ('Skarner'),
            ('Sona'),
            ('Soraka'),
            ('Swain'),
            ('Sylas'),
            ('Syndra'),
            ('Tahm Kench'),
            ('Taliyah'),
            ('Talon'),
            ('Taric'),
            ('Teemo'),
            ('Thresh'),
            ('Tristana'),
            ('Trundle'),
            ('Tryndamere'),
            ('Twisted Fate'),
            ('Twitch'),
            ('Udyr'),
            ('Urgot'),
            ('Varus'),
            ('Vayne'),
            ('Veigar'),
            ('Vel Koz'),
            ('Vex'),
            ('Vi'),
            ('Viego'),
            ('Viktor'),
            ('Vladimir'),
            ('Volibear'),
            ('Warwick'),
            ('Wukong'),
            ('Xayah'),
            ('Xerath'),
            ('Xin Zhao'),
            ('Yasuo'),
            ('Yone'),
            ('Yorick'),
            ('Yuumi'),
            ('Zac'),
            ('Zed'),
            ('Zeri'),
            ('Ziggs'),
            ('Zilean'),
            ('Zoe'),
            ('Zyra');
        
        INSERT INTO bab_items (item_name)
        VALUES('Crown of the Shattered Queen'),
            ('Divine Sunderer'),
            ('Duskblade of Draktharr'),
            ('Eclipse'),
            ('Evenshroud'),
            ('Everfrost'),
            ('Frostfire Gauntlet'),
            ('Galeforce'),
            ('Goredrinker'),
            ('Hextech Rocketbelt'),
            ('Immortal Shieldbow'),
            ('Imperial Mandate'),
            ('Kraken Slayer'),
            ('Liandrys Anguish'),
            ('Locket of the Iron Solari'),
            ('Ludens Tempest'),
            ('Moonstone Renewer'),
            ('Night Harvester'),
            ('Prowlers Claw'),
            ('Riftmaker'),
            ('Shurelyas Battlesong'),
            ('Stridebreaker'),
            ('Sunfire Aegis'),
            ('Trinity Force'),
            ('Turbo Chemtank'),
            ('Abyssal Mask'),
            ('Anthemas Chains'),
            ('Archangels Staff'),
            ('Ardent Censer'),
            ('Axiom Arc'),
            ('Banshees Veil'),
            ('Berserkers Greaves'),
            ('Black Cleaver'),
            ('Black Mist Scythe'),
            ('Blade of the Ruined King'),
            ('Bloodthirster'),
            ('Boots of Swiftness'),
            ('Bulwark of the Mountain'),
            ('Chempunk Chainsword'),
            ('Chemtech Putrifier'),
            ('Cosmic Drive'),
            ('Dead Mans Plate'),
            ('Deaths Dance'),
            ('Demonic Embrace'),
            ('Edge of Night'),
            ('Essence Reaver'),
            ('Fimbulwinter'),
            ('Force of Nature'),
            ('Frozen Heart'),
            ('Gargoyle Stoneplate'),
            ('Guardian Angel'),
            ('Guinsoos Rageblade'),
            ('Horizon Focus'),
            ('Hullbreaker'),
            ('Infinity Edge'),
            ('Ionian boots of Lucidity'),
            ('Knights Vow'),
            ('Lich Bane'),
            ('Lord Dominiks Regards'),
            ('Manamune'),
            ('Maw of Malmortius'),
            ('Mejais Soulstealer'),
            ('Mercurial Scimitar'),
            ('Mercurys Treads'),
            ('Mikaels Blessing'),
            ('Mobility Boots'),
            ('Morellonomicon'),
            ('Mortal Reminder'),
            ('Nashors Tooth'),
            ('Navori Quickblades'),
            ('Pauldrons of Whiterock'),
            ('Phantom Dancer'),
            ('Plated Steelcaps'),
            ('Rabadons Deathcap'),
            ('Randuins Omen'),
            ('Rapid Firecannon'),
            ('Ravenous Hydra'),
            ('Redemption'),
            ('Runaans Hurricane'),
            ('Rylais Crystal Scepter'),
            ('Serpents Fang'),
            ('Seryldas Grudge'),
            ('Shadowflame'),
            ('Shard of True Ice'),
            ('Silvermere Dawn'),
            ('Spirit Visage'),
            ('Sorcerers Shoes'),
            ('Staff of Flowing Water'),
            ('Steraks Gage'),
            ('Stormrazor'),
            ('The Collector'),
            ('Thornmail'),
            ('Titanic Hydra'),
            ('Umbral Glaive'),
            ('Vigilant Wardstone'),
            ('Void Staff'),
            ('Warmogs Armor'),
            ('Winters Approach'),
            ('Wits End'),
            ('Youmuus Ghostblade'),
            ('Zekes Convergence'),
            ('Zhonyas Hourglass');

        INSERT INTO bab_builds (user_id, champion_id, item_1, item_2, item_3, item_4, item_5, item_6, build_name)
        VALUES (1,1,1,2,3,4,5,6, 'Trox');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error sending DB', err))
    }
}