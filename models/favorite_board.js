const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favorite_board', {
    fb_datetime_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "즐겨찾기를 누른 시간입니다."
    },
    fb_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "즐겨찾기 누른 유저(user_id)입니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    fb_board_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "즐겨찾기를 누른 게시글입니다.",
      references: {
        model: 'board',
        key: 'board_id'
      }
    }
  }, {
    sequelize,
    tableName: 'favorite_board',
    timestamps: false,
    indexes: [
      {
        name: "fb_user_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "fb_user_id" },
          { name: "fb_board_id" },
        ]
      },
      {
        name: "fb_board_id",
        using: "BTREE",
        fields: [
          { name: "fb_board_id" },
        ]
      },
    ]
  });
};
