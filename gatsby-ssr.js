const React = require('react');
const fs = require('fs');
exports.onRenderBody = ({ pathname, setHeadComponents }) => {
  setHeadComponents([
    <script
      type="module"
      dangerouslySetInnerHTML={{
        __html: `import 'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate';`
      }}
    ></script>,
    <style dangerouslySetInnerHTML={{__html: `pwa-update {
      display: none;
    }`}}></style>,
    <pwa-update showOfflineToast="false"></pwa-update>,
  ]);
};
