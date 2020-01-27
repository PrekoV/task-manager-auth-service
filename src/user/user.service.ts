import { Injectable } from '@nestjs/common';
import IUser from 'src/interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

    createUser(user: IUser): Promise<IUser> {
        return this.userModel.create(user);
    }

    async getUser(userId: string) {
        const user = await this.userModel.findOne({ _id: userId }).then(res => res);
        console.log('aaaaaaaa', user);
        const dataToSend = {
            ...user,
            password: undefined,
        };
        return dataToSend;
    }

    getUsers(): Promise<IUser[]> {
        return this.userModel.find({});
    }

    async getUserByEmail(email: string): Model<IUser> {
        return await this.userModel.findOne({ email });
    }
}
