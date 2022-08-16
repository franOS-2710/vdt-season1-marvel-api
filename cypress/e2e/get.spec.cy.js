

describe('GET /characters', function () {

    const characters = [
        {
            name: 'Peter Parker',
            alias: 'Spider Man',
            team: ["Avengers"],
            active: true
        },
        {
            name: 'Stephen Vincent Strange',
            alias: 'Dr Stranger',
            team: ['Avengers'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['X-Men'],
            active: true
        }
    ]

    before(function () {
        cy.populateCharacters(characters)
    })

    it('Should return the characters list', function () {
        cy.getCharacter().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        })
    })

    it('Should get character by name', function () {
        cy.searchCharacters('Logan').then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Wolverine')
            expect(response.body[0].team).to.eql(['X-Men'])
            expect(response.body[0].active).to.eql(true)
        })
    })
})

describe('GET /characters/id', function () {

    const tonyStark = {
        name: 'Tony Stark',
        alias: 'Iron Man',
        team: ["Avengers"],
        active: true
    }

    context('When there is a registered character', function () {

        before(function () {
            cy.postCharacter(tonyStark).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('Should search character by id', function () {
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Iron Man')
                expect(response.body.team).to.eql(['Avengers'])
                expect(response.body.active).to.eql(true)
            })
        })

        it('Should return status 404 when search for not existent id', function () {
            const id = '62faaeffa0cad44c9c080b87'
            cy.getCharacterById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })
})