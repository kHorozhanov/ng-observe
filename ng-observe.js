angular.module('ngObserve', []);

angular.module('ngObserve').factory('Observe', function () {
    var Observe = function (data) {

        var _listeners = [];
        var _data = data;
        var _id = 1;

        var Subscriber = function (id, cb) {
            this.id = id;
            this.cb = cb;
        };

        Subscriber.prototype = {
            cancel: function () {
                var i;
                for (i = 0; i < _listeners.length; i++) {
                    if (this.id === _listeners[i].id) {
                        _listeners.splice(i, 1);
                        return true;
                    }
                }
            }
        };

        this.subscribe = function (cb) {
            try {
                if (typeof cb === "function") {
                    var sbcr = new Subscriber(_id++, cb);
                    _listeners.push(sbcr);
                    sbcr.cb(_data);
                    return sbcr;
                } else {
                    throw new TypeError('Argument is not a function!');
                }
            } catch (err) {
                console.error(err);
            }
        };

        this.next = function (data) {
            _data = data;
            for (var i = 0; i < _listeners.length; i++) {
                _listeners[i].cb(_data);
            }
        };
    };

    return Observe;
});