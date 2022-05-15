const { DataTypes, UUIDV4 } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('Recipe', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,        
        primaryKey: true,
        allowNull: false,
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    resume: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    score: { 
        type: DataTypes.INTEGER,
        defaultValue: 0        
    },
    healthScore: { 
        type: DataTypes.FLOAT,
        defaultValue: 0

    },
    procedure: { 
        type: DataTypes.TEXT,
        
    },
    image: {
        type: DataTypes.TEXT,
        defaultValue: "https://spoonacular.com/recipeImages/627977-312x231.jpg"
       
    }

  },
  
  {     
    timestamps: false    
  });
};

