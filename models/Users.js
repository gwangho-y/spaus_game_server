const Sequelize = require('sequelize');





module.exports = class User extends Sequelize.Model{
  static init(sequelize){
    // super.init의 첫 번째 인수 : 테이블 컬럼에 대한 설정 super은 User를 가리킨다.
    // name, age, married, comment, created_at ,  id는 시퀄라이즈가 알아서 기본 키로 연결하기 때문에 id 컬럼은 적어줄 필요가 없다
    return super.init({

       user_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "유저 식별자. 또한 마이스페이스의 식별자."
    },
    user_created_datetime: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "유저 생성된 datetime(utc)."
    },
    user_deleted_datetime: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      comment: "유저가 비활성화(탈퇴)한 datetime(utc)."
    },
    user_nickname: {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: "유저의 닉네임.",
      unique: "user_nickname"
    },
    user_email: {
      type: Sequelize.STRING(400),
      allowNull: false,
      comment: "유저 이메일."
    },
    user_password: {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: "유저 비밀번호."
    },
    user_transaction_password: {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: "유저 거래 비밀번호."
    },
    user_profile_photo_url: {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: "유저 프로필 사진 url."
    },
    user_account_isActivated: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      comment: "유서 상태. TRUE(1) = 유저 활성화 상태(디폴트), FALSE(0) = 유저 탈퇴"
    },
    user_character_kind: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: "유저 캐릭터 종족 종류. 0 = 곰(Bear), 1 = 악어(Croc), 2 = 오리(Duck), 3 = 원숭이(Monkey), 4 = 판다(Panda) "
    },
    user_character_cloth: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      comment: "유저 캐릭터 착용 옷. 0 = 맨몸, 1 = 보라색 suit"
    },
    user_wallet_address: {
      type: Sequelize.STRING(200),
      allowNull: true,
      comment: "유저의 지갑 주소."
    },
    user_wallet_public_key: {
      type: Sequelize.STRING(200),
      allowNull: true,
      comment: "유저 지갑 공개키."
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_nickname",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_nickname" },
        ]
      },
    ]
    });

  }

}

 
   
 

