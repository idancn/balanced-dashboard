import { site } from "@wix/site";
import { createClient } from "@wix/sdk";

const myWixClient = createClient({
  auth: site.auth(),
  host: site.host({ applicationId: "eff14076-a962-4d3a-8ccb-05f60582e68e" }),
  modules: {
    products,
  },
});

const win = window;

console.log('hi there!');

function registerListener() {
  win.wixDevelopersAnalytics.register(
    'idanos-test2',
    async (eventName, eventParams, options) => {
      console.log('before fetch', eventName);
      try {
        await httpClient.fetchWithAuth(
          'https://www.wixapis.com/meta-analytics/v1/events/report',
          {
            method: 'POST',
            body: JSON.stringify({ event: { name: eventName, data: eventParams } }),
          }
        );
      } catch (error) {
        console.log('failed to fetch', error);
      }
      console.log('after fetch', eventName);
    }
  );
}

if (win.wixDevelopersAnalytics) {
  registerListener();
} else {
  window.addEventListener('wixDevelopersAnalyticsReady', registerListener);
}
