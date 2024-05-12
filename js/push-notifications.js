// // Solicita permiso para las notificaciones
// Notification.requestPermission().then(function(result) {
//   if (result === 'granted') {
//     subscribeUserToPush();
//   }
// });

// // Suscribe al usuario a las notificaciones push
// function subscribeUserToPush() {
//   navigator.serviceWorker.ready.then(function(registration) {
//     if (!registration.pushManager) {
//       console.log('Este navegador no soporta notificaciones push.');
//       return;
//     }

//     // Para obtener una nueva suscripción, debemos llamar a `registration.pushManager.subscribe()`
//     // Necesitamos pasar el objeto de opciones de usuarioVisibleOnly: true mientras
//     // suscribimos al usuario, ya que esto es un requisito del estándar web actualmente.
//     registration.pushManager.subscribe({
//       userVisibleOnly: true
//     }).then(function(subscription) {
//       console.log('Usuario suscrito:', subscription);
//     })
//     .catch(function(error) {
//       console.error('No se pudo suscribir al usuario: ', error);
//     });
//   });
// }