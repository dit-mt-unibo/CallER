// When serving on GitHub Pages project site, the site will be served on a subpath and not the root.
// This is set here and then used as a prefix for all URLs.
const PROJECT_TITLE = 'caller';

export function u(url) {
  // return `/${PROJECT_TITLE}${url}`;
  return `${url}`;
}

export function apiUrl() {
  var host = window.location.host
  return 'http://' + host + ':1337';
  // return 'http://amelia.sslmit.unibo.it:1337';
}

