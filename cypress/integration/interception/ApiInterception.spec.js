/// <reference types = "Cypress"/>



describe('intercept with cypress examples',()=>{
    
    let accessToken = '6cf03e8ace58e4ce43961a4b9ff66fee4db1f3577fbaa3067a2c1379057564d0'
    it('test api by stubbing',()=>{     
        cy.visit("http://localhost:3000/")

        cy.intercept({
           path : '/users'

        }).as('users')

        cy.get("#resources > div > ul > li:nth-child(1) > a").click()
        cy.wait('@users').then(res =>{
           cy.log(JSON.stringify(res))
           console.log(JSON.stringify(res))
           expect(res.response.body).to.have.length(3)
        })


    })
    it('mocking with intercept with static response', ()=>{
        cy.visit('http://localhost:3000/')
        cy.intercept('GET','/users',{totalusers:5}).as('users')
        cy.get("#resources > div > ul > li:nth-child(1) > a").click()
        cy.wait('@users')
    })


    it.only('mocking with intercept with dynamic response', ()=>{
        cy.visit('http://localhost:3000/')
        cy.intercept('GET','/users',{fixture : 'data.json'}).as('users')
        cy.get("#resources > div > ul > li:nth-child(1) > a").click()
        cy.wait('@users')
    })
})