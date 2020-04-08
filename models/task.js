'use strict';
module.exports = (sequelize, DataTypes) => {
  class Task extends sequelize.Sequelize.Model{}

  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING
  },{
    sequelize,
    modelName:"Task",
    hooks:{
      beforeCreate:(task,option)=>{
        task.status = "Backlog"
      }
    }
  })
  
  Task.associate = function(models) {
    // associations can be defined here
    Task.hasMany(models.Usertask)
  };
  return Task;
};