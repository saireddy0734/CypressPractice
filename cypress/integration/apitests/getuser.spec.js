/// <reference types = "Cypress"/>



describe('get user tests',()=>{
    
    let accessToken = '6cf03e8ace58e4ce43961a4b9ff66fee4db1f3577fbaa3067a2c1379057564d0'

    it('get users',()=>{
        cy.request({

            method : 'GET',
            url    : 'https://gorest.co.in/public/v1/users',
            headers : {
                'authorization' : "Bearer "+ accessToken
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.meta.pagination.limit).to.eq(20)
        })
    })

    it('get users by id',()=>{
        cy.request({

            method : 'GET',
            url    : 'https://gorest.co.in/public/v1/users/53',
            headers : {
                'authorization' : "Bearer 6cf03e8ace58e4ce43961a4b9ff66fee4db1f3577fbaa3067a2c1379057564d0"
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.data.name).to.eq('Agnivesh Panicker')
        })
    })
    
})
