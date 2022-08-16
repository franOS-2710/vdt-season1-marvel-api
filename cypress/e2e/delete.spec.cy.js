
describe('DELETE /characters/id', function () {

    const scottLang = {
        name: 'Scott Lang',
        alias: 'Ant-Man',
        team: ["Avengers"],
        active: true
    }

    context('When there is a registered character', function () {

        before(function () {
            cy.postCharacter(scottLang).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('Should delete character by id', function () {
            const id = Cypress.env('characterId')
            cy.deleteCharacterById(id).then(function (response) {
                expect(response.status).to.eql(204)
            })
        })

        after(function(){
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })

        it('Should return status 404 when delete by id not existent', function () {
            const id = '62faaeffa0cad44c9c080b87'
            cy.deleteCharacterById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })
})