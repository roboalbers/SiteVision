
define(function (require) {
	'use strict';

	//Requireables
	const dateUtil = require('DateUtil');
	const filterBuilder = require("FilterBuilder");
	const globalAppData = require('globalAppData');
	const indexUtil = require('IndexUtil');
	const logUtil = require('LogUtil');
	const linkRenderer = require('LinkRenderer');
	const searcherBuilder = require("SearcherBuilder");
	const searchFactory = require("SearchFactory");
	const sortBuilder = require("SortBuilder");
	const NODE_INDEX = require('IndexUtil.IndexType.NODE');

	//Configuration
	const webinarTemplateIdentifier = globalAppData.get('template-webinar');

	//KAN VI ENS ANVÄNDA SÖK?!
	return {
		getLiveWebinars: function () {
			var liveWebinars = [],
				currentISODate = new Date().toISOString();

			const filter = filterBuilder
				.clearFilterQueries()
				.addFilterQuery('+template:"' + webinarTemplateIdentifier + '"')
				.addFilterQuery('metadata.date.afPlayTransmissionEndTime:[' + currentISODate + ' TO *]')
				.build();

			const sortField = searchFactory.getSearchSortField("metadata.sortable.afPlayTransmissionEndTime", true);
			const sort = sortBuilder.addSortField(sortField).build();

			var searchResult = searcherBuilder
				.setIndex(indexUtil.getDefaultIndex(NODE_INDEX))
				.setFilter(filter)
				.setSort(sort)
				.build()
				.search('*', 9999);

			if (searchResult.hasHits()) {
				var hits = searchResult.getHits();

				while (hits.hasNext()) {
					var hit = hits.next();

					var title = hit.getField('title');
					linkRenderer.update(hit.getNode(), "normal", title, 'Till webbinaret ' + title);
					liveWebinars.push({
						link: linkRenderer.render()
					});
				}
			}
			return liveWebinars;
		},
		getUpcomingWebinars: function () {
			var upcomingWebinars = [];

			const filter = filterBuilder
				.clearFilterQueries()
				.addFilterQuery('+template:"' + webinarTemplateIdentifier + '"')
				.addFilterQuery('metadata.date.afPlayTransmissionTime:[NOW TO *]')
				.build();

			const sortField = searchFactory.getSearchSortField("metadata.sortable.afPlayTransmissionTime", true);
			const sort = sortBuilder.addSortField(sortField).build();

			var searchResult = searcherBuilder
				.setIndex(indexUtil.getDefaultIndex(NODE_INDEX))
				.setFilter(filter)
				.setSort(sort)
				.build()
				.search('*', 9999);

			if (searchResult.hasHits()) {
				var hits = searchResult.getHits(),
					i = 0;
				while (hits.hasNext()) {
					var hit = hits.next();

					var
						date = hit.getDateField('metadata.date.afPlayTransmissionTime'),
						isoDate = dateUtil.getDateAsISO8601String(date),
						dateString = dateUtil.getDateAsString('yyyy-MM-dd', date),
						timeString = dateUtil.getDateAsString('HH:mm', date);

					let isSameDateAndTime = upcomingWebinars.some(e => e.iso === isoDate);
					//Skip first iteration
					if (i === 0) {
						upcomingWebinars.push({
							name: hit.getField('title'),
							iso: isoDate,
							date: dateString,
							time: timeString
						});
					}
					//Check if the dates are the same
					else if (isSameDateAndTime && i > 0) {
						upcomingWebinars.push({
							name: hit.getField('title'),
							iso: isoDate,
							date: dateString,
							time: timeString
						});
					}
					i++;
				}
			}

			return upcomingWebinars;
		},
	};
});
