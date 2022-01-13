const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('myspace_item', {
    item_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "유저 식별자 외래키입니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    item_kind: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      comment: "유저가 가진 아이템 종류를 나타냅니다."
    },
    item_coordinate_position: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "아이템을 배치했을 때 위치 정보를 문자로 저장하고 마침표로 구분함.\r\nex) x좌표.y좌표"
    },
    item_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "아이템 개수를 나타냅니다."
    },
    item_isActivated: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      defaultValue: 0,
      comment: "아이템을 활용 유무를 나타냅니다.\r\nTRUE(1) = 마이스페이스에 아이템 사용, FALSE(0) = 마이스페이스에 아이템 미사용(디폴트)."
    }
  }, {
    sequelize,
    tableName: 'myspace_item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "item_user_id" },
          { name: "item_kind" },
        ]
      },
    ]
  });
};
