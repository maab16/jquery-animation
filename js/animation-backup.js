/**
 * hover figure caption with mouse direction
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016 MAAB
 * http://www.github.com/maab16/hover-figure-caption-with-mouse-direction
 */
 
;(function($,window,document,undefined){
	'use strict';

	var deafults = {

			animationType : {

				slideLeft : true,
				slideLeftToRight : false,
				slideRightToLeft : false,
				slideRight : true,
				slideUp : false,
				slideDown : false,
				slideDownLeft : false,
				slideDownRight : false,
				fontAnimation : false,
				leftToRight : false,
				ID1: "#id_1",
				ID2: "#id_2",
				ID3: "#id_3"

			},
			fontAnimationSize : "1.5em",
			scrollTopView : false,
			scrollBottomView : false,
			left:50,
			center:0,
			right:50,
			top:0,
			bottom:0
	}

	function animation(element,options){

		this.settings = $.extend({},deafults,options);
		this.element  = $(element);
		this.$hoverContainer = this.element.find(this.settings.figure);
		this.$hoverElem = this.element.find(this.settings.figCaption);
		this.$container = $(this.element);
		this.init();
		// console.log($(this.element));
	};

	animation.prototype = {

		init : function(){
				this.settings.parentWidth = (this.settings.parentWidth == '100%') ? this.$hoverContainer.width() : this.settings.parentWidth ;
				this.settings.parentHeight = (this.settings.parentHeight == '100%') ? this.$hoverContainer.height() : this.settings.parentHeight ;
				//console.log(this.isScrolledIntoView($(this.element)));
				this.$container.find('.slideLeft,#slideRight').css({
					opacity : 0,
					transform : 'translate('+-this.settings.left+'px,0px)'
				});
				this.$container.find('.slideRight').css({
					opacity : 0,
					transform : 'translate('+this.settings.right+'px,0px)'
				});
				var self = this;
				$(window).scroll(function () {
					if(self.isScrolledIntoView(self.$container)) {
						if (self.$container.hasClass("animation")) {
							console.log('View');
							if (self.settings.animationType.slideLeft === true) {
								self.slideLeft(self.$container.find(".slideLeft"),self.settings.left);
							}

							if (self.settings.animationType.slideRight === true) {
								self.slideRight(self.$container.find(".slideRight"),self.settings.right);
							}
							
							self.$container.removeClass("animation");
						}
					}else{
						console.log('Not View');
					}
				});
		},
		getRgba : function(hex,alpha=1){
			var r,g,b,a=alpha,
				//match = hex.match(/^#?(([0-9a-zA-Z]{3}){1,3})$/),
				match = hex.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i),
				hex = (match !== null) ? match[1] : '000';
				//console.log(hex);

			if (hex.length == 6) {
			    r = parseInt(hex.substring(0, 2), 16);
			    g = parseInt(hex.substring(2, 4), 16);
			    b = parseInt(hex.substring(4, 6), 16);
			}else if (hex.length == 3) {
			    r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
			    g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
			    b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
			}
			return r+','+g+','+b+','+a;
		},
		slideLeft : function(element,left_align=0,duration=1500){
			setTimeout(function(){
				$(element).css({
					opacity : 1 , 
					transform : 'translate(0px,0px)',
					transition : 'all 2s ease'
				});
			});
			// $(element).css("display","block").animate({left:left_align},duration);
		},
		slideRight : function(element,right_align=0,duration=1500){
			setTimeout(function(){
				$(element).css({
					opacity : 1 , 
					transform : 'translate(0px,0px)',
					transition : 'all 2s ease'
				});
			});
			// $(element).css("display","block").animate({left:left_align},duration);
		},
		getElementView : function(element){

			var win = $(window);
    
		    var viewport = {
		        top : win.scrollTop(),
		        left : win.scrollLeft()
		    };
		    viewport.right = viewport.left + win.width();
		    viewport.bottom = viewport.top + win.height();
		    
		    var bounds = element.offset();
		    bounds.right = bounds.left + element.outerWidth();
		    bounds.bottom = bounds.top + element.outerHeight();
		    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
		},
		getElementTop : function(element){

			return $(element).offset().top;
		},
		getDocumentTop : function(){

			return $(window).scrollTop();
		},
		getDocumentBottom : function(){

			var docViewTop = this.getDocumentTop();
			var docViewBottom = docViewTop + $(window).height();

			return docViewBottom;
		},
		 getElementBottom : function(element){

			var $element = $(element);
			var elementTop = this.getElementTop(element)
			var elementBottom = elementTop + $element.height();

			return elementBottom;
		},
		isScrolledIntoView : function(element){

			var docViewTop = this.getDocumentTop();

			var elementTop = this.getElementTop(element);

			var docViewBottom = this.getDocumentBottom();

			var elementBottom = this.getElementBottom(element);

			return ((elementBottom <= docViewBottom) && (elementTop >= docViewTop));
		}
	};

	$.fn.animation = function(options){

		return this.each(function(){

			if (!$.data(this,'animation')) {

				$.data(this,'animation',new animation(this,options));
			}
		});
	};


})(jQuery,window,document);