export default {

  props: {    
    umami_url : "https://cloud.umami.is/api/send?x-umami-api-key=",
  },

 
  async sendEventData(eventName, propName, dataString) {
    let full_url = this.props.umami_url + process.env.VUE_APP_UMAMI_KEY;
    const axios = require('axios');

    var data = {
      payload: {
        hostname: "forliviamo.it",
        language: navigator.language,
        referrer: document.referrer,
        screen: `${window.screen.width}x${window.screen.height}`,
        title: document.title,
        url: window.location.pathname,
        website: process.env.VUE_APP_SITE_ID,
        name: eventName,
        data: { propName: dataString },
      },
      type: 'event',
    };

    await axios.post(full_url, data);
  },

  async sendPageview() {
    let full_url = this.props.umami_url + process.env.VUE_APP_UMAMI_KEY;

    const axios = require('axios');
    var data = {
      payload: {
        hostname: "forliviamo.it",
        language: navigator.language,
        referrer: document.referrer,
        screen: `${window.screen.width}x${window.screen.height}`,
        title: document.title,
        url: window.location.pathname,
        website: process.env.VUE_APP_SITE_ID,        
      },
      type: 'event',
    };

    await axios.post(full_url, data);
  },

}
