(function () {
    const
        router = require('router'),
        nodeTypeUtil = require('NodeTypeUtil'),
        resouceLocatorUtil = require('ResourceLocatorUtil');

    router.get('/', (req, res) => {
        res.render({});
    });
    router.get('/get-content-areas', (req, res) => {
        const
            nodeId = req.params.value,
            pageNode = resouceLocatorUtil.getNodeByIdentifier(nodeId),
            pageContentNode = pageNode.getNode('Page Content'),
            pageContentNodes = pageContentNode.getNodes();

        var contentAreas = [],
            i = 0;
        while (pageContentNodes.hasNext() && i < 50) {
            var pageContentChildren = pageContentNodes.next();

            if (nodeTypeUtil.isType(pageContentChildren, 'sv:referenceLayout')) {
                contentAreas.push('<option value="' + pageContentChildren.getName() + '">' + pageContentChildren.getName() + '</option>');
            }
            i++;
        }
        res.json({
            value: contentAreas
        });
    });
})();