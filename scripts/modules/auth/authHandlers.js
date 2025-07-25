//authHandlers.js
import { supabaseClient } from '../../supabase.js';
import { mostrarUsuario, mostrarLogin } from '../ui/uiHandlers.js'; // Asegúrate de tener esto si lo divides en otro archivo

// =========================
// Registro de usuario
// =========================
export async function registrarse() {
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const passwordRepeat = document.getElementById('signup-password-repeat').value;
  const nombre = document.getElementById('signup-name').value.trim();
  const fechaNacimiento = document.getElementById('signup-fecha').value;

  if (!email || !password || !nombre || !fechaNacimiento) {
    alert('Todos los campos marcados con * son obligatorios.');
    return;
  }

  if (password !== passwordRepeat) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  const { error: signupError } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (signupError) {
    alert('Error al registrarse: ' + signupError.message);
    return;
  }

  // Guardar temporalmente los datos extra
  localStorage.setItem('nombre_registro', nombre);
  localStorage.setItem('fecha_registro', fechaNacimiento);

  alert('✅ Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
  mostrarLogin();
}

// =========================
// Inicio de sesión
// =========================
export async function login() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    alert('Debes ingresar correo y contraseña');
    return;
  }

  const { error: loginError } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    alert('Error al iniciar sesión: ' + loginError.message);
    return;
  }

  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    alert('No se pudo obtener el usuario autenticado.');
    return;
  }

  // Verificar si ya existe entrada en tabla 'usuarios'
  const { data: existente, error: queryError } = await supabaseClient
    .from('usuarios')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (queryError) {
    alert('Error al verificar datos del usuario: ' + queryError.message);
    return;
  }

  // Si no existe, insertar
  if (!existente) {
    const nombre = localStorage.getItem('nombre_registro') || 'Sin nombre';
    const fechaNacimiento = localStorage.getItem('fecha_registro') || null;

    const { error: insertError } = await supabaseClient
      .from('usuarios')
      .insert([{ id: user.id, nombre, fecha_nacimiento: fechaNacimiento }]);

    if (insertError) {
      alert('Error al guardar información adicional: ' + insertError.message);
      return;
    }

    localStorage.removeItem('nombre_registro');
    localStorage.removeItem('fecha_registro');
  }

  mostrarUsuario();
  window.location.reload();
}

// =========================
// Subir imagen de usuario
// =========================
export async function subirImagenUsuario() {
  const fileInput = document.getElementById('user-image-file');
  if (fileInput.files.length === 0) {
    alert('Selecciona una imagen para subir.');
    return;
  }
  const file = fileInput.files[0];

  const { data: userData } = await supabaseClient.auth.getUser();
  if (!userData?.user) {
    alert('No se pudo obtener el usuario autenticado.');
    return;
  }

  const userId = userData.user.id;
  const filePath = `${userId}/avatar.png`;

  // Subir archivo al storage
  const { error: uploadError } = await supabaseClient.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    alert('Error al subir imagen: ' + uploadError.message);
    return;
  }

  // Obtener URL pública
  const { data: { publicUrl } } = supabaseClient.storage
    .from('avatars')
    .getPublicUrl(filePath);
  
  if (!publicUrl) {
    alert('No se pudo obtener la URL pública de la imagen.');
    return;
  }

  // Actualizar tabla usuarios con la URL
  const { error: updateError } = await supabaseClient
    .from('usuarios')
    .update({ imagen: publicUrl })
    .eq('id', userId);

  if (updateError) {
    alert('Error al actualizar imagen en la tabla: ' + updateError.message);
    return;
  }
  window.location.reload();
  // Refrescar la imagen en la interfaz
  document.getElementById('user-avatar').src = `${publicUrl}?t=${Date.now()}`;
  alert('Imagen subida y actualizada correctamente.');

  
}


// =========================
// Borrar cuenta de usuario
// =========================
export async function borrarCuenta() {
  const confirmDelete = confirm('¿Estás seguro que deseas borrar tu cuenta? Esta acción es irreversible.');
  if (!confirmDelete) return;

  const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (userError || !user || !session) {
    alert('No se pudo obtener el usuario autenticado.');
    return;
  }

  const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL || 'https://jepsuuzybjlsfqgrzeyw.supabase.co'}/functions/v1/delete-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`
    },
    body: JSON.stringify({ user_id: user.id })
  });

  const result = await res.json();
  if (!res.ok) {
    alert('❌ Error al eliminar la cuenta: ' + (result.error || 'Error desconocido'));
    return;
  }

  alert('✅ Cuenta eliminada con éxito.');
  await supabaseClient.auth.signOut();
  mostrarLogin();
}

// Cerrar sesión
export async function cerrarSesion() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    alert('Error al cerrar sesión: ' + error.message);
    return;
  }
  window.location.href = '../../../noticias.html';
  mostrarLogin();
}