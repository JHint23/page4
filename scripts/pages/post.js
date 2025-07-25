import { supabaseClient } from '../supabase.js';
import markdownit from 'https://cdn.jsdelivr.net/npm/markdown-it/+esm';

const md = markdownit();

const params = new URLSearchParams(window.location.search);
const tipo = params.get('tipo');
const postId = params.get('id');

// Normalizamos el tipo para que coincida con la restricción del CHECK



// ✅ Cargar el post
if (tipo && postId) {
    supabaseClient
        .from(tipo) // Tabla original: noticias, guias o analisis
        .select('*')
        .eq('id', postId)
        .single()
        .then(({ data, error }) => {
            if (error) {
                console.error("Error al obtener el post:", error);
                document.getElementById("post-content").textContent = "No se pudo cargar el contenido.";
                return;
            }

            document.title = data.titulo;
            document.getElementById("post-title").textContent = data.titulo;
            document.getElementById("post-img").src = data.imagen_url;
            document.getElementById("post-desc").textContent = data.descripcion;
            document.getElementById("post-date").textContent = new Date(data.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            if (data.post) {
                document.getElementById("post-content").innerHTML = md.render(data.post);
            }

            // ✅ Después de cargar el post, cargamos los comentarios
            cargarComentarios();
        });
} else {
    document.getElementById("post-content").textContent = "No se encontró el contenido solicitado.";
}

// ✅ Cargar comentarios
async function cargarComentarios() {
    const { data, error } = await supabaseClient
        .from('comentarios')
        .select(`
    id, contenido, padre_id, fecha,
    usuario_id,
    usuarios:usuario_id (nombre, imagen)
  `)
        .eq('post_id', postId)
        .eq('post_tipo', tipo)
        .order('fecha', { ascending: true });

    if (error) {
        console.error("Error al cargar comentarios:", error);
        return;
    }

    renderComentarios(data);
}

async function renderComentarios(lista) {
    const contenedor = document.getElementById('comments-list');
    contenedor.innerHTML = '';

    if (!lista.length) {
        contenedor.innerHTML = "<p>No hay comentarios. Sé el primero en comentar.</p>";
        return;
    }

    const { data: { user } } = await supabaseClient.auth.getUser(); // ✅ Usuario actual

    const map = {};
    lista.forEach(c => map[c.id] = { ...c, hijos: [] });

    const raiz = [];
    lista.forEach(c => {
        if (c.padre_id) {
            map[c.padre_id]?.hijos.push(map[c.id]);
        } else {
            raiz.push(map[c.id]);
        }
    });

    function crearComentario(c) {
    const div = document.createElement('div');
    div.classList.add('comentario');
    div.innerHTML = `
      <div class="comentario-header">
        <img src="${c.usuarios?.imagen ? c.usuarios.imagen + '?v=' + Date.now() : 'media/user.png'}" class="avatar" style="width:50px;height:50px;border-radius:100%"/>

        <strong>${c.usuarios?.nombre || 'Usuario'}</strong>
        <span class="fecha">${new Date(c.fecha).toLocaleString('es-ES')}</span>
      </div>
      <p class="comentario-texto">${c.contenido}</p>
      <button class="responder-btn" data-id="${c.id}">Responder</button>
      ${c.usuario_id === user?.id ? `<button class="eliminar-btn" data-id="${c.id}">Eliminar</button>` : ''}
    `;
    if (c.hijos.length) {
        const subDiv = document.createElement('div');
        subDiv.classList.add('respuestas');
        c.hijos.forEach(hijo => subDiv.appendChild(crearComentario(hijo)));
        div.appendChild(subDiv);
    }
    return div;
}

    raiz.forEach(c => contenedor.appendChild(crearComentario(c)));
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('responder-btn')) {
        padreSeleccionado = e.target.dataset.id;

        const comentario = e.target.closest('.comentario');
        const nombre = comentario.querySelector('strong')?.textContent || 'usuario';

        document.getElementById('respuesta-text').textContent = `Respondiendo a ${nombre}`;
        document.getElementById('respuesta-info').style.display = 'block';
        document.getElementById('comment-text').focus();
    }
});


document.getElementById('cancelar-respuesta').addEventListener('click', () => {
    padreSeleccionado = null;
    document.getElementById('respuesta-info').style.display = 'none';
});
// ✅ Insertar comentario
let padreSeleccionado = null;

document.getElementById('comment-submit').addEventListener('click', async () => {
    const texto = document.getElementById('comment-text').value.trim();
    if (!texto) return alert('Escribe algo');

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
        alert('Debes iniciar sesión para comentar.');
        return;
    }

    console.log({
        usuario_id: user.id,
        post_id: postId,
        post_tipo: tipo,
        contenido: texto,
        padre_id: padreSeleccionado || null
    });

    const { error } = await supabaseClient
        .from('comentarios')
        .insert([{
            usuario_id: user.id,
            post_id: postId,
            post_tipo: tipo,
            contenido: texto,
            padre_id: padreSeleccionado || null
        }]);

    if (error) {
        console.error("Error al comentar:", error);
        alert('Error al enviar el comentario');
        return;
    }

    document.getElementById('comment-text').value = '';
    padreSeleccionado = null;
    await cargarComentarios(); // ✅ Recargar lista después de comentar
});
document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('eliminar-btn')) {
        const idComentario = e.target.dataset.id;

        if (!confirm("¿Seguro que deseas eliminar este comentario?")) return;

        const { error } = await supabaseClient
            .from('comentarios')
            .delete()
            .eq('id', idComentario);

        if (error) {
            console.error("Error al eliminar comentario:", error);
            alert("No se pudo eliminar el comentario");
            return;
        }

        await cargarComentarios(); // ✅ Recargar lista
    }
});
// Botón Compartir: Copiar link al portapapeles
document.getElementById('btn-compartir').addEventListener('click', () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('¡Link copiado al portapapeles!');
    }).catch(() => {
        alert('No se pudo copiar el link.');
    });
});

// Botón Descargar: descargar contenido del post en txt
document.getElementById('btn-descargar').addEventListener('click', () => {
    const titulo = document.getElementById('post-title').textContent || 'post';
    const contenido = document.getElementById('post-content').textContent || '';
    const descripcion = document.getElementById('post-desc').textContent || '';
    const fecha = document.getElementById('post-date').textContent || '';

    const textoDescarga = `
Título: ${titulo}

Fecha: ${fecha}

Descripción: ${descripcion}

Contenido:

${contenido}
    `;

    const blob = new Blob([textoDescarga], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${titulo.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});