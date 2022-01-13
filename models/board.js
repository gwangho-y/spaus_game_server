const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board', {
    board_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "게시글 식별자입니다."
    },
    board_datetime_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "게시글 생성된 datetime(utc)입니다."
    },
    board_datetime_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      comment: "게시글 업데이트된 datetime(utc)입니다."
    },
    board_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "게시글 생성 유저(user_id)입니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    board_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "게시글 제목입니다."
    },
    board_contents: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "게시글 내용입니다."
    },
    board_kind: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "게시글 종류입니다. TRUE(1) = nft 게시글, FALSE(0) = 일반게시글\r\n"
    },
    board_media_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "게시글에 포함된 이미지 참조 주소입니다."
    },
    board_isDeleted: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "방명록의 상태입니다. TRUE(1) = 삭제 o, FALSE(0) = 삭제 x(디폴트)"
    },
    board_hits: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "게시글 조회수입니다."
    },
    board_nft_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "게시글의 nft 가격입니다."
    },
    board_nft_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "게시글의 nft metadata 참조 주소입니다."
    }
  }, {
    sequelize,
    tableName: 'board',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "board_id" },
        ]
      },
      {
        name: "board_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "board_id" },
        ]
      },
      {
        name: "board_user_id",
        using: "BTREE",
        fields: [
          { name: "board_user_id" },
        ]
      },
    ]
  });
};
