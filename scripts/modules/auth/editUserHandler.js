// modules/ui/editUserHandler.js

import { supabaseClient } from '../../supabase.js';

export async function setupEditarUsuario() {
  const btnEditar = document.querySelector('.user-edit');
  const modal = document.getElementById('modal-editar-usuario');
  const inputNombre = document.getElementById('edit-nombre');
  const inputFecha = document.getElementById('edit-fecha');
  const btnCancelar = document.getElementById('cancelar-editar');
  const btnGuardar = document.getElementById('guardar-editar');

  if (!btnEditar) return;

  btnEditar.addEventListener('click', async () => {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      alert('Usuario no autenticado');
      return;
    }

    const { data, error } = await supabaseClient
      .from('usuarios')
      .select('nombre, fecha_nacimiento')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      alert('Error al cargar datos: ' + error.message);
      return;
    }

    inputNombre.value = data?.nombre || '';
    inputFecha.value = data?.fecha_nacimiento || '';

    modal.style.display = 'block';
  });

  btnCancelar.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  btnGuardar.addEventListener('click', async () => {
    const nuevoNombre = inputNombre.value.trim();
    const nuevaFecha = inputFecha.value;

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return alert('Usuario no autenticado');

    const { error } = await supabaseClient
      .from('usuarios')
      .update({ nombre: nuevoNombre, fecha_nacimiento: nuevaFecha })
      .eq('id', user.id);

    if (error) {
      alert('Error al guardar cambios: ' + error.message);
      return;
    }

    alert('✅ Datos actualizados correctamente');
    modal.style.display = 'none';

    // Refrescar vista del usuario
    import('./uiHandlers.js').then(({ mostrarUsuario }) => mostrarUsuario());
  });
}
