/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.staticwebsite = (function() {

    /**
     * Namespace staticwebsite.
     * @exports staticwebsite
     * @namespace
     */
    var staticwebsite = {};

    staticwebsite.StaticEndpoint = (function() {

        /**
         * Properties of a StaticEndpoint.
         * @memberof staticwebsite
         * @interface IStaticEndpoint
         * @property {string} [path] StaticEndpoint path
         * @property {Object.<string,string>} [headers] StaticEndpoint headers
         * @property {Uint8Array} [body] StaticEndpoint body
         */

        /**
         * Constructs a new StaticEndpoint.
         * @memberof staticwebsite
         * @classdesc Represents a StaticEndpoint.
         * @constructor
         * @param {staticwebsite.IStaticEndpoint=} [properties] Properties to set
         */
        function StaticEndpoint(properties) {
            this.headers = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StaticEndpoint path.
         * @member {string}path
         * @memberof staticwebsite.StaticEndpoint
         * @instance
         */
        StaticEndpoint.prototype.path = "";

        /**
         * StaticEndpoint headers.
         * @member {Object.<string,string>}headers
         * @memberof staticwebsite.StaticEndpoint
         * @instance
         */
        StaticEndpoint.prototype.headers = $util.emptyObject;

        /**
         * StaticEndpoint body.
         * @member {Uint8Array}body
         * @memberof staticwebsite.StaticEndpoint
         * @instance
         */
        StaticEndpoint.prototype.body = $util.newBuffer([]);

        /**
         * Creates a new StaticEndpoint instance using the specified properties.
         * @function create
         * @memberof staticwebsite.StaticEndpoint
         * @static
         * @param {staticwebsite.IStaticEndpoint=} [properties] Properties to set
         * @returns {staticwebsite.StaticEndpoint} StaticEndpoint instance
         */
        StaticEndpoint.create = function create(properties) {
            return new StaticEndpoint(properties);
        };

        /**
         * Encodes the specified StaticEndpoint message. Does not implicitly {@link staticwebsite.StaticEndpoint.verify|verify} messages.
         * @function encode
         * @memberof staticwebsite.StaticEndpoint
         * @static
         * @param {staticwebsite.IStaticEndpoint} message StaticEndpoint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StaticEndpoint.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.path != null && message.hasOwnProperty("path"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.path);
            if (message.headers != null && message.hasOwnProperty("headers"))
                for (var keys = Object.keys(message.headers), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.headers[keys[i]]).ldelim();
            if (message.body != null && message.hasOwnProperty("body"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.body);
            return writer;
        };

        /**
         * Encodes the specified StaticEndpoint message, length delimited. Does not implicitly {@link staticwebsite.StaticEndpoint.verify|verify} messages.
         * @function encodeDelimited
         * @memberof staticwebsite.StaticEndpoint
         * @static
         * @param {staticwebsite.IStaticEndpoint} message StaticEndpoint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StaticEndpoint.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StaticEndpoint message from the specified reader or buffer.
         * @function decode
         * @memberof staticwebsite.StaticEndpoint
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {staticwebsite.StaticEndpoint} StaticEndpoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StaticEndpoint.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.staticwebsite.StaticEndpoint(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.path = reader.string();
                    break;
                case 2:
                    reader.skip().pos++;
                    if (message.headers === $util.emptyObject)
                        message.headers = {};
                    key = reader.string();
                    reader.pos++;
                    message.headers[key] = reader.string();
                    break;
                case 3:
                    message.body = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StaticEndpoint message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof staticwebsite.StaticEndpoint
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {staticwebsite.StaticEndpoint} StaticEndpoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StaticEndpoint.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StaticEndpoint message.
         * @function verify
         * @memberof staticwebsite.StaticEndpoint
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StaticEndpoint.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.path != null && message.hasOwnProperty("path"))
                if (!$util.isString(message.path))
                    return "path: string expected";
            if (message.headers != null && message.hasOwnProperty("headers")) {
                if (!$util.isObject(message.headers))
                    return "headers: object expected";
                var key = Object.keys(message.headers);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.headers[key[i]]))
                        return "headers: string{k:string} expected";
            }
            if (message.body != null && message.hasOwnProperty("body"))
                if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                    return "body: buffer expected";
            return null;
        };

        /**
         * Creates a StaticEndpoint message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof staticwebsite.StaticEndpoint
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {staticwebsite.StaticEndpoint} StaticEndpoint
         */
        StaticEndpoint.fromObject = function fromObject(object) {
            if (object instanceof $root.staticwebsite.StaticEndpoint)
                return object;
            var message = new $root.staticwebsite.StaticEndpoint();
            if (object.path != null)
                message.path = String(object.path);
            if (object.headers) {
                if (typeof object.headers !== "object")
                    throw TypeError(".staticwebsite.StaticEndpoint.headers: object expected");
                message.headers = {};
                for (var keys = Object.keys(object.headers), i = 0; i < keys.length; ++i)
                    message.headers[keys[i]] = String(object.headers[keys[i]]);
            }
            if (object.body != null)
                if (typeof object.body === "string")
                    $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                else if (object.body.length)
                    message.body = object.body;
            return message;
        };

        /**
         * Creates a plain object from a StaticEndpoint message. Also converts values to other types if specified.
         * @function toObject
         * @memberof staticwebsite.StaticEndpoint
         * @static
         * @param {staticwebsite.StaticEndpoint} message StaticEndpoint
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StaticEndpoint.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.headers = {};
            if (options.defaults) {
                object.path = "";
                object.body = options.bytes === String ? "" : [];
            }
            if (message.path != null && message.hasOwnProperty("path"))
                object.path = message.path;
            var keys2;
            if (message.headers && (keys2 = Object.keys(message.headers)).length) {
                object.headers = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.headers[keys2[j]] = message.headers[keys2[j]];
            }
            if (message.body != null && message.hasOwnProperty("body"))
                object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
            return object;
        };

        /**
         * Converts this StaticEndpoint to JSON.
         * @function toJSON
         * @memberof staticwebsite.StaticEndpoint
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StaticEndpoint.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StaticEndpoint;
    })();

    staticwebsite.StaticWebsite = (function() {

        /**
         * Properties of a StaticWebsite.
         * @memberof staticwebsite
         * @interface IStaticWebsite
         * @property {Array.<staticwebsite.IStaticEndpoint>} [endpoints] StaticWebsite endpoints
         */

        /**
         * Constructs a new StaticWebsite.
         * @memberof staticwebsite
         * @classdesc Represents a StaticWebsite.
         * @constructor
         * @param {staticwebsite.IStaticWebsite=} [properties] Properties to set
         */
        function StaticWebsite(properties) {
            this.endpoints = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StaticWebsite endpoints.
         * @member {Array.<staticwebsite.IStaticEndpoint>}endpoints
         * @memberof staticwebsite.StaticWebsite
         * @instance
         */
        StaticWebsite.prototype.endpoints = $util.emptyArray;

        /**
         * Creates a new StaticWebsite instance using the specified properties.
         * @function create
         * @memberof staticwebsite.StaticWebsite
         * @static
         * @param {staticwebsite.IStaticWebsite=} [properties] Properties to set
         * @returns {staticwebsite.StaticWebsite} StaticWebsite instance
         */
        StaticWebsite.create = function create(properties) {
            return new StaticWebsite(properties);
        };

        /**
         * Encodes the specified StaticWebsite message. Does not implicitly {@link staticwebsite.StaticWebsite.verify|verify} messages.
         * @function encode
         * @memberof staticwebsite.StaticWebsite
         * @static
         * @param {staticwebsite.IStaticWebsite} message StaticWebsite message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StaticWebsite.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.endpoints != null && message.endpoints.length)
                for (var i = 0; i < message.endpoints.length; ++i)
                    $root.staticwebsite.StaticEndpoint.encode(message.endpoints[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified StaticWebsite message, length delimited. Does not implicitly {@link staticwebsite.StaticWebsite.verify|verify} messages.
         * @function encodeDelimited
         * @memberof staticwebsite.StaticWebsite
         * @static
         * @param {staticwebsite.IStaticWebsite} message StaticWebsite message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StaticWebsite.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StaticWebsite message from the specified reader or buffer.
         * @function decode
         * @memberof staticwebsite.StaticWebsite
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {staticwebsite.StaticWebsite} StaticWebsite
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StaticWebsite.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.staticwebsite.StaticWebsite();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.endpoints && message.endpoints.length))
                        message.endpoints = [];
                    message.endpoints.push($root.staticwebsite.StaticEndpoint.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StaticWebsite message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof staticwebsite.StaticWebsite
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {staticwebsite.StaticWebsite} StaticWebsite
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StaticWebsite.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StaticWebsite message.
         * @function verify
         * @memberof staticwebsite.StaticWebsite
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StaticWebsite.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.endpoints != null && message.hasOwnProperty("endpoints")) {
                if (!Array.isArray(message.endpoints))
                    return "endpoints: array expected";
                for (var i = 0; i < message.endpoints.length; ++i) {
                    var error = $root.staticwebsite.StaticEndpoint.verify(message.endpoints[i]);
                    if (error)
                        return "endpoints." + error;
                }
            }
            return null;
        };

        /**
         * Creates a StaticWebsite message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof staticwebsite.StaticWebsite
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {staticwebsite.StaticWebsite} StaticWebsite
         */
        StaticWebsite.fromObject = function fromObject(object) {
            if (object instanceof $root.staticwebsite.StaticWebsite)
                return object;
            var message = new $root.staticwebsite.StaticWebsite();
            if (object.endpoints) {
                if (!Array.isArray(object.endpoints))
                    throw TypeError(".staticwebsite.StaticWebsite.endpoints: array expected");
                message.endpoints = [];
                for (var i = 0; i < object.endpoints.length; ++i) {
                    if (typeof object.endpoints[i] !== "object")
                        throw TypeError(".staticwebsite.StaticWebsite.endpoints: object expected");
                    message.endpoints[i] = $root.staticwebsite.StaticEndpoint.fromObject(object.endpoints[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a StaticWebsite message. Also converts values to other types if specified.
         * @function toObject
         * @memberof staticwebsite.StaticWebsite
         * @static
         * @param {staticwebsite.StaticWebsite} message StaticWebsite
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StaticWebsite.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.endpoints = [];
            if (message.endpoints && message.endpoints.length) {
                object.endpoints = [];
                for (var j = 0; j < message.endpoints.length; ++j)
                    object.endpoints[j] = $root.staticwebsite.StaticEndpoint.toObject(message.endpoints[j], options);
            }
            return object;
        };

        /**
         * Converts this StaticWebsite to JSON.
         * @function toJSON
         * @memberof staticwebsite.StaticWebsite
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StaticWebsite.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StaticWebsite;
    })();

    return staticwebsite;
})();

module.exports = $root;
