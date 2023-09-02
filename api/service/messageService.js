const Message = require("../models/Message");
const genericService = require("./DBService")
const messageService = genericService(Message)
const getMessagesGroupedByAuthor = async() => {
      const pipeline = [
        {
          $group: {
            _id: "$author",
            messages: { $push: "$content" },
          },
        },
      ];
  
      const result = await Message.aggregate(pipeline);
      
      return result;
  }
  
module.exports = {...messageService, getMessagesGroupedByAuthor }
