import { Message } from "../schemas/Message";

class GetMessageByChatRoomService {
  async execute(roomId: string) {
    const messages = await Message.find({
      roomId,
    })
      .populate("to")
      .exec();

    return messages;
  }
}

export { GetMessageByChatRoomService };
