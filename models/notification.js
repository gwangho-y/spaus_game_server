const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notification', {
    noti_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "알림 식별자입니다."
    },
    noti_datetime_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "알림이 생성된 datetime(utc)입니다."
    },
    noti_from_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "알림을 보낸 원인의 유저(user_id)입니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    noti_to_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "알림을 받게되는 유저(user_id)입니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    noti_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "알림을 누르면 이동하는곳(url)를 저장합니다."
    },
    noti_media_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "알림에 필요한 사진 url을 저장합니다."
    },
    noti_isRead: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "유저가 해당 알림을 읽었는지 표시해줍니다. TRUE(1) = 읽음, FALSE(0) = 읽지 않음(디폴트)"
    },
    noti_kind: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "알림 종류를 나타냅니다.\r\n0 = 댓글\r\n1 = nft 판매\r\n2 = nft 구매\r\n등등.. 더 추가해야합니다."
    }
  }, {
    sequelize,
    tableName: 'notification',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "noti_id" },
        ]
      },
      {
        name: "noti_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "noti_id" },
        ]
      },
      {
        name: "noti_to_user_id",
        using: "BTREE",
        fields: [
          { name: "noti_to_user_id" },
        ]
      },
      {
        name: "noti_from_user_id",
        using: "BTREE",
        fields: [
          { name: "noti_from_user_id" },
        ]
      },
    ]
  });
};
