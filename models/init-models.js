var DataTypes = require("sequelize").DataTypes;
var _Users = require("./Users");
var _board = require("./board");
var _direct_message_log = require("./direct_message_log");
var _direct_message_room = require("./direct_message_room");
var _direct_message_room_join = require("./direct_message_room_join");
var _favorite_board = require("./favorite_board");
var _guest_book = require("./guest_book");
var _like_board = require("./like_board");
var _myspace_item = require("./myspace_item");
var _nft_transaction = require("./nft_transaction");
var _notification = require("./notification");
var _open_space = require("./open_space");
var _reply = require("./reply");

function initModels(sequelize) {
  var Users = _Users(sequelize, DataTypes);
  var board = _board(sequelize, DataTypes);
  var direct_message_log = _direct_message_log(sequelize, DataTypes);
  var direct_message_room = _direct_message_room(sequelize, DataTypes);
  var direct_message_room_join = _direct_message_room_join(sequelize, DataTypes);
  var favorite_board = _favorite_board(sequelize, DataTypes);
  var guest_book = _guest_book(sequelize, DataTypes);
  var like_board = _like_board(sequelize, DataTypes);
  var myspace_item = _myspace_item(sequelize, DataTypes);
  var nft_transaction = _nft_transaction(sequelize, DataTypes);
  var notification = _notification(sequelize, DataTypes);
  var open_space = _open_space(sequelize, DataTypes);
  var reply = _reply(sequelize, DataTypes);

  board.belongsTo(Users, { as: "board_user", foreignKey: "board_user_id"});
  Users.hasMany(board, { as: "boards", foreignKey: "board_user_id"});
  direct_message_log.belongsTo(Users, { as: "db_log_writer_user", foreignKey: "db_log_writer_user_id"});
  Users.hasMany(direct_message_log, { as: "direct_message_logs", foreignKey: "db_log_writer_user_id"});
  direct_message_room_join.belongsTo(Users, { as: "dmrj_user", foreignKey: "dmrj_user_id"});
  Users.hasMany(direct_message_room_join, { as: "direct_message_room_joins", foreignKey: "dmrj_user_id"});
  favorite_board.belongsTo(Users, { as: "fb_user", foreignKey: "fb_user_id"});
  Users.hasMany(favorite_board, { as: "favorite_boards", foreignKey: "fb_user_id"});
  guest_book.belongsTo(Users, { as: "gb_from_user", foreignKey: "gb_from_user_id"});
  Users.hasMany(guest_book, { as: "guest_books", foreignKey: "gb_from_user_id"});
  guest_book.belongsTo(Users, { as: "gb_to_user", foreignKey: "gb_to_user_id"});
  Users.hasMany(guest_book, { as: "gb_to_user_guest_books", foreignKey: "gb_to_user_id"});
  like_board.belongsTo(Users, { as: "lb_user", foreignKey: "lb_user_id"});
  Users.hasMany(like_board, { as: "like_boards", foreignKey: "lb_user_id"});
  myspace_item.belongsTo(Users, { as: "item_user", foreignKey: "item_user_id"});
  Users.hasMany(myspace_item, { as: "myspace_items", foreignKey: "item_user_id"});
  nft_transaction.belongsTo(Users, { as: "nt_from_user", foreignKey: "nt_from_user_id"});
  Users.hasMany(nft_transaction, { as: "nft_transactions", foreignKey: "nt_from_user_id"});
  nft_transaction.belongsTo(Users, { as: "nt_to_user", foreignKey: "nt_to_user_id"});
  Users.hasMany(nft_transaction, { as: "nt_to_user_nft_transactions", foreignKey: "nt_to_user_id"});
  notification.belongsTo(Users, { as: "noti_from_user", foreignKey: "noti_from_user_id"});
  Users.hasMany(notification, { as: "notifications", foreignKey: "noti_from_user_id"});
  notification.belongsTo(Users, { as: "noti_to_user", foreignKey: "noti_to_user_id"});
  Users.hasMany(notification, { as: "noti_to_user_notifications", foreignKey: "noti_to_user_id"});
  open_space.belongsTo(Users, { as: "os_creator_user", foreignKey: "os_creator_user_id"});
  Users.hasMany(open_space, { as: "open_spaces", foreignKey: "os_creator_user_id"});
  reply.belongsTo(Users, { as: "reply_user", foreignKey: "reply_user_id"});
  Users.hasMany(reply, { as: "replies", foreignKey: "reply_user_id"});
  favorite_board.belongsTo(board, { as: "fb_board", foreignKey: "fb_board_id"});
  board.hasMany(favorite_board, { as: "favorite_boards", foreignKey: "fb_board_id"});
  like_board.belongsTo(board, { as: "lb_board", foreignKey: "lb_board_id"});
  board.hasMany(like_board, { as: "like_boards", foreignKey: "lb_board_id"});
  reply.belongsTo(board, { as: "reply_board", foreignKey: "reply_board_id"});
  board.hasMany(reply, { as: "replies", foreignKey: "reply_board_id"});
  direct_message_log.belongsTo(direct_message_room, { as: "db_log_room", foreignKey: "db_log_room_id"});
  direct_message_room.hasMany(direct_message_log, { as: "direct_message_logs", foreignKey: "db_log_room_id"});
  direct_message_room_join.belongsTo(direct_message_room, { as: "dmrj_dm_room", foreignKey: "dmrj_dm_room_id"});
  direct_message_room.hasMany(direct_message_room_join, { as: "direct_message_room_joins", foreignKey: "dmrj_dm_room_id"});

  return {
    Users,
    board,
    direct_message_log,
    direct_message_room,
    direct_message_room_join,
    favorite_board,
    guest_book,
    like_board,
    myspace_item,
    nft_transaction,
    notification,
    open_space,
    reply,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
