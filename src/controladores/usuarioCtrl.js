import { conmysql } from '../db.js';

export const getUsuarios = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM usuario');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

export const getUsuarioxId = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM usuario WHERE id_usr = ?', [req.params.id]);
        if (result.length <= 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

export const postUsuario = async (req, res) => {
    try {
        const { cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id } = req.body;
        const [result] = await conmysql.query(
            'INSERT INTO usuario (cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id]
        );
        res.status(201).json({ id: result.insertId, message: 'Usuario creado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
};

export const putUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id } = req.body;
        const [result] = await conmysql.query(
            'UPDATE usuario SET cedula = ?, nombres = ?, direccion = ?, telefono = ?, fecha_registro = ?, usuario = ?, clave = ?, per_id = ? WHERE id_usr = ?',
            [cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id, id]
        );

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const [rows] = await conmysql.query('SELECT * FROM usuario WHERE id_usr = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

export const patchUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id } = req.body;
        const [result] = await conmysql.query(
            'UPDATE usuario SET cedula = IFNULL(?, cedula), nombres = IFNULL(?, nombres), direccion = IFNULL(?, direccion), telefono = IFNULL(?, telefono), fecha_registro = IFNULL(?, fecha_registro), usuario = IFNULL(?, usuario), clave = IFNULL(?, clave), per_id = IFNULL(?, per_id) WHERE id_usr = ?',
            [cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id, id]
        );

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const [rows] = await conmysql.query('SELECT * FROM usuario WHERE id_usr = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM usuario WHERE id_usr = ?', [req.params.id]);
        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: 'Usuario no encontrado para eliminar' });
        }
        res.sendStatus(202);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};

export const login = async (req, res) => {
    try {
        const { user, password } = req.body;

        if (!user) {
            return res.status(400).json({
                Mensaje: "Error: El usuario es requerido",
                cantidad: 0,
                data: [],
                color: "danger",
            });
        }

        if (!password) {
            return res.status(400).json({
                Mensaje: "Error: La contraseña es requerida",
                cantidad: 0,
                data: [],
                color: "danger",
            });
        }

        const [result] = await conmysql.query(
            'SELECT * FROM usuario WHERE usuario = ? AND clave = ?',
            [user, password]
        );
        

        res.json({
            Mensaje: result.length > 0
                ? "Inicio de sesión exitoso"
                : "Credenciales incorrectas",
            cantidad: result.length,
            data: result,
            color: result.length > 0 ? "success" : "danger",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
