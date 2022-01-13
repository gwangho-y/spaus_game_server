const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('guest_book', {
    gb_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "방명록 식별자입니다."
    },
    gb_datetime_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "방명록이 생성된 datetime(utc)입니다."
    },
    gb_datetime_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      comment: "방명록이 업데이트된 datetime(utc)입니다."
    },
    gb_from_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "방명록을 작성한 유저(user_id)입니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    gb_to_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "방명록이 작성된 스페이스(user_id)입니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    gb_contents: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      comment: "방명록 내용입니다."
    },
    gb_isDeleted: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "방명록의 상태입니다. TRUE(1) = 삭제 o, FALSE(0) = 삭제 x(디폴트)"
    }
  }, {
    sequelize,
    tableName: 'guest_book',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "gb_id" },
        ]
      },
      {
        name: "gb_to_user_id",
        using: "BTREE",
        fields: [
          { name: "gb_to_user_id" },
        ]
      },
      {
        name: "gb_from_user_id",
        using: "BTREE",
        fields: [
          { name: "gb_from_user_id" },
        ]
      },
    ]
  });
};
