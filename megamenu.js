!function(e){var s=function(e,s){this.elem=e,this.settings=s,this.addAjaxHtml(),this.ajaxcall=null,this.lielem=this.elem.find(".verticlemenu li a"),this.menuHelper(this.elem),this.addEvents()};s.prototype={regex:{islabel:new RegExp("/search/label/","g"),issearch:new RegExp("[?&]q=","g"),labelsearch:new RegExp("(//[^/]+)/search/label/([^/?&]+).*[?&]q=([^$&]+)(?:[^$]+)?","g"),label:new RegExp("(//[^/]+)/search/label/([^/?&$]+)","g"),search:new RegExp("(//[^/]+)/search/?[?&]q=(.*)","g")},addEvents:function(){var s=this;this.lielem.hover(function(){"true"!==e(this).data("menuloaded")&&(s.li=e(this),s.url=s.li.attr("href"),s.container=s.li.closest("ul").siblings("ul"),s.hoverOver())},function(){s.hoverOut()})},hoverOver:function(){var s=this;this.getAJAXUrl(),this.ajaxUrl&&(this.ajaxcall=e.ajax({type:"GET",url:s.ajaxUrl,dataType:"jsonp",data:s.ajaxData,beforeSend:function(){s.showLoader()},success:function(e){s.hideLoader(),s.addArrow(),s.showPosts(e)},error:function(e){s.showError(e)}}))},hoverOut:function(){this.ajaxcall.abort(),this.hideLoader()},getAJAXUrl:function(){if(this.url){var e=this;this.ajaxData={alt:"json","max-results":this.settings.numPosts},-1!==this.url.search(this.regex.islabel)&&-1!==this.url.search(this.regex.issearch)?this.ajaxUrl=this.url.replace(this.regex.labelsearch,function(s,t,i,a){return e.ajaxData.q=a,[t,"/feeds/posts/default/-/",i,"/"].join("")}):-1!==this.url.search(this.regex.islabel)&&-1===this.url.search(this.regex.issearch)?this.ajaxUrl=this.url.replace(this.regex.label,function(s,t,i){return delete e.ajaxData.q,[t,"/feeds/posts/default/-/",i,"/"].join("")}):-1===this.url.search(this.regex.islabel)&&-1!==this.url.search(this.regex.issearch)?this.ajaxUrl=this.url.replace(this.regex.search,function(s,t,i){return e.ajaxData.q=i,[t,"/feeds/posts/default"].join("")}):this.ajaxUrl=!1}else this.ajaxUrl=!1},showLoader:function(){e("<span></span>",{"class":"loader"}).appendTo(this.li.closest("li"))},hideLoader:function(){this.li.closest("li").find("span.loader").remove()},showPosts:function(s){var t,i,a,l=this,r=[];s.feed.openSearch$totalResults.$t>0?e.each(s.feed.entry,function(s,n){t=n.title.$t,e.each(n.link,function(e,s){i="alternate"===s.rel?s.href:"#"}),a=n.media$thumbnail?n.media$thumbnail.url.replace(/\/s72\-c\//,"/s100-c/"):l.settings.defaultImg,r.push('<li><span class="imgCont"><img alt="',t,'" src="',a,'"/></span><a rel="nofollow" title="',t,'" href="',i,'">',t,"</a></li>")}):r.push("<h5>","Sorry!!, No Posts to Show","</h5>"),this.container.html(r.join("")),this.lielem.removeData("menuloaded"),this.li.data("menuloaded","true")},showError:function(e){"error"===e.statusText&&(this.hideLoader(),this.addArrow(),this.container.html("<h5>Error!! Could not fetch the Blog Posts!</h5>"))},addArrow:function(){this.lielem.closest("li").find("span").remove(),this.lielem.removeClass("hoverover"),this.li.addClass("hoverover"),e("<span></span>",{"class":"menuArrow"}).appendTo(this.li.closest("li"))},menuHelper:function(s){var t=this;s.find(">li").hover(function(){var s=e(this);s.find("a:first").addClass("hoverover");var i=e(this).find("ul.verticlemenu li").height()*e(this).find("ul.verticlemenu li").length;s.find("ul.postslist").css({"min-height":i+"px"}),t.requestFirstAjax(s)},function(){e(this).find("a:first").removeClass("hoverover")})},addAjaxHtml:function(){this.elem.find("ul ul").remove(),this.elem.addClass("adajaxmenu").find(">li").find("ul:first").addClass("verticlemenu").wrap(e("<div></div>",{"class":this.settings.divClass})),e("ul.verticlemenu").after(e("<ul></ul>",{"class":"postslist"}))},requestFirstAjax:function(e){e=e.find(".verticlemenu li:first-child a"),this.url=e.attr("href"),this.container=e.closest("ul").siblings("ul"),this.li=e,this.hoverOver()}},e.fn.ajaxBloggerMenu=function(t){var i={numPosts:4,divClass:"submenu",postsClass:"postslist",defaultImg:"/default.png"},a=e.extend({},i,t);return this.each(function(){new s(e(this),a)})}}(jQuery);
//<![CDATA[
function labelthumbs(json) {
    for (var i = 0; i < numposts; i++) {
        var entry = json.feed.entry[i];
        var posttitle = entry.title.$t;
        var posturl;
        if (i == json.feed.entry.length) break;
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
                var commenttext = entry.link[k].title;
                var commenturl = entry.link[k].href;
            }
            if (entry.link[k].rel == 'alternate') {
                posturl = entry.link[k].href;
                break;
            }
        }
        var thumburl;	
        try {
            thumburl = entry.media$thumbnail.url;
			thumburl = thumburl.replace("/s72-c/","/w"+thumb_width+"-h"+thumb_height+"-c/");
        } catch (error) {
            s = entry.content.$t;
            a = s.indexOf("<img");
            b = s.indexOf("src=\"", a);
            c = s.indexOf("\"", b + 5);
            d = s.substr(b + 5, c - b - 5);
            if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
                thumburl = d;
            } else thumburl = no_thumb;
        }
        var postdate = entry.published.$t;
        var cdyear = postdate.substring(0, 4);
        var cdmonth = postdate.substring(5, 7);
        var cdday = postdate.substring(8, 10);
		document.write('<ul class="rp_thumbs">');
        document.write('<li>');
        if (showpostthumbnails == true)
            document.write('<a href="' + posturl + '"><div class="rp_thumb"><span class="rollover"></span><img width="' + thumb_width + '" height="' + thumb_height + '" alt="' + posttitle + '" src="' + thumburl + '"/></div></a>');
        document.write('<span class="rp_title"><a href="' + posturl + '" target ="_top">' + posttitle + '</a></span>');
        var towrite = '';
        document.write('<span class="rp_meta">');
        if (showpostdate == true) {
            towrite = towrite + '<span class="rp_meta_date">' + cdday + '/' + cdmonth + '/' + cdyear + '</span>';
        }
        if (showcommentnum == true) {
            if (commenttext == '1 Comments') commenttext = '1 Comment';
            if (commenttext == '0 Comments') commenttext = 'No Comments';
            commenttext = '<span class="rp_meta_comment"><a href="' + commenturl + '" target ="_top">' + commenttext + '</a></span>';
            towrite = towrite + commenttext;
        }
        if (displaymore == true) {
            towrite = towrite + '<span class="rp_meta_more"><a href="' + posturl + '" class="url" target ="_top">Read More...</a></span>';
        }
        document.write(towrite);
		document.write('</span>');
		document.write('<span class="rp_summary">');
        if ("content" in entry) {
            var postcontent = entry.content.$t;
        } else
        if ("summary" in entry) {
            var postcontent = entry.summary.$t;
        } else var postcontent = "";
        var re = /<\S[^>]*>/g;
        postcontent = postcontent.replace(re, "");
        if (showpostsummary == true) {
            if (postcontent.length < numchars) {
                document.write('');
                document.write(postcontent);
                document.write('');
            } else {
                document.write('');
                postcontent = postcontent.substring(0, numchars);
                var quoteEnd = postcontent.lastIndexOf(" ");
                postcontent = postcontent.substring(0, quoteEnd);
                document.write(postcontent + '...');
                document.write('');
            }
        }
		document.write('</span>');
        document.write('</li>');
		document.write('</ul>');	
    }
    document.write('<ul class="rp_thumbs2">');
    for (var i = 1; i < numposts2; i++) {
        var entry = json.feed.entry[i];
        var posttitle = entry.title.$t;

        var posturl;
        if (i == json.feed.entry.length) break;
        for (var k = 1; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
                var commenttext = entry.link[k].title;
                var commenturl = entry.link[k].href;
            }
            if (entry.link[k].rel == 'alternate') {
                posturl = entry.link[k].href;
                break;
            }
        }
        var thumburl2;	
        try {
            thumburl2 = entry.media$thumbnail.url.replace("/s72-c/","/w"+thumb_width2+"-h"+thumb_height2+"-c/");
        } catch (error) {
            s = entry.content.$t;
            a = s.indexOf("<img");
            b = s.indexOf("src=\"", a);
            c = s.indexOf("\"", b + 5);
            d = s.substr(b + 5, c - b - 5);
            if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
                thumburl2 = d;
            } else thumburl2 = no_thumb2;
        }
        var postdate = entry.published.$t;
        var cdyear = postdate.substring(0, 4);
        var cdmonth = postdate.substring(5, 7);
        var cdday = postdate.substring(8, 10);
		if (showpostthumbnails2 == true)
            document.write('<a href="' + posturl + '"><div class="rp_thumb2"><img width="' + thumb_width2 + '" height="' + thumb_height2 + '" alt="' + posttitle + '" src="' + thumburl2 + '"/></div></a>');
		document.write('<li>');
		document.write('<span class="rp_title rp_title2"><a href="' + posturl + '" target ="_top">' + posttitle + '</a></span>');
        var towrite = '';
        document.write('<span class="rp_meta rp_meta2">');
        if (showpostdate2 == true) {
            towrite = towrite + '<span class="rp_meta_date rp_meta_date2">' + cdday + '/' + cdmonth + '/' + cdyear + '</span>';
        }
        if (showcommentnum2 == true) {
            if (commenttext == '1 Comments') commenttext = '1 Comment';
            if (commenttext == '0 Comments') commenttext = 'No Comments';
            commenttext = '<span class="rp_meta_comment rp_meta_comment2"><a href="' + commenturl + '" target ="_top">' + commenttext + '</a></span>';
            towrite = towrite + commenttext;
        }
        if (displaymore2 == true) {
            towrite = towrite + '<span class="rp_meta_more rp_meta_more2"><a href="' + posturl + '" class="url" target ="_top">Read More...</a></span>';
        }
        document.write(towrite);
		document.write('</span>');
		document.write('</li>');
    }
    document.write("</ul>")
}
//]]>
