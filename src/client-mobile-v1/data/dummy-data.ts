import { CrawlRoute, User } from '../models';

export const USERS: User[] = [
    {
        guid: 'd35e8221-a312-4736-b4e5-1083c072abd2',
        name: 'Damjan Kovačič',
        initials: 'DK',
    },
    {
        guid: 'a052f2e9-7e55-496d-a9d4-80b9bad35c38',
        name: 'Iztok Molan',
        initials: 'IM',
    },
    {
        guid: 'eb3be931-c5f6-43f2-8e2e-1b6d98dcd981',
        name: 'Tilen Volčanšek',
        initials: 'TV',
    },
    {
        guid: '618ca037-1fe8-4334-ab67-639bcf51d3e1',
        name: 'Domen Prevejšek',
        initials: 'DP',
    },
    {
        guid: '8b7808d0-e2b2-4d6d-a7b6-3b5312f59937',
        name: 'Sami Ilc',
        initials: 'SI',
    },
    {
        guid: '6e4eb297-d70e-461b-a463-777662e0d90f',
        name: 'Ana Šolar',
        initials: 'AŠ',
    },
];

export const LOGGED_USER = USERS[0];

export const CRAWL_ROUTES: CrawlRoute[] = [
    {
        guid: 'c03f3d76-5253-4172-a1f3-4d75a69974a1',
        createdBy: USERS[0],
        createdOn: new Date('2024-01-01'),
        name: 'Test Route',
        favorite: false,
        finishedBy: 0,
        expectedTimeToFinish: '2:45',
        distance: 3.2,
        venues: [
            {
                guid: '22b8c0c5-6245-455b-95f3-ead463da1589',
                name: 'Lepa Žoga',
                sortOrder: 1,
                address: 'Celovška cesta 43, 1000 Ljubljana',
                location: { latitude: 46.0613863, longitude: 14.4959545 },
            },
            {
                guid: 'edadddfd-bc0f-40ef-aa53-dde8f9147243',
                name: 'Pivnica Union',
                sortOrder: 2,
                address: 'Celovška cesta 22, 1000 Ljubljana',
                location: { latitude: 46.0597303, longitude: 14.4986334 },
            },
            {
                guid: 'bb2e531f-8226-4f43-aead-9b8f4b7bc1c4',
                name: 'Tektonik kraft pivovarna',
                sortOrder: 3,
                address: 'Likozarjeva ulica 1, 1000 Ljubljana',
                location: { latitude: 46.0598113, longitude: 14.5052675 },
            },
            {
                guid: 'a3b33eff-081e-4ca2-bc6e-c0f3c9a82710',
                name: 'Orto Bar',
                sortOrder: 4,
                address: 'Grablovičeva ulica 1, 1000 Ljubljana',
                location: { latitude: 46.057936, longitude: 14.5215151 },
            },
            {
                guid: 'b2cd1608-e774-488b-817b-f802f463cbfd',
                name: 'Gas Station, Trgovina In Gostinstvo, D.O.O., Ljubljana',
                sortOrder: 5,
                address: 'Savska cesta 5, 1000 Ljubljana',
                location: { latitude: 46.0647533, longitude: 14.5252895 },
            },
        ],
    },
    {
        guid: 'e444c9b4-d514-4fa1-b7d8-aee6cc5d7361',
        createdBy: USERS[1],
        createdOn: new Date('2023-12-27'),
        name: 'Pit Pot Fixed',
        favorite: true,
        finishedBy: 10,
        expectedTimeToFinish: '12:20',
        distance: 6.7,
        venues: [
            {
                guid: 'fb01665a-b106-4794-9dac-792b86afe729',
                name: 'Restavracija in pizzerija Ancora',
                sortOrder: 1,
                address: 'Tovarniška cesta 10, 8250 Brežice',
                location: { latitude: 45.9176298, longitude: 15.5966119 },
            },
            {
                guid: '3e40625a-7dc1-48bb-b4ba-209f626143d4',
                name: 'Rondo Caffe bar',
                sortOrder: 2,
                address: 'Prečna pot 1, 8250 Brežice',
                location: { latitude: 45.9187324, longitude: 15.5915858 },
            },
            {
                guid: 'f6168ac1-4da0-410d-92fe-dce36aa569da',
                name: 'Reset Brewery',
                sortOrder: 3,
                address: 'Prečna pot 3, 8250 Brežice',
                location: { latitude: 45.9188613, longitude: 15.5916261 },
            },
            {
                guid: 'a5f55572-9156-4453-b81b-755750900c8f',
                name: 'Tomi',
                sortOrder: 4,
                address: 'Cesta bratov Milavcev 59',
                location: { latitude: 45.914035, longitude: 15.5903203 },
            },
            {
                guid: '9e72bdd7-2d54-4ed9-b7b6-02bd3e236b07',
                name: 'Gostilna - Prenočišče - Berdnik Marija, s.p.',
                sortOrder: 5,
                address: 'Cesta bratov Milavcev 39, 8250 Brežice',
                location: { latitude: 45.9122222, longitude: 15.5902778 },
            },
            {
                guid: '12158fd6-3994-484b-bccf-8a72fee56eaf',
                name: 'AMZS Brežice',
                sortOrder: 6,
                address: 'Obrtna ulica 5, 8250 Brežice',
                location: { latitude: 45.9125925, longitude: 15.5917009 },
            },
            {
                guid: '73722dd8-9e58-4b7c-b3f8-877f2391d939',
                name: 'MOL (ex OMV)',
                sortOrder: 7,
                address: 'BS, Cesta svobode 35, 8250 Brežice',
                location: { latitude: 45.9138365, longitude: 15.5952778 },
            },
            {
                guid: '2cb8de46-1057-4fa4-9219-f40aee679dd3',
                name: 'Diana Caffe',
                sortOrder: 8,
                address: 'Cesta svobode 31, 8250 Brežice',
                location: { latitude: 45.9120167, longitude: 15.5962018 },
            },
            {
                guid: '7a87d486-09ad-492c-93e3-fb24fd922528',
                name: 'Slaščičarna Antoni',
                sortOrder: 9,
                address: 'Pleteršnikova ulica 4a',
                location: { latitude: 45.9090607, longitude: 15.597773 },
            },
            {
                guid: 'b9f80751-29ef-42bc-90f7-2fba09a60fb2',
                name: `Carllo's caffe`,
                sortOrder: 10,
                address: 'Pleteršnikova ulica 4a, 8250 Brežice',
                location: { latitude: 45.9090607, longitude: 15.597773 },
            },
            {
                guid: 'a4305081-13a5-4f80-a30d-b3d4c768a508',
                name: 'Kafe bar Rosca',
                sortOrder: 11,
                address: 'Pleteršnikova ulica 2, 8250 Brežice',
                location: { latitude: 45.9088501, longitude: 15.5972131 },
            },
            {
                guid: '9012b76f-1914-4ed8-b5d5-ed8580a874a2',
                name: 'Slaščičarna Urška Brežice',
                sortOrder: 12,
                address: 'Černelčeva cesta 3a, 8250 Brežice',
                location: { latitude: 45.9071807, longitude: 15.5926325 },
            },
            {
                guid: '16b68094-d988-4281-9306-0775d9e9e5e4',
                name: 'Jazz Pub',
                sortOrder: 13,
                address: 'Trg Izgnancev 2, 8250 Brežice',
                location: { latitude: 45.9066808, longitude: 15.5915493 },
            },
            {
                guid: 'cc2d539f-83d8-4b5a-a3f8-d34476e8678b',
                name: 'Okrepčevalnica "Vrtnica" - Rueh Primož Leopold, s.p.',
                sortOrder: 14,
                address: 'Cesta prvih borcev 44, 8250 Brežice',
                location: { latitude: 45.9061111, longitude: 15.5919444 },
            },
            {
                guid: 'ce2ecc4b-fc3a-4d03-a4a7-5e462dc07a09',
                name: 'Kavarna vodovodni stolp',
                sortOrder: 15,
                address: 'Ulica stare pravde 30, 8250 Brežice',
                location: { latitude: 45.9037932, longitude: 15.5937531 },
            },
            {
                guid: '6ccd8c8e-1341-4037-8b8c-6d5c957e65c0',
                name: 'Gostilna in pizzerija "Santa Lucija"',
                sortOrder: 16,
                address: 'Cesta prvih borcev 15, 8250 Brežice',
                location: { latitude: 45.9038048, longitude: 15.5921323 },
            },
            {
                guid: 'a6c66b6f-42f3-4e22-b172-003289926479',
                name: 'Kavarna Renata Žagar s.p.',
                sortOrder: 17,
                address: 'Cesta prvih borcev 14, 8250 Brežice',
                location: { latitude: 45.9035839, longitude: 15.5925765 },
            },
            {
                guid: '0832c8d9-6095-4d41-8d09-e34000436983',
                name: 'huda.',
                sortOrder: 18,
                address: 'Cesta prvih borcev 7, 8250 Brežice',
                location: { latitude: 45.9030395, longitude: 15.5923303 },
            },
            {
                guid: 'c69e866e-8f72-48eb-913f-69671578846e',
                name: `Pr' Šefu`,
                sortOrder: 19,
                address: 'Prešernova cesta 17, 8250 Brežice',
                location: { latitude: 45.8991639, longitude: 15.5926788 },
            },
            {
                guid: 'd80c2427-2b8f-42eb-af4d-b543427f0a33',
                name: 'Mladinski center Brežice',
                sortOrder: 20,
                address: 'Gubčeva ulica 10a, 8250 Brežice',
                location: { latitude: 45.9019801, longitude: 15.5947526 },
            },
            {
                guid: '2e6f94b3-f4e5-4c92-8cf1-df254879edef',
                name: 'Hemingway Klub',
                sortOrder: 21,
                address: 'Hrastinska pot 46, 8250 Brežice',
                location: { latitude: 45.9042719, longitude: 15.6011533 },
            },
            {
                guid: '36f6d852-a156-4fd2-8c12-9823d98ceb23',
                name: 'Gostilna in Pizzeria Italia',
                sortOrder: 22,
                address: 'Borštnikova ulica 10, 8250 Brežice',
                location: { latitude: 45.9049714, longitude: 15.6017848 },
            },
        ],
    },
    {
        guid: '95e62328-06aa-4223-b59b-b00f0cf2baa5',
        createdBy: USERS[1],
        createdOn: new Date('2023-12-20'),
        name: 'Brežice Prednovoletni Crawl',
        favorite: true,
        finishedBy: 0,
        expectedTimeToFinish: '0:00',
        distance: 0,
        venues: [],
    },
    {
        guid: '1d953914-d673-4203-ae7e-e53b59899aaf',
        createdBy: USERS[2],
        createdOn: new Date('2024-01-11'),
        name: 'Ljubljana Fešta',
        favorite: false,
        finishedBy: 0,
        expectedTimeToFinish: '0:00',
        distance: 0,
        venues: [],
    },
    {
        guid: '4aaaaf40-8f7b-482c-8fa8-cb3218104884',
        createdBy: USERS[2],
        createdOn: new Date('2024-01-15'),
        name: 'Morning Afterparty',
        favorite: false,
        finishedBy: 0,
        expectedTimeToFinish: '0:00',
        distance: 0,
        venues: [],
    },
    {
        guid: '45be3a9c-5fe9-4a96-915e-a8b65ca5aa24',
        createdBy: USERS[2],
        createdOn: new Date('2024-01-13'),
        name: 'A je v Šiški še kaj odprtega?',
        favorite: false,
        finishedBy: 0,
        expectedTimeToFinish: '0:00',
        distance: 0,
        venues: [],
    },
    {
        guid: 'fb7f97b1-16d1-4b29-99db-92c1b21803d3',
        createdBy: USERS[3],
        createdOn: new Date('2024-01-05'),
        name: 'Zjutraj kofe',
        favorite: true,
        finishedBy: 55,
        expectedTimeToFinish: '0:00',
        distance: 0,
        venues: [],
    },
    {
        guid: 'd90896f2-a748-4419-840c-e2dadb1b25df',
        createdBy: USERS[3],
        createdOn: new Date('2024-01-03'),
        name: 'Stag Party',
        favorite: true,
        finishedBy: 5,
        expectedTimeToFinish: '0:00',
        distance: 0,
        venues: [],
    },
    {
        guid: 'fdf89d06-21d2-446b-a6ad-e2f0f3ac210e',
        createdBy: USERS[2],
        createdOn: new Date('2024-01-07'),
        name: 'Discover Grosuplje',
        favorite: true,
        finishedBy: 1,
        expectedTimeToFinish: '0:00',
        distance: 0,
        venues: [],
    },
    {
        guid: '5e09e07d-86bb-4088-9981-7e3e61fd358c',
        createdBy: USERS[4],
        createdOn: new Date('2014-06-25'),
        name: 'Ni vic it peš iz Skopic',
        favorite: true,
        finishedBy: 2,
        expectedTimeToFinish: '0:00',
        distance: 0,
        venues: [],
    },
    {
        guid: '8efe1fe1-2626-4bbb-9975-2ad9f718f164',
        createdBy: USERS[4],
        createdOn: new Date('2024-01-23'),
        name: '50-letnica Družinski prijatelj 1',
        favorite: true,
        finishedBy: 6,
        expectedTimeToFinish: '0:00',
        distance: 0,
        venues: [],
    },
    {
        guid: 'f2b8d980-7b4a-4328-aae5-2e54998a79ca',
        createdBy: USERS[4],
        createdOn: new Date('2024-01-20'),
        name: '40-letnica Družinski prijatelj 2',
        favorite: true,
        finishedBy: 4,
        expectedTimeToFinish: '0:00',
        distance: 0,
        venues: [],
    },
    {
        guid: '138e04d9-bf43-4b80-a108-5e7153c7ad79',
        createdBy: USERS[4],
        createdOn: new Date('2024-01-19'),
        name: '60-letnica Družinski prijatelj 3',
        favorite: true,
        finishedBy: 1,
        expectedTimeToFinish: '0:00',
        distance: 0,
        venues: [],
    },
];
