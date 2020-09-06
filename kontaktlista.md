---
layout: page
title: Kontaktlista & Dokument
---

<form style="display:none" onsubmit="onSubmit(event)">
    <label>Lösenord: <input id="password" name="password" type="password" /></label>
    <input type="submit" value="OK" />
</form>

<div id="data">
</div>

<script>
    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    function utf8_to_b64( str ) {
        return window.btoa(unescape(encodeURIComponent( str )));
    }
    function b64_to_utf8( str ) {
        return decodeURIComponent(escape(window.atob( str )));
    }
    function httpGet(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.setRequestHeader('Content-type', 'charset=utf-8');
        xhr.overrideMimeType('text/plain; charset=utf-8');
        xhr.send();
        xhr.onload = function() {
            if (xhr.status != 200) { 
                var err = new Error(xhr.statusText);
                err.status = xhr.status;
                callback(err);
            } else { // show the result
                callback(null, xhr.response)
            }
        };

        xhr.onerror = function() {
            callback(new Error());
        };
    }

    var form = document.querySelector('form');
    var secret = getCookie('pwd');

    function onSubmit(event) {
        event.preventDefault();
        var value = document.querySelector('#password').value;
        var secret = btoa(value).replace(/=/g, '');
        setCookie('pwd', secret, 7000);
        decryptNot(secret);
    }
    function decryptNot(secret) {
        httpGet('/assets/' + secret + '.txt', function(err, data) {
            if (data) {
                document.querySelector('#data').innerHTML = b64_to_utf8(data);
                form.style.display = 'none';
            }
            else
                form.style.display = 'block';

        });
    }
    if (!secret)
        form.style.display = 'block';
    else {
        decryptNot(secret);
    }
</script>
