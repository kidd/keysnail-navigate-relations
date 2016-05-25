var PLUGIN_INFO =
<KeySnailPlugin>
    <name>Navigate Relations</name>
    <description>Easily move via next/prev tags/links</description>
    <version>0.1</version>
    <updateURL>http://github.com/kidd/keysnail-navigate-relations/raw/master/navigate-relations.ks.js</updateURL>
    <author mail="raimonster@gmail.com" homepage="https://puntoblogspot.blogspot.com/">Raimon Grau</author>
    <license>The MIT License</license>
    <minVersion>1.0</minVersion>
    <include>main</include>
    <provides>
    <ext>navi-next</ext>
    <ext>navi-prev</ext>
    <ext>navi-up</ext>
    </provides>
    <detail><![CDATA[
=== Usage ===
            Use \]\] to go to logical 'next' page, and \[\[ to the 'previous' one.
    ]]></detail>
</KeySnailPlugin>;

function matching_text(aTags, searchText){
    var found;
    for (var i = 0; i < aTags.length; i++) {
        if (aTags[i].textContent == searchText) {
            found = aTags[i];
            return found;
        }
    }
}

function navi_dir(words){
    var aTags = window.content.document.getElementsByTagName("a");
    var found;
    for (var i in words){
        found = matching_text(aTags, words[i]);
        if (found) { found.click(); return found}
    }
}

function rel_dir(dir){
    function all(tag){
        return window.content.document.getElementsByTagName(tag)
    }
    function rel(elems, dir){
        for (var i in elems) {
            if(elems[i].rel == dir) {
                alert(elems[i].rel);
                window.content.document.location = elems[i].href;
                return true;
            }
        }
    }
    return rel(all('link'), dir) || rel(all('a'), dir)
}

function navi_prev(){
    rel_dir('previous') || navi_dir(['previous', 'prev','<']);
}

function navi_next(){
    rel_dir('next') || navi_dir(['next', 'Next', '>']);
}

ext.add("navi-next", navi_next , M({en: navi_next_doc}));
ext.add("navi-prev", navi_prev , M({en: navi_prev_doc}));

var navi_next_doc =   'Navigates to next page';
var navi_prev_doc =   'Navigates to previous page';


key.setViewKey(["]", "]"], function (ev) {
    navi_next();
            }, navi_next_doc, true);

key.setViewKey(["[", "["], function (ev) {
    navi_prev();
            },  navi_prev_doc, true);
