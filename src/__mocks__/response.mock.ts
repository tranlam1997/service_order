import { object } from "joi";

export const mockResponse = () : any => {
    const res : any = {
        status : jest.fn().mockImplementation((statusCode) => { res.statusCode = statusCode; return res} ),
        json : jest.fn().mockImplementation(data =>  data ),
        send : jest.fn().mockImplementation( (obj) => { return {...obj}})
    }
    return res;
  };    