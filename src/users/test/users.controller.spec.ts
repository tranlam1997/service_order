import { Test, TestingModule } from '@nestjs/testing';
import { mockResponse } from '../../__mocks__/response.mock';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { fakeUserData } from '../__mocks__/user-data.mock';



describe('UsersController', () => {
  let usersController: UsersController;
  const res : any = mockResponse();
  const mockUserService = { 
    findAll : jest.fn().mockResolvedValue([fakeUserData]),

    findUserById: jest.fn().mockImplementation((id: string)  => {
      const userData = fakeUserData;
      userData._id = id;
      return Promise.resolve(userData);
    }),

    updateUser : jest.fn().mockImplementation((id: string, userData : UpdateUserDto) => {
      return Promise.resolve({_id: id, ...userData});
    }),

    deleteUser : jest.fn().mockResolvedValue(fakeUserData)

  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).overrideProvider(UsersService).useValue(mockUserService)
    .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('It should return an array of users', async () => {
        const users = await usersController.findAll(res);
        expect(mockUserService.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([fakeUserData]);
        expect(users).toEqual([fakeUserData]);
      })
    });
  
    describe('findUserById', () => {
      it('It should return user data with provided userID', async () => {
        const user = await usersController.findUserById(res,'1234');
        expect(mockUserService.findUserById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakeUserData);
        expect(user).toEqual(fakeUserData);
      })
    });


    describe('updateUser', () => {
      it('It should return the updated user with provided userID', async () => {
        const updatedUser = await usersController.updateUser(res,'1234',fakeUserData);
        const data = {
          message : 'Update user successfully',
          user : {_id: '1234',...fakeUserData}
        }
        expect(mockUserService.updateUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveReturnedWith(updatedUser);
        expect(res.send).toHaveBeenCalledWith(data)
        expect(updatedUser).toEqual(data);
      })
    });

    describe('deleteUser', () => {
      it('It should return the deleted user with provided userID', async () => {
        const deletedUser = await usersController.deleteUser(res,'1234');
        const data = {
          message : 'Delete user successfully',
          user : fakeUserData
        }
        expect(mockUserService.deleteUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveReturnedWith(deletedUser);
        expect(res.send).toHaveBeenCalledWith(data)
        expect(deletedUser).toEqual(data);
      
    })
  });


  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
});
