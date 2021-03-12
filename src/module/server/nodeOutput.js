
define(function (require) {
	'use strict';
	//Requirable Utils
	const dateUtil = require('DateUtil');
	const instanceCreatorUtil = require('InstanceCreatorUtil');
	const collectionsInstance = instanceCreatorUtil.getCollectionsInstance();
	const logUtil = require('LogUtil');
	const metadataUtil = require('MetadataUtil');
	const nodeComparatorUtil = require('NodeComparatorUtil');
	const nodeFilterUtil = require('NodeFilterUtil');
	const nodeIteratorUtil = require('NodeIteratorUtil');
	const nodeResolverUtil = require('NodeResolverUtil');
	const nodeTypeUtil = require('NodeTypeUtil');
	const portletContextUtil = require('PortletContextUtil');
	const privileged = require('privileged');
	const properties = require('Properties');
	const propertyUtil = require('PropertyUtil');
	//AppData
	const appData = require('appData');
	const headingFontNode = appData.getNode('headingFont');
	const headingFontLevel = properties.get(headingFontNode, 'headingLevel');
	const headingFontSelector = properties.get(headingFontNode, 'selectorText');
	const descriptionFontNode = appData.getNode('descriptionFont');
	const descriptionFontSelector = properties.get(descriptionFontNode, 'selectorText');

	return {
		constructHtml: function (nodeIdentifier) {
			//Since 8.1
			//Add filter to nodeIterator to bypass "visible in menus" nodeIteratorUtil.getFilteredNodeIterator(startNode.getNodes(), filter);
			//At the moment we build filters to filter out published pages.		
			/* var htmlOutput = "";
			const nodeIterator = currentPage.getNodes();
			const compoundAndFilterBuilder = nodeFilterUtil.getCompoundAndFilterBuilder();
			const pageFilter = nodeFilterUtil.getPrimaryNodeTypeFilter(nodeTypeUtil.PAGE_TYPE);
			const publishedFilter = nodeFilterUtil.getStringPropertyFilter("published", true);
			const filter = compoundAndFilterBuilder.addFilter(pageFilter).addFilter(publishedFilter).build();
			const iteratorList = nodeIteratorUtil.findAll(nodeIterator, filter);
			const collaborationDateResolver = nodeResolverUtil.getCollaborationDateResolver();

			// Create a comparator that compares values extracted by the resolver
			const resolverComparator = nodeComparatorUtil.getResolverComparator(collaborationDateResolver);

			//Collections sort
			//Order is 1.The time when the node was last published 2.The time when the node was last modified 3.The time when the node was created
			collectionsInstance.sort(iteratorList, resolverComparator);
			collectionsInstance.reverse(iteratorList); //Reverse result to get 'latest' first

			//Return the first node e.g the sorted node.
			const firstNode = iteratorList.get(0); */

			/* if (firstNode) {
				htmlOutput += headingFontLevel !== 0 ? '<h' + headingFontLevel + ' class=' + headingFontSelector + '>' + properties.get(firstNode, 'afplayHeading') + '</h' + headingFontLevel + '>' : '<h2 class=' + headingFontSelector + '>' + properties.get(firstNode, 'afplayHeading') + '</h' + headingFontLevel + '>';
				htmlOutput += '<p class=' + descriptionFontSelector + '>' + properties.get(firstNode, 'afplayDescription') + '</p>';
				//Set media id for the Amber player if the ID doesn't match.
				//if (properties.get(currentPage, 'afPlayMediaId') !== properties.get(firstNode, 'afPlayMediaId')) {
				//privileged.doPrivilegedAction(() => {
				try {
					logUtil.info('Running as user!');
					logUtil.info('CurrentUser running is: ' + portletContextUtil.getCurrentUser());
					//CurrentUser will be used as fallback if privilegedUser isnt configured.
					//Check if we need to set this everytime?
					if (properties.get(firstNode, 'afPlayMediaId') !== properties.get(currentPage, 'afPlayMediaId')) {
						metadataUtil.setMetadataPropertyValue(currentPage, 'afPlayMediaId', properties.get(firstNode, 'afPlayMediaId'));
					}
					//Set omslagsbild
					if (properties.get(firstNode, 'afPlayMediaId') !== properties.get(currentPage, 'afplayCoverImage')) {
						metadataUtil.setMetadataPropertyValue(currentPage, 'afplayCoverImage', properties.get(firstNode, 'afplayCoverImage'));
					}
					if (properties.get(firstNode, 'afplayCoverImage360p') !== properties.get(currentPage, 'afplayCoverImage360p')) {
						metadataUtil.setMetadataPropertyValue(currentPage, 'afplayCoverImage360p', properties.get(firstNode, 'afplayCoverImage360p'));
					}
					//Set TransmissionPlay
					if (propertyUtil.getString(firstNode, 'afPlayTransmissionTime')) {
						if (propertyUtil.getString(firstNode, 'afPlayTransmissionTime') !== propertyUtil.getString(currentPage, 'afPlayTransmissionTime')) {
							metadataUtil.setMetadataPropertyValue(currentPage, 'afPlayTransmissionTime', dateUtil.parseDate(propertyUtil.getString(firstNode, 'afPlayTransmissionTime'), "yyyy-MM-dd'T'HH:mm:ss"));
						}
					} else {
						logUtil.info('Inget värde i transmission');
					}
				} catch (error) {
					logUtil.info('Error in try catch ' + error);
				}
				//});
			} */

			return htmlOutput;
		}
	};
});