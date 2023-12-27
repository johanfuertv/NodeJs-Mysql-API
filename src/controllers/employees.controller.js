import { pool } from '../db.js';

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employee');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong',
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong',
    });
  }
};

export const createEmployees = async (req, res) => {
  const { name, salary } = req.body;
  try {
    const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary]);
    res.json({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong',
    });
  }
};

export const updateEmployees = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [
      name,
      salary,
      id,
    ]);

    console.log(result);

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: 'employee not found',
      });

    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong',
    });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: 'employee not found',
      });

    console.log(result);
    res.send('employee deleted');
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong',
    });
  }
};