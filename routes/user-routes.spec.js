describe('User-Routes',()=>{
    const UserRoutes = require('./user-routes');

    let userRoutes;
    let userService;
    let response;

    describe('with normal user service',function(){
        beforeEach(function(){
            userService = jasmine.createSpyObj('userService',{
                retrieve: Promise.resolve(),
                post: Promise.resolve(),
                update: Promise.resolve(),
                delete: Promise.resolve()
            })

            response = jasmine.createSpyObj('response',['status','json','send']);
            //transform the spyobj to the specific response
            response.status.and.returnValue(response);

            userRoutes = new UserRoutes(userService);
        })

        it('Should call retrieve to response to a GET',function(done){
            userRoutes.get({
                params:{
                    id: 'id0001'
                }
            },response).then(function(){
                expect(userService.retrieve).toHaveBeenCalledWith('id0001');
                expect(response.status).not.toHaveBeenCalledCalled();
                done();
            }).catch(done.fail);
        })
    })
})