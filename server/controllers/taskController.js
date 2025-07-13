// const db = require('../db/index'); 
// const { validationResult } = require('express-validator');

// exports.createTask = async (req, res) => {
//   const { title, description, due_date, priority} = req.body;
//   const status = 'Todo'; 

//   if (!title || !priority || !due_date) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const result = await db.query(
//       `INSERT INTO tasks (title, description, status, due_date, priority)
//        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//       [title, description, status, due_date, priority,]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Create task error:', err);
//     res.status(500).json({ error: 'Failed to create task' });
//   }
// };

// exports.getAllTasks = async (req, res) => {
//   const { priority, due_date, search } = req.query;

//   let query = `SELECT * FROM tasks WHERE 1=1`;
//   const values = [];

//   if (priority) {
//     values.push(priority);
//     query += ` AND priority = $${values.length}`;
//   }

//   if (due_date) {
//     values.push(due_date);
//     query += ` AND due_date = $${values.length}`;
//   }

//   if (search) {
//     values.push(`%${search}%`);
//     query += ` AND (title ILIKE $${values.length} OR description ILIKE $${values.length})`;
//   }

//   try {
//     const result = await db.query(query, values);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Get tasks error:', err);
//     res.status(500).json({ error: 'Failed to fetch tasks' });
//   }
// };

// exports.updateTask = async (req, res) => {
//   const taskId = req.params.id;
//   const {status} = req.body;

//   try {
//     const result = await db.query(
//       `UPDATE tasks SET status = $1
//        WHERE id = $2 RETURNING *`,
//       [status, taskId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('Update task error:', err);
//     res.status(500).json({ error: 'Failed to update task' });
//   }
// };

// exports.deleteTask = async (req, res) => {
//   const taskId = req.params.id;

//   try {
//     const result = await db.query(`DELETE FROM tasks WHERE id = $1 RETURNING *`, [taskId]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     res.json({ message: 'Task deleted successfully' });
//   } catch (err) {
//     console.error('Delete task error:', err);
//     res.status(500).json({ error: 'Failed to delete task' });
//   }
// };

// exports.deleteAllTasks = async (req, res) => {
//   try {
//     // Delete all tasks from the tasks table
//     const result = await db.query('DELETE FROM tasks');

//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: 'No tasks found to delete' });
//     }

//     res.json({ message: 'All tasks deleted successfully' });
//   } catch (err) {
//     console.error('Delete all tasks error:', err);
//     res.status(500).json({ error: 'Failed to delete tasks' });
//   }
// };

// exports.getOverdueTasks = async (req, res) => {
//   try {
//     const result = await db.query(
//       `SELECT * FROM tasks WHERE due_date < CURRENT_DATE AND status != 'Done'`
//     );
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Get overdue tasks error:', err);
//     res.status(500).json({ error: 'Failed to fetch overdue tasks' });
//   }
// };



const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, due_date, priority } = req.body;
  const status = 'Todo';

  if (!title || !priority || !due_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const task = new Task({ title, description, status, due_date, priority });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Get all tasks with optional filtering
exports.getAllTasks = async (req, res) => {
  const { priority, due_date, search } = req.query;

  const filter = {};

  if (priority) {
    filter.priority = priority;
  }

  if (due_date) {
    filter.due_date = new Date(due_date);
  }

  if (search) {
    filter.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') }
    ];
  }

  try {
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (err) {
    console.error('Get tasks error:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Update task status
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a specific task
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

// Delete all tasks
exports.deleteAllTasks = async (req, res) => {
  try {
    const result = await Task.deleteMany();

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No tasks found to delete' });
    }

    res.json({ message: 'All tasks deleted successfully' });
  } catch (err) {
    console.error('Delete all tasks error:', err);
    res.status(500).json({ error: 'Failed to delete tasks' });
  }
};

// Get overdue tasks (due_date < today and not 'Done')
exports.getOverdueTasks = async (req, res) => {
  try {
    const today = new Date();
    const overdueTasks = await Task.find({
      due_date: { $lt: today },
      status: { $ne: 'Done' }
    });

    res.json(overdueTasks);
  } catch (err) {
    console.error('Get overdue tasks error:', err);
    res.status(500).json({ error: 'Failed to fetch overdue tasks' });
  }
};
