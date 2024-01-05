import Router from 'next/router';

function startProgress() {
  import('nprogress').then((NProgress) => {
    NProgress.start();
  });
}

function stopProgress() {
  import('nprogress').then((NProgress) => {
    NProgress.done();
  });
}

Router.events.on('routeChangeStart', startProgress);
Router.events.on('routeChangeComplete', stopProgress);
Router.events.on('routeChangeError', stopProgress);
