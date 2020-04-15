!function(e){var s=function(e,s){this.elem=e,this.settings=s,this.addAjaxHtml(),this.ajaxcall=null,this.lielem=this.elem.find(".verticlemenu li a"),this.menuHelper(this.elem),this.addEvents()};s.prototype={regex:{islabel:new RegExp("/search/label/","g"),issearch:new RegExp("[?&]q=","g"),labelsearch:new RegExp("(//[^/]+)/search/label/([^/?&]+).*[?&]q=([^$&]+)(?:[^$]+)?","g"),label:new RegExp("(//[^/]+)/search/label/([^/?&$]+)","g"),search:new RegExp("(//[^/]+)/search/?[?&]q=(.*)","g")},addEvents:function(){var s=this;this.lielem.hover(function(){"true"!==e(this).data("menuloaded")&&(s.li=e(this),s.url=s.li.attr("href"),s.container=s.li.closest("ul").siblings("ul"),s.hoverOver())},function(){s.hoverOut()})},hoverOver:function(){var s=this;this.getAJAXUrl(),this.ajaxUrl&&(this.ajaxcall=e.ajax({type:"GET",url:s.ajaxUrl,dataType:"jsonp",data:s.ajaxData,beforeSend:function(){s.showLoader()},success:function(e){s.hideLoader(),s.addArrow(),s.showPosts(e)},error:function(e){s.showError(e)}}))},hoverOut:function(){this.ajaxcall.abort(),this.hideLoader()},getAJAXUrl:function(){if(this.url){var e=this;this.ajaxData={alt:"json","max-results":this.settings.numPosts},-1!==this.url.search(this.regex.islabel)&&-1!==this.url.search(this.regex.issearch)?this.ajaxUrl=this.url.replace(this.regex.labelsearch,function(s,t,i,a){return e.ajaxData.q=a,[t,"/feeds/posts/default/-/",i,"/"].join("")}):-1!==this.url.search(this.regex.islabel)&&-1===this.url.search(this.regex.issearch)?this.ajaxUrl=this.url.replace(this.regex.label,function(s,t,i){return delete e.ajaxData.q,[t,"/feeds/posts/default/-/",i,"/"].join("")}):-1===this.url.search(this.regex.islabel)&&-1!==this.url.search(this.regex.issearch)?this.ajaxUrl=this.url.replace(this.regex.search,function(s,t,i){return e.ajaxData.q=i,[t,"/feeds/posts/default"].join("")}):this.ajaxUrl=!1}else this.ajaxUrl=!1},showLoader:function(){e("<span></span>",{"class":"loader"}).appendTo(this.li.closest("li"))},hideLoader:function(){this.li.closest("li").find("span.loader").remove()},showPosts:function(s){var t,i,a,l=this,r=[];s.feed.openSearch$totalResults.$t>0?e.each(s.feed.entry,function(s,n){t=n.title.$t,e.each(n.link,function(e,s){i="alternate"===s.rel?s.href:"#"}),a=n.media$thumbnail?n.media$thumbnail.url.replace(/\/s72\-c\//,"/s100-c/"):l.settings.defaultImg,r.push('<li><span class="imgCont"><img alt="',t,'" src="',a,'"/></span><a rel="nofollow" title="',t,'" href="',i,'">',t,"</a></li>")}):r.push("<h5>","Sorry!!, No Posts to Show","</h5>"),this.container.html(r.join("")),this.lielem.removeData("menuloaded"),this.li.data("menuloaded","true")},showError:function(e){"error"===e.statusText&&(this.hideLoader(),this.addArrow(),this.container.html("<h5>Error!! Could not fetch the Blog Posts!</h5>"))},addArrow:function(){this.lielem.closest("li").find("span").remove(),this.lielem.removeClass("hoverover"),this.li.addClass("hoverover"),e("<span></span>",{"class":"menuArrow"}).appendTo(this.li.closest("li"))},menuHelper:function(s){var t=this;s.find(">li").hover(function(){var s=e(this);s.find("a:first").addClass("hoverover");var i=e(this).find("ul.verticlemenu li").height()*e(this).find("ul.verticlemenu li").length;s.find("ul.postslist").css({"min-height":i+"px"}),t.requestFirstAjax(s)},function(){e(this).find("a:first").removeClass("hoverover")})},addAjaxHtml:function(){this.elem.find("ul ul").remove(),this.elem.addClass("adajaxmenu").find(">li").find("ul:first").addClass("verticlemenu").wrap(e("<div></div>",{"class":this.settings.divClass})),e("ul.verticlemenu").after(e("<ul></ul>",{"class":"postslist"}))},requestFirstAjax:function(e){e=e.find(".verticlemenu li:first-child a"),this.url=e.attr("href"),this.container=e.closest("ul").siblings("ul"),this.li=e,this.hoverOver()}},e.fn.ajaxBloggerMenu=function(t){var i={numPosts:4,divClass:"submenu",postsClass:"postslist",defaultImg:"/default.png"},a=e.extend({},i,t);return this.each(function(){new s(e(this),a)})}}(jQuery);
$(function(){var panel=$(&#39;#panel&#39;);menu=$(&#39;nav ul&#39;);menuHeight=menu.height();$(panel).on(&#39;click&#39;,function(e){e.preventDefault();menu.slideToggle()});$(window).resize(function(){var w=$(window).width();if(w&gt;320&amp;&amp;menu.is(&#39;:hidden&#39;)){menu.removeAttr(&#39;style&#39;)}})});


//<![CDATA[
    // Script Widget Sticky
$(function(){if($("#HTML2").length){var o=$("#HTML2"),t=$("#HTML2").offset().top,i=$("#HTML2").height();$(window).scroll(function(){var s=$("#footer-wrapper").offset().top-i-70,f=$(window).scrollTop();if(f>t?o.css({position:"fixed",top:0}):o.css("position","static"),f>s){var n=s-f;o.css({top:n})}})}});
    //]]>
jQuery(document).ready(function($) {
 $(&#39;#adajaxmenu&#39;).ajaxBloggerMenu({
  numPosts : 4, // Number of Posts to show
  defaultImg : &#39;http://url-to-image.com/default-image.jpeg&#39; // Default thumbnail Image
 });
});

$(function(){
  $(&#39;.searchblog&#39;).submit(function(e){
    if($(&#39;.search-form .searchbar&#39;).val().length==0){
       $(&#39;.search-form .search-alert&#39;).fadeIn().css(&#39;display&#39;,&#39;inline-block&#39;);
      e.preventDefault();
    }
  });
});

function getCurrentYear(){var e=new Date;return e.getFullYear()}el=document.getElementById(&quot;current-year&quot;),el.innerHTML=getCurrentYear();
function show(e){document.getElementById(e).style.display=&quot;block&quot;}function hide(e){document.getElementById(e).style.display=&quot;none&quot;}
// Slide toggle
$(function(){$(&quot;#simplify-click &gt; li&quot;).click(function(i){var l=$(&quot;ul&quot;,this);return $(&quot;#simplify-click &gt; li &gt; ul&quot;).not(l).slideUp(),l.stop(!0,!0).slideToggle(400),!1}),$(&quot;#simplify-click &gt; li &gt; ul &gt; li&quot;).click(function(i){i.stopPropagation()})});
//<![CDATA[
// Back to top button
$(function(){$(window).scroll(function(){$(this).scrollTop()>400?$(".simplifytotop").addClass('arlniainf'):$(".simplifytotop").removeClass('arlniainf')}),$(".simplifytotop").click(function(){return $("html,body").animate({scrollTop:0},400),!1})});
//]]>
