/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Lazily resolved type references
const $lazyTypes = [];

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.staticwebsite = (function() {

    /**
     * Namespace staticwebsite.
     * @exports staticwebsite
     * @namespace
     */
    const staticwebsite = {};

    staticwebsite.StaticEndpoint = (function() {

        /**
         * Constructs a new StaticEndpoint.
         * @exports staticwebsite.StaticEndpoint
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function StaticEndpoint(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
        }

        /**
         * StaticEndpoint path.
         * @type {string}
         */
        StaticEndpoint.prototype.path = "";

        /**
         * StaticEndpoint headers.
         * @type {Object.<string,string>}
         */
        StaticEndpoint.prototype.headers = $util.emptyObject;

        /**
         * StaticEndpoint body.
         * @type {Uint8Array}
         */
        StaticEndpoint.prototype.body = $util.newBuffer([]);

        /**
         * Creates a new StaticEndpoint instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {staticwebsite.StaticEndpoint} StaticEndpoint instance
         */
        StaticEndpoint.create = function create(properties) {
            return new StaticEndpoint(properties);
        };

        /**
         * Encodes the specified StaticEndpoint message.
         * @param {staticwebsite.StaticEndpoint|Object} message StaticEndpoint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StaticEndpoint.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.path !== undefined && message.hasOwnProperty("path"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.path);
            if (message.headers && message.hasOwnProperty("headers"))
                for (let keys = Object.keys(message.headers), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.headers[keys[i]]).ldelim();
            if (message.body && message.hasOwnProperty("body"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.body);
            return writer;
        };

        /**
         * Encodes the specified StaticEndpoint message, length delimited.
         * @param {staticwebsite.StaticEndpoint|Object} message StaticEndpoint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StaticEndpoint.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StaticEndpoint message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {staticwebsite.StaticEndpoint} StaticEndpoint
         */
        StaticEndpoint.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.staticwebsite.StaticEndpoint();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.path = reader.string();
                    break;
                case 2:
                    reader.skip().pos++;
                    if (message.headers === $util.emptyObject)
                        message.headers = {};
                    let key = reader.string();
                    reader.pos++;
                    message.headers[typeof key === "object" ? $util.longToHash(key) : key] = reader.string();
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
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {staticwebsite.StaticEndpoint} StaticEndpoint
         */
        StaticEndpoint.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StaticEndpoint message.
         * @param {staticwebsite.StaticEndpoint|Object} message StaticEndpoint message or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        StaticEndpoint.verify = function verify(message) {
            if (message.path !== undefined)
                if (!$util.isString(message.path))
                    return "path: string expected";
            if (message.headers !== undefined) {
                if (!$util.isObject(message.headers))
                    return "headers: object expected";
                let key = Object.keys(message.headers);
                for (let i = 0; i < key.length; ++i)
                    if (!$util.isString(message.headers[key[i]]))
                        return "headers: string{k:string} expected";
            }
            if (message.body !== undefined)
                if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                    return "body: buffer expected";
            return null;
        };

        /**
         * Creates a StaticEndpoint message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {staticwebsite.StaticEndpoint} StaticEndpoint
         */
        StaticEndpoint.fromObject = function fromObject(object) {
            if (object instanceof $root.staticwebsite.StaticEndpoint)
                return object;
            let message = new $root.staticwebsite.StaticEndpoint();
            if (object.path !== undefined && object.path !== null)
                message.path = String(object.path);
            if (object.headers) {
                if (typeof object.headers !== "object")
                    throw TypeError(".staticwebsite.StaticEndpoint.headers: object expected");
                message.headers = {};
                for (let keys = Object.keys(object.headers), i = 0; i < keys.length; ++i)
                    message.headers[keys[i]] = String(object.headers[keys[i]]);
            }
            if (object.body !== undefined && object.body !== null)
                if (typeof object.body === "string")
                    $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                else if (object.body.length)
                    message.body = object.body;
            return message;
        };

        /**
         * Creates a StaticEndpoint message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link staticwebsite.StaticEndpoint.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {staticwebsite.StaticEndpoint} StaticEndpoint
         */
        StaticEndpoint.from = StaticEndpoint.fromObject;

        /**
         * Creates a plain object from a StaticEndpoint message. Also converts values to other types if specified.
         * @param {staticwebsite.StaticEndpoint} message StaticEndpoint
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StaticEndpoint.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.objects || options.defaults)
                object.headers = {};
            if (options.defaults) {
                object.path = "";
                object.body = options.bytes === String ? "" : [];
            }
            if (message.path !== undefined && message.path !== null && message.hasOwnProperty("path"))
                object.path = message.path;
            if (message.headers !== undefined && message.headers !== null && message.hasOwnProperty("headers")) {
                object.headers = {};
                for (let keys2 = Object.keys(message.headers), j = 0; j < keys2.length; ++j)
                    object.headers[keys2[j]] = message.headers[keys2[j]];
            }
            if (message.body !== undefined && message.body !== null && message.hasOwnProperty("body"))
                object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
            return object;
        };

        /**
         * Creates a plain object from this StaticEndpoint message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StaticEndpoint.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this StaticEndpoint to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        StaticEndpoint.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StaticEndpoint;
    })();

    staticwebsite.StaticWebsite = (function() {

        /**
         * Constructs a new StaticWebsite.
         * @exports staticwebsite.StaticWebsite
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function StaticWebsite(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
        }

        /**
         * StaticWebsite endpoints.
         * @type {Array.<staticwebsite.StaticEndpoint>}
         */
        StaticWebsite.prototype.endpoints = $util.emptyArray;

        // Lazily resolved type references
        const $types = {
            0: "staticwebsite.StaticEndpoint"
        }; $lazyTypes.push($types);

        /**
         * Creates a new StaticWebsite instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {staticwebsite.StaticWebsite} StaticWebsite instance
         */
        StaticWebsite.create = function create(properties) {
            return new StaticWebsite(properties);
        };

        /**
         * Encodes the specified StaticWebsite message.
         * @param {staticwebsite.StaticWebsite|Object} message StaticWebsite message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StaticWebsite.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.endpoints !== undefined && message.hasOwnProperty("endpoints"))
                for (let i = 0; i < message.endpoints.length; ++i)
                    $types[0].encode(message.endpoints[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified StaticWebsite message, length delimited.
         * @param {staticwebsite.StaticWebsite|Object} message StaticWebsite message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StaticWebsite.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StaticWebsite message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {staticwebsite.StaticWebsite} StaticWebsite
         */
        StaticWebsite.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.staticwebsite.StaticWebsite();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.endpoints && message.endpoints.length))
                        message.endpoints = [];
                    message.endpoints.push($types[0].decode(reader, reader.uint32()));
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
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {staticwebsite.StaticWebsite} StaticWebsite
         */
        StaticWebsite.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StaticWebsite message.
         * @param {staticwebsite.StaticWebsite|Object} message StaticWebsite message or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        StaticWebsite.verify = function verify(message) {
            if (message.endpoints !== undefined) {
                if (!Array.isArray(message.endpoints))
                    return "endpoints: array expected";
                for (let i = 0; i < message.endpoints.length; ++i) {
                    let error = $types[0].verify(message.endpoints[i]);
                    if (error)
                        return "endpoints." + error;
                }
            }
            return null;
        };

        /**
         * Creates a StaticWebsite message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {staticwebsite.StaticWebsite} StaticWebsite
         */
        StaticWebsite.fromObject = function fromObject(object) {
            if (object instanceof $root.staticwebsite.StaticWebsite)
                return object;
            let message = new $root.staticwebsite.StaticWebsite();
            if (object.endpoints) {
                if (!Array.isArray(object.endpoints))
                    throw TypeError(".staticwebsite.StaticWebsite.endpoints: array expected");
                message.endpoints = [];
                for (let i = 0; i < object.endpoints.length; ++i) {
                    if (typeof object.endpoints[i] !== "object")
                        throw TypeError(".staticwebsite.StaticWebsite.endpoints: object expected");
                    message.endpoints[i] = $types[0].fromObject(object.endpoints[i]);
                }
            }
            return message;
        };

        /**
         * Creates a StaticWebsite message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link staticwebsite.StaticWebsite.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {staticwebsite.StaticWebsite} StaticWebsite
         */
        StaticWebsite.from = StaticWebsite.fromObject;

        /**
         * Creates a plain object from a StaticWebsite message. Also converts values to other types if specified.
         * @param {staticwebsite.StaticWebsite} message StaticWebsite
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StaticWebsite.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.endpoints = [];
            if (message.endpoints !== undefined && message.endpoints !== null && message.hasOwnProperty("endpoints")) {
                object.endpoints = [];
                for (let j = 0; j < message.endpoints.length; ++j)
                    object.endpoints[j] = $types[0].toObject(message.endpoints[j], options);
            }
            return object;
        };

        /**
         * Creates a plain object from this StaticWebsite message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StaticWebsite.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this StaticWebsite to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        StaticWebsite.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StaticWebsite;
    })();

    return staticwebsite;
})();

// Resolve lazy type references to actual types
$util.lazyResolve($root, $lazyTypes);

module.exports = $root;
