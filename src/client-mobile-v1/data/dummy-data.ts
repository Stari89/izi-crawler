import { CrawlRoute, User } from '../models';

export const USERS: User[] = [
    {
        guid: 'd35e8221-a312-4736-b4e5-1083c072abd2',
        name: 'Damjan Kovačič',
    },
    {
        guid: 'a052f2e9-7e55-496d-a9d4-80b9bad35c38',
        name: 'Iztok Molan',
    },
    {
        guid: 'eb3be931-c5f6-43f2-8e2e-1b6d98dcd981',
        name: 'Tilen Volčanšek',
    },
    {
        guid: '618ca037-1fe8-4334-ab67-639bcf51d3e1',
        name: 'Domen Prevejšek',
    },
    {
        guid: '8b7808d0-e2b2-4d6d-a7b6-3b5312f59937',
        name: 'Sami Ilc',
    },
    {
        guid: '6e4eb297-d70e-461b-a463-777662e0d90f',
        name: 'Ana Šolar',
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
    },
    {
        guid: 'e444c9b4-d514-4fa1-b7d8-aee6cc5d7361',
        createdBy: USERS[1],
        createdOn: new Date('2023-12-27'),
        name: 'Brežice Prednovoletni Crawl Fixed',
        favorite: true,
        finishedBy: 10,
    },
    {
        guid: '95e62328-06aa-4223-b59b-b00f0cf2baa5',
        createdBy: USERS[1],
        createdOn: new Date('2023-12-20'),
        name: 'Brežice Prednovoletni Crawl',
        favorite: true,
        finishedBy: 0,
    },
    {
        guid: '1d953914-d673-4203-ae7e-e53b59899aaf',
        createdBy: USERS[2],
        createdOn: new Date('2024-01-11'),
        name: 'Ljubljana Fešta',
        favorite: false,
        finishedBy: 0,
    },
    {
        guid: '4aaaaf40-8f7b-482c-8fa8-cb3218104884',
        createdBy: USERS[2],
        createdOn: new Date('2024-01-15'),
        name: 'Morning Afterparty',
        favorite: false,
        finishedBy: 0,
    },
    {
        guid: '45be3a9c-5fe9-4a96-915e-a8b65ca5aa24',
        createdBy: USERS[2],
        createdOn: new Date('2024-01-13'),
        name: 'A je v Šiški še kaj odprtega?',
        favorite: false,
        finishedBy: 0,
    },
    {
        guid: 'fb7f97b1-16d1-4b29-99db-92c1b21803d3',
        createdBy: USERS[3],
        createdOn: new Date('2024-01-05'),
        name: 'Calm Evening',
        favorite: false,
        finishedBy: 0,
    },
    {
        guid: 'd90896f2-a748-4419-840c-e2dadb1b25df',
        createdBy: USERS[3],
        createdOn: new Date('2024-01-03'),
        name: 'Stag Party',
        favorite: true,
        finishedBy: 5,
    },
    {
        guid: 'fdf89d06-21d2-446b-a6ad-e2f0f3ac210e',
        createdBy: USERS[2],
        createdOn: new Date('2024-01-07'),
        name: 'Discover Grosuplje',
        favorite: true,
        finishedBy: 1,
    },
    {
        guid: '5e09e07d-86bb-4088-9981-7e3e61fd358c',
        createdBy: USERS[4],
        createdOn: new Date('2014-06-25'),
        name: 'Ni vic it peš iz Skopic',
        favorite: true,
        finishedBy: 2,
    },
    {
        guid: '8efe1fe1-2626-4bbb-9975-2ad9f718f164',
        createdBy: USERS[4],
        createdOn: new Date('2024-01-23'),
        name: '50-letnica Družinski prijatelj 1',
        favorite: true,
        finishedBy: 6,
    },
    {
        guid: 'f2b8d980-7b4a-4328-aae5-2e54998a79ca',
        createdBy: USERS[4],
        createdOn: new Date('2024-01-20'),
        name: '40-letnica Družinski prijatelj 2',
        favorite: true,
        finishedBy: 4,
    },
    {
        guid: '138e04d9-bf43-4b80-a108-5e7153c7ad79',
        createdBy: USERS[4],
        createdOn: new Date('2024-01-19'),
        name: '60-letnica Družinski prijatelj 3',
        favorite: true,
        finishedBy: 1,
    },
];
