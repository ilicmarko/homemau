/*
    Simple database seeder
 */

// Cat breeds from @link {https://en.wikipedia.org/wiki/List_of_cat_breeds}
const breeds = [ "Abyssinian", "Aegean", "American Curl", "American Bobtail", "American Shorthair", "American Wirehair", "Aphrodite Giant", "Arabian Mau", "Australian Mist", "Asian", "Asian Semi-longhair", "Balinese", "Bambino", "Bengal", "Birman", "Bombay", "Brazilian Shorthair", "British Semi-longhair", "British Shorthair", "British Longhair", "Burmese", "Burmilla", "California Spangled", "Chantilly-Tiffany", "Chartreux", "Chausie", "Cheetoh", "Colorpoint Shorthair", "Javanese", "Cornish Rex", "Cymric", "Cyprus", "Devon Rex", "Donskoy", "Dragon Li", "Dwelf", "Egyptian Mau", "European Shorthair", "Exotic Shorthair", "Foldex", "German Rex", "Havana Brown", "Highlander", "Himalayan", "Japanese Bobtail", "Javanese", "Khao Manee", "Korat", "Korean Bobtail", "Kurilian Bobtail", "LaPerm", "Lykoi", "Maine Coon", "Manx", "Minskin", "Munchkin", "Nebelung", "Napoleon", "Norwegian Forest Cat", "Ocicat", "Ojos Azules", "Oregon Rex", "Oriental Bicolor", "Oriental Shorthair", "Oriental Longhair", "Persian (modern)", "Persian (traditional)", "Peterbald", "Pixie-bob", "Raas", "Ragamuffin", "Ragdoll", "Russian Blue", "Russian White, Black and Tabby", "Savannah", "Scottish Fold", "Selkirk Rex", "Serengeti", "Siamese", "Thai", "Siberian", "Singapura", "Snowshoe", "Sokoke", "Somali", "Sphynx", "Suphalak", "Thai", "Thai Lilac", "Tonkinese", "Toyger", "Turkish Angora", "Turkish Van", "York Chocolate" ]

require('dotenv').config();
const uuid = require('uuid/v4');
const faker = require('faker');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const catNames = require('cat-names');

const adapter = new FileSync(process.env.DATABASE_FILE);
const db = low(adapter);

/**
 * Closure function which generates a unique slug.
 * If there a slug with that cat name already it will append the next available number.
 *
 * @returns {function(*): string}
 * @example
 * const generateSlug = createUniqueSlug()
 * generateSlug('mau')
 * // => mau
 * generateSlug('mau')
 * // => mau-1
 */
function createUniqueSlug() {
    const catSlugs = new Set();

    return catName => {
        let slugify = catName.replace(' ', '-').toLowerCase();
        let uniqueSlug = slugify;
        let i = 1;
        while (catSlugs.has(uniqueSlug)) {
            uniqueSlug = `${slugify}-${i}`;
            i++;
        }
        catSlugs.add(uniqueSlug);
        return uniqueSlug;
    }
}

/**
 * Initialize the closure function
 * @type {function(*): string}
 */
let generateSlug = createUniqueSlug();

/**
 * Generate a new cat object.
 * @returns {{pedigree: boolean, image: string, name, description: string, dateOfBirth: number, id: string, slug: string, breed: string}}
 */
function generateCat() {
    const name = catNames.random();
    return {
        id: uuid(),
        name,
        slug: generateSlug(name),
        dateOfBirth: faker.date.between(new Date('1995-01-01'), new Date()).getTime(),
        image: faker.image.cats(),
        breed: breeds[faker.random.number({ min: 0, max: breeds.length - 1})],
        description: faker.lorem.paragraphs(faker.random.number({ min: 1, max: 3}), '<br />'),
        pedigree: Math.random() >= 0.5
    }
}

/**
 * Initiate database seeding.
 */
function seedDb() {
    db.defaults({ cats: [] }).write();

    for (let i = 0 ; i < process.env.NUMBER_OF_CATS; i++) {
        db.get('cats')
            .push(generateCat())
            .write();
    }
}

function init() {
    seedDb();
}

init();