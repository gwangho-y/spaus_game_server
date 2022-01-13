const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('direct_message_log', {
    dm_log_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "1:1 채팅 내역 식별자입니다."
    },
    dm_log_datetime_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "1:1 채팅내역 생성된 datetime(utc)입니다."
    },
    db_log_datetime_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      comment: "1:1 채팅내역 업데이트된 datetime(utc)입니다."
    },
    db_log_room_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "1:1 채팅내역이 속한 채팅방을 나타냅니다.",
      references: {
        model: 'direct_message_room',
        key: 'dm_room_id'
      }
    },
    db_log_writer_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "1:1 채팅 작성자를 나타냅니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    db_log_contents: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      comment: "1:1 채팅 내역을 나타냅니다."
    },
    db_log_isDeleted: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "채팅내역의 상태를 나타냅니다. TRUE(1) = 삭제후, FALSE(0) = 삭제전(디폴트)"
    }
  }, {
    sequelize,
    tableName: 'direct_message_log',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dm_log_id" },
        ]
      },
      {
        name: "dm_log_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dm_log_id" },
        ]
      },
      {
        name: "db_log_room_id",
        using: "BTREE",
        fields: [
          { name: "db_log_room_id" },
        ]
      },
      {
        name: "db_log_writer_user_id",
        using: "BTREE",
        fields: [
          { name: "db_log_writer_user_id" },
        ]
      },
    ]
  });
};
