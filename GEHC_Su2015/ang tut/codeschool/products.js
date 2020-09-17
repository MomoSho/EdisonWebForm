(function() {
  var app = angular.module('store-directives', []);
  
  app.directive("productDescription", function() {
    return {
      restrict: 'E',
      //templateUrl: "product-description.html"
	  template:
		'<h4>Description</h4>'
		+ '<blockquote>{{product.description}}</blockquote>',
    };
  });

  app.directive("productReviews", function() {
    return {
      restrict: 'E',
      templateUrl: "product-reviews.html"
    };
  });

  app.directive("productSpecs", function() {
    return {
      restrict:"A",
      //templateUrl: "product-specs.html"
	  template: 
		  '<h4>Specs</h4>'
			+ '<ul class="list-unstyled">'
			  + '<li>'
				+ '<strong>Shine</strong> : {{product.shine}}</li>'
			  + '<li>'
				+ '<strong>Faces</strong> : {{product.faces}}</li>'
			  + '<li>'
				+ '<strong>Rarity</strong> : {{product.rarity}}</li>'
			  + '<li>'
				+ '<strong>Color</strong> : {{product.color}}</li>'
			+ '</ul>',
    };
  });

  app.directive("productTabs", function() {
    return {
      restrict: "E",
      // templateUrl: "C:\Users\502394182\Desktop\ang tut\codeschool\product-tabs.html",
	  template:
		'<section>'
		  + '<ul class="nav nav-pills">'
			+ '<li ng-class="{ active:tab.isSet(1) }">'
			  + '<a href ng-click="tab.setTab(1)">Description</a>'
			+ '</li>'
			+ '<li ng-class="{ active:tab.isSet(2) }">'
			  + '<a href ng-click="tab.setTab(2)">Specs</a>'
			+ '</li>'
			+ '<li ng-class="{ active:tab.isSet(3) }">'
			  + '<a href ng-click="tab.setTab(3)">Reviews</a>'
			+ '</li>'
		  + '</ul>'

		  + '<product-description ng-show="tab.isSet(1)" ></product-description>'
		  + '<div product-specs ng-show="tab.isSet(2)"></div>'
		  + '<product-reviews ng-show="tab.isSet(3)"></product-reviews>'

		+ '</section>',
      controller: function() {
        this.tab = 1;

        this.isSet = function(checkTab) {
          return this.tab === checkTab;
        };

        this.setTab = function(activeTab) {
          this.tab = activeTab;
        };
      },
      controllerAs: "tab"
    };
  });

  app.directive("productGallery", function() {
    return {
      restrict: "E",
      //templateUrl: "product-gallery.html",
	  template:
	  	'<div ng-show="product.images.length">'
			+ '<div class="img-wrap">'
				+ '<img ng-src="{{product.images[gallery.current]}}" />'
			+ '</div>'
			
			+ '<ul class="img-thumbnails clearfix">'
				+ '<li class="small-image pull-left thumbnail" ng-repeat="image in product.images">'
					+ '<img ng-src="{{image}}" />'
				+ '</li>'
			+ '</ul>'
		+ '</div>',
      controller: function() {
        this.current = 0;
        this.setCurrent = function(imageNumber){
          this.current = imageNumber || 0;
        };
      },
      controllerAs: "gallery"
    };
  });

})();
