import { injectable } from "tsyringe";
import { User } from "../schemas/User";

interface CreateUserDTO {
  name: String;
  email: String;
  socket_id: String;
  avatar: String;
}

@injectable()
class CreateUserService {
  async execute({ name, email, socket_id, avatar }: CreateUserDTO) {
    const userAlreadyExists = await User.findOne({
      email,
    }).exec();

    if (userAlreadyExists) {
      //Check if user id already exists
      const user = await User.findOneAndUpdate(
        {
          _id: userAlreadyExists.id,
        },
        {
          $set: { socket_id, avatar, name },
        },
        {
          new: true,
        }
      );

      return user;
    } else {
      //If not exists, create it
      const user = await User.create({
        email,
        socket_id,
        avatar,
        name,
      });
      return user;
    }
  }
}

export { CreateUserService };
