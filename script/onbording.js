// Auto-advance from page 1 after 2 seconds
setTimeout(() => goTo(2), 2000);

function goTo(num) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + num).classList.add('active');
}
