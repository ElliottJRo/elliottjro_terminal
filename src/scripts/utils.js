let Utils = {
  /**
   * @function search
   *
   * Given an object and string element in format (key.key2)
   *  it will attempt to return the value found by traversing the tree
   */
  search(o, s) {
      s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
      s = s.replace(/^\./, '');           // strip a leading dot
      var a = s.split('.');
      for (var i = 0, n = a.length; i < n; ++i) {
          var k = a[i];
          if (k in o) {
              o = o[k];
          } else {
              return '';
          }
      }
      return o;
  },

  /**
  * @function debounce
  *
  * Returns a function, that, as long as it continues to be invoked, will not
  * be triggered. The function will be called after it stops being called for
  * N milliseconds. If `immediate` is passed, trigger the function on the
  * leading edge, instead of the trailing. From Underscore.js
  **/
  debounce(func, wait, immediate) {
    let timeout;
    return function() {
  		let context = this, args = arguments;
  		let later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		let callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  },

  /**
   * @function DomReady
   *
   * Triggers the callback function when dom is ready
   */
  DomReady(func) {
    let context = this;
    const onReady = (event) => {
      document.removeEventListener("DOMContentLoaded", onReady);
      func.call(context || exports, event);
    };

    const onReadyIe = (event) => {
      if (document.readyState === "complete") {
        document.detachEvent("onreadystatechange", onReadyIe);
        func.call(context || exports, event);
      }
    };

    document.addEventListener && document.addEventListener("DOMContentLoaded", onReady) || document.attachEvent && document.attachEvent("onreadystatechange", onReadyIe);

  },

  /**
   * @function Ajax
   *
   * Simple XMLHttpRequest wrapper
   */
  Ajax(options) {
    return new Promise( (resolve, reject) => {

      if(options.url === undefined || typeof(options.url) === 'undefined') {
        throw new console.error("Utils::Ajax - url is required for ajax request");
      }

      let req = new XMLHttpRequest();
      const method = options.type || "POST";
      const url = options.url;
      const reqData = options.data || {};
      // Setup ajax request event handlers



      // Setup CORS
      if ("withCredentials" in req) {
        req.withCredentials = true;
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        req.open(method, url, true);

      } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        req = new XDomainRequest();
        req.open(method, url);

      } else {

        // Otherwise, CORS is not supported by the browser.
        req = null;

      }



      if(req !== null) {
        req.onreadystatechange = () => {
          if (req.readyState != 4) return;
          if(req.status > 399) {
            reject();
          }
          resolve({
            "responseText": req.responseText,
            "status": req.status,
            "request": req
          });
        };
        req.setRequestHeader(
          'Content-Type',
          'application/json;charset=UTF-8'
        );
        req.setRequestHeader(
          'Accept',
          'application/json'
        );
        req.send(JSON.stringify(reqData));

      }

    });
  }
};

export default Utils;
