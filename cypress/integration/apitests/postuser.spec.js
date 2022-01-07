/// <reference types = "Cypress"/>


const dataJson = require('../../fixtures/data')
describe('post user tests',()=>{
    
    let accessToken = '6cf03e8ace58e4ce43961a4b9ff66fee4db1f3577fbaa3067a2c1379057564d0'
    let randomtext = ""
    let testemail = ""
    it('create user test',()=>{

        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for(var i=1;i<10;i++)
        randomtext+=pattern.charAt(Math.floor(Math.random()*pattern.length));
        testemail=randomtext+'@gmail.com'

        cy.fixture('data').then((payload) => {

        

        cy.request({

            method : 'POST',
            url    : 'https://gorest.co.in/public/v1/users',
            headers : {
                'authorization' : "Bearer "+ accessToken
            },
            body:  {
                "name":dataJson.name,
                "gender":payload.gender,
                "email":testemail,
                "status":"Active"
            }
        }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('email',testemail)
            expect(res.body.data).has.property('name',dataJson.name)
            expect(res.body.data).has.property('gender',payload.gender)
        }).then((res) =>{
            const userId =res.body.data.id 
            cy.log("user id is:"+userId)

            cy.request({
                method : 'GET',
                url    : 'https://gorest.co.in/public/v1/users/'+userId,
                headers : {
                    'authorization' : "Bearer "+ accessToken

                          }

            }).then((res)=>{
               expect(res.status).to.eq(200)
               expect(res.body.data).has.property('id', userId)
            })
            

            })
        })
    })
})
