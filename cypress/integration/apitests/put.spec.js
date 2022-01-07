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

        

        

        cy.request({

            method : 'POST',
            url    : 'https://gorest.co.in/public/v1/users',
            headers : {
                'authorization' : "Bearer "+ accessToken
            },
            body:  {
                "name":"sai test automation10",
                "gender":"male",
                "email":"testemail20@gmail.com",
                "status":"Active"
            }
        }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('email','testemail20@gmail.com')
            expect(res.body.data).has.property('name','sai test automation10')
            expect(res.body.data).has.property('gender','male')
        }).then((res) =>{
            const userId =res.body.data.id 
            cy.log("user id is:"+userId)
            //2.update user
            cy.request({
                method : 'PUT',
                url    : 'https://gorest.co.in/public/v1/users/'+userId,
                headers : {
                    'authorization' : "Bearer "+ accessToken

                          },
                          body:  {
                            "name":"sai test automation21 updated",
                            "gender":"male",
                            "email":"testemail40@gmail.com",
                            "status":"inActive"
                        }

            }).then((res)=>{
               expect(res.status).to.eq(200)
               expect(res.body.data).has.property('email','testemail40@gmail.com')
               expect(res.body.data).has.property('name','sai test automation21 updated')
               expect(res.body.data).has.property('gender','male')
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
