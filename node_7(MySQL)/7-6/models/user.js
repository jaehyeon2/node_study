const Sequelize =require("sequelize");

module.exports=class User extends Sequelize.Model{
	static init(sequelize){
		return super.init({
			name:{
				type:Sequelize.STRING(20),
				allowNull:false,
				unique:true,
			},
			age:{
				type:Sequelize.INTEGER.UNSIGNED,
				allowNull:false,
			},
			married:{
				type:Sequelize.BOOLEAN,
				allowNull:false,
			},
			comment:{
				type:Sequelize.TEXT,
				allowNull:false,
			},
			create_at:{
				type:Sequelize.DATE,
				allowNull:false,
				defaultValue:Sequelize.NOW,
			},
		},{
			sequelize,
			timestamps:false,
			underscoped:false,
			modelName:"User",
			tableName:"users",
			paranoid:false,
			charset:"utf8",
			collate:"utf8_general_ci",
		});
	}
	static associate(db){
		db.Comment.belongsTo(db.Comment, {foreignKey:"commenter", sourceKey:"id"});
	}
};