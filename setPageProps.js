//Update page props

//updatePage(Node aPage, Map<String,Object> properties)

const nodeFilterUtil = require('NodeFilterUtil');
const nodeIteratorUtil = require('NodeIteratorUtil');
const instanceCreatorUtil = require('InstanceCreatorUtil');
const pageUtil = require('PageUtil');
const publishingUtil = require('PublishingUtil');
const properties = require('Properties');
const startNode = scriptVariables.startNode;
const filter = nodeFilterUtil.getAnyOfPrimaryNodeTypesFilter([
   'sv:page',
   'sv:structurePage',
   'sv:article',
   'sv:structureLink',
]);
var map = instanceCreatorUtil.getMap();
map.put(pageUtil.PROPERTY_VISIBLE_IN_MENUS, false);
map.put(pageUtil.PROPERTY_ROBOTS_INDEX, false);
if(startNode){
   if(properties.get(startNode, 'published') === true){
      pageUtil.updatePage(startNode, map);
      publishingUtil.publishNode(startNode);
   }else{         
      pageUtil.updatePage(startNode, map);
      out.println('StartNode is not published: ' + startNode);
   }
   const nodes = nodeIteratorUtil.getFilteredNodeIterator(startNode.getNodes(), filter);
   if(nodes){
      var i = 0;
      while (nodes.hasNext()) {
         var node = nodes.nextNode();
         pageUtil.updatePage(node, map);
         if(properties.get(node, 'published') === true){
            publishingUtil.publishNode(node);
            out.println('Updated the node: ' + node);
         }else{         
            out.println('Node is not published: ' + node);
            out.println('</br>');
         }
         i++;
         /*if(node.hasNodes()){
            var x = 0;
            out.println('Subnodes coming up!');
            var subNodes = nodeIteratorUtil.getFilteredNodeIterator(node.getNodes(), filter);
            while (subNodes.hasNext()) {
               let subNode = subNodes.nextNode();
               pageUtil.updatePage(subNode, map);
               if(properties.get(subNode, 'published') === true){
                  publishingUtil.publishNode(subNode);
               }else{         
                  out.println('SubNode is not published: ' + subNode);
                  out.println('</br>');
               }               
               x++;
				}
         }*/
      }
      out.println('Done!');
		out.println('</br>Iterated: ' + i + ' nodes');
      //out.println('</br>Iterated: ' + x + ' subnodes');
   }
}
