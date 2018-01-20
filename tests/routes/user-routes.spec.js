describe('User-Routes',()=>{
    const UserRoutes = require('./../../routes/user-routes');
    let userRoutes;
    let userService;
    let response;
    let testId;

    describe('with normal user service',function(){
        beforeEach(function(){            
            userService = jasmine.createSpyObj('userService',{
                retrieve: Promise.resolve('id001'),
                register: Promise.resolve('Succeeded to register'),
                edit: Promise.resolve('Updated Completed'),
                deregister: Promise.resolve('Deregistration Completed')
            })
            response = jasmine.createSpyObj('response',['status','json','send']);
            response.status.and.returnValue(response);
            
            userRoutes = new UserRoutes(userService);
            
            testId = {id :'id001'}; 
        })

        xit('Should call retrieve to respond GET',function(done){
            userRoutes.get({
                params:testId
            },response)
            .then(function(){
                expect(userService.retrieve).toHaveBeenCalledWith('id001');
                expect(response.status).not.toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
        })

        xit('Should call register to respond POST',function(done){
            let input = {
                userId: "test001",
                firstName: "Test",
                lastName: "Sample",
                password: "password",
                email: "sample@gmail.com",
                shippingAddress: "35 St Test State HI",
                billingAddress: "35 St Test State HI"
            } 

            userRoutes.post({
                body:input
            },response)
            .then(function(){
                expect(userService.register).toHaveBeenCalled();
                expect(userService.register).toHaveBeenCalledWith(input);
                userService.register(input).then(data => {
                    expect(data).toEqual('Succeeded to register');
                })
                expect(response.status).not.toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
        })

        xit('Should call edit to respond PUT',function(done){
            let input = {
                attr: "firstName",
                updates: "test"
            }
            userRoutes.update({
                params:testId,
                body:input
            },response)
            .then(function(){
                expect(userService.edit).toHaveBeenCalledWith('id001',input);
                userService.edit('id001',input).then(data => {
                    expect(data).toEqual('Updated Completed');
                })
                expect(response.status).not.toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
        })

        xit('Should call deregister to respond DELETE', function(done){
            userRoutes.delete({
                params:testId
            },response)
            .then(function(){
                expect(userService.deregister).toHaveBeenCalledWith('id001');
                expect(response.status).not.toHaveBeenCalled();
                done();
            })
            .catch(done.fail);
        })
    })
})