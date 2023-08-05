///<reference types="cypress"/>

//API scenarios
describe("API",function(){
   
    //Creation of user account with new username-happyflow
    it("8-TC01-happyflow",function(){
        cy.request({method:'POST',url:'https://demoqa.com/Account/v1/User',form: true,
          body: {
          userName:'spring',
          password:'Sa$2945646'
        },
        }).then(
          (response) => {
           expect(response.status).to.eq(201)
           expect(response.body).to.have.property('username', 'spring')
            })
               
         })    

   //Creation of user account and displays error cause of username already exists-unhappyflow
    it("8-TC02-unhappyflow",function(){
        let user1='summer'
        let pass1='Sa$2945646'
        //1- create an account
        cy.request({method:'POST',url:'https://demoqa.com/Account/v1/User',form: true,
        body: {
        userName:user1,
        password:pass1,
      },})
        .then(
        (response) => {
         expect(response.status).to.eq(201)
         expect(response.body).to.have.property('username', user1)
          })   
        
     //2- create an account with username already is used  
   cy.request({method:'POST',url:'https://demoqa.com/Account/v1/User',failOnStatusCode: false,form: true,
     body: {
     userName:user1,
     password:pass1,
   },
   }).then(
     (response) => {
      expect(response.status).not.to.eq(201)
      expect(response.status).to.eq(406)
      expect(response.body).to.have.property('message', 'User exists!')
       }) 
    })    

    //Add a list of books -unhappyflow
    it("9-TC01-unhappyflow",function(){
        let user='auto'
        let pass='Sa$2945646'
        let userid=''
        let token=''
     //1-create an account 
        cy.request({method:'POST', url:'https://demoqa.com/Account/v1/User',form: true,
            body: {
            userName:user,
            password:pass},
          }).then((response) => {
             expect(response.status).to.eq(201)
             userid= cy.wrap(response.body).its('userID')
             console.log(userid)
              })

     //2-Add a list of books for the created user without generating token        
        cy.request({method:'POST',url:'https://demoqa.com/BookStore/v1/Books',form: true,failOnStatusCode: false,
             body: {
             userId:userid,
            collectionOfIsbns:"ss" 
                    },
            }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body).to.have.property('message', 'User not authorized!')
                })
            })

    //Add a list of books -happyflow
      it("9-TC02-happyflow",function(){
  
        let user='flower88'
        let pass='Sa$2945646'
        let userid=''
        let token=''
         //1-create an account 
        cy.request({method:'POST', url:'https://demoqa.com/Account/v1/User',form: true,
            body: {
            userName:user,
            password:pass},
          }).then((response) => {
             expect(response.status).to.eq(201)
             userid= cy.wrap(response.body).its('userID')
             console.log(userid)
              })
        //2-generate token for created account
         cy.request({method:'POST',url:'https://demoqa.com/Account/v1/GenerateToken',form: true,
              body: {
                userName:user,
                password:pass},
            }).then((response) => {
                 expect(response.status).to.eq(200)
                 expect(response.body).to.have.property('status', 'Success')
                 expect(response.body).to.have.property('result', 'User authorized successfully.')
                 token=cy.wrap(response.body).its('token')
                 console.log(token)                            
                  })
        //2-Add a list of books for the created user with generating token        
            cy.request({method:'POST',url:'https://demoqa.com/BookStore/v1/Books',form: true,failOnStatusCode: false,
                body: {
                    userId:userid,
                    collectionOfIsbns:[{
                        isbn:"book1",
                        
                    } ],
                        },
               }).then((response) => {
                expect(response.status).to.eq(201)
                
                    })    
                })
        
    //Remove one of the added books- unhappyflow
    it("10-TC01-unhappyflow",function(){
  
        let user='snowman'
        let pass='Qwerty$123456'
        let userid=''
        let token=''
         //1-create an account 
        cy.request({method:'POST', url:'https://demoqa.com/Account/v1/User',form: true,
            body: {
            userName:user,
            password:pass},
          }).then((response) => {
             expect(response.status).to.eq(201)
             userid= cy.wrap(response.body).its('userID')
             console.log(userid)
              })
                 
        //2-Remove one of the added books  without generating token     
            cy.request({method:'DELETE',url:'https://demoqa.com/BookStore/v1/Book',form: true,failOnStatusCode: false,
                body: {
                    userId:userid,
                    isbn:"ss" 
                        },
               }).then((response) => {
                 expect(response.status).to.eq(401)
                 expect(response.body).to.have.property('message', 'User not authorized!')
                
                    })    
                })        

    //Remove one of the added books- happyflow
    it("10-TC02-happyflow",function(){
            let user='winter'
            let pass='Qwerty$123456'
            let userid=''
            let token=''         
    //1-create an account 
      cy.request({method:'POST', url:'https://demoqa.com/Account/v1/User',form: true,
            body: {
                userName:user,
                password:pass},}).then((response) => {
                    expect(response.status).to.eq(201)
                        userid= cy.wrap(response.body).its('userID')
                        console.log(userid)
                          })
     //2-generate token for created account
         cy.request({method:'POST',url:'https://demoqa.com/Account/v1/GenerateToken',form: true,
         body: {
           userName:user,
           password:pass},
       }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('status', 'Success')
            expect(response.body).to.have.property('result', 'User authorized successfully.')
            token=cy.wrap(response.body).its('token')
            console.log(token)                            
             })
      //3-Add a list of books        
       cy.request({method:'POST',url:'https://demoqa.com/BookStore/v1/Books',form: true,failOnStatusCode: false,
           body: {
               userId:userid,
               icollectionOfIsbns:[{
                isbn:"book1",
                
            } ], 
                   },
          }).then((response) => {
           expect(response.status).to.eq(201)
                })    
     //4-Remove one of the added books     
       cy.request({method:'DELETE',url:'https://demoqa.com/BookStore/v1/Book',form: true,failOnStatusCode: false,                            
            body: {
                userId:userid,
                isbn:"book1"
                  },}).then((response) => {
                    expect(response.status).to.eq(204)
                    expect(response.body).to.have.property('isbn', 'book1')
                    })    
                            })     

     })

    
    