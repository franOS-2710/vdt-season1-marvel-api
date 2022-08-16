

describe('POST /characters', function () {

    it('Should add a character', function () {

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Scarlet Witch',
            team: ['Avengers'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })
    })

    context('When the character is already registered', function () {

        const character = {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['X-men', 'Illuminatis'],
            active: true
        }

        before(function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(201)
            })
        })

        it('Should not be able to add duplicate character', function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })
})