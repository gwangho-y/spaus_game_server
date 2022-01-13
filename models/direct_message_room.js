const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('direct_message_room', {
    dm_room_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "채팅을 시작하면 생성되는 1:1 채팅방 식별자입니다."
    }
  }, {
    sequelize,
    tableName: 'direct_message_room',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dm_room_id" },
        ]
      },
      {
        name: "dm_room_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dm_room_id" },
        ]
      },
    ]
  });
};
