const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nft_transaction', {
    nt_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "nft 거래 식별자입니다."
    },
    nt_datetime_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "nft 거래 생성된 datetime(utc)입니다.\r\n"
    },
    nt_kind: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "nft 거래 종류를 나타냅니다. \r\n0 = 제작, 1 = 판매, 2 = 구매, 3 = 선물\r\n*아직 수정해야함."
    },
    nt_from_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "nft를 보낸 유저(user_id)입니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    nt_to_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "nft를 받는 유저(user_id)입니다.",
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    nt_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "nft 거래 시 가격입니다."
    },
    nt_coin_kind: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "ntf 거래 코인 종류 심볼을 나타냅니다. ex) 클레이튼 = KLAY"
    }
  }, {
    sequelize,
    tableName: 'nft_transaction',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nt_id" },
        ]
      },
      {
        name: "nt_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nt_id" },
        ]
      },
      {
        name: "nt_from_user_id",
        using: "BTREE",
        fields: [
          { name: "nt_from_user_id" },
        ]
      },
      {
        name: "nt_to_user_id",
        using: "BTREE",
        fields: [
          { name: "nt_to_user_id" },
        ]
      },
    ]
  });
};
