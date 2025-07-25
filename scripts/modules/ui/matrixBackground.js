export function initMatrixBackground() {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const matrixCharacters = [
    'ラ', 'ド', 'ク', 'リ', 'フ', 'マ', 'ラ', 'ソ', 'ン',
    'わ', 'た', 'し', 'ワ', 'タ', 'シ', 'ん', 'ょ', 'ン', 'ョ',
    'た', 'ば', 'こ', 'タ', 'バ', 'コ',
    'と', 'う', 'き', 'ょ', 'う', 'ト', 'ウ', 'キ', 'ョ', 'ウ'
  ];

  const fontSize = 13;
  const columns = new Array(Math.floor(canvas.width / fontSize)).fill(1);

  const root = document.documentElement;

  function step() {
    // Obtener colores CSS actuales
    const bgColor = getComputedStyle(root).getPropertyValue('--matrix-bg').trim() || 'rgba(33,37,41,0.25)';
    const textColor = getComputedStyle(root).getPropertyValue('--matrix-text').trim() || 'rgba(166,204,255,0.8)';

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}px monospace`;

    columns.forEach((y, index) => {
      const char = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
      ctx.fillText(char, index * fontSize, y);
      columns[index] = y > canvas.height + Math.random() * 10000 ? 0 : y + fontSize;
    });
  }

  setInterval(step, 33);
}
