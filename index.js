"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require('react');
var server_1 = require('react-dom/server');
var react_router_redux_1 = require('react-router-redux');
var react_router_1 = require('react-router');
var createHistory = require('react-router/lib/createMemoryHistory');
var react_redux_1 = require('react-redux');
var routes_1 = require('../shared/routes');
var configureStore_1 = require('../shared/store/configureStore');
var Meta_1 = require('../shared/components/Meta');
var fs = require('fs');
var content = fs.readFileSync('content.txt');
console.log('Output Content : \n' + content);
var analtyicsScript = '';
function render(req, res) {
    var authenticated = true;
    var memoryHistory = createHistory(req.originalUrl);
    var store = configureStore_1.default({
        user: {
            authenticated: authenticated,
            isWaiting: false,
            message: '',
            isLogin: true
        }
    }, memoryHistory);
    react_router_redux_1.syncHistoryWithStore(memoryHistory, store, {
        selectLocationState: function (state) { return state.router; },
    });
    var routes = routes_1.default(store);
    react_router_1.match({ routes: routes, location: req.url }, function (err, redirect, props) {
        if (err) {
            res.status(500).json(err);
        }
        else if (redirect) {
        }
        else if (props) {
            var initialState = store.getState();
            var componentHTML = server_1.renderToString(React.createElement(react_redux_1.Provider, {store: store}, React.createElement("div", {style: { height: '100%' }}, React.createElement(react_router_1.RouterContext, __assign({}, props)))));
            res.status(200).send("\n          <!doctype html>\n          <html " + Meta_1.default['htmlAttributes'].toString() + ">\n            <head>\n              " + Meta_1.default.title.toString() + "\n              " + Meta_1.default.meta.toString() + "\n              " + Meta_1.default.link.toString() + "\n            </head>\n            <body>\n              <div id=\"root\">" + componentHTML + "</div>\n              <script>window.__INITIAL_STATE__ = " + JSON.stringify(initialState) + ";</script>\n              " + analtyicsScript + "\n              <script type=\"text/javascript\" charset=\"utf-8\" src=\"/assets/main.js\"></script>\n            </body>\n          </html>\n        ");
        }
        else {
            res.sendStatus(404);
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = render;
//# sourceMappingURL=index.js.map