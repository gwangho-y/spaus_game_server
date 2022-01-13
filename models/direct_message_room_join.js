const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('direct_message_room_join', {
    dmrj_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "1:1 채팅방 조인 식별자입니다."
    },
    dmrj_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "채팅방에 참여한 유저(user_id)입니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    dmrj_dm_room_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "1:1 채팅방 식별자를 나타냅니다.",
      references: {
        model: 'direct_message_room',
        key: 'dm_room_id'
      }
    }
  }, {
    sequelize,
    tableName: 'direct_message_room_join',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dmrj_id" },
        ]
      },
      {
        name: "dmrj_dm_room_id",
        using: "BTREE",
        fields: [
          { name: "dmrj_dm_room_id" },
        ]
      },
      {
        name: "dmrj_user_id",
        using: "BTREE",
        fields: [
          { name: "dmrj_user_id" },
        ]
      },
    ]
  });
};
