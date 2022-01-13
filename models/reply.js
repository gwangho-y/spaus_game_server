const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reply', {
    reply_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "댓글 식별자입니다."
    },
    reply_datetime_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "댓글 생성된 datetime(utc)입니다."
    },
    reply_datetime_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      comment: "댓글 생성된 datetime(utc)입니다."
    },
    reply_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "댓글을 작성한 유저(user_id)입니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    reply_board_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "댓글을 가진 게시글(board_id)을 저장합니다.",
      references: {
        model: 'board',
        key: 'board_id'
      }
    },
    reply_cotents: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: "댓글 내용입니다."
    },
    reply_level: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "댓글, 대댓글 등 댓글 레벨을 구별하기위한 속성입니다.\r\n0 = 댓글, 1 = 대댓글"
    },
    reply_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "댓글, 대댓글 등 정렬 순서를 기록하는 속성입니다."
    },
    reply_isDeleted: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "댓글의 상태를 나타냅니다. TRUE(1) = 삭제후, FALSE(0) = 삭제전(디폴트)"
    }
  }, {
    sequelize,
    tableName: 'reply',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reply_id" },
        ]
      },
      {
        name: "reply_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reply_id" },
        ]
      },
      {
        name: "reply_board_id",
        using: "BTREE",
        fields: [
          { name: "reply_board_id" },
        ]
      },
      {
        name: "reply_user_id",
        using: "BTREE",
        fields: [
          { name: "reply_user_id" },
        ]
      },
    ]
  });
};
