const Task = require("../model/Task");

const taskController = {}

taskController.createTask = async (req, res) => {
    try{
        const {task, isComplete, isFlag} = req.body;
        const newTask = new Task({task, isComplete, isFlag});
        await newTask.save();
        res.status(200).json({status:'ok', data:newTask});
    }catch(err){
        res.status(400).json({status:"fail", error:err});
    }
};

taskController.getTask = async (req, res) => {
    try{
        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({status:'ok', data:taskList});
    }catch(err){
        res.status(400).json({status:"fail", error:err});
    }
};

taskController.updateTask = async (req,res) => {
    try{
        const taskId = req.params.id;
        const {complete, flag} = req.body;

        if (!taskId){
            return res.status(400).json({status:"fail", error: "Task ID is required"})
        }
        const task = await Task.findOne({_id:taskId});

        const updateData = {};

        if (complete){
            updateData.isComplete = !task.isComplete
        }
        if (flag){
            updateData.isFlag = !task.isFlag;
        }

        const result = await Task.updateOne({_id:taskId}, updateData);

        res.status(200).json({status:'ok', data:result});

    }catch(err){
        res.status(400).json({status:'fail', error:err.message});
    }
}


taskController.deleteTask = async (req, res) => {
    try{
        const taskId = req.params.id;
        if (!taskId){
            return res.status(400).json({status:"fail", error: "Task ID is required"})
        }
        const result = await Task.deleteOne({_id:taskId})

        if(result.deleteCount==0){
            return res.status(404).json({status:"fail", error: "Task Not Found"})
        }
        
        res.status(200).json({status:'ok', data:result});
    }catch(err){
        res.status(400).json({status:"fail", error:err.message});
    }
};




module.exports = taskController;