---
layout: page
title: Enc-dec
---

Encode:
<textarea id="encodeText"></textarea>
<input type="button" id="encodeBtn" value="Encode" onclick="encode()" />

Decode
<textarea id="decodeText"></textarea>
<input type="button" id="decodeBtn" value="Decode" onclick="decode()" />

<script>
    const encodeEl = document.querySelector('#encodeText');
    const decodeEl = document.querySelector('#decodeText');

    function utf8_to_b64( str ) {
        return window.btoa(unescape(encodeURIComponent( str )));
    }
    function b64_to_utf8( str ) {
        return decodeURIComponent(escape(window.atob( str )));
    }
    function encode() {
        const text = encodeEl.value;
        decodeEl.value = utf8_to_b64(text);
    }
    function decode() {
        const text = decodeEl.value;
        encodeEl.value = b64_to_utf8(text);
    }
</script>