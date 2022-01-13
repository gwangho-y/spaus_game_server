const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('like_board', {
    lb_datetime_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "좋아요를 누른 시간입니다."
    },
    lb_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "좋아요 누른 유저(user_id)입니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    lb_board_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "좋아요를 누른 게시글입니다.",
      references: {
        model: 'board',
        key: 'board_id'
      }
    }
  }, {
    sequelize,
    tableName: 'like_board',
    timestamps: false,
    indexes: [
      {
        name: "lb_user_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "lb_user_id" },
          { name: "lb_board_id" },
        ]
      },
      {
        name: "lb_board_id",
        using: "BTREE",
        fields: [
          { name: "lb_board_id" },
        ]
      },
    ]
  });
};
