export default function setupTabs(tabButtonsSelector = '.tab-buttons button', tabContentSelector = '.tab-content') {
  const buttons = document.querySelectorAll(tabButtonsSelector);
  const tabs = document.querySelectorAll(tabContentSelector);

  if (!buttons.length || !tabs.length) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      tabs.forEach(tab => tab.classList.remove('active'));

      button.classList.add('active');
      const targetId = button.getAttribute('data-tab');
      const targetTab = document.getElementById(targetId);
      if (targetTab) targetTab.classList.add('active');
    });
  });
}
