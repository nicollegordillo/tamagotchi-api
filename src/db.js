import pool from './conn.js';

// Función para agregar un nuevo post a la base de datos
export async function addPost(postData) {
  try {
    const query = 'INSERT INTO tamagotchi_items (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)';
    const result = await pool.query(query, [postData.name, postData.description, postData.price, postData.category, postData.image]);
    return result.insertId; // Retorna el ID del nuevo post insertado
  } catch (error) {
    console.error('Error al agregar el post:', error);
    throw error;
  }
}

// Función para actualizar un post existente en la base de datos
export async function updatePost(postId, postData) {
  try {
    const query = 'UPDATE tamagotchi_items SET name = ?, description = ?, price = ?, category = ?, image = ? WHERE id = ?';
    const result = await pool.query(query, [postData.name, postData.description, postData.price, postData.category, postData.image, postId]);
    return result.affectedRows > 0; // Retorna true si se actualizó correctamente, false si no se encontró el post
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    throw error;
  }
}

// Función para borrar un post existente de la base de datos
export async function deletePost(postId) {
  try {
    const query = 'DELETE FROM tamagotchi_items WHERE id = ?';
    const result = await pool.query(query, [postId]);
    return result.affectedRows > 0; // Retorna true si se eliminó correctamente, false si no se encontró el post
  } catch (error) {
    console.error('Error al borrar el post:', error);
    throw error;
  }
}

// Función para buscar un post por su ID en la base de datos
export async function getPostById(postId) {
  try {
    const query = 'SELECT * FROM tamagotchi_items WHERE id = ?';
    const [rows] = await pool.query(query, [postId]);
    return rows[0]; // Retorna el primer post encontrado con el ID especificado, o undefined si no se encuentra
  } catch (error) {
    console.error('Error al buscar el post por ID:', error);
    throw error;
  }
}


// Obtener todos los posts
export async function getAllPosts() {
 const [rows] = await pool.query('SELECT * FROM tamagotchi_items')
 return rows
}
