var SWIPL = (() => {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
    return (
        function (SWIPL) {
            SWIPL = SWIPL || {};

            var Module = typeof SWIPL != "undefined" ? SWIPL : {};
            var readyPromiseResolve, readyPromiseReject;
            Module["ready"] = new Promise(function (resolve, reject) {
                readyPromiseResolve = resolve;
                readyPromiseReject = reject
            });
            if (!Module.expectedDataFileDownloads) {
                Module.expectedDataFileDownloads = 0
            }
            Module.expectedDataFileDownloads++;
            (function () {
                if (Module["ENVIRONMENT_IS_PTHREAD"]) return;
                var loadPackage = function (metadata) {
                    var PACKAGE_PATH = "";
                    if (typeof window === "object") {
                        PACKAGE_PATH = window["encodeURIComponent"](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/")
                    } else if (typeof process === "undefined" && typeof location !== "undefined") {
                        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/")
                    }
                    var PACKAGE_NAME = "src/swipl-web.data";
                    var REMOTE_PACKAGE_BASE = "swipl-web.data";
                    if (typeof Module["locateFilePackage"] === "function" && !Module["locateFile"]) {
                        Module["locateFile"] = Module["locateFilePackage"];
                        err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")
                    }
                    var REMOTE_PACKAGE_NAME = Module["locateFile"] ? Module["locateFile"](REMOTE_PACKAGE_BASE, "") : REMOTE_PACKAGE_BASE;
                    var REMOTE_PACKAGE_SIZE = metadata["remote_package_size"];

                    function fetchRemotePackage(packageName, packageSize, callback, errback) {
                        if (typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string") {
                            require("fs").readFile(packageName, function (err, contents) {
                                if (err) {
                                    errback(err)
                                } else {
                                    callback(contents.buffer)
                                }
                            });
                            return
                        }
                        var xhr = new XMLHttpRequest;
                        xhr.open("GET", packageName, true);
                        xhr.responseType = "arraybuffer";
                        xhr.onprogress = function (event) {
                            var url = packageName;
                            var size = packageSize;
                            if (event.total) size = event.total;
                            if (event.loaded) {
                                if (!xhr.addedTotal) {
                                    xhr.addedTotal = true;
                                    if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
                                    Module.dataFileDownloads[url] = {loaded: event.loaded, total: size}
                                } else {
                                    Module.dataFileDownloads[url].loaded = event.loaded
                                }
                                var total = 0;
                                var loaded = 0;
                                var num = 0;
                                for (var download in Module.dataFileDownloads) {
                                    var data = Module.dataFileDownloads[download];
                                    total += data.total;
                                    loaded += data.loaded;
                                    num++
                                }
                                total = Math.ceil(total * Module.expectedDataFileDownloads / num);
                                if (Module["setStatus"]) Module["setStatus"]("Downloading data... (" + loaded + "/" + total + ")")
                            } else if (!Module.dataFileDownloads) {
                                if (Module["setStatus"]) Module["setStatus"]("Downloading data...")
                            }
                        };
                        xhr.onerror = function (event) {
                            throw new Error("NetworkError for: " + packageName)
                        };
                        xhr.onload = function (event) {
                            if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || xhr.status == 0 && xhr.response) {
                                var packageData = xhr.response;
                                callback(packageData)
                            } else {
                                throw new Error(xhr.statusText + " : " + xhr.responseURL)
                            }
                        };
                        xhr.send(null)
                    }

                    function handleError(error) {
                        console.error("package error:", error)
                    }

                    var fetchedCallback = null;
                    var fetched = Module["getPreloadedPackage"] ? Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;
                    if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function (data) {
                        if (fetchedCallback) {
                            fetchedCallback(data);
                            fetchedCallback = null
                        } else {
                            fetched = data
                        }
                    }, handleError);

                    function runWithFS() {
                        function assert(check, msg) {
                            if (!check) throw msg + (new Error).stack
                        }

                        Module["FS_createPath"]("/", "swipl", true, true);
                        Module["FS_createPath"]("/swipl", "library", true, true);
                        Module["FS_createPath"]("/swipl/library", "iri_scheme", true, true);
                        Module["FS_createPath"]("/swipl/library", "http", true, true);
                        Module["FS_createPath"]("/swipl/library", "chr", true, true);
                        Module["FS_createPath"]("/swipl/library", "theme", true, true);
                        Module["FS_createPath"]("/swipl/library", "DTD", true, true);
                        Module["FS_createPath"]("/swipl/library", "lynx", true, true);
                        Module["FS_createPath"]("/swipl/library", "clp", true, true);
                        Module["FS_createPath"]("/swipl/library/clp", "clpqr", true, true);
                        Module["FS_createPath"]("/swipl/library/clp", "clpq", true, true);
                        Module["FS_createPath"]("/swipl/library/clp", "clpr", true, true);
                        Module["FS_createPath"]("/swipl/library", "dcg", true, true);
                        Module["FS_createPath"]("/swipl/library", "unicode", true, true);
                        Module["FS_createPath"]("/swipl/library", "build", true, true);
                        Module["FS_createPath"]("/swipl/library", "dialect", true, true);
                        Module["FS_createPath"]("/swipl/library/dialect", "swi", true, true);
                        Module["FS_createPath"]("/swipl/library/dialect", "xsb", true, true);
                        Module["FS_createPath"]("/swipl/library/dialect", "sicstus4", true, true);
                        Module["FS_createPath"]("/swipl/library/dialect", "eclipse", true, true);
                        Module["FS_createPath"]("/swipl/library/dialect", "yap", true, true);
                        Module["FS_createPath"]("/swipl/library/dialect", "sicstus", true, true);
                        Module["FS_createPath"]("/swipl/library/dialect", "hprolog", true, true);
                        Module["FS_createPath"]("/swipl/library/dialect", "iso", true, true);
                        Module["FS_createPath"]("/swipl/library", "semweb", true, true);

                        function DataRequest(start, end, audio) {
                            this.start = start;
                            this.end = end;
                            this.audio = audio
                        }

                        DataRequest.prototype = {
                            requests: {}, open: function (mode, name) {
                                this.name = name;
                                this.requests[name] = this;
                                Module["addRunDependency"]("fp " + this.name)
                            }, send: function () {
                            }, onload: function () {
                                var byteArray = this.byteArray.subarray(this.start, this.end);
                                this.finish(byteArray)
                            }, finish: function (byteArray) {
                                var that = this;
                                Module["FS_createDataFile"](this.name, null, byteArray, true, true, true);
                                Module["removeRunDependency"]("fp " + that.name);
                                this.requests[this.name] = null
                            }
                        };
                        var files = metadata["files"];
                        for (var i = 0; i < files.length; ++i) {
                            new DataRequest(files[i]["start"], files[i]["end"], files[i]["audio"] || 0).open("GET", files[i]["filename"])
                        }

                        function processPackageData(arrayBuffer) {
                            assert(arrayBuffer, "Loading data file failed.");
                            assert(arrayBuffer instanceof ArrayBuffer, "bad input to processPackageData");
                            var byteArray = new Uint8Array(arrayBuffer);
                            DataRequest.prototype.byteArray = byteArray;
                            var files = metadata["files"];
                            for (var i = 0; i < files.length; ++i) {
                                DataRequest.prototype.requests[files[i].filename].onload()
                            }
                            Module["removeRunDependency"]("datafile_src/swipl-web.data")
                        }

                        Module["addRunDependency"]("datafile_src/swipl-web.data");
                        if (!Module.preloadResults) Module.preloadResults = {};
                        Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
                        if (fetched) {
                            processPackageData(fetched);
                            fetched = null
                        } else {
                            fetchedCallback = processPackageData
                        }
                    }

                    if (Module["calledRun"]) {
                        runWithFS()
                    } else {
                        if (!Module["preRun"]) Module["preRun"] = [];
                        Module["preRun"].push(runWithFS)
                    }
                };
                loadPackage({
                    "files": [{
                        "filename": "/swipl/boot.prc",
                        "start": 0,
                        "end": 106609
                    }, {
                        "filename": "/swipl/library/predicate_options.pl",
                        "start": 106609,
                        "end": 137651
                    }, {
                        "filename": "/swipl/library/coinduction.pl",
                        "start": 137651,
                        "end": 143711
                    }, {
                        "filename": "/swipl/library/sort.pl",
                        "start": 143711,
                        "end": 147531
                    }, {
                        "filename": "/swipl/library/test_wizard.pl",
                        "start": 147531,
                        "end": 155521
                    }, {
                        "filename": "/swipl/library/readutil.pl",
                        "start": 155521,
                        "end": 166611
                    }, {
                        "filename": "/swipl/library/portray_text.pl",
                        "start": 166611,
                        "end": 175353
                    }, {
                        "filename": "/swipl/library/prolog_source.pl",
                        "start": 175353,
                        "end": 212117
                    }, {
                        "filename": "/swipl/library/settings.pl",
                        "start": 212117,
                        "end": 236081
                    }, {
                        "filename": "/swipl/library/snowball.pl",
                        "start": 236081,
                        "end": 239679
                    }, {
                        "filename": "/swipl/library/obfuscate.pl",
                        "start": 239679,
                        "end": 243801
                    }, {
                        "filename": "/swipl/library/prolog_breakpoints.pl",
                        "start": 243801,
                        "end": 258170
                    }, {
                        "filename": "/swipl/library/main.pl",
                        "start": 258170,
                        "end": 288734
                    }, {
                        "filename": "/swipl/library/rdf.pl",
                        "start": 288734,
                        "end": 302732
                    }, {
                        "filename": "/swipl/library/fastrw.pl",
                        "start": 302732,
                        "end": 307121
                    }, {
                        "filename": "/swipl/library/varnumbers.pl",
                        "start": 307121,
                        "end": 314262
                    }, {
                        "filename": "/swipl/library/ctypes.pl",
                        "start": 314262,
                        "end": 319284
                    }, {
                        "filename": "/swipl/library/prolog_codewalk.pl",
                        "start": 319284,
                        "end": 361209
                    }, {
                        "filename": "/swipl/library/prolog_autoload.pl",
                        "start": 361209,
                        "end": 369758
                    }, {
                        "filename": "/swipl/library/quintus.pl",
                        "start": 369758,
                        "end": 382851
                    }, {
                        "filename": "/swipl/library/utf8.pl",
                        "start": 382851,
                        "end": 387456
                    }, {
                        "filename": "/swipl/library/chr.pl",
                        "start": 387456,
                        "end": 405703
                    }, {
                        "filename": "/swipl/library/check.pl",
                        "start": 405703,
                        "end": 439200
                    }, {
                        "filename": "/swipl/library/ordsets.pl",
                        "start": 439200,
                        "end": 455752
                    }, {
                        "filename": "/swipl/library/writef.pl",
                        "start": 455752,
                        "end": 465673
                    }, {
                        "filename": "/swipl/library/double_metaphone.pl",
                        "start": 465673,
                        "end": 469331
                    }, {
                        "filename": "/swipl/library/apply.pl",
                        "start": 469331,
                        "end": 483127
                    }, {
                        "filename": "/swipl/library/heaps.pl",
                        "start": 483127,
                        "end": 491404
                    }, {
                        "filename": "/swipl/library/ugraphs.pl",
                        "start": 491404,
                        "end": 511922
                    }, {
                        "filename": "/swipl/library/sgml_write.pl",
                        "start": 511922,
                        "end": 542367
                    }, {
                        "filename": "/swipl/library/tty.pl",
                        "start": 542367,
                        "end": 551642
                    }, {
                        "filename": "/swipl/library/files.pl",
                        "start": 551642,
                        "end": 554399
                    }, {
                        "filename": "/swipl/library/optparse.pl",
                        "start": 554399,
                        "end": 592166
                    }, {
                        "filename": "/swipl/library/atom.pl",
                        "start": 592166,
                        "end": 597588
                    }, {
                        "filename": "/swipl/library/c14n2.pl",
                        "start": 597588,
                        "end": 605657
                    }, {
                        "filename": "/swipl/library/prolog_deps.pl",
                        "start": 605657,
                        "end": 622840
                    }, {
                        "filename": "/swipl/library/gensym.pl",
                        "start": 622840,
                        "end": 626854
                    }, {
                        "filename": "/swipl/library/prolog_install.pl",
                        "start": 626854,
                        "end": 632636
                    }, {
                        "filename": "/swipl/library/wasm.pl",
                        "start": 632636,
                        "end": 646831
                    }, {
                        "filename": "/swipl/library/isub.pl",
                        "start": 646831,
                        "end": 653498
                    }, {
                        "filename": "/swipl/library/yall.pl",
                        "start": 653498,
                        "end": 673008
                    }, {
                        "filename": "/swipl/library/qsave.pl",
                        "start": 673008,
                        "end": 714907
                    }, {
                        "filename": "/swipl/library/sgml.pl",
                        "start": 714907,
                        "end": 740965
                    }, {
                        "filename": "/swipl/library/occurs.pl",
                        "start": 740965,
                        "end": 747796
                    }, {
                        "filename": "/swipl/library/aggregate.pl",
                        "start": 747796,
                        "end": 772181
                    }, {
                        "filename": "/swipl/library/hotfix.pl",
                        "start": 772181,
                        "end": 780063
                    }, {
                        "filename": "/swipl/library/git.pl",
                        "start": 780063,
                        "end": 808067
                    }, {
                        "filename": "/swipl/library/debug.pl",
                        "start": 808067,
                        "end": 821471
                    }, {
                        "filename": "/swipl/library/rdf_parser.pl",
                        "start": 821471,
                        "end": 841078
                    }, {
                        "filename": "/swipl/library/nb_set.pl",
                        "start": 841078,
                        "end": 846744
                    }, {
                        "filename": "/swipl/library/dicts.pl",
                        "start": 846744,
                        "end": 857400
                    }, {
                        "filename": "/swipl/library/zip.pl",
                        "start": 857400,
                        "end": 865041
                    }, {
                        "filename": "/swipl/library/prolog_clause.pl",
                        "start": 865041,
                        "end": 901013
                    }, {
                        "filename": "/swipl/library/persistency.pl",
                        "start": 901013,
                        "end": 922932
                    }, {
                        "filename": "/swipl/library/vm.pl",
                        "start": 922932,
                        "end": 931057
                    }, {
                        "filename": "/swipl/library/prolog_pack.pl",
                        "start": 931057,
                        "end": 1008360
                    }, {
                        "filename": "/swipl/library/prolog_code.pl",
                        "start": 1008360,
                        "end": 1020621
                    }, {
                        "filename": "/swipl/library/explain.pl",
                        "start": 1020621,
                        "end": 1034863
                    }, {
                        "filename": "/swipl/library/solution_sequences.pl",
                        "start": 1034863,
                        "end": 1047115
                    }, {
                        "filename": "/swipl/library/uri.pl",
                        "start": 1047115,
                        "end": 1060198
                    }, {
                        "filename": "/swipl/library/checkselect.pl",
                        "start": 1060198,
                        "end": 1063393
                    }, {
                        "filename": "/swipl/library/operators.pl",
                        "start": 1063393,
                        "end": 1068637
                    }, {
                        "filename": "/swipl/library/porter_stem.pl",
                        "start": 1068637,
                        "end": 1070776
                    }, {
                        "filename": "/swipl/library/nb_rbtrees.pl",
                        "start": 1070776,
                        "end": 1078714
                    }, {
                        "filename": "/swipl/library/prolog_xref.qlf",
                        "start": 1078714,
                        "end": 1115467
                    }, {
                        "filename": "/swipl/library/pprint.pl",
                        "start": 1115467,
                        "end": 1143691
                    }, {
                        "filename": "/swipl/library/arithmetic.pl",
                        "start": 1143691,
                        "end": 1152777
                    }, {
                        "filename": "/swipl/library/xpath.pl",
                        "start": 1152777,
                        "end": 1171356
                    }, {
                        "filename": "/swipl/library/filesex.pl",
                        "start": 1171356,
                        "end": 1191027
                    }, {
                        "filename": "/swipl/library/crypt.pl",
                        "start": 1191027,
                        "end": 1192829
                    }, {
                        "filename": "/swipl/library/www_browser.pl",
                        "start": 1192829,
                        "end": 1201129
                    }, {
                        "filename": "/swipl/library/ansi_term.pl",
                        "start": 1201129,
                        "end": 1219895
                    }, {
                        "filename": "/swipl/library/edit.pl",
                        "start": 1219895,
                        "end": 1239008
                    }, {
                        "filename": "/swipl/library/iostream.pl",
                        "start": 1239008,
                        "end": 1247785
                    }, {
                        "filename": "/swipl/library/rewrite_term.pl",
                        "start": 1247785,
                        "end": 1252745
                    }, {
                        "filename": "/swipl/library/memfile.pl",
                        "start": 1252745,
                        "end": 1255758
                    }, {
                        "filename": "/swipl/library/shell.pl",
                        "start": 1255758,
                        "end": 1266463
                    }, {
                        "filename": "/swipl/library/when.pl",
                        "start": 1266463,
                        "end": 1274220
                    }, {
                        "filename": "/swipl/library/pio.pl",
                        "start": 1274220,
                        "end": 1276147
                    }, {
                        "filename": "/swipl/library/quasi_quotations.pl",
                        "start": 1276147,
                        "end": 1287533
                    }, {
                        "filename": "/swipl/library/prolog_xref.pl",
                        "start": 1287533,
                        "end": 1381270
                    }, {
                        "filename": "/swipl/library/check_installation.pl",
                        "start": 1381270,
                        "end": 1407775
                    }, {
                        "filename": "/swipl/library/base64.pl",
                        "start": 1407775,
                        "end": 1420420
                    }, {
                        "filename": "/swipl/library/sha.pl",
                        "start": 1420420,
                        "end": 1426156
                    }, {
                        "filename": "/swipl/library/error.pl",
                        "start": 1426156,
                        "end": 1442032
                    }, {
                        "filename": "/swipl/library/date.pl",
                        "start": 1442032,
                        "end": 1451484
                    }, {
                        "filename": "/swipl/library/prolog_colour.qlf",
                        "start": 1451484,
                        "end": 1496870
                    }, {
                        "filename": "/swipl/library/prolog_config.pl",
                        "start": 1496870,
                        "end": 1501678
                    }, {
                        "filename": "/swipl/library/increval.pl",
                        "start": 1501678,
                        "end": 1508982
                    }, {
                        "filename": "/swipl/library/codesio.pl",
                        "start": 1508982,
                        "end": 1515431
                    }, {
                        "filename": "/swipl/library/rbtrees.pl",
                        "start": 1515431,
                        "end": 1552828
                    }, {
                        "filename": "/swipl/library/prolog_versions.pl",
                        "start": 1552828,
                        "end": 1559753
                    }, {
                        "filename": "/swipl/library/prolog_stream.pl",
                        "start": 1559753,
                        "end": 1563401
                    }, {
                        "filename": "/swipl/library/wfs.pl",
                        "start": 1563401,
                        "end": 1570322
                    }, {
                        "filename": "/swipl/library/listing.pl",
                        "start": 1570322,
                        "end": 1608481
                    }, {
                        "filename": "/swipl/library/broadcast.pl",
                        "start": 1608481,
                        "end": 1613836
                    }, {
                        "filename": "/swipl/library/random.pl",
                        "start": 1613836,
                        "end": 1627285
                    }, {
                        "filename": "/swipl/library/sandbox.pl",
                        "start": 1627285,
                        "end": 1670072
                    }, {
                        "filename": "/swipl/library/make.pl",
                        "start": 1670072,
                        "end": 1676797
                    }, {
                        "filename": "/swipl/library/oset.pl",
                        "start": 1676797,
                        "end": 1681490
                    }, {
                        "filename": "/swipl/library/modules.pl",
                        "start": 1681490,
                        "end": 1686339
                    }, {
                        "filename": "/swipl/library/intercept.pl",
                        "start": 1686339,
                        "end": 1694961
                    }, {
                        "filename": "/swipl/library/prolog_colour.pl",
                        "start": 1694961,
                        "end": 1798320
                    }, {
                        "filename": "/swipl/library/strings.pl",
                        "start": 1798320,
                        "end": 1813868
                    }, {
                        "filename": "/swipl/library/hashtable.pl",
                        "start": 1813868,
                        "end": 1824192
                    }, {
                        "filename": "/swipl/library/url.pl",
                        "start": 1824192,
                        "end": 1852345
                    }, {
                        "filename": "/swipl/library/record.pl",
                        "start": 1852345,
                        "end": 1868953
                    }, {
                        "filename": "/swipl/library/prolog_format.pl",
                        "start": 1868953,
                        "end": 1875816
                    }, {
                        "filename": "/swipl/library/qpforeign.pl",
                        "start": 1875816,
                        "end": 1898121
                    }, {
                        "filename": "/swipl/library/tabling.pl",
                        "start": 1898121,
                        "end": 1899921
                    }, {
                        "filename": "/swipl/library/prolog_debug.pl",
                        "start": 1899921,
                        "end": 1908883
                    }, {
                        "filename": "/swipl/library/dif.pl",
                        "start": 1908883,
                        "end": 1921525
                    }, {
                        "filename": "/swipl/library/threadutil.pl",
                        "start": 1921525,
                        "end": 1936828
                    }, {
                        "filename": "/swipl/library/assoc.pl",
                        "start": 1936828,
                        "end": 1955155
                    }, {
                        "filename": "/swipl/library/prolog_wrap.pl",
                        "start": 1955155,
                        "end": 1960559
                    }, {
                        "filename": "/swipl/library/iso_639.pl",
                        "start": 1960559,
                        "end": 1975236
                    }, {
                        "filename": "/swipl/library/prolog_trace.pl",
                        "start": 1975236,
                        "end": 1982895
                    }, {
                        "filename": "/swipl/library/charsio.pl",
                        "start": 1982895,
                        "end": 1989531
                    }, {
                        "filename": "/swipl/library/pure_input.pl",
                        "start": 1989531,
                        "end": 1999406
                    }, {
                        "filename": "/swipl/library/base32.pl",
                        "start": 1999406,
                        "end": 2007699
                    }, {
                        "filename": "/swipl/library/apply_macros.pl",
                        "start": 2007699,
                        "end": 2022582
                    }, {
                        "filename": "/swipl/library/prolog_jiti.pl",
                        "start": 2022582,
                        "end": 2027767
                    }, {
                        "filename": "/swipl/library/system.pl",
                        "start": 2027767,
                        "end": 2031075
                    }, {
                        "filename": "/swipl/library/thread.pl",
                        "start": 2031075,
                        "end": 2058634
                    }, {
                        "filename": "/swipl/library/csv.pl",
                        "start": 2058634,
                        "end": 2077551
                    }, {
                        "filename": "/swipl/library/md5.pl",
                        "start": 2077551,
                        "end": 2080213
                    }, {
                        "filename": "/swipl/library/zlib.pl",
                        "start": 2080213,
                        "end": 2084346
                    }, {
                        "filename": "/swipl/library/test_cover.pl",
                        "start": 2084346,
                        "end": 2103707
                    }, {
                        "filename": "/swipl/library/prolog_metainference.pl",
                        "start": 2103707,
                        "end": 2113521
                    }, {
                        "filename": "/swipl/library/dialect.pl",
                        "start": 2113521,
                        "end": 2117614
                    }, {
                        "filename": "/swipl/library/pwp.pl",
                        "start": 2117614,
                        "end": 2142553
                    }, {
                        "filename": "/swipl/library/dom.pl",
                        "start": 2142553,
                        "end": 2147386
                    }, {
                        "filename": "/swipl/library/backcomp.pl",
                        "start": 2147386,
                        "end": 2167283
                    }, {
                        "filename": "/swipl/library/terms.pl",
                        "start": 2167283,
                        "end": 2181976
                    }, {
                        "filename": "/swipl/library/edinburgh.pl",
                        "start": 2181976,
                        "end": 2186481
                    }, {
                        "filename": "/swipl/library/INDEX.pl",
                        "start": 2186481,
                        "end": 2238468
                    }, {
                        "filename": "/swipl/library/readln.pl",
                        "start": 2238468,
                        "end": 2247395
                    }, {
                        "filename": "/swipl/library/prolog_stack.pl",
                        "start": 2247395,
                        "end": 2273256
                    }, {
                        "filename": "/swipl/library/tables.pl",
                        "start": 2273256,
                        "end": 2285867
                    }, {
                        "filename": "/swipl/library/statistics.pl",
                        "start": 2285867,
                        "end": 2310437
                    }, {
                        "filename": "/swipl/library/pairs.pl",
                        "start": 2310437,
                        "end": 2316301
                    }, {
                        "filename": "/swipl/library/.created",
                        "start": 2316301,
                        "end": 2316301
                    }, {
                        "filename": "/swipl/library/plunit.pl",
                        "start": 2316301,
                        "end": 2371137
                    }, {
                        "filename": "/swipl/library/prolog_history.pl",
                        "start": 2371137,
                        "end": 2377002
                    }, {
                        "filename": "/swipl/library/rdf_write.pl",
                        "start": 2377002,
                        "end": 2398775
                    }, {
                        "filename": "/swipl/library/lazy_lists.pl",
                        "start": 2398775,
                        "end": 2415275
                    }, {
                        "filename": "/swipl/library/checklast.pl",
                        "start": 2415275,
                        "end": 2418531
                    }, {
                        "filename": "/swipl/library/rdf_triple.pl",
                        "start": 2418531,
                        "end": 2431129
                    }, {
                        "filename": "/swipl/library/xsdp_types.pl",
                        "start": 2431129,
                        "end": 2439720
                    }, {
                        "filename": "/swipl/library/lists.pl",
                        "start": 2439720,
                        "end": 2463998
                    }, {
                        "filename": "/swipl/library/console_input.pl",
                        "start": 2463998,
                        "end": 2467685
                    }, {
                        "filename": "/swipl/library/thread_pool.pl",
                        "start": 2467685,
                        "end": 2484566
                    }, {
                        "filename": "/swipl/library/hash_stream.pl",
                        "start": 2484566,
                        "end": 2489353
                    }, {
                        "filename": "/swipl/library/option.pl",
                        "start": 2489353,
                        "end": 2501967
                    }, {
                        "filename": "/swipl/library/iri_scheme/file.pl",
                        "start": 2501967,
                        "end": 2504792
                    }, {
                        "filename": "/swipl/library/iri_scheme/.created",
                        "start": 2504792,
                        "end": 2504792
                    }, {
                        "filename": "/swipl/library/http/json.pl",
                        "start": 2504792,
                        "end": 2540046
                    }, {
                        "filename": "/swipl/library/http/term_html.pl",
                        "start": 2540046,
                        "end": 2563630
                    }, {
                        "filename": "/swipl/library/http/mimetype.pl",
                        "start": 2563630,
                        "end": 2573719
                    }, {
                        "filename": "/swipl/library/http/html_head.pl",
                        "start": 2573719,
                        "end": 2594461
                    }, {
                        "filename": "/swipl/library/http/http_stream.pl",
                        "start": 2594461,
                        "end": 2607945
                    }, {
                        "filename": "/swipl/library/http/html_quasiquotations.pl",
                        "start": 2607945,
                        "end": 2612168
                    }, {
                        "filename": "/swipl/library/http/json_convert.pl",
                        "start": 2612168,
                        "end": 2634148
                    }, {
                        "filename": "/swipl/library/http/http_path.pl",
                        "start": 2634148,
                        "end": 2646336
                    }, {
                        "filename": "/swipl/library/http/INDEX.pl",
                        "start": 2646336,
                        "end": 2649162
                    }, {
                        "filename": "/swipl/library/http/.created",
                        "start": 2649162,
                        "end": 2649162
                    }, {
                        "filename": "/swipl/library/http/html_write.pl",
                        "start": 2649162,
                        "end": 2696905
                    }, {
                        "filename": "/swipl/library/chr/chr_op.pl",
                        "start": 2696905,
                        "end": 2699039
                    }, {
                        "filename": "/swipl/library/chr/pairlist.pl",
                        "start": 2699039,
                        "end": 2700409
                    }, {
                        "filename": "/swipl/library/chr/chr_integertable_store.pl",
                        "start": 2700409,
                        "end": 2704237
                    }, {
                        "filename": "/swipl/library/chr/chr_compiler_errors.pl",
                        "start": 2704237,
                        "end": 2710639
                    }, {
                        "filename": "/swipl/library/chr/builtins.pl",
                        "start": 2710639,
                        "end": 2734272
                    }, {
                        "filename": "/swipl/library/chr/chr_hashtable_store.pl",
                        "start": 2734272,
                        "end": 2743983
                    }, {
                        "filename": "/swipl/library/chr/chr_runtime.pl",
                        "start": 2743983,
                        "end": 2771446
                    }, {
                        "filename": "/swipl/library/chr/listmap.pl",
                        "start": 2771446,
                        "end": 2774212
                    }, {
                        "filename": "/swipl/library/chr/a_star.pl",
                        "start": 2774212,
                        "end": 2777011
                    }, {
                        "filename": "/swipl/library/chr/find.pl",
                        "start": 2777011,
                        "end": 2779739
                    }, {
                        "filename": "/swipl/library/chr/chr_compiler_options.pl",
                        "start": 2779739,
                        "end": 2793107
                    }, {
                        "filename": "/swipl/library/chr/binomialheap.pl",
                        "start": 2793107,
                        "end": 2796686
                    }, {
                        "filename": "/swipl/library/chr/chr_compiler_utility.pl",
                        "start": 2796686,
                        "end": 2805369
                    }, {
                        "filename": "/swipl/library/chr/chr_debug.pl",
                        "start": 2805369,
                        "end": 2807596
                    }, {
                        "filename": "/swipl/library/chr/guard_entailment.pl",
                        "start": 2807596,
                        "end": 3562328
                    }, {
                        "filename": "/swipl/library/chr/clean_code.pl",
                        "start": 3562328,
                        "end": 3569042
                    }, {
                        "filename": "/swipl/library/chr/chr_messages.pl",
                        "start": 3569042,
                        "end": 3573233
                    }, {
                        "filename": "/swipl/library/chr/chr_translate.pl",
                        "start": 3573233,
                        "end": 4447080
                    }, {
                        "filename": "/swipl/library/chr/.created",
                        "start": 4447080,
                        "end": 4447080
                    }, {
                        "filename": "/swipl/library/theme/auto.pl",
                        "start": 4447080,
                        "end": 4449305
                    }, {
                        "filename": "/swipl/library/theme/dark.pl",
                        "start": 4449305,
                        "end": 4461209
                    }, {
                        "filename": "/swipl/library/theme/.created",
                        "start": 4461209,
                        "end": 4461209
                    }, {
                        "filename": "/swipl/library/DTD/HTML5.dtd",
                        "start": 4461209,
                        "end": 4478418
                    }, {
                        "filename": "/swipl/library/DTD/HTMLsym.ent",
                        "start": 4478418,
                        "end": 4492864
                    }, {
                        "filename": "/swipl/library/DTD/HTMLlat1.ent",
                        "start": 4492864,
                        "end": 4504887
                    }, {
                        "filename": "/swipl/library/DTD/HTML4.dcl",
                        "start": 4504887,
                        "end": 4507765
                    }, {
                        "filename": "/swipl/library/DTD/HTML4.soc",
                        "start": 4507765,
                        "end": 4507989
                    }, {
                        "filename": "/swipl/library/DTD/HTML4.dtd",
                        "start": 4507989,
                        "end": 4553632
                    }, {
                        "filename": "/swipl/library/DTD/HTMLspec.ent",
                        "start": 4553632,
                        "end": 4557748
                    }, {
                        "filename": "/swipl/library/DTD/.created",
                        "start": 4557748,
                        "end": 4557748
                    }, {
                        "filename": "/swipl/library/lynx/html_text.pl",
                        "start": 4557748,
                        "end": 4582486
                    }, {
                        "filename": "/swipl/library/lynx/format.pl",
                        "start": 4582486,
                        "end": 4593277
                    }, {
                        "filename": "/swipl/library/lynx/html_style.pl",
                        "start": 4593277,
                        "end": 4597758
                    }, {
                        "filename": "/swipl/library/lynx/pldoc_style.pl",
                        "start": 4597758,
                        "end": 4601003
                    }, {
                        "filename": "/swipl/library/lynx/INDEX.pl",
                        "start": 4601003,
                        "end": 4601527
                    }, {
                        "filename": "/swipl/library/lynx/.created",
                        "start": 4601527,
                        "end": 4601527
                    }, {
                        "filename": "/swipl/library/clp/clpr.pl",
                        "start": 4601527,
                        "end": 4605443
                    }, {
                        "filename": "/swipl/library/clp/clp_distinct.pl",
                        "start": 4605443,
                        "end": 4612041
                    }, {
                        "filename": "/swipl/library/clp/bounds.pl",
                        "start": 4612041,
                        "end": 4651350
                    }, {
                        "filename": "/swipl/library/clp/clpq.pl",
                        "start": 4651350,
                        "end": 4654853
                    }, {
                        "filename": "/swipl/library/clp/simplex.pl",
                        "start": 4654853,
                        "end": 4708258
                    }, {
                        "filename": "/swipl/library/clp/clpb.pl",
                        "start": 4708258,
                        "end": 4774310
                    }, {
                        "filename": "/swipl/library/clp/clp_events.pl",
                        "start": 4774310,
                        "end": 4777022
                    }, {
                        "filename": "/swipl/library/clp/INDEX.pl",
                        "start": 4777022,
                        "end": 4782350
                    }, {
                        "filename": "/swipl/library/clp/.created",
                        "start": 4782350,
                        "end": 4782350
                    }, {
                        "filename": "/swipl/library/clp/clpfd.pl",
                        "start": 4782350,
                        "end": 5059204
                    }, {
                        "filename": "/swipl/library/clp/clpqr/ordering.pl",
                        "start": 5059204,
                        "end": 5064151
                    }, {
                        "filename": "/swipl/library/clp/clpqr/itf.pl",
                        "start": 5064151,
                        "end": 5068022
                    }, {
                        "filename": "/swipl/library/clp/clpqr/geler.pl",
                        "start": 5068022,
                        "end": 5073593
                    }, {
                        "filename": "/swipl/library/clp/clpqr/highlight.pl",
                        "start": 5073593,
                        "end": 5076682
                    }, {
                        "filename": "/swipl/library/clp/clpqr/redund.pl",
                        "start": 5076682,
                        "end": 5084129
                    }, {
                        "filename": "/swipl/library/clp/clpqr/dump.pl",
                        "start": 5084129,
                        "end": 5091038
                    }, {
                        "filename": "/swipl/library/clp/clpqr/class.pl",
                        "start": 5091038,
                        "end": 5095908
                    }, {
                        "filename": "/swipl/library/clp/clpqr/project.pl",
                        "start": 5095908,
                        "end": 5103634
                    }, {
                        "filename": "/swipl/library/clp/clpqr/.created",
                        "start": 5103634,
                        "end": 5103634
                    }, {
                        "filename": "/swipl/library/clp/clpq/nf_q.pl",
                        "start": 5103634,
                        "end": 5128829
                    }, {
                        "filename": "/swipl/library/clp/clpq/itf_q.pl",
                        "start": 5128829,
                        "end": 5135175
                    }, {
                        "filename": "/swipl/library/clp/clpq/ineq_q.pl",
                        "start": 5135175,
                        "end": 5171942
                    }, {
                        "filename": "/swipl/library/clp/clpq/store_q.pl",
                        "start": 5171942,
                        "end": 5182659
                    }, {
                        "filename": "/swipl/library/clp/clpq/fourmotz_q.pl",
                        "start": 5182659,
                        "end": 5195875
                    }, {
                        "filename": "/swipl/library/clp/clpq/.created",
                        "start": 5195875,
                        "end": 5195875
                    }, {
                        "filename": "/swipl/library/clp/clpq/bb_q.pl",
                        "start": 5195875,
                        "end": 5202485
                    }, {
                        "filename": "/swipl/library/clp/clpq/bv_q.pl",
                        "start": 5202485,
                        "end": 5251496
                    }, {
                        "filename": "/swipl/library/clp/clpr/itf_r.pl",
                        "start": 5251496,
                        "end": 5258059
                    }, {
                        "filename": "/swipl/library/clp/clpr/bv_r.pl",
                        "start": 5258059,
                        "end": 5308344
                    }, {
                        "filename": "/swipl/library/clp/clpr/nf_r.pl",
                        "start": 5308344,
                        "end": 5335670
                    }, {
                        "filename": "/swipl/library/clp/clpr/ineq_r.pl",
                        "start": 5335670,
                        "end": 5377207
                    }, {
                        "filename": "/swipl/library/clp/clpr/store_r.pl",
                        "start": 5377207,
                        "end": 5388652
                    }, {
                        "filename": "/swipl/library/clp/clpr/bb_r.pl",
                        "start": 5388652,
                        "end": 5396177
                    }, {
                        "filename": "/swipl/library/clp/clpr/fourmotz_r.pl",
                        "start": 5396177,
                        "end": 5409529
                    }, {
                        "filename": "/swipl/library/clp/clpr/.created",
                        "start": 5409529,
                        "end": 5409529
                    }, {
                        "filename": "/swipl/library/dcg/high_order.pl",
                        "start": 5409529,
                        "end": 5417005
                    }, {
                        "filename": "/swipl/library/dcg/basics.pl",
                        "start": 5417005,
                        "end": 5427886
                    }, {
                        "filename": "/swipl/library/dcg/INDEX.pl",
                        "start": 5427886,
                        "end": 5429200
                    }, {
                        "filename": "/swipl/library/dcg/.created",
                        "start": 5429200,
                        "end": 5429200
                    }, {
                        "filename": "/swipl/library/unicode/blocks.pl",
                        "start": 5429200,
                        "end": 5439441
                    }, {
                        "filename": "/swipl/library/unicode/INDEX.pl",
                        "start": 5439441,
                        "end": 5439615
                    }, {
                        "filename": "/swipl/library/unicode/.created",
                        "start": 5439615,
                        "end": 5439615
                    }, {
                        "filename": "/swipl/library/unicode/unicode_data.pl",
                        "start": 5439615,
                        "end": 5445109
                    }, {
                        "filename": "/swipl/library/build/conan.pl",
                        "start": 5445109,
                        "end": 5452104
                    }, {
                        "filename": "/swipl/library/build/tools.pl",
                        "start": 5452104,
                        "end": 5479060
                    }, {
                        "filename": "/swipl/library/build/cmake.pl",
                        "start": 5479060,
                        "end": 5483917
                    }, {
                        "filename": "/swipl/library/build/make.pl",
                        "start": 5483917,
                        "end": 5489919
                    }, {
                        "filename": "/swipl/library/build/.created",
                        "start": 5489919,
                        "end": 5489919
                    }, {
                        "filename": "/swipl/library/dialect/yap.pl",
                        "start": 5489919,
                        "end": 5497053
                    }, {
                        "filename": "/swipl/library/dialect/bim.pl",
                        "start": 5497053,
                        "end": 5501334
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4.pl",
                        "start": 5501334,
                        "end": 5508721
                    }, {
                        "filename": "/swipl/library/dialect/xsb.pl",
                        "start": 5508721,
                        "end": 5529988
                    }, {
                        "filename": "/swipl/library/dialect/hprolog.pl",
                        "start": 5529988,
                        "end": 5538380
                    }, {
                        "filename": "/swipl/library/dialect/ifprolog.pl",
                        "start": 5538380,
                        "end": 5574837
                    }, {
                        "filename": "/swipl/library/dialect/commons.pl",
                        "start": 5574837,
                        "end": 5577397
                    }, {
                        "filename": "/swipl/library/dialect/sicstus.pl",
                        "start": 5577397,
                        "end": 5594219
                    }, {
                        "filename": "/swipl/library/dialect/.created",
                        "start": 5594219,
                        "end": 5594219
                    }, {
                        "filename": "/swipl/library/dialect/swi/syspred_options.pl",
                        "start": 5594219,
                        "end": 5602086
                    }, {
                        "filename": "/swipl/library/dialect/swi/.created",
                        "start": 5602086,
                        "end": 5602086
                    }, {
                        "filename": "/swipl/library/dialect/xsb/source.pl",
                        "start": 5602086,
                        "end": 5611882
                    }, {
                        "filename": "/swipl/library/dialect/xsb/curr_sym.pl",
                        "start": 5611882,
                        "end": 5614145
                    }, {
                        "filename": "/swipl/library/dialect/xsb/storage.pl",
                        "start": 5614145,
                        "end": 5616715
                    }, {
                        "filename": "/swipl/library/dialect/xsb/consult.pl",
                        "start": 5616715,
                        "end": 5618557
                    }, {
                        "filename": "/swipl/library/dialect/xsb/ordsets.pl",
                        "start": 5618557,
                        "end": 5620779
                    }, {
                        "filename": "/swipl/library/dialect/xsb/README.md",
                        "start": 5620779,
                        "end": 5621430
                    }, {
                        "filename": "/swipl/library/dialect/xsb/gensym.pl",
                        "start": 5621430,
                        "end": 5623472
                    }, {
                        "filename": "/swipl/library/dialect/xsb/gpp.pl",
                        "start": 5623472,
                        "end": 5628536
                    }, {
                        "filename": "/swipl/library/dialect/xsb/machine.pl",
                        "start": 5628536,
                        "end": 5635578
                    }, {
                        "filename": "/swipl/library/dialect/xsb/string.pl",
                        "start": 5635578,
                        "end": 5638132
                    }, {
                        "filename": "/swipl/library/dialect/xsb/standard.pl",
                        "start": 5638132,
                        "end": 5642937
                    }, {
                        "filename": "/swipl/library/dialect/xsb/basics.pl",
                        "start": 5642937,
                        "end": 5650304
                    }, {
                        "filename": "/swipl/library/dialect/xsb/intern.pl",
                        "start": 5650304,
                        "end": 5652226
                    }, {
                        "filename": "/swipl/library/dialect/xsb/.created",
                        "start": 5652226,
                        "end": 5652226
                    }, {
                        "filename": "/swipl/library/dialect/xsb/error_handler.pl",
                        "start": 5652226,
                        "end": 5656423
                    }, {
                        "filename": "/swipl/library/dialect/xsb/lists.pl",
                        "start": 5656423,
                        "end": 5658321
                    }, {
                        "filename": "/swipl/library/dialect/xsb/setof.pl",
                        "start": 5658321,
                        "end": 5660860
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/ordsets.pl",
                        "start": 5660860,
                        "end": 5662882
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/timeout.pl",
                        "start": 5662882,
                        "end": 5664662
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/file_systems.pl",
                        "start": 5664662,
                        "end": 5682145
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/sets.pl",
                        "start": 5682145,
                        "end": 5685691
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/aggregate.pl",
                        "start": 5685691,
                        "end": 5688111
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/types.pl",
                        "start": 5688111,
                        "end": 5692404
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/between.pl",
                        "start": 5692404,
                        "end": 5694533
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/system.pl",
                        "start": 5694533,
                        "end": 5697446
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/samsort.pl",
                        "start": 5697446,
                        "end": 5700408
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/terms.pl",
                        "start": 5700408,
                        "end": 5703300
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/.created",
                        "start": 5703300,
                        "end": 5703300
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/lists.pl",
                        "start": 5703300,
                        "end": 5711292
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/clpfd.pl",
                        "start": 5711292,
                        "end": 5713832
                    }, {
                        "filename": "/swipl/library/dialect/sicstus4/sockets.pl",
                        "start": 5713832,
                        "end": 5720029
                    }, {
                        "filename": "/swipl/library/dialect/eclipse/test_util_iso.pl",
                        "start": 5720029,
                        "end": 5729881
                    }, {
                        "filename": "/swipl/library/dialect/eclipse/.created",
                        "start": 5729881,
                        "end": 5729881
                    }, {
                        "filename": "/swipl/library/dialect/yap/README.TXT",
                        "start": 5729881,
                        "end": 5730232
                    }, {
                        "filename": "/swipl/library/dialect/yap/.created",
                        "start": 5730232,
                        "end": 5730232
                    }, {
                        "filename": "/swipl/library/dialect/sicstus/ordsets.pl",
                        "start": 5730232,
                        "end": 5732186
                    }, {
                        "filename": "/swipl/library/dialect/sicstus/timeout.pl",
                        "start": 5732186,
                        "end": 5735937
                    }, {
                        "filename": "/swipl/library/dialect/sicstus/README.TXT",
                        "start": 5735937,
                        "end": 5735968
                    }, {
                        "filename": "/swipl/library/dialect/sicstus/swipl-lfr.pl",
                        "start": 5735968,
                        "end": 5739968
                    }, {
                        "filename": "/swipl/library/dialect/sicstus/block.pl",
                        "start": 5739968,
                        "end": 5750411
                    }, {
                        "filename": "/swipl/library/dialect/sicstus/arrays.pl",
                        "start": 5750411,
                        "end": 5754115
                    }, {
                        "filename": "/swipl/library/dialect/sicstus/system.pl",
                        "start": 5754115,
                        "end": 5760690
                    }, {
                        "filename": "/swipl/library/dialect/sicstus/terms.pl",
                        "start": 5760690,
                        "end": 5762929
                    }, {
                        "filename": "/swipl/library/dialect/sicstus/.created",
                        "start": 5762929,
                        "end": 5762929
                    }, {
                        "filename": "/swipl/library/dialect/sicstus/lists.pl",
                        "start": 5762929,
                        "end": 5767586
                    }, {
                        "filename": "/swipl/library/dialect/sicstus/sockets.pl",
                        "start": 5767586,
                        "end": 5773805
                    }, {
                        "filename": "/swipl/library/dialect/hprolog/format.pl",
                        "start": 5773805,
                        "end": 5775642
                    }, {
                        "filename": "/swipl/library/dialect/hprolog/.created",
                        "start": 5775642,
                        "end": 5775642
                    }, {
                        "filename": "/swipl/library/dialect/iso/iso_predicates.pl",
                        "start": 5775642,
                        "end": 5785332
                    }, {
                        "filename": "/swipl/library/dialect/iso/.created",
                        "start": 5785332,
                        "end": 5785332
                    }, {
                        "filename": "/swipl/library/semweb/rdf_prefixes.pl",
                        "start": 5785332,
                        "end": 5808549
                    }, {
                        "filename": "/swipl/library/semweb/rdf_turtle_write.pl",
                        "start": 5808549,
                        "end": 5859583
                    }, {
                        "filename": "/swipl/library/semweb/rdf_compare.pl",
                        "start": 5859583,
                        "end": 5864089
                    }, {
                        "filename": "/swipl/library/semweb/turtle.pl",
                        "start": 5864089,
                        "end": 5880055
                    }, {
                        "filename": "/swipl/library/semweb/rdf_ntriples.pl",
                        "start": 5880055,
                        "end": 5894581
                    }, {
                        "filename": "/swipl/library/semweb/INDEX.pl",
                        "start": 5894581,
                        "end": 5896515
                    }, {"filename": "/swipl/library/semweb/.created", "start": 5896515, "end": 5896515}],
                    "remote_package_size": 5896515
                })
            })();
            Module.noInitialRun = true;
            let decoder;
            let buffers = {stdout: [], stderr: []};

            function write(to, c) {
                const buf = buffers[to];
                if (c == 10 && buf.length == 0) buf.push(32);
                if (c) buf.push(c);
                if (c == 10 || c == null) flush(to)
            }

            function decode(bytes) {
                const ar = new Uint8Array(bytes.length);
                for (var i = 0; i < bytes.length; i++) {
                    let c = bytes[i];
                    if (c < 0) c = 256 + c;
                    ar[i] = c
                }
                return decoder.decode(ar)
            }

            function flush(to) {
                if (buffers[to].length) {
                    const line = decode(buffers[to]);
                    Module.on_output(line, to);
                    buffers[to] = []
                }
            }

            function log_output(stream, args) {
                if (module.on_output) {
                    let s = "";
                    flush(stream);
                    args.forEach(a => {
                        s += a
                    });
                    Module.on_output(s, stream)
                } else {
                    console.log.apply(null, args)
                }
            }

            function bind_std_streams() {
                decoder = new TextDecoder("utf-8");
                Module.FS.init(undefined, c => write("stdout", c), c => write("stderr", c))
            }

            if (Module.on_output) {
                Module.preRun.push(bind_std_streams)
            }
            var moduleOverrides = Object.assign({}, Module);
            var arguments_ = [];
            var thisProgram = "./this.program";
            var quit_ = (status, toThrow) => {
                throw toThrow
            };
            var ENVIRONMENT_IS_WEB = typeof window == "object";
            var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
            var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
            var scriptDirectory = "";

            function locateFile(path) {
                if (Module["locateFile"]) {
                    return Module["locateFile"](path, scriptDirectory)
                }
                return scriptDirectory + path
            }

            var read_, readAsync, readBinary, setWindowTitle;

            function logExceptionOnExit(e) {
                if (e instanceof ExitStatus) return;
                let toLog = e;
                err("exiting due to exception: " + toLog)
            }

            var fs;
            var nodePath;
            var requireNodeFS;
            if (ENVIRONMENT_IS_NODE) {
                if (ENVIRONMENT_IS_WORKER) {
                    scriptDirectory = require("path").dirname(scriptDirectory) + "/"
                } else {
                    scriptDirectory = __dirname + "/"
                }
                requireNodeFS = () => {
                    if (!nodePath) {
                        fs = require("fs");
                        nodePath = require("path")
                    }
                };
                read_ = function shell_read(filename, binary) {
                    requireNodeFS();
                    filename = nodePath["normalize"](filename);
                    return fs.readFileSync(filename, binary ? undefined : "utf8")
                };
                readBinary = filename => {
                    var ret = read_(filename, true);
                    if (!ret.buffer) {
                        ret = new Uint8Array(ret)
                    }
                    return ret
                };
                readAsync = (filename, onload, onerror) => {
                    requireNodeFS();
                    filename = nodePath["normalize"](filename);
                    fs.readFile(filename, function (err, data) {
                        if (err) onerror(err); else onload(data.buffer)
                    })
                };
                if (process["argv"].length > 1) {
                    thisProgram = process["argv"][1].replace(/\\/g, "/")
                }
                arguments_ = process["argv"].slice(2);
                process["on"]("uncaughtException", function (ex) {
                    if (!(ex instanceof ExitStatus)) {
                        throw ex
                    }
                });
                process["on"]("unhandledRejection", function (reason) {
                    throw reason
                });
                quit_ = (status, toThrow) => {
                    if (keepRuntimeAlive()) {
                        process["exitCode"] = status;
                        throw toThrow
                    }
                    logExceptionOnExit(toThrow);
                    process["exit"](status)
                };
                Module["inspect"] = function () {
                    return "[Emscripten Module object]"
                }
            } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
                if (ENVIRONMENT_IS_WORKER) {
                    scriptDirectory = self.location.href
                } else if (typeof document != "undefined" && document.currentScript) {
                    scriptDirectory = document.currentScript.src
                }
                if (_scriptDir) {
                    scriptDirectory = _scriptDir
                }
                if (scriptDirectory.indexOf("blob:") !== 0) {
                    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1)
                } else {
                    scriptDirectory = ""
                }
                {
                    read_ = url => {
                        var xhr = new XMLHttpRequest;
                        xhr.open("GET", url, false);
                        xhr.send(null);
                        return xhr.responseText
                    };
                    if (ENVIRONMENT_IS_WORKER) {
                        readBinary = url => {
                            var xhr = new XMLHttpRequest;
                            xhr.open("GET", url, false);
                            xhr.responseType = "arraybuffer";
                            xhr.send(null);
                            return new Uint8Array(xhr.response)
                        }
                    }
                    readAsync = (url, onload, onerror) => {
                        var xhr = new XMLHttpRequest;
                        xhr.open("GET", url, true);
                        xhr.responseType = "arraybuffer";
                        xhr.onload = () => {
                            if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                                onload(xhr.response);
                                return
                            }
                            onerror()
                        };
                        xhr.onerror = onerror;
                        xhr.send(null)
                    }
                }
                setWindowTitle = title => document.title = title
            } else {
            }
            var out = Module["print"] || console.log.bind(console);
            var err = Module["printErr"] || console.warn.bind(console);
            Object.assign(Module, moduleOverrides);
            moduleOverrides = null;
            if (Module["arguments"]) arguments_ = Module["arguments"];
            if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
            if (Module["quit"]) quit_ = Module["quit"];
            var tempRet0 = 0;
            var setTempRet0 = value => {
                tempRet0 = value
            };
            var getTempRet0 = () => tempRet0;
            var wasmBinary;
            if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
            var noExitRuntime = Module["noExitRuntime"] || false;
            if (typeof WebAssembly != "object") {
                abort("no native wasm support detected")
            }
            var wasmMemory;
            var ABORT = false;
            var EXITSTATUS;

            function assert(condition, text) {
                if (!condition) {
                    abort(text)
                }
            }

            var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;

            function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
                var endIdx = idx + maxBytesToRead;
                var endPtr = idx;
                while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
                if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
                    return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr))
                }
                var str = "";
                while (idx < endPtr) {
                    var u0 = heapOrArray[idx++];
                    if (!(u0 & 128)) {
                        str += String.fromCharCode(u0);
                        continue
                    }
                    var u1 = heapOrArray[idx++] & 63;
                    if ((u0 & 224) == 192) {
                        str += String.fromCharCode((u0 & 31) << 6 | u1);
                        continue
                    }
                    var u2 = heapOrArray[idx++] & 63;
                    if ((u0 & 240) == 224) {
                        u0 = (u0 & 15) << 12 | u1 << 6 | u2
                    } else {
                        u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63
                    }
                    if (u0 < 65536) {
                        str += String.fromCharCode(u0)
                    } else {
                        var ch = u0 - 65536;
                        str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
                    }
                }
                return str
            }

            function UTF8ToString(ptr, maxBytesToRead) {
                return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""
            }

            function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
                if (!(maxBytesToWrite > 0)) return 0;
                var startIdx = outIdx;
                var endIdx = outIdx + maxBytesToWrite - 1;
                for (var i = 0; i < str.length; ++i) {
                    var u = str.charCodeAt(i);
                    if (u >= 55296 && u <= 57343) {
                        var u1 = str.charCodeAt(++i);
                        u = 65536 + ((u & 1023) << 10) | u1 & 1023
                    }
                    if (u <= 127) {
                        if (outIdx >= endIdx) break;
                        heap[outIdx++] = u
                    } else if (u <= 2047) {
                        if (outIdx + 1 >= endIdx) break;
                        heap[outIdx++] = 192 | u >> 6;
                        heap[outIdx++] = 128 | u & 63
                    } else if (u <= 65535) {
                        if (outIdx + 2 >= endIdx) break;
                        heap[outIdx++] = 224 | u >> 12;
                        heap[outIdx++] = 128 | u >> 6 & 63;
                        heap[outIdx++] = 128 | u & 63
                    } else {
                        if (outIdx + 3 >= endIdx) break;
                        heap[outIdx++] = 240 | u >> 18;
                        heap[outIdx++] = 128 | u >> 12 & 63;
                        heap[outIdx++] = 128 | u >> 6 & 63;
                        heap[outIdx++] = 128 | u & 63
                    }
                }
                heap[outIdx] = 0;
                return outIdx - startIdx
            }

            function stringToUTF8(str, outPtr, maxBytesToWrite) {
                return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
            }

            function lengthBytesUTF8(str) {
                var len = 0;
                for (var i = 0; i < str.length; ++i) {
                    var c = str.charCodeAt(i);
                    if (c <= 127) {
                        len++
                    } else if (c <= 2047) {
                        len += 2
                    } else if (c >= 55296 && c <= 57343) {
                        len += 4;
                        ++i
                    } else {
                        len += 3
                    }
                }
                return len
            }

            var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAP64, HEAPU64, HEAPF64;

            function updateGlobalBufferAndViews(buf) {
                buffer = buf;
                Module["HEAP8"] = HEAP8 = new Int8Array(buf);
                Module["HEAP16"] = HEAP16 = new Int16Array(buf);
                Module["HEAP32"] = HEAP32 = new Int32Array(buf);
                Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
                Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
                Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
                Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
                Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
                Module["HEAP64"] = HEAP64 = new BigInt64Array(buf);
                Module["HEAPU64"] = HEAPU64 = new BigUint64Array(buf)
            }

            var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
            var wasmTable;
            var __ATPRERUN__ = [];
            var __ATINIT__ = [];
            var __ATEXIT__ = [];
            var __ATPOSTRUN__ = [];
            var runtimeInitialized = false;
            var runtimeExited = false;
            var runtimeKeepaliveCounter = 0;

            function keepRuntimeAlive() {
                return noExitRuntime || runtimeKeepaliveCounter > 0
            }

            function preRun() {
                if (Module["preRun"]) {
                    if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
                    while (Module["preRun"].length) {
                        addOnPreRun(Module["preRun"].shift())
                    }
                }
                callRuntimeCallbacks(__ATPRERUN__)
            }

            function initRuntime() {
                runtimeInitialized = true;
                if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
                FS.ignorePermissions = false;
                TTY.init();
                callRuntimeCallbacks(__ATINIT__)
            }

            function exitRuntime() {
                ___funcs_on_exit();
                callRuntimeCallbacks(__ATEXIT__);
                FS.quit();
                TTY.shutdown();
                runtimeExited = true
            }

            function postRun() {
                if (Module["postRun"]) {
                    if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
                    while (Module["postRun"].length) {
                        addOnPostRun(Module["postRun"].shift())
                    }
                }
                callRuntimeCallbacks(__ATPOSTRUN__)
            }

            function addOnPreRun(cb) {
                __ATPRERUN__.unshift(cb)
            }

            function addOnInit(cb) {
                __ATINIT__.unshift(cb)
            }

            function addOnPostRun(cb) {
                __ATPOSTRUN__.unshift(cb)
            }

            var runDependencies = 0;
            var runDependencyWatcher = null;
            var dependenciesFulfilled = null;

            function getUniqueRunDependency(id) {
                return id
            }

            function addRunDependency(id) {
                runDependencies++;
                if (Module["monitorRunDependencies"]) {
                    Module["monitorRunDependencies"](runDependencies)
                }
            }

            function removeRunDependency(id) {
                runDependencies--;
                if (Module["monitorRunDependencies"]) {
                    Module["monitorRunDependencies"](runDependencies)
                }
                if (runDependencies == 0) {
                    if (runDependencyWatcher !== null) {
                        clearInterval(runDependencyWatcher);
                        runDependencyWatcher = null
                    }
                    if (dependenciesFulfilled) {
                        var callback = dependenciesFulfilled;
                        dependenciesFulfilled = null;
                        callback()
                    }
                }
            }

            function abort(what) {
                {
                    if (Module["onAbort"]) {
                        Module["onAbort"](what)
                    }
                }
                what = "Aborted(" + what + ")";
                err(what);
                ABORT = true;
                EXITSTATUS = 1;
                what += ". Build with -sASSERTIONS for more info.";
                var e = new WebAssembly.RuntimeError(what);
                readyPromiseReject(e);
                throw e
            }

            var dataURIPrefix = "data:application/octet-stream;base64,";

            function isDataURI(filename) {
                return filename.startsWith(dataURIPrefix)
            }

            function isFileURI(filename) {
                return filename.startsWith("file://")
            }

            var wasmBinaryFile;
            wasmBinaryFile = "swipl-web.wasm";
            if (!isDataURI(wasmBinaryFile)) {
                wasmBinaryFile = locateFile(wasmBinaryFile)
            }

            function getBinary(file) {
                try {
                    if (file == wasmBinaryFile && wasmBinary) {
                        return new Uint8Array(wasmBinary)
                    }
                    if (readBinary) {
                        return readBinary(file)
                    }
                    throw"both async and sync fetching of the wasm failed"
                } catch (err) {
                    abort(err)
                }
            }

            function getBinaryPromise() {
                if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
                    if (typeof fetch == "function" && !isFileURI(wasmBinaryFile)) {
                        return fetch(wasmBinaryFile, {credentials: "same-origin"}).then(function (response) {
                            if (!response["ok"]) {
                                throw"failed to load wasm binary file at '" + wasmBinaryFile + "'"
                            }
                            return response["arrayBuffer"]()
                        }).catch(function () {
                            return getBinary(wasmBinaryFile)
                        })
                    } else {
                        if (readAsync) {
                            return new Promise(function (resolve, reject) {
                                readAsync(wasmBinaryFile, function (response) {
                                    resolve(new Uint8Array(response))
                                }, reject)
                            })
                        }
                    }
                }
                return Promise.resolve().then(function () {
                    return getBinary(wasmBinaryFile)
                })
            }

            function createWasm() {
                var info = {"a": asmLibraryArg};

                function receiveInstance(instance, module) {
                    var exports = instance.exports;
                    Module["asm"] = exports;
                    wasmMemory = Module["asm"]["na"];
                    updateGlobalBufferAndViews(wasmMemory.buffer);
                    wasmTable = Module["asm"]["Gb"];
                    addOnInit(Module["asm"]["oa"]);
                    removeRunDependency("wasm-instantiate")
                }

                addRunDependency("wasm-instantiate");

                function receiveInstantiationResult(result) {
                    receiveInstance(result["instance"])
                }

                function instantiateArrayBuffer(receiver) {
                    return getBinaryPromise().then(function (binary) {
                        return WebAssembly.instantiate(binary, info)
                    }).then(function (instance) {
                        return instance
                    }).then(receiver, function (reason) {
                        err("failed to asynchronously prepare wasm: " + reason);
                        abort(reason)
                    })
                }

                function instantiateAsync() {
                    if (!wasmBinary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && !ENVIRONMENT_IS_NODE && typeof fetch == "function") {
                        return fetch(wasmBinaryFile, {credentials: "same-origin"}).then(function (response) {
                            var result = WebAssembly.instantiateStreaming(response, info);
                            return result.then(receiveInstantiationResult, function (reason) {
                                err("wasm streaming compile failed: " + reason);
                                err("falling back to ArrayBuffer instantiation");
                                return instantiateArrayBuffer(receiveInstantiationResult)
                            })
                        })
                    } else {
                        return instantiateArrayBuffer(receiveInstantiationResult)
                    }
                }

                if (Module["instantiateWasm"]) {
                    try {
                        var exports = Module["instantiateWasm"](info, receiveInstance);
                        return exports
                    } catch (e) {
                        err("Module.instantiateWasm callback failed with error: " + e);
                        return false
                    }
                }
                instantiateAsync().catch(readyPromiseReject);
                return {}
            }

            var ASM_CONSTS = {
                270120: $0 => {
                    release_registered_object($0)
                }, 270155: $0 => {
                    const s = prolog_js_obj_class_name($0);
                    const len = lengthBytesUTF8(s) + 1;
                    const mem = _malloc(len);
                    stringToUTF8(s, mem, len);
                    return mem
                }, 270298: ($0, $1) => {
                    return prolog_js_call($0, $1)
                }
            };

            function ExitStatus(status) {
                this.name = "ExitStatus";
                this.message = "Program terminated with exit(" + status + ")";
                this.status = status
            }

            function callRuntimeCallbacks(callbacks) {
                while (callbacks.length > 0) {
                    callbacks.shift()(Module)
                }
            }

            function getValue(ptr, type = "i8") {
                if (type.endsWith("*")) type = "*";
                switch (type) {
                    case"i1":
                        return HEAP8[ptr >> 0];
                    case"i8":
                        return HEAP8[ptr >> 0];
                    case"i16":
                        return HEAP16[ptr >> 1];
                    case"i32":
                        return HEAP32[ptr >> 2];
                    case"i64":
                        return HEAP64[ptr >> 3];
                    case"float":
                        return HEAPF32[ptr >> 2];
                    case"double":
                        return HEAPF64[ptr >> 3];
                    case"*":
                        return HEAPU32[ptr >> 2];
                    default:
                        abort("invalid type for getValue: " + type)
                }
                return null
            }

            function setValue(ptr, value, type = "i8") {
                if (type.endsWith("*")) type = "*";
                switch (type) {
                    case"i1":
                        HEAP8[ptr >> 0] = value;
                        break;
                    case"i8":
                        HEAP8[ptr >> 0] = value;
                        break;
                    case"i16":
                        HEAP16[ptr >> 1] = value;
                        break;
                    case"i32":
                        HEAP32[ptr >> 2] = value;
                        break;
                    case"i64":
                        HEAP64[ptr >> 3] = BigInt(value);
                        break;
                    case"float":
                        HEAPF32[ptr >> 2] = value;
                        break;
                    case"double":
                        HEAPF64[ptr >> 3] = value;
                        break;
                    case"*":
                        HEAPU32[ptr >> 2] = value;
                        break;
                    default:
                        abort("invalid type for setValue: " + type)
                }
            }

            function writeArrayToMemory(array, buffer) {
                HEAP8.set(array, buffer)
            }

            var wasmTableMirror = [];

            function getWasmTableEntry(funcPtr) {
                var func = wasmTableMirror[funcPtr];
                if (!func) {
                    if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
                    wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr)
                }
                return func
            }

            function ___call_sighandler(fp, sig) {
                getWasmTableEntry(fp)(sig)
            }

            var PATH = {
                isAbs: path => path.charAt(0) === "/", splitPath: filename => {
                    var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
                    return splitPathRe.exec(filename).slice(1)
                }, normalizeArray: (parts, allowAboveRoot) => {
                    var up = 0;
                    for (var i = parts.length - 1; i >= 0; i--) {
                        var last = parts[i];
                        if (last === ".") {
                            parts.splice(i, 1)
                        } else if (last === "..") {
                            parts.splice(i, 1);
                            up++
                        } else if (up) {
                            parts.splice(i, 1);
                            up--
                        }
                    }
                    if (allowAboveRoot) {
                        for (; up; up--) {
                            parts.unshift("..")
                        }
                    }
                    return parts
                }, normalize: path => {
                    var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
                    path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
                    if (!path && !isAbsolute) {
                        path = "."
                    }
                    if (path && trailingSlash) {
                        path += "/"
                    }
                    return (isAbsolute ? "/" : "") + path
                }, dirname: path => {
                    var result = PATH.splitPath(path), root = result[0], dir = result[1];
                    if (!root && !dir) {
                        return "."
                    }
                    if (dir) {
                        dir = dir.substr(0, dir.length - 1)
                    }
                    return root + dir
                }, basename: path => {
                    if (path === "/") return "/";
                    path = PATH.normalize(path);
                    path = path.replace(/\/$/, "");
                    var lastSlash = path.lastIndexOf("/");
                    if (lastSlash === -1) return path;
                    return path.substr(lastSlash + 1)
                }, join: function () {
                    var paths = Array.prototype.slice.call(arguments, 0);
                    return PATH.normalize(paths.join("/"))
                }, join2: (l, r) => {
                    return PATH.normalize(l + "/" + r)
                }
            };

            function getRandomDevice() {
                if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
                    var randomBuffer = new Uint8Array(1);
                    return () => {
                        crypto.getRandomValues(randomBuffer);
                        return randomBuffer[0]
                    }
                } else if (ENVIRONMENT_IS_NODE) {
                    try {
                        var crypto_module = require("crypto");
                        return () => crypto_module["randomBytes"](1)[0]
                    } catch (e) {
                    }
                }
                return () => abort("randomDevice")
            }

            var PATH_FS = {
                resolve: function () {
                    var resolvedPath = "", resolvedAbsolute = false;
                    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                        var path = i >= 0 ? arguments[i] : FS.cwd();
                        if (typeof path != "string") {
                            throw new TypeError("Arguments to path.resolve must be strings")
                        } else if (!path) {
                            return ""
                        }
                        resolvedPath = path + "/" + resolvedPath;
                        resolvedAbsolute = PATH.isAbs(path)
                    }
                    resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
                    return (resolvedAbsolute ? "/" : "") + resolvedPath || "."
                }, relative: (from, to) => {
                    from = PATH_FS.resolve(from).substr(1);
                    to = PATH_FS.resolve(to).substr(1);

                    function trim(arr) {
                        var start = 0;
                        for (; start < arr.length; start++) {
                            if (arr[start] !== "") break
                        }
                        var end = arr.length - 1;
                        for (; end >= 0; end--) {
                            if (arr[end] !== "") break
                        }
                        if (start > end) return [];
                        return arr.slice(start, end - start + 1)
                    }

                    var fromParts = trim(from.split("/"));
                    var toParts = trim(to.split("/"));
                    var length = Math.min(fromParts.length, toParts.length);
                    var samePartsLength = length;
                    for (var i = 0; i < length; i++) {
                        if (fromParts[i] !== toParts[i]) {
                            samePartsLength = i;
                            break
                        }
                    }
                    var outputParts = [];
                    for (var i = samePartsLength; i < fromParts.length; i++) {
                        outputParts.push("..")
                    }
                    outputParts = outputParts.concat(toParts.slice(samePartsLength));
                    return outputParts.join("/")
                }
            };

            function intArrayFromString(stringy, dontAddNull, length) {
                var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
                var u8array = new Array(len);
                var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
                if (dontAddNull) u8array.length = numBytesWritten;
                return u8array
            }

            var TTY = {
                ttys: [], init: function () {
                }, shutdown: function () {
                }, register: function (dev, ops) {
                    TTY.ttys[dev] = {input: [], output: [], ops: ops};
                    FS.registerDevice(dev, TTY.stream_ops)
                }, stream_ops: {
                    open: function (stream) {
                        var tty = TTY.ttys[stream.node.rdev];
                        if (!tty) {
                            throw new FS.ErrnoError(43)
                        }
                        stream.tty = tty;
                        stream.seekable = false
                    }, close: function (stream) {
                        stream.tty.ops.flush(stream.tty)
                    }, flush: function (stream) {
                        stream.tty.ops.flush(stream.tty)
                    }, read: function (stream, buffer, offset, length, pos) {
                        if (!stream.tty || !stream.tty.ops.get_char) {
                            throw new FS.ErrnoError(60)
                        }
                        var bytesRead = 0;
                        for (var i = 0; i < length; i++) {
                            var result;
                            try {
                                result = stream.tty.ops.get_char(stream.tty)
                            } catch (e) {
                                throw new FS.ErrnoError(29)
                            }
                            if (result === undefined && bytesRead === 0) {
                                throw new FS.ErrnoError(6)
                            }
                            if (result === null || result === undefined) break;
                            bytesRead++;
                            buffer[offset + i] = result
                        }
                        if (bytesRead) {
                            stream.node.timestamp = Date.now()
                        }
                        return bytesRead
                    }, write: function (stream, buffer, offset, length, pos) {
                        if (!stream.tty || !stream.tty.ops.put_char) {
                            throw new FS.ErrnoError(60)
                        }
                        try {
                            for (var i = 0; i < length; i++) {
                                stream.tty.ops.put_char(stream.tty, buffer[offset + i])
                            }
                        } catch (e) {
                            throw new FS.ErrnoError(29)
                        }
                        if (length) {
                            stream.node.timestamp = Date.now()
                        }
                        return i
                    }
                }, default_tty_ops: {
                    get_char: function (tty) {
                        if (!tty.input.length) {
                            var result = null;
                            if (ENVIRONMENT_IS_NODE) {
                                var BUFSIZE = 256;
                                var buf = Buffer.alloc(BUFSIZE);
                                var bytesRead = 0;
                                try {
                                    bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, -1)
                                } catch (e) {
                                    if (e.toString().includes("EOF")) bytesRead = 0; else throw e
                                }
                                if (bytesRead > 0) {
                                    result = buf.slice(0, bytesRead).toString("utf-8")
                                } else {
                                    result = null
                                }
                            } else if (typeof window != "undefined" && typeof window.prompt == "function") {
                                result = window.prompt("Input: ");
                                if (result !== null) {
                                    result += "\n"
                                }
                            } else if (typeof readline == "function") {
                                result = readline();
                                if (result !== null) {
                                    result += "\n"
                                }
                            }
                            if (!result) {
                                return null
                            }
                            tty.input = intArrayFromString(result, true)
                        }
                        return tty.input.shift()
                    }, put_char: function (tty, val) {
                        if (val === null || val === 10) {
                            out(UTF8ArrayToString(tty.output, 0));
                            tty.output = []
                        } else {
                            if (val != 0) tty.output.push(val)
                        }
                    }, flush: function (tty) {
                        if (tty.output && tty.output.length > 0) {
                            out(UTF8ArrayToString(tty.output, 0));
                            tty.output = []
                        }
                    }
                }, default_tty1_ops: {
                    put_char: function (tty, val) {
                        if (val === null || val === 10) {
                            err(UTF8ArrayToString(tty.output, 0));
                            tty.output = []
                        } else {
                            if (val != 0) tty.output.push(val)
                        }
                    }, flush: function (tty) {
                        if (tty.output && tty.output.length > 0) {
                            err(UTF8ArrayToString(tty.output, 0));
                            tty.output = []
                        }
                    }
                }
            };

            function zeroMemory(address, size) {
                HEAPU8.fill(0, address, address + size)
            }

            function alignMemory(size, alignment) {
                return Math.ceil(size / alignment) * alignment
            }

            function mmapAlloc(size) {
                size = alignMemory(size, 65536);
                var ptr = _emscripten_builtin_memalign(65536, size);
                if (!ptr) return 0;
                zeroMemory(ptr, size);
                return ptr
            }

            var MEMFS = {
                ops_table: null, mount: function (mount) {
                    return MEMFS.createNode(null, "/", 16384 | 511, 0)
                }, createNode: function (parent, name, mode, dev) {
                    if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
                        throw new FS.ErrnoError(63)
                    }
                    if (!MEMFS.ops_table) {
                        MEMFS.ops_table = {
                            dir: {
                                node: {
                                    getattr: MEMFS.node_ops.getattr,
                                    setattr: MEMFS.node_ops.setattr,
                                    lookup: MEMFS.node_ops.lookup,
                                    mknod: MEMFS.node_ops.mknod,
                                    rename: MEMFS.node_ops.rename,
                                    unlink: MEMFS.node_ops.unlink,
                                    rmdir: MEMFS.node_ops.rmdir,
                                    readdir: MEMFS.node_ops.readdir,
                                    symlink: MEMFS.node_ops.symlink
                                }, stream: {llseek: MEMFS.stream_ops.llseek}
                            },
                            file: {
                                node: {getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr},
                                stream: {
                                    llseek: MEMFS.stream_ops.llseek,
                                    read: MEMFS.stream_ops.read,
                                    write: MEMFS.stream_ops.write,
                                    allocate: MEMFS.stream_ops.allocate,
                                    mmap: MEMFS.stream_ops.mmap,
                                    msync: MEMFS.stream_ops.msync
                                }
                            },
                            link: {
                                node: {
                                    getattr: MEMFS.node_ops.getattr,
                                    setattr: MEMFS.node_ops.setattr,
                                    readlink: MEMFS.node_ops.readlink
                                }, stream: {}
                            },
                            chrdev: {
                                node: {getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr},
                                stream: FS.chrdev_stream_ops
                            }
                        }
                    }
                    var node = FS.createNode(parent, name, mode, dev);
                    if (FS.isDir(node.mode)) {
                        node.node_ops = MEMFS.ops_table.dir.node;
                        node.stream_ops = MEMFS.ops_table.dir.stream;
                        node.contents = {}
                    } else if (FS.isFile(node.mode)) {
                        node.node_ops = MEMFS.ops_table.file.node;
                        node.stream_ops = MEMFS.ops_table.file.stream;
                        node.usedBytes = 0;
                        node.contents = null
                    } else if (FS.isLink(node.mode)) {
                        node.node_ops = MEMFS.ops_table.link.node;
                        node.stream_ops = MEMFS.ops_table.link.stream
                    } else if (FS.isChrdev(node.mode)) {
                        node.node_ops = MEMFS.ops_table.chrdev.node;
                        node.stream_ops = MEMFS.ops_table.chrdev.stream
                    }
                    node.timestamp = Date.now();
                    if (parent) {
                        parent.contents[name] = node;
                        parent.timestamp = node.timestamp
                    }
                    return node
                }, getFileDataAsTypedArray: function (node) {
                    if (!node.contents) return new Uint8Array(0);
                    if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
                    return new Uint8Array(node.contents)
                }, expandFileStorage: function (node, newCapacity) {
                    var prevCapacity = node.contents ? node.contents.length : 0;
                    if (prevCapacity >= newCapacity) return;
                    var CAPACITY_DOUBLING_MAX = 1024 * 1024;
                    newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
                    if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
                    var oldContents = node.contents;
                    node.contents = new Uint8Array(newCapacity);
                    if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0)
                }, resizeFileStorage: function (node, newSize) {
                    if (node.usedBytes == newSize) return;
                    if (newSize == 0) {
                        node.contents = null;
                        node.usedBytes = 0
                    } else {
                        var oldContents = node.contents;
                        node.contents = new Uint8Array(newSize);
                        if (oldContents) {
                            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)))
                        }
                        node.usedBytes = newSize
                    }
                }, node_ops: {
                    getattr: function (node) {
                        var attr = {};
                        attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
                        attr.ino = node.id;
                        attr.mode = node.mode;
                        attr.nlink = 1;
                        attr.uid = 0;
                        attr.gid = 0;
                        attr.rdev = node.rdev;
                        if (FS.isDir(node.mode)) {
                            attr.size = 4096
                        } else if (FS.isFile(node.mode)) {
                            attr.size = node.usedBytes
                        } else if (FS.isLink(node.mode)) {
                            attr.size = node.link.length
                        } else {
                            attr.size = 0
                        }
                        attr.atime = new Date(node.timestamp);
                        attr.mtime = new Date(node.timestamp);
                        attr.ctime = new Date(node.timestamp);
                        attr.blksize = 4096;
                        attr.blocks = Math.ceil(attr.size / attr.blksize);
                        return attr
                    }, setattr: function (node, attr) {
                        if (attr.mode !== undefined) {
                            node.mode = attr.mode
                        }
                        if (attr.timestamp !== undefined) {
                            node.timestamp = attr.timestamp
                        }
                        if (attr.size !== undefined) {
                            MEMFS.resizeFileStorage(node, attr.size)
                        }
                    }, lookup: function (parent, name) {
                        throw FS.genericErrors[44]
                    }, mknod: function (parent, name, mode, dev) {
                        return MEMFS.createNode(parent, name, mode, dev)
                    }, rename: function (old_node, new_dir, new_name) {
                        if (FS.isDir(old_node.mode)) {
                            var new_node;
                            try {
                                new_node = FS.lookupNode(new_dir, new_name)
                            } catch (e) {
                            }
                            if (new_node) {
                                for (var i in new_node.contents) {
                                    throw new FS.ErrnoError(55)
                                }
                            }
                        }
                        delete old_node.parent.contents[old_node.name];
                        old_node.parent.timestamp = Date.now();
                        old_node.name = new_name;
                        new_dir.contents[new_name] = old_node;
                        new_dir.timestamp = old_node.parent.timestamp;
                        old_node.parent = new_dir
                    }, unlink: function (parent, name) {
                        delete parent.contents[name];
                        parent.timestamp = Date.now()
                    }, rmdir: function (parent, name) {
                        var node = FS.lookupNode(parent, name);
                        for (var i in node.contents) {
                            throw new FS.ErrnoError(55)
                        }
                        delete parent.contents[name];
                        parent.timestamp = Date.now()
                    }, readdir: function (node) {
                        var entries = [".", ".."];
                        for (var key in node.contents) {
                            if (!node.contents.hasOwnProperty(key)) {
                                continue
                            }
                            entries.push(key)
                        }
                        return entries
                    }, symlink: function (parent, newname, oldpath) {
                        var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
                        node.link = oldpath;
                        return node
                    }, readlink: function (node) {
                        if (!FS.isLink(node.mode)) {
                            throw new FS.ErrnoError(28)
                        }
                        return node.link
                    }
                }, stream_ops: {
                    read: function (stream, buffer, offset, length, position) {
                        var contents = stream.node.contents;
                        if (position >= stream.node.usedBytes) return 0;
                        var size = Math.min(stream.node.usedBytes - position, length);
                        if (size > 8 && contents.subarray) {
                            buffer.set(contents.subarray(position, position + size), offset)
                        } else {
                            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i]
                        }
                        return size
                    }, write: function (stream, buffer, offset, length, position, canOwn) {
                        if (buffer.buffer === HEAP8.buffer) {
                            canOwn = false
                        }
                        if (!length) return 0;
                        var node = stream.node;
                        node.timestamp = Date.now();
                        if (buffer.subarray && (!node.contents || node.contents.subarray)) {
                            if (canOwn) {
                                node.contents = buffer.subarray(offset, offset + length);
                                node.usedBytes = length;
                                return length
                            } else if (node.usedBytes === 0 && position === 0) {
                                node.contents = buffer.slice(offset, offset + length);
                                node.usedBytes = length;
                                return length
                            } else if (position + length <= node.usedBytes) {
                                node.contents.set(buffer.subarray(offset, offset + length), position);
                                return length
                            }
                        }
                        MEMFS.expandFileStorage(node, position + length);
                        if (node.contents.subarray && buffer.subarray) {
                            node.contents.set(buffer.subarray(offset, offset + length), position)
                        } else {
                            for (var i = 0; i < length; i++) {
                                node.contents[position + i] = buffer[offset + i]
                            }
                        }
                        node.usedBytes = Math.max(node.usedBytes, position + length);
                        return length
                    }, llseek: function (stream, offset, whence) {
                        var position = offset;
                        if (whence === 1) {
                            position += stream.position
                        } else if (whence === 2) {
                            if (FS.isFile(stream.node.mode)) {
                                position += stream.node.usedBytes
                            }
                        }
                        if (position < 0) {
                            throw new FS.ErrnoError(28)
                        }
                        return position
                    }, allocate: function (stream, offset, length) {
                        MEMFS.expandFileStorage(stream.node, offset + length);
                        stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length)
                    }, mmap: function (stream, length, position, prot, flags) {
                        if (!FS.isFile(stream.node.mode)) {
                            throw new FS.ErrnoError(43)
                        }
                        var ptr;
                        var allocated;
                        var contents = stream.node.contents;
                        if (!(flags & 2) && contents.buffer === buffer) {
                            allocated = false;
                            ptr = contents.byteOffset
                        } else {
                            if (position > 0 || position + length < contents.length) {
                                if (contents.subarray) {
                                    contents = contents.subarray(position, position + length)
                                } else {
                                    contents = Array.prototype.slice.call(contents, position, position + length)
                                }
                            }
                            allocated = true;
                            ptr = mmapAlloc(length);
                            if (!ptr) {
                                throw new FS.ErrnoError(48)
                            }
                            HEAP8.set(contents, ptr)
                        }
                        return {ptr: ptr, allocated: allocated}
                    }, msync: function (stream, buffer, offset, length, mmapFlags) {
                        if (!FS.isFile(stream.node.mode)) {
                            throw new FS.ErrnoError(43)
                        }
                        if (mmapFlags & 2) {
                            return 0
                        }
                        var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
                        return 0
                    }
                }
            };

            function asyncLoad(url, onload, onerror, noRunDep) {
                var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
                readAsync(url, arrayBuffer => {
                    assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
                    onload(new Uint8Array(arrayBuffer));
                    if (dep) removeRunDependency(dep)
                }, event => {
                    if (onerror) {
                        onerror()
                    } else {
                        throw'Loading data file "' + url + '" failed.'
                    }
                });
                if (dep) addRunDependency(dep)
            }

            var FS = {
                root: null,
                mounts: [],
                devices: {},
                streams: [],
                nextInode: 1,
                nameTable: null,
                currentPath: "/",
                initialized: false,
                ignorePermissions: true,
                ErrnoError: null,
                genericErrors: {},
                filesystems: null,
                syncFSRequests: 0,
                lookupPath: (path, opts = {}) => {
                    path = PATH_FS.resolve(FS.cwd(), path);
                    if (!path) return {path: "", node: null};
                    var defaults = {follow_mount: true, recurse_count: 0};
                    opts = Object.assign(defaults, opts);
                    if (opts.recurse_count > 8) {
                        throw new FS.ErrnoError(32)
                    }
                    var parts = PATH.normalizeArray(path.split("/").filter(p => !!p), false);
                    var current = FS.root;
                    var current_path = "/";
                    for (var i = 0; i < parts.length; i++) {
                        var islast = i === parts.length - 1;
                        if (islast && opts.parent) {
                            break
                        }
                        current = FS.lookupNode(current, parts[i]);
                        current_path = PATH.join2(current_path, parts[i]);
                        if (FS.isMountpoint(current)) {
                            if (!islast || islast && opts.follow_mount) {
                                current = current.mounted.root
                            }
                        }
                        if (!islast || opts.follow) {
                            var count = 0;
                            while (FS.isLink(current.mode)) {
                                var link = FS.readlink(current_path);
                                current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
                                var lookup = FS.lookupPath(current_path, {recurse_count: opts.recurse_count + 1});
                                current = lookup.node;
                                if (count++ > 40) {
                                    throw new FS.ErrnoError(32)
                                }
                            }
                        }
                    }
                    return {path: current_path, node: current}
                },
                getPath: node => {
                    var path;
                    while (true) {
                        if (FS.isRoot(node)) {
                            var mount = node.mount.mountpoint;
                            if (!path) return mount;
                            return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path
                        }
                        path = path ? node.name + "/" + path : node.name;
                        node = node.parent
                    }
                },
                hashName: (parentid, name) => {
                    var hash = 0;
                    for (var i = 0; i < name.length; i++) {
                        hash = (hash << 5) - hash + name.charCodeAt(i) | 0
                    }
                    return (parentid + hash >>> 0) % FS.nameTable.length
                },
                hashAddNode: node => {
                    var hash = FS.hashName(node.parent.id, node.name);
                    node.name_next = FS.nameTable[hash];
                    FS.nameTable[hash] = node
                },
                hashRemoveNode: node => {
                    var hash = FS.hashName(node.parent.id, node.name);
                    if (FS.nameTable[hash] === node) {
                        FS.nameTable[hash] = node.name_next
                    } else {
                        var current = FS.nameTable[hash];
                        while (current) {
                            if (current.name_next === node) {
                                current.name_next = node.name_next;
                                break
                            }
                            current = current.name_next
                        }
                    }
                },
                lookupNode: (parent, name) => {
                    var errCode = FS.mayLookup(parent);
                    if (errCode) {
                        throw new FS.ErrnoError(errCode, parent)
                    }
                    var hash = FS.hashName(parent.id, name);
                    for (var node = FS.nameTable[hash]; node; node = node.name_next) {
                        var nodeName = node.name;
                        if (node.parent.id === parent.id && nodeName === name) {
                            return node
                        }
                    }
                    return FS.lookup(parent, name)
                },
                createNode: (parent, name, mode, rdev) => {
                    var node = new FS.FSNode(parent, name, mode, rdev);
                    FS.hashAddNode(node);
                    return node
                },
                destroyNode: node => {
                    FS.hashRemoveNode(node)
                },
                isRoot: node => {
                    return node === node.parent
                },
                isMountpoint: node => {
                    return !!node.mounted
                },
                isFile: mode => {
                    return (mode & 61440) === 32768
                },
                isDir: mode => {
                    return (mode & 61440) === 16384
                },
                isLink: mode => {
                    return (mode & 61440) === 40960
                },
                isChrdev: mode => {
                    return (mode & 61440) === 8192
                },
                isBlkdev: mode => {
                    return (mode & 61440) === 24576
                },
                isFIFO: mode => {
                    return (mode & 61440) === 4096
                },
                isSocket: mode => {
                    return (mode & 49152) === 49152
                },
                flagModes: {"r": 0, "r+": 2, "w": 577, "w+": 578, "a": 1089, "a+": 1090},
                modeStringToFlags: str => {
                    var flags = FS.flagModes[str];
                    if (typeof flags == "undefined") {
                        throw new Error("Unknown file open mode: " + str)
                    }
                    return flags
                },
                flagsToPermissionString: flag => {
                    var perms = ["r", "w", "rw"][flag & 3];
                    if (flag & 512) {
                        perms += "w"
                    }
                    return perms
                },
                nodePermissions: (node, perms) => {
                    if (FS.ignorePermissions) {
                        return 0
                    }
                    if (perms.includes("r") && !(node.mode & 292)) {
                        return 2
                    } else if (perms.includes("w") && !(node.mode & 146)) {
                        return 2
                    } else if (perms.includes("x") && !(node.mode & 73)) {
                        return 2
                    }
                    return 0
                },
                mayLookup: dir => {
                    var errCode = FS.nodePermissions(dir, "x");
                    if (errCode) return errCode;
                    if (!dir.node_ops.lookup) return 2;
                    return 0
                },
                mayCreate: (dir, name) => {
                    try {
                        var node = FS.lookupNode(dir, name);
                        return 20
                    } catch (e) {
                    }
                    return FS.nodePermissions(dir, "wx")
                },
                mayDelete: (dir, name, isdir) => {
                    var node;
                    try {
                        node = FS.lookupNode(dir, name)
                    } catch (e) {
                        return e.errno
                    }
                    var errCode = FS.nodePermissions(dir, "wx");
                    if (errCode) {
                        return errCode
                    }
                    if (isdir) {
                        if (!FS.isDir(node.mode)) {
                            return 54
                        }
                        if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
                            return 10
                        }
                    } else {
                        if (FS.isDir(node.mode)) {
                            return 31
                        }
                    }
                    return 0
                },
                mayOpen: (node, flags) => {
                    if (!node) {
                        return 44
                    }
                    if (FS.isLink(node.mode)) {
                        return 32
                    } else if (FS.isDir(node.mode)) {
                        if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
                            return 31
                        }
                    }
                    return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
                },
                MAX_OPEN_FDS: 4096,
                nextfd: (fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => {
                    for (var fd = fd_start; fd <= fd_end; fd++) {
                        if (!FS.streams[fd]) {
                            return fd
                        }
                    }
                    throw new FS.ErrnoError(33)
                },
                getStream: fd => FS.streams[fd],
                createStream: (stream, fd_start, fd_end) => {
                    if (!FS.FSStream) {
                        FS.FSStream = function () {
                            this.shared = {}
                        };
                        FS.FSStream.prototype = {};
                        Object.defineProperties(FS.FSStream.prototype, {
                            object: {
                                get: function () {
                                    return this.node
                                }, set: function (val) {
                                    this.node = val
                                }
                            }, isRead: {
                                get: function () {
                                    return (this.flags & 2097155) !== 1
                                }
                            }, isWrite: {
                                get: function () {
                                    return (this.flags & 2097155) !== 0
                                }
                            }, isAppend: {
                                get: function () {
                                    return this.flags & 1024
                                }
                            }, flags: {
                                get: function () {
                                    return this.shared.flags
                                }, set: function (val) {
                                    this.shared.flags = val
                                }
                            }, position: {
                                get: function () {
                                    return this.shared.position
                                }, set: function (val) {
                                    this.shared.position = val
                                }
                            }
                        })
                    }
                    stream = Object.assign(new FS.FSStream, stream);
                    var fd = FS.nextfd(fd_start, fd_end);
                    stream.fd = fd;
                    FS.streams[fd] = stream;
                    return stream
                },
                closeStream: fd => {
                    FS.streams[fd] = null
                },
                chrdev_stream_ops: {
                    open: stream => {
                        var device = FS.getDevice(stream.node.rdev);
                        stream.stream_ops = device.stream_ops;
                        if (stream.stream_ops.open) {
                            stream.stream_ops.open(stream)
                        }
                    }, llseek: () => {
                        throw new FS.ErrnoError(70)
                    }
                },
                major: dev => dev >> 8,
                minor: dev => dev & 255,
                makedev: (ma, mi) => ma << 8 | mi,
                registerDevice: (dev, ops) => {
                    FS.devices[dev] = {stream_ops: ops}
                },
                getDevice: dev => FS.devices[dev],
                getMounts: mount => {
                    var mounts = [];
                    var check = [mount];
                    while (check.length) {
                        var m = check.pop();
                        mounts.push(m);
                        check.push.apply(check, m.mounts)
                    }
                    return mounts
                },
                syncfs: (populate, callback) => {
                    if (typeof populate == "function") {
                        callback = populate;
                        populate = false
                    }
                    FS.syncFSRequests++;
                    if (FS.syncFSRequests > 1) {
                        err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work")
                    }
                    var mounts = FS.getMounts(FS.root.mount);
                    var completed = 0;

                    function doCallback(errCode) {
                        FS.syncFSRequests--;
                        return callback(errCode)
                    }

                    function done(errCode) {
                        if (errCode) {
                            if (!done.errored) {
                                done.errored = true;
                                return doCallback(errCode)
                            }
                            return
                        }
                        if (++completed >= mounts.length) {
                            doCallback(null)
                        }
                    }

                    mounts.forEach(mount => {
                        if (!mount.type.syncfs) {
                            return done(null)
                        }
                        mount.type.syncfs(mount, populate, done)
                    })
                },
                mount: (type, opts, mountpoint) => {
                    var root = mountpoint === "/";
                    var pseudo = !mountpoint;
                    var node;
                    if (root && FS.root) {
                        throw new FS.ErrnoError(10)
                    } else if (!root && !pseudo) {
                        var lookup = FS.lookupPath(mountpoint, {follow_mount: false});
                        mountpoint = lookup.path;
                        node = lookup.node;
                        if (FS.isMountpoint(node)) {
                            throw new FS.ErrnoError(10)
                        }
                        if (!FS.isDir(node.mode)) {
                            throw new FS.ErrnoError(54)
                        }
                    }
                    var mount = {type: type, opts: opts, mountpoint: mountpoint, mounts: []};
                    var mountRoot = type.mount(mount);
                    mountRoot.mount = mount;
                    mount.root = mountRoot;
                    if (root) {
                        FS.root = mountRoot
                    } else if (node) {
                        node.mounted = mount;
                        if (node.mount) {
                            node.mount.mounts.push(mount)
                        }
                    }
                    return mountRoot
                },
                unmount: mountpoint => {
                    var lookup = FS.lookupPath(mountpoint, {follow_mount: false});
                    if (!FS.isMountpoint(lookup.node)) {
                        throw new FS.ErrnoError(28)
                    }
                    var node = lookup.node;
                    var mount = node.mounted;
                    var mounts = FS.getMounts(mount);
                    Object.keys(FS.nameTable).forEach(hash => {
                        var current = FS.nameTable[hash];
                        while (current) {
                            var next = current.name_next;
                            if (mounts.includes(current.mount)) {
                                FS.destroyNode(current)
                            }
                            current = next
                        }
                    });
                    node.mounted = null;
                    var idx = node.mount.mounts.indexOf(mount);
                    node.mount.mounts.splice(idx, 1)
                },
                lookup: (parent, name) => {
                    return parent.node_ops.lookup(parent, name)
                },
                mknod: (path, mode, dev) => {
                    var lookup = FS.lookupPath(path, {parent: true});
                    var parent = lookup.node;
                    var name = PATH.basename(path);
                    if (!name || name === "." || name === "..") {
                        throw new FS.ErrnoError(28)
                    }
                    var errCode = FS.mayCreate(parent, name);
                    if (errCode) {
                        throw new FS.ErrnoError(errCode)
                    }
                    if (!parent.node_ops.mknod) {
                        throw new FS.ErrnoError(63)
                    }
                    return parent.node_ops.mknod(parent, name, mode, dev)
                },
                create: (path, mode) => {
                    mode = mode !== undefined ? mode : 438;
                    mode &= 4095;
                    mode |= 32768;
                    return FS.mknod(path, mode, 0)
                },
                mkdir: (path, mode) => {
                    mode = mode !== undefined ? mode : 511;
                    mode &= 511 | 512;
                    mode |= 16384;
                    return FS.mknod(path, mode, 0)
                },
                mkdirTree: (path, mode) => {
                    var dirs = path.split("/");
                    var d = "";
                    for (var i = 0; i < dirs.length; ++i) {
                        if (!dirs[i]) continue;
                        d += "/" + dirs[i];
                        try {
                            FS.mkdir(d, mode)
                        } catch (e) {
                            if (e.errno != 20) throw e
                        }
                    }
                },
                mkdev: (path, mode, dev) => {
                    if (typeof dev == "undefined") {
                        dev = mode;
                        mode = 438
                    }
                    mode |= 8192;
                    return FS.mknod(path, mode, dev)
                },
                symlink: (oldpath, newpath) => {
                    if (!PATH_FS.resolve(oldpath)) {
                        throw new FS.ErrnoError(44)
                    }
                    var lookup = FS.lookupPath(newpath, {parent: true});
                    var parent = lookup.node;
                    if (!parent) {
                        throw new FS.ErrnoError(44)
                    }
                    var newname = PATH.basename(newpath);
                    var errCode = FS.mayCreate(parent, newname);
                    if (errCode) {
                        throw new FS.ErrnoError(errCode)
                    }
                    if (!parent.node_ops.symlink) {
                        throw new FS.ErrnoError(63)
                    }
                    return parent.node_ops.symlink(parent, newname, oldpath)
                },
                rename: (old_path, new_path) => {
                    var old_dirname = PATH.dirname(old_path);
                    var new_dirname = PATH.dirname(new_path);
                    var old_name = PATH.basename(old_path);
                    var new_name = PATH.basename(new_path);
                    var lookup, old_dir, new_dir;
                    lookup = FS.lookupPath(old_path, {parent: true});
                    old_dir = lookup.node;
                    lookup = FS.lookupPath(new_path, {parent: true});
                    new_dir = lookup.node;
                    if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
                    if (old_dir.mount !== new_dir.mount) {
                        throw new FS.ErrnoError(75)
                    }
                    var old_node = FS.lookupNode(old_dir, old_name);
                    var relative = PATH_FS.relative(old_path, new_dirname);
                    if (relative.charAt(0) !== ".") {
                        throw new FS.ErrnoError(28)
                    }
                    relative = PATH_FS.relative(new_path, old_dirname);
                    if (relative.charAt(0) !== ".") {
                        throw new FS.ErrnoError(55)
                    }
                    var new_node;
                    try {
                        new_node = FS.lookupNode(new_dir, new_name)
                    } catch (e) {
                    }
                    if (old_node === new_node) {
                        return
                    }
                    var isdir = FS.isDir(old_node.mode);
                    var errCode = FS.mayDelete(old_dir, old_name, isdir);
                    if (errCode) {
                        throw new FS.ErrnoError(errCode)
                    }
                    errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
                    if (errCode) {
                        throw new FS.ErrnoError(errCode)
                    }
                    if (!old_dir.node_ops.rename) {
                        throw new FS.ErrnoError(63)
                    }
                    if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
                        throw new FS.ErrnoError(10)
                    }
                    if (new_dir !== old_dir) {
                        errCode = FS.nodePermissions(old_dir, "w");
                        if (errCode) {
                            throw new FS.ErrnoError(errCode)
                        }
                    }
                    FS.hashRemoveNode(old_node);
                    try {
                        old_dir.node_ops.rename(old_node, new_dir, new_name)
                    } catch (e) {
                        throw e
                    } finally {
                        FS.hashAddNode(old_node)
                    }
                },
                rmdir: path => {
                    var lookup = FS.lookupPath(path, {parent: true});
                    var parent = lookup.node;
                    var name = PATH.basename(path);
                    var node = FS.lookupNode(parent, name);
                    var errCode = FS.mayDelete(parent, name, true);
                    if (errCode) {
                        throw new FS.ErrnoError(errCode)
                    }
                    if (!parent.node_ops.rmdir) {
                        throw new FS.ErrnoError(63)
                    }
                    if (FS.isMountpoint(node)) {
                        throw new FS.ErrnoError(10)
                    }
                    parent.node_ops.rmdir(parent, name);
                    FS.destroyNode(node)
                },
                readdir: path => {
                    var lookup = FS.lookupPath(path, {follow: true});
                    var node = lookup.node;
                    if (!node.node_ops.readdir) {
                        throw new FS.ErrnoError(54)
                    }
                    return node.node_ops.readdir(node)
                },
                unlink: path => {
                    var lookup = FS.lookupPath(path, {parent: true});
                    var parent = lookup.node;
                    if (!parent) {
                        throw new FS.ErrnoError(44)
                    }
                    var name = PATH.basename(path);
                    var node = FS.lookupNode(parent, name);
                    var errCode = FS.mayDelete(parent, name, false);
                    if (errCode) {
                        throw new FS.ErrnoError(errCode)
                    }
                    if (!parent.node_ops.unlink) {
                        throw new FS.ErrnoError(63)
                    }
                    if (FS.isMountpoint(node)) {
                        throw new FS.ErrnoError(10)
                    }
                    parent.node_ops.unlink(parent, name);
                    FS.destroyNode(node)
                },
                readlink: path => {
                    var lookup = FS.lookupPath(path);
                    var link = lookup.node;
                    if (!link) {
                        throw new FS.ErrnoError(44)
                    }
                    if (!link.node_ops.readlink) {
                        throw new FS.ErrnoError(28)
                    }
                    return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link))
                },
                stat: (path, dontFollow) => {
                    var lookup = FS.lookupPath(path, {follow: !dontFollow});
                    var node = lookup.node;
                    if (!node) {
                        throw new FS.ErrnoError(44)
                    }
                    if (!node.node_ops.getattr) {
                        throw new FS.ErrnoError(63)
                    }
                    return node.node_ops.getattr(node)
                },
                lstat: path => {
                    return FS.stat(path, true)
                },
                chmod: (path, mode, dontFollow) => {
                    var node;
                    if (typeof path == "string") {
                        var lookup = FS.lookupPath(path, {follow: !dontFollow});
                        node = lookup.node
                    } else {
                        node = path
                    }
                    if (!node.node_ops.setattr) {
                        throw new FS.ErrnoError(63)
                    }
                    node.node_ops.setattr(node, {mode: mode & 4095 | node.mode & ~4095, timestamp: Date.now()})
                },
                lchmod: (path, mode) => {
                    FS.chmod(path, mode, true)
                },
                fchmod: (fd, mode) => {
                    var stream = FS.getStream(fd);
                    if (!stream) {
                        throw new FS.ErrnoError(8)
                    }
                    FS.chmod(stream.node, mode)
                },
                chown: (path, uid, gid, dontFollow) => {
                    var node;
                    if (typeof path == "string") {
                        var lookup = FS.lookupPath(path, {follow: !dontFollow});
                        node = lookup.node
                    } else {
                        node = path
                    }
                    if (!node.node_ops.setattr) {
                        throw new FS.ErrnoError(63)
                    }
                    node.node_ops.setattr(node, {timestamp: Date.now()})
                },
                lchown: (path, uid, gid) => {
                    FS.chown(path, uid, gid, true)
                },
                fchown: (fd, uid, gid) => {
                    var stream = FS.getStream(fd);
                    if (!stream) {
                        throw new FS.ErrnoError(8)
                    }
                    FS.chown(stream.node, uid, gid)
                },
                truncate: (path, len) => {
                    if (len < 0) {
                        throw new FS.ErrnoError(28)
                    }
                    var node;
                    if (typeof path == "string") {
                        var lookup = FS.lookupPath(path, {follow: true});
                        node = lookup.node
                    } else {
                        node = path
                    }
                    if (!node.node_ops.setattr) {
                        throw new FS.ErrnoError(63)
                    }
                    if (FS.isDir(node.mode)) {
                        throw new FS.ErrnoError(31)
                    }
                    if (!FS.isFile(node.mode)) {
                        throw new FS.ErrnoError(28)
                    }
                    var errCode = FS.nodePermissions(node, "w");
                    if (errCode) {
                        throw new FS.ErrnoError(errCode)
                    }
                    node.node_ops.setattr(node, {size: len, timestamp: Date.now()})
                },
                ftruncate: (fd, len) => {
                    var stream = FS.getStream(fd);
                    if (!stream) {
                        throw new FS.ErrnoError(8)
                    }
                    if ((stream.flags & 2097155) === 0) {
                        throw new FS.ErrnoError(28)
                    }
                    FS.truncate(stream.node, len)
                },
                utime: (path, atime, mtime) => {
                    var lookup = FS.lookupPath(path, {follow: true});
                    var node = lookup.node;
                    node.node_ops.setattr(node, {timestamp: Math.max(atime, mtime)})
                },
                open: (path, flags, mode) => {
                    if (path === "") {
                        throw new FS.ErrnoError(44)
                    }
                    flags = typeof flags == "string" ? FS.modeStringToFlags(flags) : flags;
                    mode = typeof mode == "undefined" ? 438 : mode;
                    if (flags & 64) {
                        mode = mode & 4095 | 32768
                    } else {
                        mode = 0
                    }
                    var node;
                    if (typeof path == "object") {
                        node = path
                    } else {
                        path = PATH.normalize(path);
                        try {
                            var lookup = FS.lookupPath(path, {follow: !(flags & 131072)});
                            node = lookup.node
                        } catch (e) {
                        }
                    }
                    var created = false;
                    if (flags & 64) {
                        if (node) {
                            if (flags & 128) {
                                throw new FS.ErrnoError(20)
                            }
                        } else {
                            node = FS.mknod(path, mode, 0);
                            created = true
                        }
                    }
                    if (!node) {
                        throw new FS.ErrnoError(44)
                    }
                    if (FS.isChrdev(node.mode)) {
                        flags &= ~512
                    }
                    if (flags & 65536 && !FS.isDir(node.mode)) {
                        throw new FS.ErrnoError(54)
                    }
                    if (!created) {
                        var errCode = FS.mayOpen(node, flags);
                        if (errCode) {
                            throw new FS.ErrnoError(errCode)
                        }
                    }
                    if (flags & 512 && !created) {
                        FS.truncate(node, 0)
                    }
                    flags &= ~(128 | 512 | 131072);
                    var stream = FS.createStream({
                        node: node,
                        path: FS.getPath(node),
                        flags: flags,
                        seekable: true,
                        position: 0,
                        stream_ops: node.stream_ops,
                        ungotten: [],
                        error: false
                    });
                    if (stream.stream_ops.open) {
                        stream.stream_ops.open(stream)
                    }
                    if (Module["logReadFiles"] && !(flags & 1)) {
                        if (!FS.readFiles) FS.readFiles = {};
                        if (!(path in FS.readFiles)) {
                            FS.readFiles[path] = 1
                        }
                    }
                    return stream
                },
                close: stream => {
                    if (FS.isClosed(stream)) {
                        throw new FS.ErrnoError(8)
                    }
                    if (stream.getdents) stream.getdents = null;
                    try {
                        if (stream.stream_ops.close) {
                            stream.stream_ops.close(stream)
                        }
                    } catch (e) {
                        throw e
                    } finally {
                        FS.closeStream(stream.fd)
                    }
                    stream.fd = null
                },
                isClosed: stream => {
                    return stream.fd === null
                },
                llseek: (stream, offset, whence) => {
                    if (FS.isClosed(stream)) {
                        throw new FS.ErrnoError(8)
                    }
                    if (!stream.seekable || !stream.stream_ops.llseek) {
                        throw new FS.ErrnoError(70)
                    }
                    if (whence != 0 && whence != 1 && whence != 2) {
                        throw new FS.ErrnoError(28)
                    }
                    stream.position = stream.stream_ops.llseek(stream, offset, whence);
                    stream.ungotten = [];
                    return stream.position
                },
                read: (stream, buffer, offset, length, position) => {
                    if (length < 0 || position < 0) {
                        throw new FS.ErrnoError(28)
                    }
                    if (FS.isClosed(stream)) {
                        throw new FS.ErrnoError(8)
                    }
                    if ((stream.flags & 2097155) === 1) {
                        throw new FS.ErrnoError(8)
                    }
                    if (FS.isDir(stream.node.mode)) {
                        throw new FS.ErrnoError(31)
                    }
                    if (!stream.stream_ops.read) {
                        throw new FS.ErrnoError(28)
                    }
                    var seeking = typeof position != "undefined";
                    if (!seeking) {
                        position = stream.position
                    } else if (!stream.seekable) {
                        throw new FS.ErrnoError(70)
                    }
                    var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
                    if (!seeking) stream.position += bytesRead;
                    return bytesRead
                },
                write: (stream, buffer, offset, length, position, canOwn) => {
                    if (length < 0 || position < 0) {
                        throw new FS.ErrnoError(28)
                    }
                    if (FS.isClosed(stream)) {
                        throw new FS.ErrnoError(8)
                    }
                    if ((stream.flags & 2097155) === 0) {
                        throw new FS.ErrnoError(8)
                    }
                    if (FS.isDir(stream.node.mode)) {
                        throw new FS.ErrnoError(31)
                    }
                    if (!stream.stream_ops.write) {
                        throw new FS.ErrnoError(28)
                    }
                    if (stream.seekable && stream.flags & 1024) {
                        FS.llseek(stream, 0, 2)
                    }
                    var seeking = typeof position != "undefined";
                    if (!seeking) {
                        position = stream.position
                    } else if (!stream.seekable) {
                        throw new FS.ErrnoError(70)
                    }
                    var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
                    if (!seeking) stream.position += bytesWritten;
                    return bytesWritten
                },
                allocate: (stream, offset, length) => {
                    if (FS.isClosed(stream)) {
                        throw new FS.ErrnoError(8)
                    }
                    if (offset < 0 || length <= 0) {
                        throw new FS.ErrnoError(28)
                    }
                    if ((stream.flags & 2097155) === 0) {
                        throw new FS.ErrnoError(8)
                    }
                    if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
                        throw new FS.ErrnoError(43)
                    }
                    if (!stream.stream_ops.allocate) {
                        throw new FS.ErrnoError(138)
                    }
                    stream.stream_ops.allocate(stream, offset, length)
                },
                mmap: (stream, length, position, prot, flags) => {
                    if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
                        throw new FS.ErrnoError(2)
                    }
                    if ((stream.flags & 2097155) === 1) {
                        throw new FS.ErrnoError(2)
                    }
                    if (!stream.stream_ops.mmap) {
                        throw new FS.ErrnoError(43)
                    }
                    return stream.stream_ops.mmap(stream, length, position, prot, flags)
                },
                msync: (stream, buffer, offset, length, mmapFlags) => {
                    if (!stream || !stream.stream_ops.msync) {
                        return 0
                    }
                    return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
                },
                munmap: stream => 0,
                ioctl: (stream, cmd, arg) => {
                    if (!stream.stream_ops.ioctl) {
                        throw new FS.ErrnoError(59)
                    }
                    return stream.stream_ops.ioctl(stream, cmd, arg)
                },
                readFile: (path, opts = {}) => {
                    opts.flags = opts.flags || 0;
                    opts.encoding = opts.encoding || "binary";
                    if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
                        throw new Error('Invalid encoding type "' + opts.encoding + '"')
                    }
                    var ret;
                    var stream = FS.open(path, opts.flags);
                    var stat = FS.stat(path);
                    var length = stat.size;
                    var buf = new Uint8Array(length);
                    FS.read(stream, buf, 0, length, 0);
                    if (opts.encoding === "utf8") {
                        ret = UTF8ArrayToString(buf, 0)
                    } else if (opts.encoding === "binary") {
                        ret = buf
                    }
                    FS.close(stream);
                    return ret
                },
                writeFile: (path, data, opts = {}) => {
                    opts.flags = opts.flags || 577;
                    var stream = FS.open(path, opts.flags, opts.mode);
                    if (typeof data == "string") {
                        var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
                        var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
                        FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
                    } else if (ArrayBuffer.isView(data)) {
                        FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
                    } else {
                        throw new Error("Unsupported data type")
                    }
                    FS.close(stream)
                },
                cwd: () => FS.currentPath,
                chdir: path => {
                    var lookup = FS.lookupPath(path, {follow: true});
                    if (lookup.node === null) {
                        throw new FS.ErrnoError(44)
                    }
                    if (!FS.isDir(lookup.node.mode)) {
                        throw new FS.ErrnoError(54)
                    }
                    var errCode = FS.nodePermissions(lookup.node, "x");
                    if (errCode) {
                        throw new FS.ErrnoError(errCode)
                    }
                    FS.currentPath = lookup.path
                },
                createDefaultDirectories: () => {
                    FS.mkdir("/tmp");
                    FS.mkdir("/home");
                    FS.mkdir("/home/web_user")
                },
                createDefaultDevices: () => {
                    FS.mkdir("/dev");
                    FS.registerDevice(FS.makedev(1, 3), {
                        read: () => 0,
                        write: (stream, buffer, offset, length, pos) => length
                    });
                    FS.mkdev("/dev/null", FS.makedev(1, 3));
                    TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
                    TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
                    FS.mkdev("/dev/tty", FS.makedev(5, 0));
                    FS.mkdev("/dev/tty1", FS.makedev(6, 0));
                    var random_device = getRandomDevice();
                    FS.createDevice("/dev", "random", random_device);
                    FS.createDevice("/dev", "urandom", random_device);
                    FS.mkdir("/dev/shm");
                    FS.mkdir("/dev/shm/tmp")
                },
                createSpecialDirectories: () => {
                    FS.mkdir("/proc");
                    var proc_self = FS.mkdir("/proc/self");
                    FS.mkdir("/proc/self/fd");
                    FS.mount({
                        mount: () => {
                            var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
                            node.node_ops = {
                                lookup: (parent, name) => {
                                    var fd = +name;
                                    var stream = FS.getStream(fd);
                                    if (!stream) throw new FS.ErrnoError(8);
                                    var ret = {
                                        parent: null,
                                        mount: {mountpoint: "fake"},
                                        node_ops: {readlink: () => stream.path}
                                    };
                                    ret.parent = ret;
                                    return ret
                                }
                            };
                            return node
                        }
                    }, {}, "/proc/self/fd")
                },
                createStandardStreams: () => {
                    if (Module["stdin"]) {
                        FS.createDevice("/dev", "stdin", Module["stdin"])
                    } else {
                        FS.symlink("/dev/tty", "/dev/stdin")
                    }
                    if (Module["stdout"]) {
                        FS.createDevice("/dev", "stdout", null, Module["stdout"])
                    } else {
                        FS.symlink("/dev/tty", "/dev/stdout")
                    }
                    if (Module["stderr"]) {
                        FS.createDevice("/dev", "stderr", null, Module["stderr"])
                    } else {
                        FS.symlink("/dev/tty1", "/dev/stderr")
                    }
                    var stdin = FS.open("/dev/stdin", 0);
                    var stdout = FS.open("/dev/stdout", 1);
                    var stderr = FS.open("/dev/stderr", 1)
                },
                ensureErrnoError: () => {
                    if (FS.ErrnoError) return;
                    FS.ErrnoError = function ErrnoError(errno, node) {
                        this.node = node;
                        this.setErrno = function (errno) {
                            this.errno = errno
                        };
                        this.setErrno(errno);
                        this.message = "FS error"
                    };
                    FS.ErrnoError.prototype = new Error;
                    FS.ErrnoError.prototype.constructor = FS.ErrnoError;
                    [44].forEach(code => {
                        FS.genericErrors[code] = new FS.ErrnoError(code);
                        FS.genericErrors[code].stack = "<generic error, no stack>"
                    })
                },
                staticInit: () => {
                    FS.ensureErrnoError();
                    FS.nameTable = new Array(4096);
                    FS.mount(MEMFS, {}, "/");
                    FS.createDefaultDirectories();
                    FS.createDefaultDevices();
                    FS.createSpecialDirectories();
                    FS.filesystems = {"MEMFS": MEMFS}
                },
                init: (input, output, error) => {
                    FS.init.initialized = true;
                    FS.ensureErrnoError();
                    Module["stdin"] = input || Module["stdin"];
                    Module["stdout"] = output || Module["stdout"];
                    Module["stderr"] = error || Module["stderr"];
                    FS.createStandardStreams()
                },
                quit: () => {
                    FS.init.initialized = false;
                    _fflush(0);
                    for (var i = 0; i < FS.streams.length; i++) {
                        var stream = FS.streams[i];
                        if (!stream) {
                            continue
                        }
                        FS.close(stream)
                    }
                },
                getMode: (canRead, canWrite) => {
                    var mode = 0;
                    if (canRead) mode |= 292 | 73;
                    if (canWrite) mode |= 146;
                    return mode
                },
                findObject: (path, dontResolveLastLink) => {
                    var ret = FS.analyzePath(path, dontResolveLastLink);
                    if (!ret.exists) {
                        return null
                    }
                    return ret.object
                },
                analyzePath: (path, dontResolveLastLink) => {
                    try {
                        var lookup = FS.lookupPath(path, {follow: !dontResolveLastLink});
                        path = lookup.path
                    } catch (e) {
                    }
                    var ret = {
                        isRoot: false,
                        exists: false,
                        error: 0,
                        name: null,
                        path: null,
                        object: null,
                        parentExists: false,
                        parentPath: null,
                        parentObject: null
                    };
                    try {
                        var lookup = FS.lookupPath(path, {parent: true});
                        ret.parentExists = true;
                        ret.parentPath = lookup.path;
                        ret.parentObject = lookup.node;
                        ret.name = PATH.basename(path);
                        lookup = FS.lookupPath(path, {follow: !dontResolveLastLink});
                        ret.exists = true;
                        ret.path = lookup.path;
                        ret.object = lookup.node;
                        ret.name = lookup.node.name;
                        ret.isRoot = lookup.path === "/"
                    } catch (e) {
                        ret.error = e.errno
                    }
                    return ret
                },
                createPath: (parent, path, canRead, canWrite) => {
                    parent = typeof parent == "string" ? parent : FS.getPath(parent);
                    var parts = path.split("/").reverse();
                    while (parts.length) {
                        var part = parts.pop();
                        if (!part) continue;
                        var current = PATH.join2(parent, part);
                        try {
                            FS.mkdir(current)
                        } catch (e) {
                        }
                        parent = current
                    }
                    return current
                },
                createFile: (parent, name, properties, canRead, canWrite) => {
                    var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
                    var mode = FS.getMode(canRead, canWrite);
                    return FS.create(path, mode)
                },
                createDataFile: (parent, name, data, canRead, canWrite, canOwn) => {
                    var path = name;
                    if (parent) {
                        parent = typeof parent == "string" ? parent : FS.getPath(parent);
                        path = name ? PATH.join2(parent, name) : parent
                    }
                    var mode = FS.getMode(canRead, canWrite);
                    var node = FS.create(path, mode);
                    if (data) {
                        if (typeof data == "string") {
                            var arr = new Array(data.length);
                            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
                            data = arr
                        }
                        FS.chmod(node, mode | 146);
                        var stream = FS.open(node, 577);
                        FS.write(stream, data, 0, data.length, 0, canOwn);
                        FS.close(stream);
                        FS.chmod(node, mode)
                    }
                    return node
                },
                createDevice: (parent, name, input, output) => {
                    var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
                    var mode = FS.getMode(!!input, !!output);
                    if (!FS.createDevice.major) FS.createDevice.major = 64;
                    var dev = FS.makedev(FS.createDevice.major++, 0);
                    FS.registerDevice(dev, {
                        open: stream => {
                            stream.seekable = false
                        }, close: stream => {
                            if (output && output.buffer && output.buffer.length) {
                                output(10)
                            }
                        }, read: (stream, buffer, offset, length, pos) => {
                            var bytesRead = 0;
                            for (var i = 0; i < length; i++) {
                                var result;
                                try {
                                    result = input()
                                } catch (e) {
                                    throw new FS.ErrnoError(29)
                                }
                                if (result === undefined && bytesRead === 0) {
                                    throw new FS.ErrnoError(6)
                                }
                                if (result === null || result === undefined) break;
                                bytesRead++;
                                buffer[offset + i] = result
                            }
                            if (bytesRead) {
                                stream.node.timestamp = Date.now()
                            }
                            return bytesRead
                        }, write: (stream, buffer, offset, length, pos) => {
                            for (var i = 0; i < length; i++) {
                                try {
                                    output(buffer[offset + i])
                                } catch (e) {
                                    throw new FS.ErrnoError(29)
                                }
                            }
                            if (length) {
                                stream.node.timestamp = Date.now()
                            }
                            return i
                        }
                    });
                    return FS.mkdev(path, mode, dev)
                },
                forceLoadFile: obj => {
                    if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
                    if (typeof XMLHttpRequest != "undefined") {
                        throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")
                    } else if (read_) {
                        try {
                            obj.contents = intArrayFromString(read_(obj.url), true);
                            obj.usedBytes = obj.contents.length
                        } catch (e) {
                            throw new FS.ErrnoError(29)
                        }
                    } else {
                        throw new Error("Cannot load without read() or XMLHttpRequest.")
                    }
                },
                createLazyFile: (parent, name, url, canRead, canWrite) => {
                    function LazyUint8Array() {
                        this.lengthKnown = false;
                        this.chunks = []
                    }

                    LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
                        if (idx > this.length - 1 || idx < 0) {
                            return undefined
                        }
                        var chunkOffset = idx % this.chunkSize;
                        var chunkNum = idx / this.chunkSize | 0;
                        return this.getter(chunkNum)[chunkOffset]
                    };
                    LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
                        this.getter = getter
                    };
                    LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
                        var xhr = new XMLHttpRequest;
                        xhr.open("HEAD", url, false);
                        xhr.send(null);
                        if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                        var datalength = Number(xhr.getResponseHeader("Content-length"));
                        var header;
                        var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
                        var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
                        var chunkSize = 1024 * 1024;
                        if (!hasByteServing) chunkSize = datalength;
                        var doXHR = (from, to) => {
                            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                            if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
                            var xhr = new XMLHttpRequest;
                            xhr.open("GET", url, false);
                            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
                            xhr.responseType = "arraybuffer";
                            if (xhr.overrideMimeType) {
                                xhr.overrideMimeType("text/plain; charset=x-user-defined")
                            }
                            xhr.send(null);
                            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                            if (xhr.response !== undefined) {
                                return new Uint8Array(xhr.response || [])
                            }
                            return intArrayFromString(xhr.responseText || "", true)
                        };
                        var lazyArray = this;
                        lazyArray.setDataGetter(chunkNum => {
                            var start = chunkNum * chunkSize;
                            var end = (chunkNum + 1) * chunkSize - 1;
                            end = Math.min(end, datalength - 1);
                            if (typeof lazyArray.chunks[chunkNum] == "undefined") {
                                lazyArray.chunks[chunkNum] = doXHR(start, end)
                            }
                            if (typeof lazyArray.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
                            return lazyArray.chunks[chunkNum]
                        });
                        if (usesGzip || !datalength) {
                            chunkSize = datalength = 1;
                            datalength = this.getter(0).length;
                            chunkSize = datalength;
                            out("LazyFiles on gzip forces download of the whole file when length is accessed")
                        }
                        this._length = datalength;
                        this._chunkSize = chunkSize;
                        this.lengthKnown = true
                    };
                    if (typeof XMLHttpRequest != "undefined") {
                        if (!ENVIRONMENT_IS_WORKER) throw"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                        var lazyArray = new LazyUint8Array;
                        Object.defineProperties(lazyArray, {
                            length: {
                                get: function () {
                                    if (!this.lengthKnown) {
                                        this.cacheLength()
                                    }
                                    return this._length
                                }
                            }, chunkSize: {
                                get: function () {
                                    if (!this.lengthKnown) {
                                        this.cacheLength()
                                    }
                                    return this._chunkSize
                                }
                            }
                        });
                        var properties = {isDevice: false, contents: lazyArray}
                    } else {
                        var properties = {isDevice: false, url: url}
                    }
                    var node = FS.createFile(parent, name, properties, canRead, canWrite);
                    if (properties.contents) {
                        node.contents = properties.contents
                    } else if (properties.url) {
                        node.contents = null;
                        node.url = properties.url
                    }
                    Object.defineProperties(node, {
                        usedBytes: {
                            get: function () {
                                return this.contents.length
                            }
                        }
                    });
                    var stream_ops = {};
                    var keys = Object.keys(node.stream_ops);
                    keys.forEach(key => {
                        var fn = node.stream_ops[key];
                        stream_ops[key] = function forceLoadLazyFile() {
                            FS.forceLoadFile(node);
                            return fn.apply(null, arguments)
                        }
                    });

                    function writeChunks(stream, buffer, offset, length, position) {
                        var contents = stream.node.contents;
                        if (position >= contents.length) return 0;
                        var size = Math.min(contents.length - position, length);
                        if (contents.slice) {
                            for (var i = 0; i < size; i++) {
                                buffer[offset + i] = contents[position + i]
                            }
                        } else {
                            for (var i = 0; i < size; i++) {
                                buffer[offset + i] = contents.get(position + i)
                            }
                        }
                        return size
                    }

                    stream_ops.read = (stream, buffer, offset, length, position) => {
                        FS.forceLoadFile(node);
                        return writeChunks(stream, buffer, offset, length, position)
                    };
                    stream_ops.mmap = (stream, length, position, prot, flags) => {
                        FS.forceLoadFile(node);
                        var ptr = mmapAlloc(length);
                        if (!ptr) {
                            throw new FS.ErrnoError(48)
                        }
                        writeChunks(stream, HEAP8, ptr, length, position);
                        return {ptr: ptr, allocated: true}
                    };
                    node.stream_ops = stream_ops;
                    return node
                },
                createPreloadedFile: (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
                    var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
                    var dep = getUniqueRunDependency("cp " + fullname);

                    function processData(byteArray) {
                        function finish(byteArray) {
                            if (preFinish) preFinish();
                            if (!dontCreateFile) {
                                FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn)
                            }
                            if (onload) onload();
                            removeRunDependency(dep)
                        }

                        if (Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => {
                            if (onerror) onerror();
                            removeRunDependency(dep)
                        })) {
                            return
                        }
                        finish(byteArray)
                    }

                    addRunDependency(dep);
                    if (typeof url == "string") {
                        asyncLoad(url, byteArray => processData(byteArray), onerror)
                    } else {
                        processData(url)
                    }
                },
                indexedDB: () => {
                    return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
                },
                DB_NAME: () => {
                    return "EM_FS_" + window.location.pathname
                },
                DB_VERSION: 20,
                DB_STORE_NAME: "FILE_DATA",
                saveFilesToDB: (paths, onload, onerror) => {
                    onload = onload || (() => {
                    });
                    onerror = onerror || (() => {
                    });
                    var indexedDB = FS.indexedDB();
                    try {
                        var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
                    } catch (e) {
                        return onerror(e)
                    }
                    openRequest.onupgradeneeded = () => {
                        out("creating db");
                        var db = openRequest.result;
                        db.createObjectStore(FS.DB_STORE_NAME)
                    };
                    openRequest.onsuccess = () => {
                        var db = openRequest.result;
                        var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
                        var files = transaction.objectStore(FS.DB_STORE_NAME);
                        var ok = 0, fail = 0, total = paths.length;

                        function finish() {
                            if (fail == 0) onload(); else onerror()
                        }

                        paths.forEach(path => {
                            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
                            putRequest.onsuccess = () => {
                                ok++;
                                if (ok + fail == total) finish()
                            };
                            putRequest.onerror = () => {
                                fail++;
                                if (ok + fail == total) finish()
                            }
                        });
                        transaction.onerror = onerror
                    };
                    openRequest.onerror = onerror
                },
                loadFilesFromDB: (paths, onload, onerror) => {
                    onload = onload || (() => {
                    });
                    onerror = onerror || (() => {
                    });
                    var indexedDB = FS.indexedDB();
                    try {
                        var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
                    } catch (e) {
                        return onerror(e)
                    }
                    openRequest.onupgradeneeded = onerror;
                    openRequest.onsuccess = () => {
                        var db = openRequest.result;
                        try {
                            var transaction = db.transaction([FS.DB_STORE_NAME], "readonly")
                        } catch (e) {
                            onerror(e);
                            return
                        }
                        var files = transaction.objectStore(FS.DB_STORE_NAME);
                        var ok = 0, fail = 0, total = paths.length;

                        function finish() {
                            if (fail == 0) onload(); else onerror()
                        }

                        paths.forEach(path => {
                            var getRequest = files.get(path);
                            getRequest.onsuccess = () => {
                                if (FS.analyzePath(path).exists) {
                                    FS.unlink(path)
                                }
                                FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
                                ok++;
                                if (ok + fail == total) finish()
                            };
                            getRequest.onerror = () => {
                                fail++;
                                if (ok + fail == total) finish()
                            }
                        });
                        transaction.onerror = onerror
                    };
                    openRequest.onerror = onerror
                }
            };
            var SYSCALLS = {
                DEFAULT_POLLMASK: 5, calculateAt: function (dirfd, path, allowEmpty) {
                    if (PATH.isAbs(path)) {
                        return path
                    }
                    var dir;
                    if (dirfd === -100) {
                        dir = FS.cwd()
                    } else {
                        var dirstream = FS.getStream(dirfd);
                        if (!dirstream) throw new FS.ErrnoError(8);
                        dir = dirstream.path
                    }
                    if (path.length == 0) {
                        if (!allowEmpty) {
                            throw new FS.ErrnoError(44)
                        }
                        return dir
                    }
                    return PATH.join2(dir, path)
                }, doStat: function (func, path, buf) {
                    try {
                        var stat = func(path)
                    } catch (e) {
                        if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
                            return -54
                        }
                        throw e
                    }
                    HEAP32[buf >> 2] = stat.dev;
                    HEAP32[buf + 8 >> 2] = stat.ino;
                    HEAP32[buf + 12 >> 2] = stat.mode;
                    HEAP32[buf + 16 >> 2] = stat.nlink;
                    HEAP32[buf + 20 >> 2] = stat.uid;
                    HEAP32[buf + 24 >> 2] = stat.gid;
                    HEAP32[buf + 28 >> 2] = stat.rdev;
                    HEAP64[buf + 40 >> 3] = BigInt(stat.size);
                    HEAP32[buf + 48 >> 2] = 4096;
                    HEAP32[buf + 52 >> 2] = stat.blocks;
                    HEAP64[buf + 56 >> 3] = BigInt(Math.floor(stat.atime.getTime() / 1e3));
                    HEAP32[buf + 64 >> 2] = 0;
                    HEAP64[buf + 72 >> 3] = BigInt(Math.floor(stat.mtime.getTime() / 1e3));
                    HEAP32[buf + 80 >> 2] = 0;
                    HEAP64[buf + 88 >> 3] = BigInt(Math.floor(stat.ctime.getTime() / 1e3));
                    HEAP32[buf + 96 >> 2] = 0;
                    HEAP64[buf + 104 >> 3] = BigInt(stat.ino);
                    return 0
                }, doMsync: function (addr, stream, len, flags, offset) {
                    var buffer = HEAPU8.slice(addr, addr + len);
                    FS.msync(stream, buffer, offset, len, flags)
                }, varargs: undefined, get: function () {
                    SYSCALLS.varargs += 4;
                    var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
                    return ret
                }, getStr: function (ptr) {
                    var ret = UTF8ToString(ptr);
                    return ret
                }, getStreamFromFD: function (fd) {
                    var stream = FS.getStream(fd);
                    if (!stream) throw new FS.ErrnoError(8);
                    return stream
                }
            };

            function ___syscall_chdir(path) {
                try {
                    path = SYSCALLS.getStr(path);
                    FS.chdir(path);
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_chmod(path, mode) {
                try {
                    path = SYSCALLS.getStr(path);
                    FS.chmod(path, mode);
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_dup3(fd, suggestFD, flags) {
                try {
                    var old = SYSCALLS.getStreamFromFD(fd);
                    if (old.fd === suggestFD) return -28;
                    var suggest = FS.getStream(suggestFD);
                    if (suggest) FS.close(suggest);
                    return FS.createStream(old, suggestFD, suggestFD + 1).fd
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_faccessat(dirfd, path, amode, flags) {
                try {
                    path = SYSCALLS.getStr(path);
                    path = SYSCALLS.calculateAt(dirfd, path);
                    if (amode & ~7) {
                        return -28
                    }
                    var lookup = FS.lookupPath(path, {follow: true});
                    var node = lookup.node;
                    if (!node) {
                        return -44
                    }
                    var perms = "";
                    if (amode & 4) perms += "r";
                    if (amode & 2) perms += "w";
                    if (amode & 1) perms += "x";
                    if (perms && FS.nodePermissions(node, perms)) {
                        return -2
                    }
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function setErrNo(value) {
                HEAP32[___errno_location() >> 2] = value;
                return value
            }

            function ___syscall_fcntl64(fd, cmd, varargs) {
                SYSCALLS.varargs = varargs;
                try {
                    var stream = SYSCALLS.getStreamFromFD(fd);
                    switch (cmd) {
                        case 0: {
                            var arg = SYSCALLS.get();
                            if (arg < 0) {
                                return -28
                            }
                            var newStream;
                            newStream = FS.createStream(stream, arg);
                            return newStream.fd
                        }
                        case 1:
                        case 2:
                            return 0;
                        case 3:
                            return stream.flags;
                        case 4: {
                            var arg = SYSCALLS.get();
                            stream.flags |= arg;
                            return 0
                        }
                        case 5: {
                            var arg = SYSCALLS.get();
                            var offset = 0;
                            HEAP16[arg + offset >> 1] = 2;
                            return 0
                        }
                        case 6:
                        case 7:
                            return 0;
                        case 16:
                        case 8:
                            return -28;
                        case 9:
                            setErrNo(28);
                            return -1;
                        default: {
                            return -28
                        }
                    }
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_fstat64(fd, buf) {
                try {
                    var stream = SYSCALLS.getStreamFromFD(fd);
                    return SYSCALLS.doStat(FS.stat, stream.path, buf)
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            var MAX_INT53 = 9007199254740992;
            var MIN_INT53 = -9007199254740992;

            function bigintToI53Checked(num) {
                return num < MIN_INT53 || num > MAX_INT53 ? NaN : Number(num)
            }

            function ___syscall_ftruncate64(fd, length) {
                try {
                    length = bigintToI53Checked(length);
                    if (isNaN(length)) return -61;
                    FS.ftruncate(fd, length);
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_getcwd(buf, size) {
                try {
                    if (size === 0) return -28;
                    var cwd = FS.cwd();
                    var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
                    if (size < cwdLengthInBytes) return -68;
                    stringToUTF8(cwd, buf, size);
                    return cwdLengthInBytes
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_getdents64(fd, dirp, count) {
                try {
                    var stream = SYSCALLS.getStreamFromFD(fd);
                    if (!stream.getdents) {
                        stream.getdents = FS.readdir(stream.path)
                    }
                    var struct_size = 280;
                    var pos = 0;
                    var off = FS.llseek(stream, 0, 1);
                    var idx = Math.floor(off / struct_size);
                    while (idx < stream.getdents.length && pos + struct_size <= count) {
                        var id;
                        var type;
                        var name = stream.getdents[idx];
                        if (name === ".") {
                            id = stream.node.id;
                            type = 4
                        } else if (name === "..") {
                            var lookup = FS.lookupPath(stream.path, {parent: true});
                            id = lookup.node.id;
                            type = 4
                        } else {
                            var child = FS.lookupNode(stream.node, name);
                            id = child.id;
                            type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8
                        }
                        HEAP64[dirp + pos >> 3] = BigInt(id);
                        HEAP64[dirp + pos + 8 >> 3] = BigInt((idx + 1) * struct_size);
                        HEAP16[dirp + pos + 16 >> 1] = 280;
                        HEAP8[dirp + pos + 18 >> 0] = type;
                        stringToUTF8(name, dirp + pos + 19, 256);
                        pos += struct_size;
                        idx += 1
                    }
                    FS.llseek(stream, idx * struct_size, 0);
                    return pos
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_ioctl(fd, op, varargs) {
                SYSCALLS.varargs = varargs;
                try {
                    var stream = SYSCALLS.getStreamFromFD(fd);
                    switch (op) {
                        case 21509:
                        case 21505: {
                            if (!stream.tty) return -59;
                            return 0
                        }
                        case 21510:
                        case 21511:
                        case 21512:
                        case 21506:
                        case 21507:
                        case 21508: {
                            if (!stream.tty) return -59;
                            return 0
                        }
                        case 21519: {
                            if (!stream.tty) return -59;
                            var argp = SYSCALLS.get();
                            HEAP32[argp >> 2] = 0;
                            return 0
                        }
                        case 21520: {
                            if (!stream.tty) return -59;
                            return -28
                        }
                        case 21531: {
                            var argp = SYSCALLS.get();
                            return FS.ioctl(stream, op, argp)
                        }
                        case 21523: {
                            if (!stream.tty) return -59;
                            return 0
                        }
                        case 21524: {
                            if (!stream.tty) return -59;
                            return 0
                        }
                        default:
                            return -28
                    }
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_lstat64(path, buf) {
                try {
                    path = SYSCALLS.getStr(path);
                    return SYSCALLS.doStat(FS.lstat, path, buf)
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_mkdirat(dirfd, path, mode) {
                try {
                    path = SYSCALLS.getStr(path);
                    path = SYSCALLS.calculateAt(dirfd, path);
                    path = PATH.normalize(path);
                    if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
                    FS.mkdir(path, mode, 0);
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_newfstatat(dirfd, path, buf, flags) {
                try {
                    path = SYSCALLS.getStr(path);
                    var nofollow = flags & 256;
                    var allowEmpty = flags & 4096;
                    flags = flags & ~4352;
                    path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
                    return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf)
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_openat(dirfd, path, flags, varargs) {
                SYSCALLS.varargs = varargs;
                try {
                    path = SYSCALLS.getStr(path);
                    path = SYSCALLS.calculateAt(dirfd, path);
                    var mode = varargs ? SYSCALLS.get() : 0;
                    return FS.open(path, flags, mode).fd
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_poll(fds, nfds, timeout) {
                try {
                    var nonzero = 0;
                    for (var i = 0; i < nfds; i++) {
                        var pollfd = fds + 8 * i;
                        var fd = HEAP32[pollfd >> 2];
                        var events = HEAP16[pollfd + 4 >> 1];
                        var mask = 32;
                        var stream = FS.getStream(fd);
                        if (stream) {
                            mask = SYSCALLS.DEFAULT_POLLMASK;
                            if (stream.stream_ops.poll) {
                                mask = stream.stream_ops.poll(stream)
                            }
                        }
                        mask &= events | 8 | 16;
                        if (mask) nonzero++;
                        HEAP16[pollfd + 6 >> 1] = mask
                    }
                    return nonzero
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
                try {
                    path = SYSCALLS.getStr(path);
                    path = SYSCALLS.calculateAt(dirfd, path);
                    if (bufsize <= 0) return -28;
                    var ret = FS.readlink(path);
                    var len = Math.min(bufsize, lengthBytesUTF8(ret));
                    var endChar = HEAP8[buf + len];
                    stringToUTF8(ret, buf, bufsize + 1);
                    HEAP8[buf + len] = endChar;
                    return len
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_renameat(olddirfd, oldpath, newdirfd, newpath) {
                try {
                    oldpath = SYSCALLS.getStr(oldpath);
                    newpath = SYSCALLS.getStr(newpath);
                    oldpath = SYSCALLS.calculateAt(olddirfd, oldpath);
                    newpath = SYSCALLS.calculateAt(newdirfd, newpath);
                    FS.rename(oldpath, newpath);
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_rmdir(path) {
                try {
                    path = SYSCALLS.getStr(path);
                    FS.rmdir(path);
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_stat64(path, buf) {
                try {
                    path = SYSCALLS.getStr(path);
                    return SYSCALLS.doStat(FS.stat, path, buf)
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_symlink(target, linkpath) {
                try {
                    target = SYSCALLS.getStr(target);
                    linkpath = SYSCALLS.getStr(linkpath);
                    FS.symlink(target, linkpath);
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function ___syscall_unlinkat(dirfd, path, flags) {
                try {
                    path = SYSCALLS.getStr(path);
                    path = SYSCALLS.calculateAt(dirfd, path);
                    if (flags === 0) {
                        FS.unlink(path)
                    } else if (flags === 512) {
                        FS.rmdir(path)
                    } else {
                        abort("Invalid flags passed to unlinkat")
                    }
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function readI53FromI64(ptr) {
                return HEAPU32[ptr >> 2] + HEAP32[ptr + 4 >> 2] * 4294967296
            }

            function ___syscall_utimensat(dirfd, path, times, flags) {
                try {
                    path = SYSCALLS.getStr(path);
                    path = SYSCALLS.calculateAt(dirfd, path, true);
                    if (!times) {
                        var atime = Date.now();
                        var mtime = atime
                    } else {
                        var seconds = readI53FromI64(times);
                        var nanoseconds = HEAP32[times + 8 >> 2];
                        atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
                        times += 16;
                        seconds = readI53FromI64(times);
                        nanoseconds = HEAP32[times + 8 >> 2];
                        mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3)
                    }
                    FS.utime(path, atime, mtime);
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function __emscripten_date_now() {
                return Date.now()
            }

            var nowIsMonotonic = true;

            function __emscripten_get_now_is_monotonic() {
                return nowIsMonotonic
            }

            function __emscripten_throw_longjmp() {
                throw Infinity
            }

            function __localtime_js(time, tmPtr) {
                var date = new Date(readI53FromI64(time) * 1e3);
                HEAP32[tmPtr >> 2] = date.getSeconds();
                HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
                HEAP32[tmPtr + 8 >> 2] = date.getHours();
                HEAP32[tmPtr + 12 >> 2] = date.getDate();
                HEAP32[tmPtr + 16 >> 2] = date.getMonth();
                HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
                HEAP32[tmPtr + 24 >> 2] = date.getDay();
                var start = new Date(date.getFullYear(), 0, 1);
                var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
                HEAP32[tmPtr + 28 >> 2] = yday;
                HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
                var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
                var winterOffset = start.getTimezoneOffset();
                var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
                HEAP32[tmPtr + 32 >> 2] = dst
            }

            function __mktime_js(tmPtr) {
                var date = new Date(HEAP32[tmPtr + 20 >> 2] + 1900, HEAP32[tmPtr + 16 >> 2], HEAP32[tmPtr + 12 >> 2], HEAP32[tmPtr + 8 >> 2], HEAP32[tmPtr + 4 >> 2], HEAP32[tmPtr >> 2], 0);
                var dst = HEAP32[tmPtr + 32 >> 2];
                var guessedOffset = date.getTimezoneOffset();
                var start = new Date(date.getFullYear(), 0, 1);
                var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
                var winterOffset = start.getTimezoneOffset();
                var dstOffset = Math.min(winterOffset, summerOffset);
                if (dst < 0) {
                    HEAP32[tmPtr + 32 >> 2] = Number(summerOffset != winterOffset && dstOffset == guessedOffset)
                } else if (dst > 0 != (dstOffset == guessedOffset)) {
                    var nonDstOffset = Math.max(winterOffset, summerOffset);
                    var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
                    date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4)
                }
                HEAP32[tmPtr + 24 >> 2] = date.getDay();
                var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
                HEAP32[tmPtr + 28 >> 2] = yday;
                HEAP32[tmPtr >> 2] = date.getSeconds();
                HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
                HEAP32[tmPtr + 8 >> 2] = date.getHours();
                HEAP32[tmPtr + 12 >> 2] = date.getDate();
                HEAP32[tmPtr + 16 >> 2] = date.getMonth();
                return date.getTime() / 1e3 | 0
            }

            function __munmap_js(addr, len, prot, flags, fd, offset) {
                try {
                    var stream = FS.getStream(fd);
                    if (stream) {
                        if (prot & 2) {
                            SYSCALLS.doMsync(addr, stream, len, flags, offset)
                        }
                        FS.munmap(stream)
                    }
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return -e.errno
                }
            }

            function allocateUTF8(str) {
                var size = lengthBytesUTF8(str) + 1;
                var ret = _malloc(size);
                if (ret) stringToUTF8Array(str, HEAP8, ret, size);
                return ret
            }

            function _tzset_impl(timezone, daylight, tzname) {
                var currentYear = (new Date).getFullYear();
                var winter = new Date(currentYear, 0, 1);
                var summer = new Date(currentYear, 6, 1);
                var winterOffset = winter.getTimezoneOffset();
                var summerOffset = summer.getTimezoneOffset();
                var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
                HEAP32[timezone >> 2] = stdTimezoneOffset * 60;
                HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);

                function extractZone(date) {
                    var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
                    return match ? match[1] : "GMT"
                }

                var winterName = extractZone(winter);
                var summerName = extractZone(summer);
                var winterNamePtr = allocateUTF8(winterName);
                var summerNamePtr = allocateUTF8(summerName);
                if (summerOffset < winterOffset) {
                    HEAPU32[tzname >> 2] = winterNamePtr;
                    HEAPU32[tzname + 4 >> 2] = summerNamePtr
                } else {
                    HEAPU32[tzname >> 2] = summerNamePtr;
                    HEAPU32[tzname + 4 >> 2] = winterNamePtr
                }
            }

            function __tzset_js(timezone, daylight, tzname) {
                if (__tzset_js.called) return;
                __tzset_js.called = true;
                _tzset_impl(timezone, daylight, tzname)
            }

            function _abort() {
                abort("")
            }

            var readAsmConstArgsArray = [];

            function readAsmConstArgs(sigPtr, buf) {
                readAsmConstArgsArray.length = 0;
                var ch;
                buf >>= 2;
                while (ch = HEAPU8[sigPtr++]) {
                    buf += ch != 105 & buf;
                    readAsmConstArgsArray.push(ch == 105 ? HEAP32[buf] : (ch == 106 ? HEAP64 : HEAPF64)[buf++ >> 1]);
                    ++buf
                }
                return readAsmConstArgsArray
            }

            function _emscripten_asm_const_int(code, sigPtr, argbuf) {
                var args = readAsmConstArgs(sigPtr, argbuf);
                return ASM_CONSTS[code].apply(null, args)
            }

            var _emscripten_asm_const_ptr = _emscripten_asm_const_int;

            function getHeapMax() {
                return 2147483648
            }

            function _emscripten_get_heap_max() {
                return getHeapMax()
            }

            var _emscripten_get_now;
            if (ENVIRONMENT_IS_NODE) {
                _emscripten_get_now = () => {
                    var t = process["hrtime"]();
                    return t[0] * 1e3 + t[1] / 1e6
                }
            } else _emscripten_get_now = () => performance.now();

            function _emscripten_memcpy_big(dest, src, num) {
                HEAPU8.copyWithin(dest, src, src + num)
            }

            function emscripten_realloc_buffer(size) {
                try {
                    wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
                    updateGlobalBufferAndViews(wasmMemory.buffer);
                    return 1
                } catch (e) {
                }
            }

            function _emscripten_resize_heap(requestedSize) {
                var oldSize = HEAPU8.length;
                requestedSize = requestedSize >>> 0;
                var maxHeapSize = getHeapMax();
                if (requestedSize > maxHeapSize) {
                    return false
                }
                let alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
                for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
                    var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
                    overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
                    var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
                    var replacement = emscripten_realloc_buffer(newSize);
                    if (replacement) {
                        return true
                    }
                }
                return false
            }

            function _emscripten_run_script(ptr) {
                eval(UTF8ToString(ptr))
            }

            var ENV = {};

            function getExecutableName() {
                return thisProgram || "./this.program"
            }

            function getEnvStrings() {
                if (!getEnvStrings.strings) {
                    var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
                    var env = {
                        "USER": "web_user",
                        "LOGNAME": "web_user",
                        "PATH": "/",
                        "PWD": "/",
                        "HOME": "/home/web_user",
                        "LANG": lang,
                        "_": getExecutableName()
                    };
                    for (var x in ENV) {
                        if (ENV[x] === undefined) delete env[x]; else env[x] = ENV[x]
                    }
                    var strings = [];
                    for (var x in env) {
                        strings.push(x + "=" + env[x])
                    }
                    getEnvStrings.strings = strings
                }
                return getEnvStrings.strings
            }

            function writeAsciiToMemory(str, buffer, dontAddNull) {
                for (var i = 0; i < str.length; ++i) {
                    HEAP8[buffer++ >> 0] = str.charCodeAt(i)
                }
                if (!dontAddNull) HEAP8[buffer >> 0] = 0
            }

            function _environ_get(__environ, environ_buf) {
                var bufSize = 0;
                getEnvStrings().forEach(function (string, i) {
                    var ptr = environ_buf + bufSize;
                    HEAPU32[__environ + i * 4 >> 2] = ptr;
                    writeAsciiToMemory(string, ptr);
                    bufSize += string.length + 1
                });
                return 0
            }

            function _environ_sizes_get(penviron_count, penviron_buf_size) {
                var strings = getEnvStrings();
                HEAPU32[penviron_count >> 2] = strings.length;
                var bufSize = 0;
                strings.forEach(function (string) {
                    bufSize += string.length + 1
                });
                HEAPU32[penviron_buf_size >> 2] = bufSize;
                return 0
            }

            function _proc_exit(code) {
                EXITSTATUS = code;
                if (!keepRuntimeAlive()) {
                    if (Module["onExit"]) Module["onExit"](code);
                    ABORT = true
                }
                quit_(code, new ExitStatus(code))
            }

            function exitJS(status, implicit) {
                EXITSTATUS = status;
                if (!keepRuntimeAlive()) {
                    exitRuntime()
                }
                _proc_exit(status)
            }

            var _exit = exitJS;

            function _fd_close(fd) {
                try {
                    var stream = SYSCALLS.getStreamFromFD(fd);
                    FS.close(stream);
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return e.errno
                }
            }

            function _fd_fdstat_get(fd, pbuf) {
                try {
                    var stream = SYSCALLS.getStreamFromFD(fd);
                    var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
                    HEAP8[pbuf >> 0] = type;
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return e.errno
                }
            }

            function doReadv(stream, iov, iovcnt, offset) {
                var ret = 0;
                for (var i = 0; i < iovcnt; i++) {
                    var ptr = HEAPU32[iov >> 2];
                    var len = HEAPU32[iov + 4 >> 2];
                    iov += 8;
                    var curr = FS.read(stream, HEAP8, ptr, len, offset);
                    if (curr < 0) return -1;
                    ret += curr;
                    if (curr < len) break
                }
                return ret
            }

            function _fd_read(fd, iov, iovcnt, pnum) {
                try {
                    var stream = SYSCALLS.getStreamFromFD(fd);
                    var num = doReadv(stream, iov, iovcnt);
                    HEAP32[pnum >> 2] = num;
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return e.errno
                }
            }

            function _fd_seek(fd, offset, whence, newOffset) {
                try {
                    offset = bigintToI53Checked(offset);
                    if (isNaN(offset)) return 61;
                    var stream = SYSCALLS.getStreamFromFD(fd);
                    FS.llseek(stream, offset, whence);
                    HEAP64[newOffset >> 3] = BigInt(stream.position);
                    if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return e.errno
                }
            }

            function doWritev(stream, iov, iovcnt, offset) {
                var ret = 0;
                for (var i = 0; i < iovcnt; i++) {
                    var ptr = HEAPU32[iov >> 2];
                    var len = HEAPU32[iov + 4 >> 2];
                    iov += 8;
                    var curr = FS.write(stream, HEAP8, ptr, len, offset);
                    if (curr < 0) return -1;
                    ret += curr
                }
                return ret
            }

            function _fd_write(fd, iov, iovcnt, pnum) {
                try {
                    var stream = SYSCALLS.getStreamFromFD(fd);
                    var num = doWritev(stream, iov, iovcnt);
                    HEAPU32[pnum >> 2] = num;
                    return 0
                } catch (e) {
                    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
                    return e.errno
                }
            }

            function _getTempRet0() {
                return getTempRet0()
            }

            function _setTempRet0(val) {
                setTempRet0(val)
            }

            function __isLeapYear(year) {
                return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
            }

            function __arraySum(array, index) {
                var sum = 0;
                for (var i = 0; i <= index; sum += array[i++]) {
                }
                return sum
            }

            var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            function __addDays(date, days) {
                var newDate = new Date(date.getTime());
                while (days > 0) {
                    var leap = __isLeapYear(newDate.getFullYear());
                    var currentMonth = newDate.getMonth();
                    var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
                    if (days > daysInCurrentMonth - newDate.getDate()) {
                        days -= daysInCurrentMonth - newDate.getDate() + 1;
                        newDate.setDate(1);
                        if (currentMonth < 11) {
                            newDate.setMonth(currentMonth + 1)
                        } else {
                            newDate.setMonth(0);
                            newDate.setFullYear(newDate.getFullYear() + 1)
                        }
                    } else {
                        newDate.setDate(newDate.getDate() + days);
                        return newDate
                    }
                }
                return newDate
            }

            function _strftime(s, maxsize, format, tm) {
                var tm_zone = HEAP32[tm + 40 >> 2];
                var date = {
                    tm_sec: HEAP32[tm >> 2],
                    tm_min: HEAP32[tm + 4 >> 2],
                    tm_hour: HEAP32[tm + 8 >> 2],
                    tm_mday: HEAP32[tm + 12 >> 2],
                    tm_mon: HEAP32[tm + 16 >> 2],
                    tm_year: HEAP32[tm + 20 >> 2],
                    tm_wday: HEAP32[tm + 24 >> 2],
                    tm_yday: HEAP32[tm + 28 >> 2],
                    tm_isdst: HEAP32[tm + 32 >> 2],
                    tm_gmtoff: HEAP32[tm + 36 >> 2],
                    tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
                };
                var pattern = UTF8ToString(format);
                var EXPANSION_RULES_1 = {
                    "%c": "%a %b %d %H:%M:%S %Y",
                    "%D": "%m/%d/%y",
                    "%F": "%Y-%m-%d",
                    "%h": "%b",
                    "%r": "%I:%M:%S %p",
                    "%R": "%H:%M",
                    "%T": "%H:%M:%S",
                    "%x": "%m/%d/%y",
                    "%X": "%H:%M:%S",
                    "%Ec": "%c",
                    "%EC": "%C",
                    "%Ex": "%m/%d/%y",
                    "%EX": "%H:%M:%S",
                    "%Ey": "%y",
                    "%EY": "%Y",
                    "%Od": "%d",
                    "%Oe": "%e",
                    "%OH": "%H",
                    "%OI": "%I",
                    "%Om": "%m",
                    "%OM": "%M",
                    "%OS": "%S",
                    "%Ou": "%u",
                    "%OU": "%U",
                    "%OV": "%V",
                    "%Ow": "%w",
                    "%OW": "%W",
                    "%Oy": "%y"
                };
                for (var rule in EXPANSION_RULES_1) {
                    pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule])
                }
                var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                function leadingSomething(value, digits, character) {
                    var str = typeof value == "number" ? value.toString() : value || "";
                    while (str.length < digits) {
                        str = character[0] + str
                    }
                    return str
                }

                function leadingNulls(value, digits) {
                    return leadingSomething(value, digits, "0")
                }

                function compareByDay(date1, date2) {
                    function sgn(value) {
                        return value < 0 ? -1 : value > 0 ? 1 : 0
                    }

                    var compare;
                    if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
                        if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
                            compare = sgn(date1.getDate() - date2.getDate())
                        }
                    }
                    return compare
                }

                function getFirstWeekStartDate(janFourth) {
                    switch (janFourth.getDay()) {
                        case 0:
                            return new Date(janFourth.getFullYear() - 1, 11, 29);
                        case 1:
                            return janFourth;
                        case 2:
                            return new Date(janFourth.getFullYear(), 0, 3);
                        case 3:
                            return new Date(janFourth.getFullYear(), 0, 2);
                        case 4:
                            return new Date(janFourth.getFullYear(), 0, 1);
                        case 5:
                            return new Date(janFourth.getFullYear() - 1, 11, 31);
                        case 6:
                            return new Date(janFourth.getFullYear() - 1, 11, 30)
                    }
                }

                function getWeekBasedYear(date) {
                    var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
                    var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
                    var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
                    var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
                    var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
                    if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
                        if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
                            return thisDate.getFullYear() + 1
                        }
                        return thisDate.getFullYear()
                    }
                    return thisDate.getFullYear() - 1
                }

                var EXPANSION_RULES_2 = {
                    "%a": function (date) {
                        return WEEKDAYS[date.tm_wday].substring(0, 3)
                    }, "%A": function (date) {
                        return WEEKDAYS[date.tm_wday]
                    }, "%b": function (date) {
                        return MONTHS[date.tm_mon].substring(0, 3)
                    }, "%B": function (date) {
                        return MONTHS[date.tm_mon]
                    }, "%C": function (date) {
                        var year = date.tm_year + 1900;
                        return leadingNulls(year / 100 | 0, 2)
                    }, "%d": function (date) {
                        return leadingNulls(date.tm_mday, 2)
                    }, "%e": function (date) {
                        return leadingSomething(date.tm_mday, 2, " ")
                    }, "%g": function (date) {
                        return getWeekBasedYear(date).toString().substring(2)
                    }, "%G": function (date) {
                        return getWeekBasedYear(date)
                    }, "%H": function (date) {
                        return leadingNulls(date.tm_hour, 2)
                    }, "%I": function (date) {
                        var twelveHour = date.tm_hour;
                        if (twelveHour == 0) twelveHour = 12; else if (twelveHour > 12) twelveHour -= 12;
                        return leadingNulls(twelveHour, 2)
                    }, "%j": function (date) {
                        return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3)
                    }, "%m": function (date) {
                        return leadingNulls(date.tm_mon + 1, 2)
                    }, "%M": function (date) {
                        return leadingNulls(date.tm_min, 2)
                    }, "%n": function () {
                        return "\n"
                    }, "%p": function (date) {
                        if (date.tm_hour >= 0 && date.tm_hour < 12) {
                            return "AM"
                        }
                        return "PM"
                    }, "%S": function (date) {
                        return leadingNulls(date.tm_sec, 2)
                    }, "%t": function () {
                        return "\t"
                    }, "%u": function (date) {
                        return date.tm_wday || 7
                    }, "%U": function (date) {
                        var days = date.tm_yday + 7 - date.tm_wday;
                        return leadingNulls(Math.floor(days / 7), 2)
                    }, "%V": function (date) {
                        var val = Math.floor((date.tm_yday + 7 - (date.tm_wday + 6) % 7) / 7);
                        if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
                            val++
                        }
                        if (!val) {
                            val = 52;
                            var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
                            if (dec31 == 4 || dec31 == 5 && __isLeapYear(date.tm_year % 400 - 1)) {
                                val++
                            }
                        } else if (val == 53) {
                            var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
                            if (jan1 != 4 && (jan1 != 3 || !__isLeapYear(date.tm_year))) val = 1
                        }
                        return leadingNulls(val, 2)
                    }, "%w": function (date) {
                        return date.tm_wday
                    }, "%W": function (date) {
                        var days = date.tm_yday + 7 - (date.tm_wday + 6) % 7;
                        return leadingNulls(Math.floor(days / 7), 2)
                    }, "%y": function (date) {
                        return (date.tm_year + 1900).toString().substring(2)
                    }, "%Y": function (date) {
                        return date.tm_year + 1900
                    }, "%z": function (date) {
                        var off = date.tm_gmtoff;
                        var ahead = off >= 0;
                        off = Math.abs(off) / 60;
                        off = off / 60 * 100 + off % 60;
                        return (ahead ? "+" : "-") + String("0000" + off).slice(-4)
                    }, "%Z": function (date) {
                        return date.tm_zone
                    }, "%%": function () {
                        return "%"
                    }
                };
                pattern = pattern.replace(/%%/g, "\0\0");
                for (var rule in EXPANSION_RULES_2) {
                    if (pattern.includes(rule)) {
                        pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date))
                    }
                }
                pattern = pattern.replace(/\0\0/g, "%");
                var bytes = intArrayFromString(pattern, false);
                if (bytes.length > maxsize) {
                    return 0
                }
                writeArrayToMemory(bytes, s);
                return bytes.length - 1
            }

            var ALLOC_NORMAL = 0;
            var ALLOC_STACK = 1;

            function allocate(slab, allocator) {
                var ret;
                if (allocator == ALLOC_STACK) {
                    ret = stackAlloc(slab.length)
                } else {
                    ret = _malloc(slab.length)
                }
                if (!slab.subarray && !slab.slice) {
                    slab = new Uint8Array(slab)
                }
                HEAPU8.set(slab, ret);
                return ret
            }

            function getCFunc(ident) {
                var func = Module["_" + ident];
                return func
            }

            function ccall(ident, returnType, argTypes, args, opts) {
                var toC = {
                    "string": str => {
                        var ret = 0;
                        if (str !== null && str !== undefined && str !== 0) {
                            var len = (str.length << 2) + 1;
                            ret = stackAlloc(len);
                            stringToUTF8(str, ret, len)
                        }
                        return ret
                    }, "array": arr => {
                        var ret = stackAlloc(arr.length);
                        writeArrayToMemory(arr, ret);
                        return ret
                    }
                };

                function convertReturnValue(ret) {
                    if (returnType === "string") {
                        return UTF8ToString(ret)
                    }
                    if (returnType === "boolean") return Boolean(ret);
                    return ret
                }

                var func = getCFunc(ident);
                var cArgs = [];
                var stack = 0;
                if (args) {
                    for (var i = 0; i < args.length; i++) {
                        var converter = toC[argTypes[i]];
                        if (converter) {
                            if (stack === 0) stack = stackSave();
                            cArgs[i] = converter(args[i])
                        } else {
                            cArgs[i] = args[i]
                        }
                    }
                }
                var ret = func.apply(null, cArgs);

                function onDone(ret) {
                    if (stack !== 0) stackRestore(stack);
                    return convertReturnValue(ret)
                }

                ret = onDone(ret);
                return ret
            }

            function cwrap(ident, returnType, argTypes, opts) {
                argTypes = argTypes || [];
                var numericArgs = argTypes.every(type => type === "number" || type === "boolean");
                var numericRet = returnType !== "string";
                if (numericRet && numericArgs && !opts) {
                    return getCFunc(ident)
                }
                return function () {
                    return ccall(ident, returnType, argTypes, arguments, opts)
                }
            }

            var FSNode = function (parent, name, mode, rdev) {
                if (!parent) {
                    parent = this
                }
                this.parent = parent;
                this.mount = parent.mount;
                this.mounted = null;
                this.id = FS.nextInode++;
                this.name = name;
                this.mode = mode;
                this.node_ops = {};
                this.stream_ops = {};
                this.rdev = rdev
            };
            var readMode = 292 | 73;
            var writeMode = 146;
            Object.defineProperties(FSNode.prototype, {
                read: {
                    get: function () {
                        return (this.mode & readMode) === readMode
                    }, set: function (val) {
                        val ? this.mode |= readMode : this.mode &= ~readMode
                    }
                }, write: {
                    get: function () {
                        return (this.mode & writeMode) === writeMode
                    }, set: function (val) {
                        val ? this.mode |= writeMode : this.mode &= ~writeMode
                    }
                }, isFolder: {
                    get: function () {
                        return FS.isDir(this.mode)
                    }
                }, isDevice: {
                    get: function () {
                        return FS.isChrdev(this.mode)
                    }
                }
            });
            FS.FSNode = FSNode;
            FS.staticInit();
            Module["FS_createPath"] = FS.createPath;
            Module["FS_createDataFile"] = FS.createDataFile;
            Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
            Module["FS_unlink"] = FS.unlink;
            Module["FS_createLazyFile"] = FS.createLazyFile;
            Module["FS_createDevice"] = FS.createDevice;
            var asmLibraryArg = {
                "P": ___call_sighandler,
                "fa": ___syscall_chdir,
                "ea": ___syscall_chmod,
                "da": ___syscall_dup3,
                "ga": ___syscall_faccessat,
                "n": ___syscall_fcntl64,
                "Z": ___syscall_fstat64,
                "V": ___syscall_ftruncate64,
                "U": ___syscall_getcwd,
                "O": ___syscall_getdents64,
                "w": ___syscall_ioctl,
                "W": ___syscall_lstat64,
                "S": ___syscall_mkdirat,
                "X": ___syscall_newfstatat,
                "x": ___syscall_openat,
                "Q": ___syscall_poll,
                "N": ___syscall_readlinkat,
                "L": ___syscall_renameat,
                "t": ___syscall_rmdir,
                "Y": ___syscall_stat64,
                "K": ___syscall_symlink,
                "M": ___syscall_unlinkat,
                "I": ___syscall_utimensat,
                "z": __emscripten_date_now,
                "_": __emscripten_get_now_is_monotonic,
                "G": __emscripten_throw_longjmp,
                "$": __localtime_js,
                "aa": __mktime_js,
                "R": __munmap_js,
                "ba": __tzset_js,
                "m": _abort,
                "A": _emscripten_asm_const_int,
                "ja": _emscripten_asm_const_ptr,
                "J": _emscripten_get_heap_max,
                "y": _emscripten_get_now,
                "ca": _emscripten_memcpy_big,
                "H": _emscripten_resize_heap,
                "ka": _emscripten_run_script,
                "ha": _environ_get,
                "ia": _environ_sizes_get,
                "i": _exit,
                "p": _fd_close,
                "u": _fd_fdstat_get,
                "v": _fd_read,
                "T": _fd_seek,
                "q": _fd_write,
                "a": _getTempRet0,
                "h": invoke_i,
                "d": invoke_ii,
                "c": invoke_iii,
                "f": invoke_iiii,
                "k": invoke_iiiii,
                "j": invoke_iiiiii,
                "C": invoke_iiiiiii,
                "s": invoke_iiiiiiii,
                "D": invoke_iiiiiiiii,
                "E": invoke_iiiiiiiiii,
                "F": invoke_iiiiiiiiiii,
                "ma": invoke_iiiiiiiiiiii,
                "r": invoke_iiji,
                "B": invoke_ij,
                "l": invoke_v,
                "e": invoke_vi,
                "g": invoke_vii,
                "o": invoke_viii,
                "b": _setTempRet0,
                "la": _strftime
            };
            var asm = createWasm();
            var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function () {
                return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["oa"]).apply(null, arguments)
            };
            var _malloc = Module["_malloc"] = function () {
                return (_malloc = Module["_malloc"] = Module["asm"]["pa"]).apply(null, arguments)
            };
            var _PL_initialise = Module["_PL_initialise"] = function () {
                return (_PL_initialise = Module["_PL_initialise"] = Module["asm"]["qa"]).apply(null, arguments)
            };
            var _PL_halt = Module["_PL_halt"] = function () {
                return (_PL_halt = Module["_PL_halt"] = Module["asm"]["ra"]).apply(null, arguments)
            };
            var _PL_toplevel = Module["_PL_toplevel"] = function () {
                return (_PL_toplevel = Module["_PL_toplevel"] = Module["asm"]["sa"]).apply(null, arguments)
            };
            var _PL_unregister_blob_type = Module["_PL_unregister_blob_type"] = function () {
                return (_PL_unregister_blob_type = Module["_PL_unregister_blob_type"] = Module["asm"]["ta"]).apply(null, arguments)
            };
            var _PL_unregister_atom = Module["_PL_unregister_atom"] = function () {
                return (_PL_unregister_atom = Module["_PL_unregister_atom"] = Module["asm"]["ua"]).apply(null, arguments)
            };
            var _PL_agc_hook = Module["_PL_agc_hook"] = function () {
                return (_PL_agc_hook = Module["_PL_agc_hook"] = Module["asm"]["va"]).apply(null, arguments)
            };
            var _PL_register_atom = Module["_PL_register_atom"] = function () {
                return (_PL_register_atom = Module["_PL_register_atom"] = Module["asm"]["wa"]).apply(null, arguments)
            };
            var _PL_open_foreign_frame = Module["_PL_open_foreign_frame"] = function () {
                return (_PL_open_foreign_frame = Module["_PL_open_foreign_frame"] = Module["asm"]["xa"]).apply(null, arguments)
            };
            var _PL_close_foreign_frame = Module["_PL_close_foreign_frame"] = function () {
                return (_PL_close_foreign_frame = Module["_PL_close_foreign_frame"] = Module["asm"]["ya"]).apply(null, arguments)
            };
            var _PL_rewind_foreign_frame = Module["_PL_rewind_foreign_frame"] = function () {
                return (_PL_rewind_foreign_frame = Module["_PL_rewind_foreign_frame"] = Module["asm"]["za"]).apply(null, arguments)
            };
            var _PL_discard_foreign_frame = Module["_PL_discard_foreign_frame"] = function () {
                return (_PL_discard_foreign_frame = Module["_PL_discard_foreign_frame"] = Module["asm"]["Aa"]).apply(null, arguments)
            };
            var _PL_open_query = Module["_PL_open_query"] = function () {
                return (_PL_open_query = Module["_PL_open_query"] = Module["asm"]["Ba"]).apply(null, arguments)
            };
            var _PL_exception = Module["_PL_exception"] = function () {
                return (_PL_exception = Module["_PL_exception"] = Module["asm"]["Ca"]).apply(null, arguments)
            };
            var _PL_cut_query = Module["_PL_cut_query"] = function () {
                return (_PL_cut_query = Module["_PL_cut_query"] = Module["asm"]["Da"]).apply(null, arguments)
            };
            var _PL_close_query = Module["_PL_close_query"] = function () {
                return (_PL_close_query = Module["_PL_close_query"] = Module["asm"]["Ea"]).apply(null, arguments)
            };
            var _PL_current_query = Module["_PL_current_query"] = function () {
                return (_PL_current_query = Module["_PL_current_query"] = Module["asm"]["Fa"]).apply(null, arguments)
            };
            var _PL_next_solution = Module["_PL_next_solution"] = function () {
                return (_PL_next_solution = Module["_PL_next_solution"] = Module["asm"]["Ga"]).apply(null, arguments)
            };
            var _PL_instantiation_error = Module["_PL_instantiation_error"] = function () {
                return (_PL_instantiation_error = Module["_PL_instantiation_error"] = Module["asm"]["Ha"]).apply(null, arguments)
            };
            var _PL_uninstantiation_error = Module["_PL_uninstantiation_error"] = function () {
                return (_PL_uninstantiation_error = Module["_PL_uninstantiation_error"] = Module["asm"]["Ia"]).apply(null, arguments)
            };
            var _PL_representation_error = Module["_PL_representation_error"] = function () {
                return (_PL_representation_error = Module["_PL_representation_error"] = Module["asm"]["Ja"]).apply(null, arguments)
            };
            var _PL_type_error = Module["_PL_type_error"] = function () {
                return (_PL_type_error = Module["_PL_type_error"] = Module["asm"]["Ka"]).apply(null, arguments)
            };
            var _PL_domain_error = Module["_PL_domain_error"] = function () {
                return (_PL_domain_error = Module["_PL_domain_error"] = Module["asm"]["La"]).apply(null, arguments)
            };
            var _PL_existence_error = Module["_PL_existence_error"] = function () {
                return (_PL_existence_error = Module["_PL_existence_error"] = Module["asm"]["Ma"]).apply(null, arguments)
            };
            var _PL_permission_error = Module["_PL_permission_error"] = function () {
                return (_PL_permission_error = Module["_PL_permission_error"] = Module["asm"]["Na"]).apply(null, arguments)
            };
            var _PL_resource_error = Module["_PL_resource_error"] = function () {
                return (_PL_resource_error = Module["_PL_resource_error"] = Module["asm"]["Oa"]).apply(null, arguments)
            };
            var _PL_syntax_error = Module["_PL_syntax_error"] = function () {
                return (_PL_syntax_error = Module["_PL_syntax_error"] = Module["asm"]["Pa"]).apply(null, arguments)
            };
            var _PL_get_atom_ex = Module["_PL_get_atom_ex"] = function () {
                return (_PL_get_atom_ex = Module["_PL_get_atom_ex"] = Module["asm"]["Qa"]).apply(null, arguments)
            };
            var _PL_get_integer_ex = Module["_PL_get_integer_ex"] = function () {
                return (_PL_get_integer_ex = Module["_PL_get_integer_ex"] = Module["asm"]["Ra"]).apply(null, arguments)
            };
            var _PL_get_long_ex = Module["_PL_get_long_ex"] = function () {
                return (_PL_get_long_ex = Module["_PL_get_long_ex"] = Module["asm"]["Sa"]).apply(null, arguments)
            };
            var _PL_get_int64_ex = Module["_PL_get_int64_ex"] = function () {
                return (_PL_get_int64_ex = Module["_PL_get_int64_ex"] = Module["asm"]["Ta"]).apply(null, arguments)
            };
            var _PL_get_intptr_ex = Module["_PL_get_intptr_ex"] = function () {
                return (_PL_get_intptr_ex = Module["_PL_get_intptr_ex"] = Module["asm"]["Ua"]).apply(null, arguments)
            };
            var _PL_get_size_ex = Module["_PL_get_size_ex"] = function () {
                return (_PL_get_size_ex = Module["_PL_get_size_ex"] = Module["asm"]["Va"]).apply(null, arguments)
            };
            var _PL_get_bool_ex = Module["_PL_get_bool_ex"] = function () {
                return (_PL_get_bool_ex = Module["_PL_get_bool_ex"] = Module["asm"]["Wa"]).apply(null, arguments)
            };
            var _PL_get_float_ex = Module["_PL_get_float_ex"] = function () {
                return (_PL_get_float_ex = Module["_PL_get_float_ex"] = Module["asm"]["Xa"]).apply(null, arguments)
            };
            var _PL_get_char_ex = Module["_PL_get_char_ex"] = function () {
                return (_PL_get_char_ex = Module["_PL_get_char_ex"] = Module["asm"]["Ya"]).apply(null, arguments)
            };
            var _PL_get_pointer_ex = Module["_PL_get_pointer_ex"] = function () {
                return (_PL_get_pointer_ex = Module["_PL_get_pointer_ex"] = Module["asm"]["Za"]).apply(null, arguments)
            };
            var _PL_unify_list_ex = Module["_PL_unify_list_ex"] = function () {
                return (_PL_unify_list_ex = Module["_PL_unify_list_ex"] = Module["asm"]["_a"]).apply(null, arguments)
            };
            var _PL_unify_nil_ex = Module["_PL_unify_nil_ex"] = function () {
                return (_PL_unify_nil_ex = Module["_PL_unify_nil_ex"] = Module["asm"]["$a"]).apply(null, arguments)
            };
            var _PL_get_list_ex = Module["_PL_get_list_ex"] = function () {
                return (_PL_get_list_ex = Module["_PL_get_list_ex"] = Module["asm"]["ab"]).apply(null, arguments)
            };
            var _PL_get_nil_ex = Module["_PL_get_nil_ex"] = function () {
                return (_PL_get_nil_ex = Module["_PL_get_nil_ex"] = Module["asm"]["bb"]).apply(null, arguments)
            };
            var _PL_unify_bool_ex = Module["_PL_unify_bool_ex"] = function () {
                return (_PL_unify_bool_ex = Module["_PL_unify_bool_ex"] = Module["asm"]["cb"]).apply(null, arguments)
            };
            var _PL_is_ground = Module["_PL_is_ground"] = function () {
                return (_PL_is_ground = Module["_PL_is_ground"] = Module["asm"]["db"]).apply(null, arguments)
            };
            var _PL_is_acyclic = Module["_PL_is_acyclic"] = function () {
                return (_PL_is_acyclic = Module["_PL_is_acyclic"] = Module["asm"]["eb"]).apply(null, arguments)
            };
            var _PL_put_term_from_chars = Module["_PL_put_term_from_chars"] = function () {
                return (_PL_put_term_from_chars = Module["_PL_put_term_from_chars"] = Module["asm"]["fb"]).apply(null, arguments)
            };
            var _PL_chars_to_term = Module["_PL_chars_to_term"] = function () {
                return (_PL_chars_to_term = Module["_PL_chars_to_term"] = Module["asm"]["gb"]).apply(null, arguments)
            };
            var _PL_wchars_to_term = Module["_PL_wchars_to_term"] = function () {
                return (_PL_wchars_to_term = Module["_PL_wchars_to_term"] = Module["asm"]["hb"]).apply(null, arguments)
            };
            var _PL_record_external = Module["_PL_record_external"] = function () {
                return (_PL_record_external = Module["_PL_record_external"] = Module["asm"]["ib"]).apply(null, arguments)
            };
            var _PL_recorded_external = Module["_PL_recorded_external"] = function () {
                return (_PL_recorded_external = Module["_PL_recorded_external"] = Module["asm"]["jb"]).apply(null, arguments)
            };
            var _PL_erase_external = Module["_PL_erase_external"] = function () {
                return (_PL_erase_external = Module["_PL_erase_external"] = Module["asm"]["kb"]).apply(null, arguments)
            };
            var _PL_sigaction = Module["_PL_sigaction"] = function () {
                return (_PL_sigaction = Module["_PL_sigaction"] = Module["asm"]["lb"]).apply(null, arguments)
            };
            var _PL_get_signum_ex = Module["_PL_get_signum_ex"] = function () {
                return (_PL_get_signum_ex = Module["_PL_get_signum_ex"] = Module["asm"]["mb"]).apply(null, arguments)
            };
            var _PL_signal = Module["_PL_signal"] = function () {
                return (_PL_signal = Module["_PL_signal"] = Module["asm"]["nb"]).apply(null, arguments)
            };
            var _PL_handle_signals = Module["_PL_handle_signals"] = function () {
                return (_PL_handle_signals = Module["_PL_handle_signals"] = Module["asm"]["ob"]).apply(null, arguments)
            };
            var _PL_write_term = Module["_PL_write_term"] = function () {
                return (_PL_write_term = Module["_PL_write_term"] = Module["asm"]["pb"]).apply(null, arguments)
            };
            var _PL_cleanup_fork = Module["_PL_cleanup_fork"] = function () {
                return (_PL_cleanup_fork = Module["_PL_cleanup_fork"] = Module["asm"]["qb"]).apply(null, arguments)
            };
            var _PL_is_initialised = Module["_PL_is_initialised"] = function () {
                return (_PL_is_initialised = Module["_PL_is_initialised"] = Module["asm"]["rb"]).apply(null, arguments)
            };
            var _free = Module["_free"] = function () {
                return (_free = Module["_free"] = Module["asm"]["sb"]).apply(null, arguments)
            };
            var _PL_raise = Module["_PL_raise"] = function () {
                return (_PL_raise = Module["_PL_raise"] = Module["asm"]["tb"]).apply(null, arguments)
            };
            var _PL_new_atom = Module["_PL_new_atom"] = function () {
                return (_PL_new_atom = Module["_PL_new_atom"] = Module["asm"]["ub"]).apply(null, arguments)
            };
            var ___errno_location = Module["___errno_location"] = function () {
                return (___errno_location = Module["___errno_location"] = Module["asm"]["vb"]).apply(null, arguments)
            };
            var _PL_put_atom_chars = Module["_PL_put_atom_chars"] = function () {
                return (_PL_put_atom_chars = Module["_PL_put_atom_chars"] = Module["asm"]["wb"]).apply(null, arguments)
            };
            var _PL_throw = Module["_PL_throw"] = function () {
                return (_PL_throw = Module["_PL_throw"] = Module["asm"]["xb"]).apply(null, arguments)
            };
            var _PL_raise_exception = Module["_PL_raise_exception"] = function () {
                return (_PL_raise_exception = Module["_PL_raise_exception"] = Module["asm"]["yb"]).apply(null, arguments)
            };
            var _PL_clear_exception = Module["_PL_clear_exception"] = function () {
                return (_PL_clear_exception = Module["_PL_clear_exception"] = Module["asm"]["zb"]).apply(null, arguments)
            };
            var _PL_put_nil = Module["_PL_put_nil"] = function () {
                return (_PL_put_nil = Module["_PL_put_nil"] = Module["asm"]["Ab"]).apply(null, arguments)
            };
            var _PL_atom_nchars = Module["_PL_atom_nchars"] = function () {
                return (_PL_atom_nchars = Module["_PL_atom_nchars"] = Module["asm"]["Bb"]).apply(null, arguments)
            };
            var _PL_atom_wchars = Module["_PL_atom_wchars"] = function () {
                return (_PL_atom_wchars = Module["_PL_atom_wchars"] = Module["asm"]["Cb"]).apply(null, arguments)
            };
            var _PL_is_integer = Module["_PL_is_integer"] = function () {
                return (_PL_is_integer = Module["_PL_is_integer"] = Module["asm"]["Db"]).apply(null, arguments)
            };
            var _PL_unify_uint64 = Module["_PL_unify_uint64"] = function () {
                return (_PL_unify_uint64 = Module["_PL_unify_uint64"] = Module["asm"]["Eb"]).apply(null, arguments)
            };
            var _PL_unify_float = Module["_PL_unify_float"] = function () {
                return (_PL_unify_float = Module["_PL_unify_float"] = Module["asm"]["Fb"]).apply(null, arguments)
            };
            var _PL_unify_nil = Module["_PL_unify_nil"] = function () {
                return (_PL_unify_nil = Module["_PL_unify_nil"] = Module["asm"]["Hb"]).apply(null, arguments)
            };
            var _PL_cons_functor_v = Module["_PL_cons_functor_v"] = function () {
                return (_PL_cons_functor_v = Module["_PL_cons_functor_v"] = Module["asm"]["Ib"]).apply(null, arguments)
            };
            var _PL_get_nil = Module["_PL_get_nil"] = function () {
                return (_PL_get_nil = Module["_PL_get_nil"] = Module["asm"]["Jb"]).apply(null, arguments)
            };
            var _PL_atom_chars = Module["_PL_atom_chars"] = function () {
                return (_PL_atom_chars = Module["_PL_atom_chars"] = Module["asm"]["Kb"]).apply(null, arguments)
            };
            var _PL_is_list = Module["_PL_is_list"] = function () {
                return (_PL_is_list = Module["_PL_is_list"] = Module["asm"]["Lb"]).apply(null, arguments)
            };
            var _PL_cons_functor = Module["_PL_cons_functor"] = function () {
                return (_PL_cons_functor = Module["_PL_cons_functor"] = Module["asm"]["Mb"]).apply(null, arguments)
            };
            var _PL_warning = Module["_PL_warning"] = function () {
                return (_PL_warning = Module["_PL_warning"] = Module["asm"]["Nb"]).apply(null, arguments)
            };
            var _PL_unify_chars = Module["_PL_unify_chars"] = function () {
                return (_PL_unify_chars = Module["_PL_unify_chars"] = Module["asm"]["Ob"]).apply(null, arguments)
            };
            var _PL_get_nchars = Module["_PL_get_nchars"] = function () {
                return (_PL_get_nchars = Module["_PL_get_nchars"] = Module["asm"]["Pb"]).apply(null, arguments)
            };
            var _PL_get_wchars = Module["_PL_get_wchars"] = function () {
                return (_PL_get_wchars = Module["_PL_get_wchars"] = Module["asm"]["Qb"]).apply(null, arguments)
            };
            var _PL_call_predicate = Module["_PL_call_predicate"] = function () {
                return (_PL_call_predicate = Module["_PL_call_predicate"] = Module["asm"]["Rb"]).apply(null, arguments)
            };
            var _PL_is_number = Module["_PL_is_number"] = function () {
                return (_PL_is_number = Module["_PL_is_number"] = Module["asm"]["Sb"]).apply(null, arguments)
            };
            var _PL_is_string = Module["_PL_is_string"] = function () {
                return (_PL_is_string = Module["_PL_is_string"] = Module["asm"]["Tb"]).apply(null, arguments)
            };
            var _PL_is_pair = Module["_PL_is_pair"] = function () {
                return (_PL_is_pair = Module["_PL_is_pair"] = Module["asm"]["Ub"]).apply(null, arguments)
            };
            var _PL_predicate = Module["_PL_predicate"] = function () {
                return (_PL_predicate = Module["_PL_predicate"] = Module["asm"]["Vb"]).apply(null, arguments)
            };
            var _PL_is_float = Module["_PL_is_float"] = function () {
                return (_PL_is_float = Module["_PL_is_float"] = Module["asm"]["Wb"]).apply(null, arguments)
            };
            var _PL_is_compound = Module["_PL_is_compound"] = function () {
                return (_PL_is_compound = Module["_PL_is_compound"] = Module["asm"]["Xb"]).apply(null, arguments)
            };
            var _PL_is_callable = Module["_PL_is_callable"] = function () {
                return (_PL_is_callable = Module["_PL_is_callable"] = Module["asm"]["Yb"]).apply(null, arguments)
            };
            var _PL_unify_compound = Module["_PL_unify_compound"] = function () {
                return (_PL_unify_compound = Module["_PL_unify_compound"] = Module["asm"]["Zb"]).apply(null, arguments)
            };
            var _PL_compare = Module["_PL_compare"] = function () {
                return (_PL_compare = Module["_PL_compare"] = Module["asm"]["_b"]).apply(null, arguments)
            };
            var _PL_unify_atom_nchars = Module["_PL_unify_atom_nchars"] = function () {
                return (_PL_unify_atom_nchars = Module["_PL_unify_atom_nchars"] = Module["asm"]["$b"]).apply(null, arguments)
            };
            var _PL_unify_wchars = Module["_PL_unify_wchars"] = function () {
                return (_PL_unify_wchars = Module["_PL_unify_wchars"] = Module["asm"]["ac"]).apply(null, arguments)
            };
            var _PL_get_atom_chars = Module["_PL_get_atom_chars"] = function () {
                return (_PL_get_atom_chars = Module["_PL_get_atom_chars"] = Module["asm"]["bc"]).apply(null, arguments)
            };
            var _PL_unify_bool = Module["_PL_unify_bool"] = function () {
                return (_PL_unify_bool = Module["_PL_unify_bool"] = Module["asm"]["cc"]).apply(null, arguments)
            };
            var _PL_get_chars = Module["_PL_get_chars"] = function () {
                return (_PL_get_chars = Module["_PL_get_chars"] = Module["asm"]["dc"]).apply(null, arguments)
            };
            var _PL_skip_list = Module["_PL_skip_list"] = function () {
                return (_PL_skip_list = Module["_PL_skip_list"] = Module["asm"]["ec"]).apply(null, arguments)
            };
            var _PL_is_atom = Module["_PL_is_atom"] = function () {
                return (_PL_is_atom = Module["_PL_is_atom"] = Module["asm"]["fc"]).apply(null, arguments)
            };
            var _PL_is_variable = Module["_PL_is_variable"] = function () {
                return (_PL_is_variable = Module["_PL_is_variable"] = Module["asm"]["gc"]).apply(null, arguments)
            };
            var _PL_unify_atom = Module["_PL_unify_atom"] = function () {
                return (_PL_unify_atom = Module["_PL_unify_atom"] = Module["asm"]["hc"]).apply(null, arguments)
            };
            var _PL_new_term_refs = Module["_PL_new_term_refs"] = function () {
                return (_PL_new_term_refs = Module["_PL_new_term_refs"] = Module["asm"]["ic"]).apply(null, arguments)
            };
            var _PL_put_atom = Module["_PL_put_atom"] = function () {
                return (_PL_put_atom = Module["_PL_put_atom"] = Module["asm"]["jc"]).apply(null, arguments)
            };
            var _PL_new_term_ref = Module["_PL_new_term_ref"] = function () {
                return (_PL_new_term_ref = Module["_PL_new_term_ref"] = Module["asm"]["kc"]).apply(null, arguments)
            };
            var _PL_unify = Module["_PL_unify"] = function () {
                return (_PL_unify = Module["_PL_unify"] = Module["asm"]["lc"]).apply(null, arguments)
            };
            var _PL_get_bool = Module["_PL_get_bool"] = function () {
                return (_PL_get_bool = Module["_PL_get_bool"] = Module["asm"]["mc"]).apply(null, arguments)
            };
            var _PL_get_float = Module["_PL_get_float"] = function () {
                return (_PL_get_float = Module["_PL_get_float"] = Module["asm"]["nc"]).apply(null, arguments)
            };
            var _PL_get_module = Module["_PL_get_module"] = function () {
                return (_PL_get_module = Module["_PL_get_module"] = Module["asm"]["oc"]).apply(null, arguments)
            };
            var _PL_erase = Module["_PL_erase"] = function () {
                return (_PL_erase = Module["_PL_erase"] = Module["asm"]["pc"]).apply(null, arguments)
            };
            var _PL_unify_string_nchars = Module["_PL_unify_string_nchars"] = function () {
                return (_PL_unify_string_nchars = Module["_PL_unify_string_nchars"] = Module["asm"]["qc"]).apply(null, arguments)
            };
            var _PL_get_intptr = Module["_PL_get_intptr"] = function () {
                return (_PL_get_intptr = Module["_PL_get_intptr"] = Module["asm"]["rc"]).apply(null, arguments)
            };
            var _PL_pred = Module["_PL_pred"] = function () {
                return (_PL_pred = Module["_PL_pred"] = Module["asm"]["sc"]).apply(null, arguments)
            };
            var _PL_is_blob = Module["_PL_is_blob"] = function () {
                return (_PL_is_blob = Module["_PL_is_blob"] = Module["asm"]["tc"]).apply(null, arguments)
            };
            var _PL_put_bool = Module["_PL_put_bool"] = function () {
                return (_PL_put_bool = Module["_PL_put_bool"] = Module["asm"]["uc"]).apply(null, arguments)
            };
            var _PL_unify_atom_chars = Module["_PL_unify_atom_chars"] = function () {
                return (_PL_unify_atom_chars = Module["_PL_unify_atom_chars"] = Module["asm"]["vc"]).apply(null, arguments)
            };
            var _PL_put_float = Module["_PL_put_float"] = function () {
                return (_PL_put_float = Module["_PL_put_float"] = Module["asm"]["wc"]).apply(null, arguments)
            };
            var _PL_put_pointer = Module["_PL_put_pointer"] = function () {
                return (_PL_put_pointer = Module["_PL_put_pointer"] = Module["asm"]["xc"]).apply(null, arguments)
            };
            var _PL_unify_int64 = Module["_PL_unify_int64"] = function () {
                return (_PL_unify_int64 = Module["_PL_unify_int64"] = Module["asm"]["yc"]).apply(null, arguments)
            };
            var _PL_get_atom = Module["_PL_get_atom"] = function () {
                return (_PL_get_atom = Module["_PL_get_atom"] = Module["asm"]["zc"]).apply(null, arguments)
            };
            var _PL_copy_term_ref = Module["_PL_copy_term_ref"] = function () {
                return (_PL_copy_term_ref = Module["_PL_copy_term_ref"] = Module["asm"]["Ac"]).apply(null, arguments)
            };
            var _PL_unify_integer = Module["_PL_unify_integer"] = function () {
                return (_PL_unify_integer = Module["_PL_unify_integer"] = Module["asm"]["Bc"]).apply(null, arguments)
            };
            var _PL_put_int64 = Module["_PL_put_int64"] = function () {
                return (_PL_put_int64 = Module["_PL_put_int64"] = Module["asm"]["Cc"]).apply(null, arguments)
            };
            var _PL_set_prolog_flag = Module["_PL_set_prolog_flag"] = function () {
                return (_PL_set_prolog_flag = Module["_PL_set_prolog_flag"] = Module["asm"]["Dc"]).apply(null, arguments)
            };
            var _PL_get_file_name = Module["_PL_get_file_name"] = function () {
                return (_PL_get_file_name = Module["_PL_get_file_name"] = Module["asm"]["Ec"]).apply(null, arguments)
            };
            var _PL_unify_blob = Module["_PL_unify_blob"] = function () {
                return (_PL_unify_blob = Module["_PL_unify_blob"] = Module["asm"]["Fc"]).apply(null, arguments)
            };
            var _PL_get_blob = Module["_PL_get_blob"] = function () {
                return (_PL_get_blob = Module["_PL_get_blob"] = Module["asm"]["Gc"]).apply(null, arguments)
            };
            var _PL_blob_data = Module["_PL_blob_data"] = function () {
                return (_PL_blob_data = Module["_PL_blob_data"] = Module["asm"]["Hc"]).apply(null, arguments)
            };
            var _PL_new_module = Module["_PL_new_module"] = function () {
                return (_PL_new_module = Module["_PL_new_module"] = Module["asm"]["Ic"]).apply(null, arguments)
            };
            var _PL_put_string_chars = Module["_PL_put_string_chars"] = function () {
                return (_PL_put_string_chars = Module["_PL_put_string_chars"] = Module["asm"]["Jc"]).apply(null, arguments)
            };
            var _PL_set_resource_db_mem = Module["_PL_set_resource_db_mem"] = function () {
                return (_PL_set_resource_db_mem = Module["_PL_set_resource_db_mem"] = Module["asm"]["Kc"]).apply(null, arguments)
            };
            var _PL_on_halt = Module["_PL_on_halt"] = function () {
                return (_PL_on_halt = Module["_PL_on_halt"] = Module["asm"]["Lc"]).apply(null, arguments)
            };
            var _PL_exit_hook = Module["_PL_exit_hook"] = function () {
                return (_PL_exit_hook = Module["_PL_exit_hook"] = Module["asm"]["Mc"]).apply(null, arguments)
            };
            var _PL_cleanup = Module["_PL_cleanup"] = function () {
                return (_PL_cleanup = Module["_PL_cleanup"] = Module["asm"]["Nc"]).apply(null, arguments)
            };
            var _PL_unify_string_chars = Module["_PL_unify_string_chars"] = function () {
                return (_PL_unify_string_chars = Module["_PL_unify_string_chars"] = Module["asm"]["Oc"]).apply(null, arguments)
            };
            var _PL_put_variable = Module["_PL_put_variable"] = function () {
                return (_PL_put_variable = Module["_PL_put_variable"] = Module["asm"]["Pc"]).apply(null, arguments)
            };
            var _PL_is_atomic = Module["_PL_is_atomic"] = function () {
                return (_PL_is_atomic = Module["_PL_is_atomic"] = Module["asm"]["Qc"]).apply(null, arguments)
            };
            var _PL_recorded = Module["_PL_recorded"] = function () {
                return (_PL_recorded = Module["_PL_recorded"] = Module["asm"]["Rc"]).apply(null, arguments)
            };
            var _PL_record = Module["_PL_record"] = function () {
                return (_PL_record = Module["_PL_record"] = Module["asm"]["Sc"]).apply(null, arguments)
            };
            var _PL_put_functor = Module["_PL_put_functor"] = function () {
                return (_PL_put_functor = Module["_PL_put_functor"] = Module["asm"]["Tc"]).apply(null, arguments)
            };
            var _PL_strip_module = Module["_PL_strip_module"] = function () {
                return (_PL_strip_module = Module["_PL_strip_module"] = Module["asm"]["Uc"]).apply(null, arguments)
            };
            var _PL_unify_list = Module["_PL_unify_list"] = function () {
                return (_PL_unify_list = Module["_PL_unify_list"] = Module["asm"]["Vc"]).apply(null, arguments)
            };
            var _PL_register_foreign_in_module = Module["_PL_register_foreign_in_module"] = function () {
                return (_PL_register_foreign_in_module = Module["_PL_register_foreign_in_module"] = Module["asm"]["Wc"]).apply(null, arguments)
            };
            var _PL_foreign_control = Module["_PL_foreign_control"] = function () {
                return (_PL_foreign_control = Module["_PL_foreign_control"] = Module["asm"]["Xc"]).apply(null, arguments)
            };
            var _PL_foreign_context_address = Module["_PL_foreign_context_address"] = function () {
                return (_PL_foreign_context_address = Module["_PL_foreign_context_address"] = Module["asm"]["Yc"]).apply(null, arguments)
            };
            var _PL_reset_term_refs = Module["_PL_reset_term_refs"] = function () {
                return (_PL_reset_term_refs = Module["_PL_reset_term_refs"] = Module["asm"]["Zc"]).apply(null, arguments)
            };
            var _PL_new_atom_nchars = Module["_PL_new_atom_nchars"] = function () {
                return (_PL_new_atom_nchars = Module["_PL_new_atom_nchars"] = Module["asm"]["_c"]).apply(null, arguments)
            };
            var _PL_new_atom_mbchars = Module["_PL_new_atom_mbchars"] = function () {
                return (_PL_new_atom_mbchars = Module["_PL_new_atom_mbchars"] = Module["asm"]["$c"]).apply(null, arguments)
            };
            var _PL_new_functor = Module["_PL_new_functor"] = function () {
                return (_PL_new_functor = Module["_PL_new_functor"] = Module["asm"]["ad"]).apply(null, arguments)
            };
            var _PL_functor_name = Module["_PL_functor_name"] = function () {
                return (_PL_functor_name = Module["_PL_functor_name"] = Module["asm"]["bd"]).apply(null, arguments)
            };
            var _PL_functor_arity = Module["_PL_functor_arity"] = function () {
                return (_PL_functor_arity = Module["_PL_functor_arity"] = Module["asm"]["cd"]).apply(null, arguments)
            };
            var _PL_new_atom_wchars = Module["_PL_new_atom_wchars"] = function () {
                return (_PL_new_atom_wchars = Module["_PL_new_atom_wchars"] = Module["asm"]["dd"]).apply(null, arguments)
            };
            var _PL_unify_wchars_diff = Module["_PL_unify_wchars_diff"] = function () {
                return (_PL_unify_wchars_diff = Module["_PL_unify_wchars_diff"] = Module["asm"]["ed"]).apply(null, arguments)
            };
            var _PL_same_compound = Module["_PL_same_compound"] = function () {
                return (_PL_same_compound = Module["_PL_same_compound"] = Module["asm"]["fd"]).apply(null, arguments)
            };
            var _PL_cons_list = Module["_PL_cons_list"] = function () {
                return (_PL_cons_list = Module["_PL_cons_list"] = Module["asm"]["gd"]).apply(null, arguments)
            };
            var _PL_get_atom_nchars = Module["_PL_get_atom_nchars"] = function () {
                return (_PL_get_atom_nchars = Module["_PL_get_atom_nchars"] = Module["asm"]["hd"]).apply(null, arguments)
            };
            var _PL_get_list_nchars = Module["_PL_get_list_nchars"] = function () {
                return (_PL_get_list_nchars = Module["_PL_get_list_nchars"] = Module["asm"]["id"]).apply(null, arguments)
            };
            var _PL_get_list_chars = Module["_PL_get_list_chars"] = function () {
                return (_PL_get_list_chars = Module["_PL_get_list_chars"] = Module["asm"]["jd"]).apply(null, arguments)
            };
            var _PL_quote = Module["_PL_quote"] = function () {
                return (_PL_quote = Module["_PL_quote"] = Module["asm"]["kd"]).apply(null, arguments)
            };
            var _PL_get_integer = Module["_PL_get_integer"] = function () {
                return (_PL_get_integer = Module["_PL_get_integer"] = Module["asm"]["ld"]).apply(null, arguments)
            };
            var _PL_get_long = Module["_PL_get_long"] = function () {
                return (_PL_get_long = Module["_PL_get_long"] = Module["asm"]["md"]).apply(null, arguments)
            };
            var _PL_get_int64 = Module["_PL_get_int64"] = function () {
                return (_PL_get_int64 = Module["_PL_get_int64"] = Module["asm"]["nd"]).apply(null, arguments)
            };
            var _PL_get_pointer = Module["_PL_get_pointer"] = function () {
                return (_PL_get_pointer = Module["_PL_get_pointer"] = Module["asm"]["od"]).apply(null, arguments)
            };
            var _PL_get_name_arity = Module["_PL_get_name_arity"] = function () {
                return (_PL_get_name_arity = Module["_PL_get_name_arity"] = Module["asm"]["pd"]).apply(null, arguments)
            };
            var _PL_get_compound_name_arity = Module["_PL_get_compound_name_arity"] = function () {
                return (_PL_get_compound_name_arity = Module["_PL_get_compound_name_arity"] = Module["asm"]["qd"]).apply(null, arguments)
            };
            var _PL_get_functor = Module["_PL_get_functor"] = function () {
                return (_PL_get_functor = Module["_PL_get_functor"] = Module["asm"]["rd"]).apply(null, arguments)
            };
            var _PL_get_arg = Module["_PL_get_arg"] = function () {
                return (_PL_get_arg = Module["_PL_get_arg"] = Module["asm"]["sd"]).apply(null, arguments)
            };
            var _PL_get_list = Module["_PL_get_list"] = function () {
                return (_PL_get_list = Module["_PL_get_list"] = Module["asm"]["td"]).apply(null, arguments)
            };
            var _PL_get_head = Module["_PL_get_head"] = function () {
                return (_PL_get_head = Module["_PL_get_head"] = Module["asm"]["ud"]).apply(null, arguments)
            };
            var _PL_get_tail = Module["_PL_get_tail"] = function () {
                return (_PL_get_tail = Module["_PL_get_tail"] = Module["asm"]["vd"]).apply(null, arguments)
            };
            var _PL_is_functor = Module["_PL_is_functor"] = function () {
                return (_PL_is_functor = Module["_PL_is_functor"] = Module["asm"]["wd"]).apply(null, arguments)
            };
            var _PL_put_atom_nchars = Module["_PL_put_atom_nchars"] = function () {
                return (_PL_put_atom_nchars = Module["_PL_put_atom_nchars"] = Module["asm"]["xd"]).apply(null, arguments)
            };
            var _PL_put_string_nchars = Module["_PL_put_string_nchars"] = function () {
                return (_PL_put_string_nchars = Module["_PL_put_string_nchars"] = Module["asm"]["yd"]).apply(null, arguments)
            };
            var _PL_put_chars = Module["_PL_put_chars"] = function () {
                return (_PL_put_chars = Module["_PL_put_chars"] = Module["asm"]["zd"]).apply(null, arguments)
            };
            var _PL_put_list_ncodes = Module["_PL_put_list_ncodes"] = function () {
                return (_PL_put_list_ncodes = Module["_PL_put_list_ncodes"] = Module["asm"]["Ad"]).apply(null, arguments)
            };
            var _PL_put_list_nchars = Module["_PL_put_list_nchars"] = function () {
                return (_PL_put_list_nchars = Module["_PL_put_list_nchars"] = Module["asm"]["Bd"]).apply(null, arguments)
            };
            var _PL_put_list_chars = Module["_PL_put_list_chars"] = function () {
                return (_PL_put_list_chars = Module["_PL_put_list_chars"] = Module["asm"]["Cd"]).apply(null, arguments)
            };
            var _PL_put_integer = Module["_PL_put_integer"] = function () {
                return (_PL_put_integer = Module["_PL_put_integer"] = Module["asm"]["Dd"]).apply(null, arguments)
            };
            var _PL_put_list = Module["_PL_put_list"] = function () {
                return (_PL_put_list = Module["_PL_put_list"] = Module["asm"]["Ed"]).apply(null, arguments)
            };
            var _PL_put_term = Module["_PL_put_term"] = function () {
                return (_PL_put_term = Module["_PL_put_term"] = Module["asm"]["Fd"]).apply(null, arguments)
            };
            var _PL_unify_functor = Module["_PL_unify_functor"] = function () {
                return (_PL_unify_functor = Module["_PL_unify_functor"] = Module["asm"]["Gd"]).apply(null, arguments)
            };
            var _PL_unify_list_ncodes = Module["_PL_unify_list_ncodes"] = function () {
                return (_PL_unify_list_ncodes = Module["_PL_unify_list_ncodes"] = Module["asm"]["Hd"]).apply(null, arguments)
            };
            var _PL_unify_list_nchars = Module["_PL_unify_list_nchars"] = function () {
                return (_PL_unify_list_nchars = Module["_PL_unify_list_nchars"] = Module["asm"]["Id"]).apply(null, arguments)
            };
            var _PL_unify_list_chars = Module["_PL_unify_list_chars"] = function () {
                return (_PL_unify_list_chars = Module["_PL_unify_list_chars"] = Module["asm"]["Jd"]).apply(null, arguments)
            };
            var _PL_unify_pointer = Module["_PL_unify_pointer"] = function () {
                return (_PL_unify_pointer = Module["_PL_unify_pointer"] = Module["asm"]["Kd"]).apply(null, arguments)
            };
            var _PL_unify_arg = Module["_PL_unify_arg"] = function () {
                return (_PL_unify_arg = Module["_PL_unify_arg"] = Module["asm"]["Ld"]).apply(null, arguments)
            };
            var _PL_unify_term = Module["_PL_unify_term"] = function () {
                return (_PL_unify_term = Module["_PL_unify_term"] = Module["asm"]["Md"]).apply(null, arguments)
            };
            var _PL_put_blob = Module["_PL_put_blob"] = function () {
                return (_PL_put_blob = Module["_PL_put_blob"] = Module["asm"]["Nd"]).apply(null, arguments)
            };
            var _PL_put_dict = Module["_PL_put_dict"] = function () {
                return (_PL_put_dict = Module["_PL_put_dict"] = Module["asm"]["Od"]).apply(null, arguments)
            };
            var _PL_term_type = Module["_PL_term_type"] = function () {
                return (_PL_term_type = Module["_PL_term_type"] = Module["asm"]["Pd"]).apply(null, arguments)
            };
            var _PL_context = Module["_PL_context"] = function () {
                return (_PL_context = Module["_PL_context"] = Module["asm"]["Qd"]).apply(null, arguments)
            };
            var _PL_module_name = Module["_PL_module_name"] = function () {
                return (_PL_module_name = Module["_PL_module_name"] = Module["asm"]["Rd"]).apply(null, arguments)
            };
            var _PL_predicate_info = Module["_PL_predicate_info"] = function () {
                return (_PL_predicate_info = Module["_PL_predicate_info"] = Module["asm"]["Sd"]).apply(null, arguments)
            };
            var _PL_call = Module["_PL_call"] = function () {
                return (_PL_call = Module["_PL_call"] = Module["asm"]["Td"]).apply(null, arguments)
            };
            var _PL_foreign_context = Module["_PL_foreign_context"] = function () {
                return (_PL_foreign_context = Module["_PL_foreign_context"] = Module["asm"]["Ud"]).apply(null, arguments)
            };
            var _PL_foreign_context_predicate = Module["_PL_foreign_context_predicate"] = function () {
                return (_PL_foreign_context_predicate = Module["_PL_foreign_context_predicate"] = Module["asm"]["Vd"]).apply(null, arguments)
            };
            var _PL_register_extensions_in_module = Module["_PL_register_extensions_in_module"] = function () {
                return (_PL_register_extensions_in_module = Module["_PL_register_extensions_in_module"] = Module["asm"]["Wd"]).apply(null, arguments)
            };
            var _PL_register_extensions = Module["_PL_register_extensions"] = function () {
                return (_PL_register_extensions = Module["_PL_register_extensions"] = Module["asm"]["Xd"]).apply(null, arguments)
            };
            var _PL_register_foreign = Module["_PL_register_foreign"] = function () {
                return (_PL_register_foreign = Module["_PL_register_foreign"] = Module["asm"]["Yd"]).apply(null, arguments)
            };
            var _PL_abort_hook = Module["_PL_abort_hook"] = function () {
                return (_PL_abort_hook = Module["_PL_abort_hook"] = Module["asm"]["Zd"]).apply(null, arguments)
            };
            var _PL_abort_unhook = Module["_PL_abort_unhook"] = function () {
                return (_PL_abort_unhook = Module["_PL_abort_unhook"] = Module["asm"]["_d"]).apply(null, arguments)
            };
            var _PL_dispatch_hook = Module["_PL_dispatch_hook"] = function () {
                return (_PL_dispatch_hook = Module["_PL_dispatch_hook"] = Module["asm"]["$d"]).apply(null, arguments)
            };
            var _PL_duplicate_record = Module["_PL_duplicate_record"] = function () {
                return (_PL_duplicate_record = Module["_PL_duplicate_record"] = Module["asm"]["ae"]).apply(null, arguments)
            };
            var _PL_action = Module["_PL_action"] = function () {
                return (_PL_action = Module["_PL_action"] = Module["asm"]["be"]).apply(null, arguments)
            };
            var _PL_query = Module["_PL_query"] = function () {
                return (_PL_query = Module["_PL_query"] = Module["asm"]["ce"]).apply(null, arguments)
            };
            var __PL_streams = Module["__PL_streams"] = function () {
                return (__PL_streams = Module["__PL_streams"] = Module["asm"]["de"]).apply(null, arguments)
            };
            var _PL_get_file_nameW = Module["_PL_get_file_nameW"] = function () {
                return (_PL_get_file_nameW = Module["_PL_get_file_nameW"] = Module["asm"]["ee"]).apply(null, arguments)
            };
            var _WASM_ttymode = Module["_WASM_ttymode"] = function () {
                return (_WASM_ttymode = Module["_WASM_ttymode"] = Module["asm"]["fe"]).apply(null, arguments)
            };
            var _WASM_variable_id = Module["_WASM_variable_id"] = function () {
                return (_WASM_variable_id = Module["_WASM_variable_id"] = Module["asm"]["ge"]).apply(null, arguments)
            };
            var _WASM_yield_request = Module["_WASM_yield_request"] = function () {
                return (_WASM_yield_request = Module["_WASM_yield_request"] = Module["asm"]["he"]).apply(null, arguments)
            };
            var _WASM_set_yield_result = Module["_WASM_set_yield_result"] = function () {
                return (_WASM_set_yield_result = Module["_WASM_set_yield_result"] = Module["asm"]["ie"]).apply(null, arguments)
            };
            var _js_unify_obj = Module["_js_unify_obj"] = function () {
                return (_js_unify_obj = Module["_js_unify_obj"] = Module["asm"]["je"]).apply(null, arguments)
            };
            var _js_get_obj = Module["_js_get_obj"] = function () {
                return (_js_get_obj = Module["_js_get_obj"] = Module["asm"]["ke"]).apply(null, arguments)
            };
            var ___funcs_on_exit = Module["___funcs_on_exit"] = function () {
                return (___funcs_on_exit = Module["___funcs_on_exit"] = Module["asm"]["le"]).apply(null, arguments)
            };
            var _fflush = Module["_fflush"] = function () {
                return (_fflush = Module["_fflush"] = Module["asm"]["me"]).apply(null, arguments)
            };
            var _emscripten_builtin_memalign = Module["_emscripten_builtin_memalign"] = function () {
                return (_emscripten_builtin_memalign = Module["_emscripten_builtin_memalign"] = Module["asm"]["ne"]).apply(null, arguments)
            };
            var _setThrew = Module["_setThrew"] = function () {
                return (_setThrew = Module["_setThrew"] = Module["asm"]["oe"]).apply(null, arguments)
            };
            var stackSave = Module["stackSave"] = function () {
                return (stackSave = Module["stackSave"] = Module["asm"]["pe"]).apply(null, arguments)
            };
            var stackRestore = Module["stackRestore"] = function () {
                return (stackRestore = Module["stackRestore"] = Module["asm"]["qe"]).apply(null, arguments)
            };
            var stackAlloc = Module["stackAlloc"] = function () {
                return (stackAlloc = Module["stackAlloc"] = Module["asm"]["re"]).apply(null, arguments)
            };

            function invoke_iii(index, a1, a2) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)(a1, a2)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_ii(index, a1) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)(a1)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_i(index) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)()
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_iiii(index, a1, a2, a3) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)(a1, a2, a3)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_vi(index, a1) {
                var sp = stackSave();
                try {
                    getWasmTableEntry(index)(a1)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_viii(index, a1, a2, a3) {
                var sp = stackSave();
                try {
                    getWasmTableEntry(index)(a1, a2, a3)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_vii(index, a1, a2) {
                var sp = stackSave();
                try {
                    getWasmTableEntry(index)(a1, a2)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_v(index) {
                var sp = stackSave();
                try {
                    getWasmTableEntry(index)()
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_iiiii(index, a1, a2, a3, a4) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)(a1, a2, a3, a4)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_iiji(index, a1, a2, a3) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)(a1, a2, a3)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            function invoke_ij(index, a1) {
                var sp = stackSave();
                try {
                    return getWasmTableEntry(index)(a1)
                } catch (e) {
                    stackRestore(sp);
                    if (e !== e + 0) throw e;
                    _setThrew(1, 0)
                }
            }

            Module["UTF8ToString"] = UTF8ToString;
            Module["stringToUTF8"] = stringToUTF8;
            Module["lengthBytesUTF8"] = lengthBytesUTF8;
            Module["addRunDependency"] = addRunDependency;
            Module["removeRunDependency"] = removeRunDependency;
            Module["FS_createPath"] = FS.createPath;
            Module["FS_createDataFile"] = FS.createDataFile;
            Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
            Module["FS_createLazyFile"] = FS.createLazyFile;
            Module["FS_createDevice"] = FS.createDevice;
            Module["FS_unlink"] = FS.unlink;
            Module["cwrap"] = cwrap;
            Module["setValue"] = setValue;
            Module["getValue"] = getValue;
            Module["intArrayFromString"] = intArrayFromString;
            Module["FS"] = FS;
            Module["ALLOC_NORMAL"] = ALLOC_NORMAL;
            Module["allocate"] = allocate;
            var calledRun;
            dependenciesFulfilled = function runCaller() {
                if (!calledRun) run();
                if (!calledRun) dependenciesFulfilled = runCaller
            };

            function run(args) {
                args = args || arguments_;
                if (runDependencies > 0) {
                    return
                }
                preRun();
                if (runDependencies > 0) {
                    return
                }

                function doRun() {
                    if (calledRun) return;
                    calledRun = true;
                    Module["calledRun"] = true;
                    if (ABORT) return;
                    initRuntime();
                    readyPromiseResolve(Module);
                    if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
                    postRun()
                }

                if (Module["setStatus"]) {
                    Module["setStatus"]("Running...");
                    setTimeout(function () {
                        setTimeout(function () {
                            Module["setStatus"]("")
                        }, 1);
                        doRun()
                    }, 1)
                } else {
                    doRun()
                }
            }

            if (Module["preInit"]) {
                if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
                while (Module["preInit"].length > 0) {
                    Module["preInit"].pop()()
                }
            }
            run();
            const class_var = class PrologVar {
                constructor(id) {
                    this.$t = "v";
                    if (id !== undefined) this.v = id
                }
            };
            const class_string = class PrologString {
                constructor(string) {
                    this.$t = "s";
                    this.v = string
                }

                toString() {
                    return this.v
                }

                toJSON() {
                    return this.v
                }
            };
            const class_rational = class PrologRational {
                constructor(n, d) {
                    this.$t = "r";
                    this.n = n;
                    this.d = d
                }

                toNumber() {
                    return Number(this.d) / Number(this.n)
                }

                toString() {
                    return this.d + "r" + this.n
                }

                toJSON() {
                    return this.toString()
                }
            };
            const class_compound = class PrologCompound {
                constructor(name, args) {
                    this.$t = "t";
                    this.functor = name;
                    this[name] = args
                }

                arguments() {
                    return this[this.functor]
                }

                arg(n) {
                    return this.arguments[n]
                }

                arity() {
                    return this.arguments.length
                }

                toJSON() {
                    const obj = {$t: "t"};
                    obj[this.functor] = this.arguments();
                    return obj
                }
            };
            const class_list = class PrologList {
                constructor(array, tail) {
                    this.$t = "l";
                    this.v = array;
                    if (tail !== undefined) this.t = tail
                }
            };
            const class_blob = class PrologBlob {
                constructor() {
                    this.$t = "b"
                }
            };
            const class_abortable_promise = class AbortablePromise extends Promise {
                constructor(executer) {
                    super(executer);
                    this.executer = executer
                }

                abort() {
                    if (this.executer.abort) return this.executer.abort(); else console.log("Cannot abort promise");
                    return false
                }
            };

            class Prolog {
                constructor(module, args) {
                    this.module = module;
                    this.args = args;
                    this.lastyieldat = 0;
                    this.functor_arg_names_ = {};
                    this.objects = {};
                    this.object_ids = new WeakMap;
                    this.next_object_id = 0;
                    this.open_queries = [];
                    this.__set_foreign_constants();
                    this.__bind_foreign_functions();
                    this.__export_classes();
                    this.__initialize()
                }

                __initialize() {
                    let argv0 = this.args || [];
                    argv0.unshift("swipl");
                    let argv = argv0.map(function (arg) {
                        return this.module.allocate(this.module.intArrayFromString(arg), "i8", this.module.ALLOC_NORMAL)
                    }, this);
                    var ptr = this.module._malloc(argv.length * 4);
                    argv.forEach(function (arg, i) {
                        this.module.setValue(ptr + i * 4, arg, "*")
                    }, this);
                    if (!this.bindings.PL_initialise(argv.length, ptr)) {
                        throw new Error("SWI-Prolog initialisation failed.")
                    }
                    this.MODULE_user = this.new_module("user");
                    this.call("set_prolog_flag(color_term, false).");
                    this.call("set_prolog_flag(debug_on_error, false)");
                    this.call("use_module(library(wasm))")
                }

                __export_classes() {
                    this.Var = class_var;
                    this.String = class_string;
                    this.Rational = class_rational;
                    this.Compound = class_compound;
                    this.List = class_list;
                    this.Blob = class_blob;
                    this.Promise = class_abortable_promise
                }

                __set_foreign_constants() {
                    this.PL_VARIABLE = 1;
                    this.PL_ATOM = 2;
                    this.PL_INTEGER = 3;
                    this.PL_RATIONAL = 4;
                    this.PL_FLOAT = 5;
                    this.PL_STRING = 6;
                    this.PL_TERM = 7;
                    this.PL_NIL = 8;
                    this.PL_BLOB = 9;
                    this.PL_LIST_PAIR = 10;
                    this.PL_FUNCTOR = 11;
                    this.PL_LIST = 12;
                    this.PL_CHARS = 13;
                    this.PL_POINTER = 14;
                    this.PL_CODE_LIST = 15;
                    this.PL_CHAR_LIST = 16;
                    this.PL_BOOL = 17;
                    this.PL_FUNCTOR_CHARS = 18;
                    this._PL_PREDICATE_INDICATOR = 19;
                    this.PL_SHORT = 20;
                    this.PL_INT = 21;
                    this.PL_LONG = 22;
                    this.PL_DOUBLE = 23;
                    this.PL_NCHARS = 24;
                    this.PL_UTF8_CHARS = 25;
                    this.PL_UTF8_STRING = 26;
                    this.PL_INT64 = 27;
                    this.PL_NUTF8_CHARS = 28;
                    this.PL_NUTF8_CODES = 29;
                    this.PL_NUTF8_STRING = 30;
                    this.PL_NWCHARS = 31;
                    this.PL_NWCODES = 32;
                    this.PL_NWSTRING = 33;
                    this.PL_MBCHARS = 34;
                    this.PL_MBCODES = 35;
                    this.PL_MBSTRING = 36;
                    this.PL_INTPTR = 37;
                    this.PL_CHAR = 38;
                    this.PL_CODE = 39;
                    this.PL_BYTE = 40;
                    this.PL_PARTIAL_LIST = 41;
                    this.PL_CYCLIC_TERM = 42;
                    this.PL_NOT_A_LIST = 43;
                    this.PL_DICT = 44;
                    this.REP_ISO_LATIN_1 = 0;
                    this.REP_UTF8 = 1048576;
                    this.REP_MB = 2097152;
                    this.REP_FN = this.REP_UTF8;
                    this.CVT_ATOM = 1;
                    this.CVT_STRING = 2;
                    this.CVT_LIST = 4;
                    this.CVT_INTEGER = 8;
                    this.CVT_RATIONAL = 16;
                    this.CVT_FLOAT = 32;
                    this.CVT_VARIABLE = 64;
                    this.CVT_NUMBER = this.CVT_INTEGER | this.CVT_RATIONAL | this.CVT_FLOAT;
                    this.CVT_ATOMIC = this.CVT_NUMBER | this.CVT_ATOM | this.CVT_STRING;
                    this.CVT_WRITE = 128;
                    this.CVT_WRITE_CANONICAL = 256;
                    this.CVT_WRITEQ = 512;
                    this.CVT_ALL = this.CVT_ATOMIC | this.CVT_LIST;
                    this.CVT_MASK = 4095;
                    this.CVT_EXCEPTION = 4096;
                    this.CVT_VARNOFAIL = 8192;
                    this.BUF_DISCARDABLE = 0;
                    this.BUF_STACK = 65536;
                    this.BUF_MALLOC = 131072;
                    this.BUF_ALLOW_STACK = 262144;
                    this.PL_Q_NORMAL = 2;
                    this.PL_Q_NODEBUG = 4;
                    this.PL_Q_CATCH_EXCEPTION = 8;
                    this.PL_Q_PASS_EXCEPTION = 16;
                    this.PL_Q_ALLOW_YIELD = 32;
                    this.PL_Q_EXT_STATUS = 64;
                    this.PL_S_EXCEPTION = -1;
                    this.PL_S_FALSE = 0;
                    this.PL_S_TRUE = 1;
                    this.PL_S_LAST = 2;
                    this.PL_S_YIELD = 255;
                    this.PL_WRT_QUOTED = 1;
                    this.PL_WRT_NEWLINE = 8192
                }

                __bind_foreign_functions() {
                    this.bindings = {
                        _PL_streams: this.module.cwrap("_PL_streams", "number", []),
                        PL_functor_arity: this.module.cwrap("PL_functor_arity", "number", ["number"]),
                        PL_functor_name: this.module.cwrap("PL_functor_name", "number", ["number"]),
                        PL_get_functor: this.module.cwrap("PL_get_functor", "number", ["number", "number"]),
                        PL_get_chars: this.module.cwrap("PL_get_chars", "number", ["number", "number", "number"]),
                        PL_get_arg: this.module.cwrap("PL_get_arg", "number", ["number", "number", "number"]),
                        PL_get_int64: this.module.cwrap("PL_get_int64", "number", ["number", "number"]),
                        PL_get_float: this.module.cwrap("PL_get_float", "number", ["number", "number"]),
                        PL_put_chars: this.module.cwrap("PL_put_chars", "number", ["number", "number", "number", "number"]),
                        put_bytes: this.module.cwrap("PL_put_chars", "number", ["number", "number", "number", "array"]),
                        PL_put_atom: this.module.cwrap("PL_put_atom", "number", ["number"]),
                        PL_put_variable: this.module.cwrap("PL_put_variable", "number", ["number"]),
                        PL_unify: this.module.cwrap("PL_unify", "number", ["number", "number"]),
                        PL_is_string: this.module.cwrap("PL_is_string", "number", ["number"]),
                        PL_is_variable: this.module.cwrap("PL_is_variable", "number", ["number"]),
                        PL_term_type: this.module.cwrap("PL_term_type", "number", ["number"]),
                        PL_get_list: this.module.cwrap("PL_get_list", "number", ["number", "number", "number"]),
                        PL_get_nil: this.module.cwrap("PL_get_nil", "number", ["number"]),
                        PL_initialise: this.module.cwrap("PL_initialise", "number", ["number", "number"]),
                        PL_new_atom: this.module.cwrap("PL_new_atom", "number", ["string"]),
                        PL_register_atom: this.module.cwrap("PL_register_atom", null, ["number"]),
                        PL_unregister_atom: this.module.cwrap("PL_unregister_atom", null, ["number"]),
                        PL_new_module: this.module.cwrap("PL_new_module", "number", ["number"]),
                        PL_new_functor: this.module.cwrap("PL_new_functor", "number", ["number", "number"]),
                        PL_new_term_ref: this.module.cwrap("PL_new_term_ref", "number", []),
                        PL_new_term_refs: this.module.cwrap("PL_new_term_refs", "number", ["number"]),
                        PL_copy_term_ref: this.module.cwrap("PL_copy_term_ref", "number", ["number"]),
                        PL_reset_term_refs: this.module.cwrap("PL_reset_term_refs", null, ["number"]),
                        PL_put_functor: this.module.cwrap("PL_put_functor", "number", ["number", "number"]),
                        PL_put_integer: this.module.cwrap("PL_put_integer", "number", ["number", "number"]),
                        PL_put_float: this.module.cwrap("PL_put_float", "number", ["number", "number"]),
                        PL_put_nil: this.module.cwrap("PL_put_nil", "number", []),
                        PL_cons_functor_v: this.module.cwrap("PL_cons_functor_v", "number", ["number", "number", "number"]),
                        PL_cons_list: this.module.cwrap("PL_cons_list", "number", ["number", "number", "number"]),
                        PL_put_dict: this.module.cwrap("PL_put_dict", "number", ["number", "number", "number", "number", "number"]),
                        PL_put_term_from_chars: this.module.cwrap("PL_put_term_from_chars", "number", ["number", "number", "number", "string"]),
                        PL_put_term: this.module.cwrap("PL_put_term", "number", ["number", "number"]),
                        PL_write_term: this.module.cwrap("PL_write_term", "number", ["number", "number", "number", "number"]),
                        PL_call: this.module.cwrap("PL_call", "number", ["number", "number"]),
                        PL_open_foreign_frame: this.module.cwrap("PL_open_foreign_frame", "number", []),
                        PL_close_foreign_frame: this.module.cwrap("PL_close_foreign_frame", "number", ["number"]),
                        PL_discard_foreign_frame: this.module.cwrap("PL_close_foreign_frame", "number", ["number"]),
                        PL_predicate: this.module.cwrap("PL_predicate", "number", ["number", "number", "number"]),
                        PL_open_query: this.module.cwrap("PL_open_query", "number", ["number", "number", "number", "number"]),
                        PL_next_solution: this.module.cwrap("PL_next_solution", "number", ["number"]),
                        PL_close_query: this.module.cwrap("PL_close_query", "number", ["number"]),
                        PL_cut_query: this.module.cwrap("PL_cut_query", "number", ["number"]),
                        PL_exception: this.module.cwrap("PL_exception", "number", ["number"]),
                        PL_raise_exception: this.module.cwrap("PL_raise_exception", "number", ["number"]),
                        WASM_ttymode: this.module.cwrap("WASM_ttymode", "number", []),
                        WASM_yield_request: this.module.cwrap("WASM_yield_request", "number", []),
                        WASM_set_yield_result: this.module.cwrap("WASM_set_yield_result", "number", ["number"]),
                        WASM_variable_id: this.module.cwrap("WASM_variable_id", "number", ["number"]),
                        js_unify_obj: this.module.cwrap("js_unify_obj", "number", ["number", "number"]),
                        js_get_obj: this.module.cwrap("js_get_obj", "number", ["number"])
                    }
                }

                call(goal, opts) {
                    opts = opts || {};
                    if (typeof goal === "string") {
                        if (opts.async) {
                            return this.__call_yieldable(goal, opts)
                        } else {
                            return this.with_frame(function () {
                                const term = this.new_term_ref();
                                if (!this.chars_to_term(goal, term)) throw new Error("Query has a syntax error: " + query);
                                const module = opts.module ? this.new_module(opts.module) : this.MODULE_user;
                                return !!this.bindings.PL_call(term, module)
                            })
                        }
                    }
                }

                with_frame(f, persist) {
                    const fid = this.bindings.PL_open_foreign_frame();
                    if (fid) {
                        const rc = f.call(this);
                        if (persist === false) this.bindings.PL_discard_foreign_frame(fid); else this.bindings.PL_close_foreign_frame(fid);
                        return rc
                    }
                    return false
                }

                __string_to_c(string) {
                    const len = this.module.lengthBytesUTF8(string);
                    const ptr = this.module._malloc(len + 1);
                    this.module.stringToUTF8(string, ptr, len + 1);
                    return {ptr: ptr, length: len}
                }

                predicate(name, arity, module) {
                    if (arity === undefined) {
                        let ar = /^([^:]+):(.*)\/([0-9]+)$/.exec(name);
                        if (ar) {
                            module = ar[1];
                            name = ar[2];
                            arity = parseInt(ar[3])
                        } else {
                            ar = /(.*)\/([0-9]+)$/.exec(name);
                            if (ar) {
                                name = ar[1];
                                arity = parseInt(ar[2])
                            }
                        }
                        if (arity === undefined) throw`Prolog.predicate: illegal specification: ${name}`
                    }
                    const c_name = allocateUTF8(name);
                    const c_module = allocateUTF8(module || "user");
                    const pred = this.bindings.PL_predicate(c_name, arity, c_module);
                    this.module._free(c_name);
                    this.module._free(c_module);
                    return pred
                }

                new_module(name) {
                    const c_atom = this.new_atom(name);
                    const module = this.bindings.PL_new_module(c_atom);
                    this.unregister_atom(c_atom);
                    return module
                }

                consult(...args) {
                    return this.forEach("load_files(user:Files)", {Files: args})
                }

                load_string(s, id) {
                    if (!id) {
                        this.__script_id = this.__script_id + 1 || 1;
                        id = "/string/" + this.__script_id
                    }
                    return this.forEach("setup_call_cleanup(" + "open_string(S, _In)," + "load_files(user:Id, [stream(_In)])," + "close(_In))", {
                        S: new this.String(s),
                        Id: id
                    })
                }

                async load_scripts() {
                    const prolog = this;
                    const scripts = document.querySelectorAll("script[type='text/prolog']");
                    const loaded = [];
                    for (let i = 0; i < scripts.length; i++) {
                        const s = scripts[i];
                        const name = `/script/${s.id || s.name || i + 1}`;
                        await prolog.load_string(s.text, name);
                        loaded.push(name)
                    }
                    return name
                }

                bind(e, on, goal) {
                    const prolog = this;
                    e.addEventListener(on, ev => {
                        prolog.query(goal, {Event__: ev}).once()
                    })
                }

                fetch(url, opts, type) {
                    return fetch(url, opts).then(response => response[type]())
                }

                url_properties(url) {
                    return fetch(url, {method: "HEAD"}).then(r => {
                        if (r.status == 200) {
                            const size = parseInt(r.headers.get("content-length"));
                            const mods = r.headers.get("last-modified");
                            const time = Date.parse(mods) || 0;
                            if (!size instanceof Number) size = -1;
                            return {url: r.url, status: r.status, size: size, last_modified: time / 1e3}
                        } else {
                            return {url: url, status: r.status}
                        }
                    })
                }

                message_to_string(term) {
                    return this.with_frame(() => {
                        const av = this.new_term_ref(2);
                        this.bindings.PL_put_term(av + 0, term);
                        const flags = this.PL_Q_NORMAL;
                        const pred = this.predicate("message_to_string/2");
                        const qid = this.bindings.PL_open_query(0, flags, pred, av);
                        let msg;
                        if (this.bindings.PL_next_solution(qid)) msg = this.get_chars(av + 1); else msg = "Unknown Prolog exception";
                        this.bindings.PL_close_query(qid);
                        return msg
                    }, false)
                }

                flush_output(stream) {
                    if (stream == undefined) {
                        flush("stderr");
                        flush("stdout")
                    } else {
                        flush(stream)
                    }
                }

                log(...args) {
                    log_output("stdout", args)
                }

                query(module, flags, pred, argv, map, fid) {
                    if (typeof argv === "number") {
                        return new Query(this, module, flags, pred, argv, map)
                    } else if (typeof module === "string" && pred === undefined) {
                        const goal = module;
                        const fid = this.bindings.PL_open_foreign_frame();
                        const av = this.new_term_ref(3);
                        const input = flags || {};
                        this.frame = fid;
                        this.put_chars(av + 0, goal);
                        this.toProlog(input, av + 1);
                        const q = new Query(this, 0, this.PL_Q_CATCH_EXCEPTION, "wasm_call_string/3", av, a => this.toJSON(a + 2));
                        q.from_text = true;
                        return q
                    }
                }

                forEach(goal, ...args) {
                    const prolog = this;
                    const fid = this.bindings.PL_open_foreign_frame();
                    const av = this.new_term_ref(3);
                    let callback;
                    let input;
                    if (typeof args[0] === "object") {
                        input = args[0];
                        callback = args[1]
                    } else {
                        input = {};
                        callback = args[0]
                    }
                    if (callback !== undefined && typeof callback !== "function") throw TypeError("callback must be a function");
                    this.frame = fid;
                    this.put_chars(av + 0, goal);
                    this.toProlog(input, av + 1);
                    const q = new Query(this, this.MODULE_user, this.PL_Q_ALLOW_YIELD | this.PL_Q_CATCH_EXCEPTION, "wasm_call_string_with_heartbeat/3", av, a => this.toJSON(a + 2));
                    return new Promise(function (resolve, reject) {
                        let answers = callback ? 0 : [];

                        function next_foreach(rc) {
                            while (true) {
                                if (rc.yield !== undefined) {
                                    switch (rc.yield) {
                                        case"beat":
                                            return setTimeout(() => next_foreach(rc.resume("true")), 0);
                                        case"builtin":
                                            return rc.resume(rc => next_foreach(rc));
                                        default:
                                            throw rc
                                    }
                                } else if (rc.value) {
                                    if (callback) {
                                        answers++;
                                        callback.call(prolog, rc.value)
                                    } else {
                                        answers.push(rc.value)
                                    }
                                    if (rc.done == false) {
                                        rc = q.next_yieldable();
                                        continue
                                    }
                                }
                                q.close();
                                if (rc.error) return reject(rc.message);
                                if (rc.done) return resolve(answers)
                            }
                        }

                        return next_foreach(q.next_yieldable())
                    })
                }

                abort() {
                    this.abort_request = true
                }

                promise_sleep(time) {
                    const f = function (resolve, reject) {
                        f.reject = reject;
                        f.timer = setTimeout(() => {
                            f.timer = undefined;
                            resolve(true)
                        }, time * 1e3)
                    };
                    f.abort = function () {
                        if (f.timer) {
                            clearTimeout(f.timer);
                            f.timer = undefined;
                            f.reject("abort")
                        }
                    };
                    return new this.Promise(f)
                }

                stream(name) {
                    const iob = this.bindings._PL_streams();
                    let offset = undefined;
                    switch (name) {
                        case"user_input":
                            offset = 0;
                            break;
                        case"user_output":
                            offset = 1;
                            break;
                        case"user_error":
                            offset = 2;
                            break;
                        default:
                            throw`Unknown stream ${name}`
                    }
                    return this.module.getValue(iob + offset * 4, "i32")
                }

                write(term, opts) {
                    opts = opts || {};
                    const precedence = opts.precedence || 1200;
                    const flags = opts.flags == undefined ? this.PL_WRT_QUOTED | this.PL_WRT_NEWLINE : flags;
                    let s = undefined;
                    if (opts.stream) {
                        if (typeof stream === "string") s = this.stream(opts.stream)
                    } else {
                        s = this.stream("user_output")
                    }
                    return this.bindings.PL_write_term(s, term, precedence, flags)
                }

                functor_arity(functor) {
                    return this.bindings.PL_functor_arity(functor)
                }

                functor_name(functor) {
                    return this.bindings.PL_functor_name(functor)
                }

                get_functor(term) {
                    const ptr = this.module._malloc(4);
                    let result;
                    if (this.bindings.PL_get_functor(term, ptr)) result = this.module.getValue(ptr, "i32"); else result = null;
                    this.module._free(ptr);
                    return result
                }

                get_integer(term) {
                    const ptr = this.module._malloc(8);
                    let rc;
                    if (this.bindings.PL_get_int64(term, ptr)) {
                        rc = this.module.getValue(ptr, "i64");
                        if (rc >= Number.MIN_SAFE_INTEGER && rc <= Number.MAX_SAFE_INTEGER) rc = Number(rc)
                    } else {
                        const s = this.get_chars(term, this.CVT_INTEGER);
                        rc = BigInt(s)
                    }
                    this.module._free(ptr);
                    return rc
                }

                get_float(term) {
                    const ptr = this.module._malloc(8);
                    let rc;
                    if (this.bindings.PL_get_float(term, ptr)) {
                        rc = this.module.getValue(ptr, "double")
                    } else {
                        rc = null
                    }
                    this.module._free(ptr);
                    return rc
                }

                put_chars(term, string, flags) {
                    flags = flags || this.PL_STRING;
                    flags |= this.REP_UTF8;
                    const c = this.__string_to_c(string);
                    const ret = !!this.bindings.PL_put_chars(term, flags, c.length, c.ptr);
                    this.module._free(c.ptr);
                    return ret
                }

                put_bytes(term, array_buffer) {
                    const content = new Uint8Array(array_buffer);
                    return !!this.bindings.put_bytes(term, this.PL_STRING | this.REP_ISO_LATIN_1, content.length, content)
                }

                put_bigint(term, value) {
                    const s = value.toString();
                    return this.bindings.PL_put_term_from_chars(term, this.REP_UTF8, -1, s)
                }

                unify(term1, term2) {
                    return !!this.bindings.PL_unify(term1, term2)
                }

                is_string(term) {
                    return !!this.bindings.PL_is_string(term)
                }

                is_variable(term) {
                    return !!this.bindings.PL_is_variable(term)
                }

                atom_chars(atom) {
                    const t = this.new_term_ref();
                    this.bindings.PL_put_atom(t, atom);
                    const str = this.get_chars(t, this.CVT_ATOM);
                    this.bindings.PL_reset_term_refs(t);
                    return str
                }

                ttymode() {
                    return this.module.UTF8ToString(this.bindings.WASM_ttymode())
                }

                yield_request() {
                    const tref = this.bindings.WASM_yield_request();
                    return this.toJSON(tref)
                }

                set_yield_result(obj) {
                    this.with_frame(() => {
                        const term = this.toProlog(obj, undefined, {string: "string"});
                        if (!term) {
                            console.log("Could not convert", obj);
                            throw"Could not convert JavaScript data to Prolog"
                        }
                        this.bindings.WASM_set_yield_result(term)
                    }, true)
                }

                __call_yieldable(goal, module) {
                    var pred_call1;
                    const flags = this.PL_Q_NORMAL | this.PL_Q_ALLOW_YIELD;
                    if (!pred_call1) pred_call1 = this.predicate("call", 1, "system");
                    const fid = this.bindings.PL_open_foreign_frame();
                    const term = this.new_term_ref();
                    if (!this.chars_to_term(goal, term)) throw new Error("Query has a syntax error: " + query);
                    const q = this.query(module, flags, pred_call1, term, fid);
                    return q.next_yieldable()
                }

                set_arg_names(name, args) {
                    if (!this.functor_arg_names_[name]) this.functor_arg_names_[name] = {};
                    this.functor_arg_names_[name][args.length] = args
                }

                arg_names(name, arity) {
                    if (this.functor_arg_names_[name]) return this.functor_arg_names_[name][arity]
                }

                toJSON(term, options) {
                    options = options || {};

                    function toJSON(prolog, term, options) {
                        switch (prolog.bindings.PL_term_type(term)) {
                            case prolog.PL_VARIABLE:
                                return new prolog.Var(prolog.bindings.WASM_variable_id(term));
                            case prolog.PL_STRING:
                                if (options.string !== "string") return new prolog.String(prolog.get_chars(term));
                            case prolog.PL_ATOM:
                                return prolog.get_chars(term);
                            case prolog.PL_NIL:
                                return [];
                            case prolog.PL_BLOB: {
                                const id = prolog.bindings.js_get_obj(term);
                                if (id != -1) return prolog.objects[id];
                                return new prolog.Blob
                            }
                            case prolog.PL_INTEGER:
                                return prolog.get_integer(term);
                            case prolog.PL_RATIONAL: {
                                let s = prolog.get_chars(term, prolog.CVT_RATIONAL);
                                let a = s.split("r");

                                function toInt(s) {
                                    const bi = BigInt(s);
                                    if (bi >= Number.MIN_SAFE_INTEGER && bi <= Number.MAX_SAFE_INTEGER) return Number(bi);
                                    return bi
                                }

                                return new prolog.Rational(toInt(a[0]), toInt(a[1]))
                            }
                            case prolog.PL_FLOAT:
                                return prolog.get_float(term);
                            case prolog.PL_TERM: {
                                const f = prolog.get_functor(term);
                                const name = prolog.atom_chars(prolog.functor_name(f));
                                const arity = prolog.functor_arity(f);
                                const map = prolog.arg_names(name, arity);
                                const a = prolog.new_term_ref();
                                if (map) {
                                    let result = {$tag: name};
                                    for (var i = 0; i < arity; i++) {
                                        prolog.get_arg(i + 1, term, a);
                                        result[map[i]] = toJSON(prolog, a, options)
                                    }
                                    return result
                                } else {
                                    const args = [];
                                    let result = {$t: "t"};
                                    for (var i = 1; i <= arity; i++) {
                                        prolog.get_arg(i, term, a);
                                        args.push(toJSON(prolog, a, options))
                                    }
                                    return new prolog.Compound(name, args)
                                }
                            }
                            case prolog.PL_LIST_PAIR: {
                                let result = [];
                                const h = prolog.bindings.PL_new_term_ref();
                                const t = prolog.bindings.PL_copy_term_ref(term);
                                while (prolog.bindings.PL_get_list(t, h, t)) {
                                    result.push(toJSON(prolog, h, options))
                                }
                                if (prolog.bindings.PL_get_nil(t)) return result;
                                return new prolog.List(result, toJSON(prolog, t, options))
                            }
                            case prolog.PL_DICT: {
                                let result = {};
                                let a = prolog.new_term_ref();
                                prolog.get_arg(1, term, a);
                                if (!prolog.is_variable(a)) result["$tag"] = toJSON(prolog, a, options);
                                for (var i = 2; ; i += 2) {
                                    if (prolog.get_arg(i + 1, term, a)) {
                                        let key = toJSON(prolog, a, options);
                                        prolog.get_arg(i, term, a);
                                        result[key] = toJSON(prolog, a, options)
                                    } else break
                                }
                                return result
                            }
                            default:
                                return undefined
                        }
                    }

                    return toJSON(this, term, options)
                }

                toProlog(data, term, ctx) {
                    ctx = ctx || {};

                    function toProlog(prolog, data, term, ctx) {
                        term = term || prolog.new_term_ref();
                        let rc;

                        function toList(term, data, tail) {
                            let h = prolog.new_term_ref();
                            let rc = true;
                            if (tail) rc = toProlog(prolog, tail, term, ctx); else rc = prolog.bindings.PL_put_nil(term);
                            for (var i = data.length - 1; i >= 0 && rc; i--) {
                                rc = toProlog(prolog, data[i], h, ctx) && prolog.bindings.PL_cons_list(term, h, term)
                            }
                            return rc
                        }

                        switch (typeof data) {
                            case"number":
                                if (Number.isInteger(data)) rc = prolog.bindings.PL_put_integer(term, data); else rc = prolog.bindings.PL_put_float(term, data);
                                break;
                            case"bigint":
                                rc = prolog.put_bigint(term, data);
                                break;
                            case"string": {
                                const flags = ctx.string === "string" ? prolog.PL_STRING : prolog.PL_ATOM;
                                rc = prolog.put_chars(term, data, flags);
                                break
                            }
                            case"boolean":
                                rc = prolog.put_chars(term, data ? "true" : "false", prolog.PL_ATOM);
                                break;
                            case"undefined":
                                rc = prolog.put_chars(term, "undefined", prolog.PL_ATOM);
                                break;
                            case"object":
                                if (data === null) {
                                    rc = prolog.put_chars(term, "null", prolog.PL_ATOM)
                                } else if (Array.isArray(data)) {
                                    rc = toList(term, data)
                                } else if (data.$t) {
                                    switch (data.$t) {
                                        case"s":
                                            rc = prolog.put_chars(term, data.v, prolog.PL_STRING);
                                            break;
                                        case"r": {
                                            const s = data.n + "r" + data.d;
                                            rc = prolog.bindings.PL_put_term_from_chars(term, prolog.REP_UTF8, -1, s);
                                            break
                                        }
                                        case"t": {
                                            const keys = Object.keys(data);
                                            let args;
                                            let name;
                                            for (var i = 0; i < keys.length; i++) {
                                                if (Array.isArray(data[keys[i]])) {
                                                    if (args === undefined) {
                                                        name = keys[i];
                                                        args = data[name]
                                                    } else console.log('Object with .$t:"t" is ambiguous', data)
                                                }
                                            }
                                            if (args !== undefined) {
                                                const av = prolog.new_term_ref(args.length);
                                                const f = prolog.new_functor(prolog.new_atom(name), args.length);
                                                rc = true;
                                                for (var i = 0; i < args.length && rc; i++) rc = toProlog(prolog, args[i], av + i, ctx);
                                                rc = rc && prolog.bindings.PL_cons_functor_v(term, f, av)
                                            }
                                            break
                                        }
                                        case"v": {
                                            rc = prolog.bindings.PL_put_variable(term);
                                            if (data.v) {
                                                if (!ctx.vars) ctx.vars = {};
                                                if (ctx.vars[data.v]) {
                                                    rc = prolog.bindings.PL_put_variable(term) && prolog.unify(term, ctx.vars[data.v])
                                                } else {
                                                    ctx.vars[data.v] = prolog.bindings.PL_copy_term_ref(term)
                                                }
                                            }
                                            break
                                        }
                                        case"l": {
                                            rc = toList(term, data.v, data.t);
                                            break
                                        }
                                        default: {
                                            console.log(`Object with invalid $t:${data.$t}`)
                                        }
                                    }
                                    break
                                } else {
                                    switch (data.constructor.name) {
                                        case"ArrayBuffer": {
                                            rc = prolog.put_bytes(term, data);
                                            break
                                        }
                                        case"Object": {
                                            const keys = Object.keys(data);
                                            const len = keys.length;
                                            const av = prolog.new_term_ref(len);
                                            const atoms = prolog.module._malloc(4 * len);
                                            let tag = 0;
                                            const class_name = data.constructor.name;
                                            if (class_name != "Object") tag = prolog.new_atom(class_name);
                                            rc = true;
                                            for (var i = 0; i < len && rc; i++) {
                                                rc = toProlog(prolog, data[keys[i]], av + i, ctx);
                                                prolog.module.setValue(atoms + 4 * i, prolog.new_atom(keys[i]), "i32")
                                            }
                                            rc = rc && prolog.bindings.PL_put_dict(term, tag, len, atoms, av);
                                            prolog.module._free(atoms);
                                            break
                                        }
                                        default: {
                                            let id = prolog.object_ids.get(data);
                                            if (id === undefined) {
                                                id = prolog.next_object_id + 1;
                                                rc = prolog.bindings.js_unify_obj(term, id);
                                                if (rc) {
                                                    prolog.object_ids.set(data, id);
                                                    prolog.objects[id] = data;
                                                    prolog.next_object_id = id
                                                }
                                            } else {
                                                rc = prolog.bindings.js_unify_obj(term, id)
                                            }
                                        }
                                    }
                                    break
                                }
                                break;
                            default:
                                return null
                        }
                        return rc ? term : null
                    }

                    return toProlog(this, data, term, ctx)
                }

                chars_to_term(string, t) {
                    return !!this.bindings.PL_put_term_from_chars(t, this.REP_UTF8, -1, string)
                }

                get_chars(term, flags) {
                    const ptr = this.module._malloc(4);
                    let rc;
                    flags = flags || this.CVT_ALL | this.CVT_WRITEQ;
                    flags |= this.CVT_EXCEPTION | this.REP_UTF8;
                    if (this.bindings.PL_get_chars(term, ptr, flags)) {
                        rc = this.module.UTF8ToString(this.module.getValue(ptr, "i32"))
                    } else {
                        rc = null
                    }
                    this.module._free(ptr);
                    return rc
                }

                get_arg(index, term, arg) {
                    return !!this.bindings.PL_get_arg(index, term, arg)
                }

                new_atom(string) {
                    return this.bindings.PL_new_atom(string)
                }

                register_atom(atom) {
                    this.bindings.PL_register_atom(atom);
                    return atom
                }

                unregister_atom(atom) {
                    this.bindings.PL_unregister_atom(atom)
                }

                new_functor(atom, arity) {
                    return this.bindings.PL_new_functor(atom, arity)
                }

                new_term_ref(count) {
                    return count === undefined ? this.bindings.PL_new_term_ref() : this.bindings.PL_new_term_refs(count)
                }

                put_functor(term, functor) {
                    return this.bindings.PL_put_functor(term, functor)
                }
            }

            class Query {
                constructor(prolog, module, flags, pred, argv, map, fid) {
                    module = module ? prolog.new_module(module) : 0;
                    if (typeof pred === "string") pred = prolog.predicate(pred);
                    flags |= prolog.PL_Q_EXT_STATUS;
                    if (!(flags & (prolog.PL_Q_CATCH_EXCEPTION | prolog.PL_Q_PASS_EXCEPTION | prolog.PL_Q_NORMAL))) flags |= prolog.PL_Q_CATCH_EXCEPTION;
                    this.flags = flags;
                    this.prolog = prolog;
                    this.map = map;
                    this.qid = prolog.bindings.PL_open_query(module, flags, pred, argv);
                    this.open = true;
                    this.argv = argv;
                    this.frame = fid;
                    prolog.open_queries.push(this)
                }

                [Symbol.iterator]() {
                    return this
                }

                next() {
                    const prolog = this.prolog;
                    const argv = this.argv;
                    if (!this.open) return {done: true};
                    if (this != prolog.open_queries.at(-1)) console.log("Attempt for Query.next() on not innermost query");
                    switch (prolog.bindings.PL_next_solution(this.qid)) {
                        case prolog.PL_S_EXCEPTION: {
                            if (this.flags & prolog.PL_Q_NORMAL) {
                                this.close();
                                return {done: true, error: true}
                            } else {
                                const msg = prolog.message_to_string(prolog.bindings.PL_exception(this.qid));
                                console.log(msg);
                                this.close();
                                return {done: true, error: true, message: msg}
                            }
                        }
                        case prolog.PL_S_FALSE:
                            this.close();
                            return {done: true};
                        case prolog.PL_S_LAST:
                            this.close();
                            return {done: true, value: this.map ? this.map.call(this, argv) : argv};
                        case prolog.PL_S_TRUE:
                            return {done: false, value: this.map ? this.map.call(this, argv) : argv};
                        case prolog.PL_S_YIELD: {
                            let request = prolog.yield_request();
                            return {
                                done: false, value: null, yield: request, resume: value => {
                                    prolog.set_yield_result(value);
                                    return this.next()
                                }
                            }
                        }
                    }
                }

                next_yieldable() {
                    function next(query) {
                        const prolog = query.prolog;
                        while (true) {
                            let rc = query.next();
                            if (rc.yield !== undefined) {
                                let request = rc.yield;
                                if (prolog.abort_request) {
                                    prolog.abort_request = undefined;
                                    prolog.set_yield_result("abort");
                                    continue
                                }
                                if (request === "beat") {
                                    const now = Date.now();
                                    const passed = now - prolog.lastyieldat;
                                    if (passed < 20) {
                                        prolog.set_yield_result("true");
                                        continue
                                    }
                                    prolog.lastyieldat = now
                                } else if (request instanceof Promise) {
                                    let result = {
                                        yield: "builtin", request: request, query: query, resume: cont => {
                                            if (typeof cont === "string") {
                                                prolog.set_yield_result(cont);
                                                return next(query)
                                            } else {
                                                result.cont = cont;
                                                request.then(value => {
                                                    prolog.set_yield_result(value);
                                                    cont.call(prolog, next(query))
                                                }).catch(error => {
                                                    prolog.set_yield_result({$error: error});
                                                    cont.call(prolog, next(query))
                                                })
                                            }
                                        }, abort: () => {
                                            if (!(request.abort && request.abort())) {
                                                console.log("Cannot abort", request);
                                                prolog.abort_request = true
                                            }
                                        }
                                    };
                                    return result
                                }
                                rc.resume = value => {
                                    prolog.set_yield_result(value);
                                    return next(query)
                                }
                            } else if (rc.done === false) {
                                rc.resume = () => next(query)
                            }
                            return rc
                        }
                    }

                    return next(this)
                }

                once() {
                    const rc = this.next();
                    this.close();
                    if (this.from_text) {
                        delete rc.done;
                        if (rc.value) {
                            rc.value.success = true;
                            return rc.value
                        } else {
                            if (!rc.error) rc.success = false;
                            return rc
                        }
                    } else {
                        return rc.value ? rc.value : rc
                    }
                }

                close() {
                    if (this.open) {
                        const prolog = this.prolog;
                        if (this != prolog.open_queries.at(-1)) console.log("Attempt for Query.close() on not innermost query");
                        prolog.open_queries.pop();
                        this.prolog.bindings.PL_cut_query(this.qid);
                        if (this.frame) this.prolog.bindings.PL_discard_foreign_frame(this.frame);
                        this.open = false
                    }
                }
            }

            Module.onRuntimeInitialized = function () {
                Module.prolog = new Prolog(Module, Module.arguments)
            };

            function prolog_js_call(request, result) {
                const prolog = Module.prolog;

                function eval_chain(ar, obj) {
                    obj = obj || window;

                    function eval_one(obj, fname, args) {
                        if (args.length == 0) {
                            switch (fname) {
                                case"instanceof":
                                    return obj.constructor.name
                            }
                        } else if (args.length == 1) {
                            switch (fname) {
                                case"-":
                                    return -args[0];
                                case"!":
                                    return !args[0];
                                case"instanceof":
                                    return obj instanceof args[0]
                            }
                        } else if (args.length == 2) {
                            switch (fname) {
                                case"+":
                                    return args[0] + args[1];
                                case"-":
                                    return args[0] - args[1];
                                case"*":
                                    return args[0] * args[1];
                                case"/":
                                    return args[0] / args[1];
                                case"&":
                                    return args[0] & args[1];
                                case"|":
                                    return args[0] | args[1];
                                case"&&":
                                    return args[0] && args[1];
                                case"||":
                                    return args[0] || args[1]
                            }
                        }
                        const func = obj[fname];
                        if (typeof func === "function") return func.apply(obj, args); else console.log("ERROR: Function", fname, "is not defined on", obj)
                    }

                    for (let i = 0; i < ar.length; i++) {
                        const next = ar[i];
                        if (typeof next === "string") {
                            if (i == 0) {
                                switch (next) {
                                    case"prolog":
                                        obj = prolog;
                                        break;
                                    case"window":
                                        obj = window;
                                        break;
                                    default:
                                        obj = eval(next)
                                }
                            } else {
                                obj = obj[next]
                            }
                        } else if (next.v !== undefined) {
                            obj = next.v
                        } else {
                            const args = next.args.map(v => eval_chain(v));
                            obj = eval_one(obj, next.f, args)
                        }
                    }
                    return obj
                }

                try {
                    return prolog.with_frame(() => {
                        const ar = prolog.toJSON(request, {string: "string"});
                        let obj;
                        if (ar.setter) {
                            const target = eval_chain(ar.target);
                            const value = eval_chain(ar.value);
                            target[ar.setter] = value;
                            obj = true
                        } else {
                            obj = eval_chain(ar)
                        }
                        return prolog.unify(result, prolog.toProlog(obj))
                    }, false)
                } catch (e) {
                    return prolog.bindings.PL_raise_exception(prolog.toProlog(new prolog.Compound("error", [new prolog.Compound("js_error", [e.toString()]), new prolog.Var])))
                }
            }

            function prolog_js_obj_class_name(id) {
                const prolog = Module.prolog;
                const obj = prolog.objects[id];
                return obj.constructor.name
            }

            function release_registered_object(id) {
                const prolog = Module.prolog;
                const obj = prolog.objects[id];
                prolog.object_ids.delete(obj);
                delete prolog.objects[id]
            }

            if (BigInt.prototype.toJSON === undefined) {
                BigInt.prototype.toJSON = function () {
                    return this.toString()
                }
            }
            if (typeof HTMLCollection === "object") {
                HTMLCollection.prototype.toList = function () {
                    const ar = [];
                    for (let i = 0; i < this.length; i++) ar.push(this.item(i));
                    return ar
                }
            }


            return SWIPL.ready
        }
    );
})();
export default SWIPL;
