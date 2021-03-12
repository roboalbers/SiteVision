(function () {
  'use strict';

  //App
  const router = require('router');
  //Module
  var nodeOutput = require('/module/server/nodeOutput');

  //Requirable Utils
  const instanceTypeUtil = require('InstanceTypeUtil');
  const logUtil = require('LogUtil');
  const nodeTypeUtil = require('NodeTypeUtil');
  const portletContextUtil = require('PortletContextUtil');
  const privileged = require('privileged');
  const properties = require('Properties');

  //Constants
  const currentPage = portletContextUtil.getCurrentPage();

  router.get('/', (req, res) => {
    logUtil.info('Request Object: ' + JSON.stringify(req));
    if (privileged.isConfigured()) {
      if (instanceTypeUtil.isNode(currentPage) && nodeTypeUtil.isPage(currentPage) && properties.get(currentPage, 'published')) {
        var html = nodeOutput.constructHtml(currentPage);
        res.render('/', { message: null, html: html });
      }
      else {
        if (nodeTypeUtil.isPage(currentPage) && properties.get(currentPage, 'published') === false) {
          res.render('/template', { message: "Applikationen renderas endast när sidan är publicerad." });
        } else {
          res.render('/template', { message: "Applikationen renderas endast på sidor." });
        }
      }
    } else {
      res.render('/template', { message: "Applikationen saknar en konfigurerad tjänsteanvändare." });
    }
  });
})();
