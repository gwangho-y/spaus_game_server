const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('open_space', {
    os_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "오픈스페이스 식별자입니다."
    },
    os_datetime_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "오픈스페이스 생성 datetime(utc)입니다."
    },
    os_datetime_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      comment: "오픈스페이스 업데이트 datetime(utc)입니다."
    },
    os_creator_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "오픈스페이스 주인 유저(user_id)입니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    os_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "오픈스페이스 제목입니다."
    },
    os_isDeleted: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "오픈스페이스의 상태입니다. TRUE(1) = 삭제 o, FALSE(0) = 삭제 x(디폴트)"
    }
  }, {
    sequelize,
    tableName: 'open_space',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "os_id" },
        ]
      },
      {
        name: "os_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "os_id" },
        ]
      },
      {
        name: "os_creator_user_id",
        using: "BTREE",
        fields: [
          { name: "os_creator_user_id" },
        ]
      },
    ]
  });
};
