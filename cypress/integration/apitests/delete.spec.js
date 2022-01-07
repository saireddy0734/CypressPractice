/// <reference types = "Cypress"/>


const dataJson = require('../../fixtures/data')
describe('delete user tests',()=>{
    
    let accessToken = '6cf03e8ace58e4ce43961a4b9ff66fee4db1f3577fbaa3067a2c1379057564d0'
    let randomtext = ""
    let testemail = ""
    it('create user test',()=>{       

        cy.request({

            method : 'POST',
            url    : 'https://gorest.co.in/public/v1/users',
            headers : {
                'authorization' : "Bearer "+ accessToken
            },
            body:  {
                "name":"test automation07",
                "gender":"male",
                "email":"testemail07@gmail.com",
                "status":"Active"
            }
        }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('email','testemail07@gmail.com')
            expect(res.body.data).has.property('name','test automation07')
            expect(res.body.data).has.property('gender','male')
        }).then((res) =>{
            const userId =res.body.data.id 
            cy.log("user id is:"+userId)
            
            
            //delete user
            cy.request({
                method : 'DELETE',
                url    : 'https://gorest.co.in/public/v1/users/'+userId,
                headers : {
                    'authorization' : "Bearer "+ accessToken

                          }

            }).then((res)=>{
                  expect(res.status).to.eq(204)
               
                })

           
           
            
                

        })
        
    })
})
