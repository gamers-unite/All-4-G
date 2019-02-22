module.exports = {

  // gets all of chat per request
  getChatByReq: (req, res) => {
    const { req_id } = req.body;
    req.app
      .get("db")
      .chat.get_chat_by_req(req_id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err))
  },
  
  addToChat: ( req, res ) => {
    const { text, user_id, req_id } = req.body;
    req.app
      .get("db")
      .chat.add_to_chat( text, user_id, req_id )
      .then(response => {
          res.status(200).json(response);
      })
      .catch(err => console.log(err))
  }
};