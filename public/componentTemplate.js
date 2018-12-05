(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['component'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"post\" image-filename=\""
    + alias4(((helper = (helper = helpers["image-filename"] || (depth0 != null ? depth0["image-filename"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image-filename","hash":{},"data":data}) : helper)))
    + "\" image-number=\""
    + alias4(((helper = (helper = helpers["image-number"] || (depth0 != null ? depth0["image-number"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image-number","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"image-container\">\n        <img src=\"#\">\n    </div>\n    <div class=\"image-info-container\">\n        <span class=\"image-info\">#"
    + alias4(((helper = (helper = helpers["image-number"] || (depth0 != null ? depth0["image-number"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image-number","hash":{},"data":data}) : helper)))
    + ": <a href=\""
    + alias4(((helper = (helper = helpers["image-filename"] || (depth0 != null ? depth0["image-filename"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image-filename","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["image-filename"] || (depth0 != null ? depth0["image-filename"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image-filename","hash":{},"data":data}) : helper)))
    + "</a> </span>\n    </div>\n</div>";
},"useData":true});
})();