//uiHandlers.js
import { supabaseClient } from '../../supabase.js';

// Mostrar UI cuando el usuario está autenticado
export async function mostrarUsuario() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return mostrarLogin();

  const { data, error } = await supabaseClient
    .from('usuarios')
    .select('nombre, imagen,fecha_nacimiento')
    .eq('id', user.id)
    .maybeSingle();

  const nombre = data?.nombre || 'Invitado';
  const imagen = data?.imagen || 'media/user.png';
  const fecha_nacimiento = data?.fecha_nacimiento || '#/#/#';
  // Mostrar nombre
  document.querySelectorAll('.user-name').forEach(el => el.textContent = nombre);
  document.querySelectorAll('.user-tag').forEach(el => el.textContent ='@'+ nombre);
  document.querySelectorAll('.user-fecha-nacimiento').forEach(el => {
    el.textContent = new Date(fecha_nacimiento).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  });
  // Mostrar avatar
  document.querySelectorAll('.user-profile').forEach(el => el.src = `${imagen}?t=${Date.now()}`);

  // Ocultar elementos pre-login, mostrar post-login
  document.querySelectorAll('.pre-login').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.post-login').forEach(el => el.style.display = 'flex');
}

// Mostrar UI cuando NO hay sesión
export function mostrarLogin() {
  document.querySelectorAll('.user-name').forEach(el => el.textContent = 'Invitado');
  document.querySelectorAll('.user-profile').forEach(el => el.src = 'media/user.png');

  // Mostrar elementos pre-login, ocultar post-login
  document.querySelectorAll('.pre-login').forEach(el => el.style.display = 'flex');
  document.querySelectorAll('.post-login').forEach(el => el.style.display = 'none');
}
