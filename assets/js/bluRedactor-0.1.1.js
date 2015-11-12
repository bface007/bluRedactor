;(function( $, w, d, undefined ){


    // Create the defaults once
    var pluginName = "bluRedactor",
        isMac = w.navigator.platform == 'MacIntel',
        editorId = 0,
        defaults = {
            toolbarBtns: [
                {
                    title: "Format",
                    dropdown: true,
                    fi: "fa fa-header",
                    dropdowns: [
                        {
                            command: "P",
                            command_type: "format",
                            text: "Paragraphe",
                            class: ""
                        },
                        {
                            command: "BLOCKQUOTE",
                            command_type: "format",
                            text: "Citation",
                            class: "bluRedactor_format_quote"
                        },
                        {
                            command: "PRE",
                            command_type: "format",
                            text: "Code",
                            class: "bluRedactor_format_pre"
                        },
                        {
                            command: "H1",
                            command_type: "format",
                            text: "Titre 1",
                            class: "bluRedactor_format_header_1"
                        },
                        {
                            command: "H2",
                            command_type: "format",
                            text: "Titre 2",
                            class: "bluRedactor_format_header_2"
                        },
                        {
                            command: "H3",
                            command_type: "format",
                            text: "Titre 3",
                            class: "bluRedactor_format_header_3"
                        },
                        {
                            command: "H4",
                            command_type: "format",
                            text: "Titre 4",
                            class: "bluRedactor_format_header_4"
                        }
                    ]
                },
                "divider",
                {
                    title: "Gras",
                    command: "bold",
                    command_type: "inline",
                    fi: "fa fa-bold"
                },
                {
                    title: "Italique",
                    command: "italic",
                    command_type: "inline",
                    fi: "fa fa-italic"
                },
                {
                    title: "Souligner",
                    command: "underline",
                    command_type: "inline",
                    fi: "fa fa-underline"
                },
                {
                    title: "Barrer",
                    command: "strikethrough",
                    command_type: "inline",
                    fi: "fa fa-strikethrough"
                },
                "divider",
                {
                    title: "Justifier",
                    command: "justifyFull",
                    command_type: "inline",
                    fi: "fa fa-align-justify"
                },
                {
                    title: "Aligner à gauche",
                    command: "justifyLeft",
                    command_type: "inline",
                    fi: "fa fa-align-left"
                },
                {
                    title: "Aligner au centre",
                    command: "justifyCenter",
                    command_type: "inline",
                    fi: "fa fa-align-center"
                },
                {
                    title: "Aligner à droite",
                    command: "justifyRight",
                    command_type: "inline",
                    fi: "fa fa-align-right"
                },
                "divider",
                {
                    title: "Liste numerotée",
                    command: "insertOrderedList",
                    command_type: "inline",
                    fi: "fa fa-list-ol"
                },
                {
                    title: "Liste à puces",
                    command: "insertUnorderedList",
                    command_type: "inline",
                    fi: "fa fa-list-ul"
                },
                "divider",
                {
                    title: "Insérer/modifier un lien",
                    command: "createLink",
                    command_type: "anchor",
                    fi: "fa fa-chain"
                },
                {
                    title: "Enlever un lien",
                    command: "unlink",
                    command_type: "anchor",
                    fi: "fa fa-chain-broken"
                },
                "divider",

                {
                    title: "Indice",
                    command: "subscript",
                    command_type: "sub",
                    fi: "fa fa-subscript"
                },
                {
                    title: "Exposant",
                    command: "superscript",
                    command_type: "sub",
                    fi: "fa fa-superscript"
                },
                {
                    title: "Ajouter/Enlever bordures d'aide",
                    command_type: "borders",
                    fi: "fa fa-stop"
                },
                "divider",
                /*
                {
                    title: "Annuler",
                    command: "undo",
                    command_type: "inline",
                    fi: "fa fa-rotate-left",
                    unactivated: true
                },
                {
                    title: "Rétablir",
                    command: "redo",
                    command_type: "inline",
                    fi: "fa fa-rotate-right",
                    unactivated: true
                },
                "divider",
                */
                {
                    title: "Ajouter un média",
                    command: "addImage",
                    command_type: "addMedia",
                    fi: "fa fa-photo"
                },
                {
                    title: "Plein écran",
                    command_type: "fullscreen",
                    fi: "fa fa-expand",
                    pull_right: true
                }
            ],
            buttonAttr: {
                type: "editor-command-type",
                value: "editor-command"
            },
            queryCommands: ["bold", "underline", "italic", "strikethrough",
                "justifyFull", "justifyLeft", "justifyCenter", "justifyRight",
                "insertOrderedList", "insertUnorderedList", "superscript", "subscript"],
            undoCommands: ["undo", "redo"],
            commandToTagName: {
                createLink: "A"
            },
            mediaToolbarBtns: [
                {
                    action: "align-left",
                    fi: "fa fa-align-left"
                },
                {
                    action: "align-center",
                    fi: "fa fa-align-center"
                },
                {
                    action: "align-right",
                    fi: "fa fa-align-right"
                },
                {
                    action: "align-justify",
                    fi: "fa fa-align-justify"
                },
                {
                    action: "action-edit",
                    fi: "fa fa-edit"
                },
                {
                    action: "action-remove",
                    fi: "fa fa-trash-o"
                }
            ],
            allowedTags: [ "section", "header", "hgroup", "details", "nav", "progress", "time", "canvas",
                "code", "span", "div", "label", "a", "br", "p", "b", "i", "del", "strike", "u",
                "img", "video", "source", "track", "audio", "object", "embed", "param", "blockquote",
                "mark", "cite", "small", "ul", "ol", "li", "hr", "dl", "dt", "dd", "sup", "sub",
                "big", "pre", "code", "figure", "figcaption", "strong", "em", "table", "tr", "td",
                "th", "tbody", "thead", "tfoot", "h1", "h2", "h3", "h4", "h5", "h6"],
            convertDivs: true
        },
        body = $(this),
        cache = {
            command: false,
            shift: false,
            isSelecting: false,
            selection: null,
            focused: false,
            marker: null
        },
        modifiers = {
            66: 'bold',
            73: 'italic',
            85: 'underline',
            112: 'h1',
            113: 'h2'
        },
        utils = {
            keyboard: {
                isCommand: function(e, callbackTrue, callbackFalse) {
                    if (isMac && e.metaKey || !isMac && e.ctrlKey) {
                        callbackTrue();
                    } else {
                        callbackFalse();
                    }
                },
                isShift: function(e, callbackTrue, callbackFalse) {
                    if (e.shiftKey) {
                        callbackTrue();
                    } else {
                        callbackFalse();
                    }
                },
                isModifier: function(e, callback) {
                    var key = e.which,
                        cmd = modifiers[key];
                    if (cmd) {
                        callback(cmd);
                    }
                },
                isEnter: function(e, callback) {
                    if (e.which === 13) {
                        callback();
                    }
                },
                isArrow: function(e, callback) {
                    var isArrow = null;
                    switch(e.which){
                        case 37:
                            isArrow = "left";
                            break;
                        case 38:
                            isArrow = "up";
                            break;
                        case 39:
                            isArrow = "right";
                            break;
                        case 40:
                            isArrow = "down";
                            break;
                    }
                    callback(isArrow);
                }
            },
            selection: {
                save: function () {
                    if(w.getSelection){
                        var sel = w.getSelection();
                        if(sel.rangeCount > 0)
                            return sel.getRangeAt(0);
                    }else if(d.selection && d.selection.createRange) // IE
                        return d.selection.createRange();
                    return null;
                },
                restore: function (range) {
                    if(range){
                        if(w.getSelection){
                            var sel = w.getSelection();
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }else if(d.selection && range.select) // IE
                            range.select();
                    }
                },
                getText: function () {
                    var txt = '';
                    if(w.getSelection)
                        txt = w.getSelection().toString();
                    else if(d.getSelection)
                        txt = d.getSelection().toString();
                    else if(d.selection)
                        txt = d.selection.createRange().text;
                    return txt;
                },
                clear: function(){
                    if(w.getSelection){
                        if(w.getSelection().empty) // Chrome
                            w.getSelection().empty();
                        else if(w.getSelection().removeAllRanges) // Firefox
                            w.getSelection().removeAllRanges();
                        else if(d.selection) // IE ?
                            d.selection.empty();
                    }
                },
                getContainer: function(sel){
                    if(w.getSelection && sel && sel.commonAncestorContainer)
                        return sel.commonAncestorContainer;
                    else if(d.selection && sel && sel.parentElement)
                        return sel.parentElement();
                    return null;
                },
                getSelection: function () {
                    if(w.getSelection)
                        return w.getSelection();
                    else if(d.selection && d.selection.createRange) // IE
                        return d.selection.createRange();
                    return null;
                },
                createRange: function () {

                },
                getSelectionHtml: function () {
                    var html = "";
                    if(typeof w.getSelection != "undefined"){
                        var sel = utils.selection.getSelection();
                        if(sel.rangeCount){
                            var container = document.createElement("div");
                            for(var i = 0; i < sel.rangeCount; i++)
                                container.appendChild(sel.getRangeAt(i).cloneContents());
                            html = container.textContent;
                        }
                    }else if(typeof d.selection != "undefined"){
                        if(d.selection.type == "Text")
                            html = utils.selection.getSelection().htmlText;
                    }
                    return html;
                },
                getAnchorNode: function () {
                    return w.getSelection() ? w.getSelection().anchorNode : d.activeElement;
                },
                getParentNode: function(){
                    if(w.getSelection) return this.getSelection().getRangeAt(0).startContainer.parentNode;
                    else if(d.selection) return this.getSelection().parentElement();
                },
                getCurrentNode: function(){
                    if(w.getSelection) return this.getSelection().getRangeAt(0).startContainer;
                    else if(d.selection) return this.getSelection();
                }
            },
            html: {
                addTag: function (elem, tag, focus, editable, isFirst) {
                    var newElement = $(d.createElement(tag));
                    newElement.attr("contenteditable", Boolean(editable));
                    if(Boolean(isFirst)){
                        var id = "marker_" + ("" + Math.random()).slice(2);
                        newElement.attr("id", id);
                        cache.marker = id;
                    }

                    newElement.append(' &nbsp;');
                    elem.append(newElement);
                    if(focus){
                        cache.focusedElement = newElement;
                        utils.cursor.set(elem, 0, cache.focusedElement);
                    }
                    return newElement;
                },
                hasLink: function(sel){
                    var el = utils.selection.getContainer(sel);
                    return (el.nodeType !== Node.TEXT_NODE && el.tagName.toUpperCase() == "A") || (el.nodeType === Node.TEXT_NODE && null !== el.parentElement && el.parentElement.tagName.toUpperCase() == "A");
                },
                getElementTagName: function (el) {
                    return el.nodeType !== Node.TEXT_NODE ? el.tagName.toUpperCase() : el.parentNode.tagName.toUpperCase();
                }
            },
            cursor: {
                set: function (editor, pos, elem) {
                    var range;
                    if(d.createRange){
                        range = d.createRange();
                        var selection = w.getSelection(),
                            lastChild = editor.children().last(),
                            length = lastChild.html().length - 1,
                            toModify = elem ? elem[0] : lastChild[0],
                            theLength = typeof pos !== 'undefined' ? pos : length;
                        range.setStart(toModify, theLength);
                        range.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(range);
                        editor.focus()
                    }else {
                        range = d.body.createTextRange();
                        range.moveToElementText(elem);
                        range.collapse(false);
                        range.select();
                        editor.focus()
                    }
                }
            },
            encoding: {
                encodeEntities: function (str) {
                    str = String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
                    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                },
                savePreCode: function (html) {
                    var pre = html.match(/<pre(.*?)>([\w\W]*?)<\/pre>/gi);
                    if (pre !== null)
                    {
                        $.each(pre, $.proxy(function(i,s)
                        {
                            var arr = s.match(/<pre(.*?)>([\w\W]*?)<\/pre>/i);
                            arr[2] = this.encoding.encodeEntities(arr[2]);
                            html = html.replace(s, '<pre' + arr[1] + '>' + arr[2] + '</pre>');
                        }, this));
                    }

                    return html;
                },
                stripTags: function (html) {
                    var allowed = defaults.allowedTags;
                    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
                    return html.replace(tags, function ($0, $1)
                    {
                        return $.inArray($1.toLowerCase(), allowed) > '-1' ? $0 : '';
                    });
                },
                paragraphy: function (str) {
                    str = $.trim(str);
                    if (str === '' || str === '<p></p>')
                    {
                        return this.opts.emptyHtml;
                    }

                    // convert div to p
                    if (defaults.convertDivs)
                    {
                        str = str.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, '<p>$2</p>');
                    }

                    // inner functions
                    var X = function(x, a, b) { return x.replace(new RegExp(a, 'g'), b); };
                    var R = function(a, b) { return X(str, a, b); };

                    // block elements
                    var blocks = '(table|thead|tfoot|caption|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|select|form|blockquote|address|math|style|script|object|input|param|p|h[1-6])';

                    //str = '<p>' + str;
                    str += '\n';

                    R('<br />\\s*<br />', '\n\n');
                    R('(<' + blocks + '[^>]*>)', '\n$1');
                    R('(</' + blocks + '>)', '$1\n\n');
                    R('\r\n|\r', '\n'); // newlines
                    R('\n\n+', '\n\n'); // remove duplicates
                    R('\n?((.|\n)+?)$', '<p>$1</p>\n'); // including one at the end
                    R('<p>\\s*?</p>', ''); // remove empty p
                    R('<p>(<div[^>]*>\\s*)', '$1<p>');
                    R('<p>([^<]+)\\s*?(</(div|address|form)[^>]*>)', '<p>$1</p>$2');
                    R('<p>\\s*(</?' + blocks + '[^>]*>)\\s*</p>', '$1');
                    R('<p>(<li.+?)</p>', '$1');
                    R('<p>\\s*(</?' + blocks + '[^>]*>)', '$1');
                    R('(</?' + blocks + '[^>]*>)\\s*</p>', '$1');
                    R('(</?' + blocks + '[^>]*>)\\s*<br />', '$1');
                    R('<br />(\\s*</?(p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)', '$1');

                    // pre
                    if (str.indexOf('<pre') != -1)
                    {
                        R('(<pre(.|\n)*?>)((.|\n)*?)</pre>', function(m0, m1, m2, m3)
                        {
                            return X(m1, '\\\\([\'\"\\\\])', '$1') + X(X(X(m3, '<p>', '\n'), '</p>|<br />', ''), '\\\\([\'\"\\\\])', '$1') + '</pre>';
                        });
                    }

                    return R('\n</p>$', '</p>');
                }
            },
            validation: {
                isUrl: function (url) {
                    return (/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).test(url);
                }
            },
            createMarker: function () {
                return "marker_" + ("" + Math.random()).slice(2);
            }
        };


    var Command = function (BluRedactor) {

        this.inline = inline;
        this.anchor = anchor;
        this.table = table;
        this.sub = sub;
        this.addMedia = addMedia;
        this.addDummy = addDummy;
        this.fullscreen = fullscreen;
        this.insertHtml = insertHtml;
        this.dropdown = dropdown;
        this.format = format;
        this.borders = borders;

        this.isQueryCommand = isQueryCommand;
        this.isObservedCommand = isObservedCommand;
        this.isUndoCommand = isUndoCommand;

        /******** Private methods *********/

        function isQueryCommand(cmd){
            return BluRedactor.options.queryCommands.indexOf(cmd) != -1;
        }

        function isObservedCommand(cmd, elementTagName){
            return BluRedactor.options.commandToTagName[cmd] === elementTagName;
        }

        function isUndoCommand(cmd){
            console.log('is undo ', cmd)
            return BluRedactor.options.undoCommands.indexOf(cmd) != -1;
        }

        function borders(){
            BluRedactor.Editor.$editor.toggleClass('borders');
        }

        function format(cmd){
            d.execCommand('formatBlock', false, cmd);
            console.log("format ", cmd);
        }

        function dropdown(el){
            var parent = $(el).parent()[0];
            console.log("dropdown ", parent.classList.contains('open'));

            parent.classList.contains('open') ? parent.classList.remove('open') : parent.classList.add('open');
        }

        function inline(cmd){
            var cmdValue = "undefined";
            switch (cmd){
                case "bold":
                    cmdValue = "bold";
                    break;
                case "italic":
                    cmdValue = "italic";
                    break;
                case "underline":
                    cmdValue = "underline";
                    break;
                case "strikethrough":
                    cmdValue = "strikethrough";
                    break;
                default:
                    cmdValue = cmd;
            }
            if(!cache.focused && cache.selection != null){
                BluRedactor.Editor.$editor.focus();
                utils.selection.restore(cache.selection);
                cache.selection = null;
            }
            d.execCommand(cmdValue, false);

            if(cmdValue == "undo")
                BluRedactor.Editor.UndoManager.decrementIndex().recache("toolbar");
            else if(cmdValue == "redo"){
                if(BluRedactor.Editor.UndoManager.index < BluRedactor.Editor.UndoManager.total)
                    BluRedactor.Editor.UndoManager.index++;
            }
        }

        function addDummy(addDummy){
            var img = d.createElement('img'),
                a = d.createElement('a');
            img.src = "../assets/img/cervin.gif";
            img.id = utils.createMarker();
            a.href = "javascript:;";
            a.classList.add('insert-media');
            //a.setAttribute('contenteditable', false);
            a.appendChild(img);

            if(!cache.focused){
                BluRedactor.$editor.focus();
                utils.selection.restore(cache.selection);
            }

            insertHtml(a);
        }

        function anchor(type){
            switch (type){
                case "unlink":
                    if(!cache.focused){
                        BluRedactor.$editor.focus();
                        utils.selection.restore(cache.selection);
                    }
                    var $el = $(utils.selection.getContainer(cache.selection)).closest("a");
                    if($el.length > 0)
                        $el.contents().first().unwrap();
                    break;
                default :
                    BluRedactor.Modal.setSize(35).show(
                        "Insérer/modifier un lien",
                        "anchor_template",
                        function (Modal, $modalInnerHeader, $modalInnerContent) {
                            var $collapser = $modalInnerContent.find("#bluRedactor_link_search_panel_toggle"),
                                $searchPanel = $modalInnerContent.find("#bluRedactor_link_search_panel"),
                                $inputLinkUrl = $modalInnerContent.find("#bluRedactor_link_url"),
                                $inputLinkText = $modalInnerContent.find("#bluRedactor_link_text"),
                                $inputLinkBlankTarget = $modalInnerContent.find("#bluRedactor_link_blank_target"),
                                $cancelBtn = $modalInnerContent.find("#bluRedactor_modal_footer .cancel"),
                                $actionBtn = $modalInnerContent.find("#bluRedactor_modal_footer .action");

                            if(null === cache.selection)
                                return;

                            var el = utils.selection.getContainer(cache.selection);
                            if(el.nodeType == Node.TEXT_NODE && el.parentNode.tagName == "A" || el.tagName == "A"){
                                if(el.parentNode.tagName == "A"){
                                    $inputLinkUrl.val(el.parentNode.href);
                                    $inputLinkText.val(el.parentNode.textContent);
                                    el = el.parentNode;
                                }else{
                                    $inputLinkUrl.val(el.href);
                                    $inputLinkText.val(el.textContent);
                                }
                                $modalInnerContent.find("#bluRedactor_modal_footer .action").text("Mettre à jour");
                            }else{
                                $inputLinkText.val(utils.selection.getSelectionHtml());
                                el = null;
                            }



                            $inputLinkUrl.focus(function (e) {
                                if(utils.validation.isUrl($(this).val()))
                                    $actionBtn.prop("disabled", false);
                                else
                                    $actionBtn.prop("disabled", true);
                            });
                            $inputLinkUrl.keyup(function (e) {
                                if(utils.validation.isUrl($(this).val()))
                                    $actionBtn.prop("disabled", false);
                                else
                                    $actionBtn.prop("disabled", true);
                            });
                            $modalInnerContent.keyup(function (e) {
                                utils.keyboard.isEnter(e, function () {
                                    if(true !== $actionBtn[0].disabled)
                                        $actionBtn.click();
                                })
                            });

                            $inputLinkUrl.focus();

                            Modal.$modal.on(pluginName +":Modal:cancel", function (e) {
                                Modal.BluRedactor.$editor.focus();
                                utils.selection.restore(cache.selection);
                                Modal.close();
                            });
                            $collapser.click(function (e) {
                                e.preventDefault();
                                $searchPanel.toggleClass("in");
                                $(this).toggleClass("active");
                            });
                            $cancelBtn.click(function (e) {
                                e.preventDefault();
                                Modal.$modal.trigger(pluginName +":Modal:cancel");
                            });
                            $actionBtn.click(function (e) {

                                if(!utils.validation.isUrl($inputLinkUrl.val()))
                                    return alert("bad url");
                                var val = $inputLinkUrl.val();
                                var linkUrl = (/^https?:\/\//.test(val)) ? val : "http://"+ val,
                                    linkText = $inputLinkText.val().trim() != "" ? $inputLinkText.val() : linkUrl,
                                    linkBlankTarget = $inputLinkBlankTarget.is(':checked');

                                var newLink = d.createElement("a");
                                newLink.href = linkUrl;
                                newLink.target = linkBlankTarget ? "_blank" : "_self";
                                newLink.appendChild(d.createTextNode(linkText));

                                if(!cache.focused){
                                    Modal.BluRedactor.$editor.focus();
                                    utils.selection.restore(cache.selection);
                                }

                                insertHtml(newLink, el);
                                Modal.$modal.trigger(pluginName +":Modal:action");
                                Modal.close(function (Modal) {
                                    Modal.BluRedactor.Toolbar.update();
                                });
                                e.preventDefault();
                                e.stopPropagation();

                            })
                        });
            }
        }

        function table(){
            alert("table")
        }

        function sub(cmd){
            d.execCommand(cmd, false);
        }

        function addMedia(cmd){
            switch (cmd){
                case "addImage":
                    BluRedactor.Modal.setSize(95).show(
                        "Insérer une image",
                        "media_template",
                        function (Modal, $modalInnerHeader, $modalInnerContent) {

                        }
                    );
                    break;
            }
        }

        function fullscreen(){
            alert("fullscreen")
        }

        function done(e){

        }

        function insertHtml(node, toBeDeleted){
            toBeDeleted = toBeDeleted || null;
            if(w.getSelection){
                var sel = utils.selection.getSelection();
                if(sel.rangeCount){
                    var range = sel.getRangeAt(0);
                    if(null !== toBeDeleted) range.selectNode(toBeDeleted);
                    range.deleteContents();
                    range.insertNode(node);
                    range.setStartAfter(node);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }else if(d.selection && d.selection.type != "Control"){
                var html = (node.nodeType == 1) ? node.outerHTML : node.data;
                var id = "marker_" + ("" + Math.random()).slice(2);
                html += '<span id="' + id + '"></span>';
                var textRange = utils.selection.getSelection();
                textRange.collapse(false);
                textRange.pasteHTML(html);
                var markerSpan = document.getElementById(id);
                textRange.moveToElementText(markerSpan);
                textRange.select();
                markerSpan.parentNode.removeChild(markerSpan);
            }
        }
    };

    var Modal = function(BluRedactor){

        this.$overlay = null;
        this.$modal = null;
        this.show = showModal;
        this.close = closeModal;
        this.setSize = setSize;
        this.getSize = getSize;
        this.restoreDefaultSize = restoreDefaultSize;
        this.BluRedactor = BluRedactor;

        var self = this,
            $flexbox = null,
            $modalClose = null,
            $modalInner = null,
            $modalHeader = null,
            $modalInnerHeader = null,
            $modalInnerContent = null,
            modalInnerContentCache = null,
            size = {
                width: 50,
                height: "auto"
            };

        init();
        bindModalEvents();

        function init(){
            if(!$("#"+ pluginName +"_flexbox").length){
                $flexbox = $('<div>').attr('id', pluginName +"_flexbox");
                BluRedactor.$box.append($flexbox);
            }else
                $flexbox = $("#"+ pluginName +"_flexbox");

            if(!$("#"+ pluginName +"_overlay").length){
                self.$overlay = $('<div id="'+ pluginName +'_overlay"></div>')
                                    .appendTo($flexbox);
            }else
                self.$overlay = $("#"+ pluginName +"_overlay");

            if(!$("#"+ pluginName +"_modal").length){
                self.$modal = $('<div id="'+ pluginName +'_modal"><div id="'+ pluginName +'_modal_close">&times;</div><div id="'+ pluginName +'_modal_header"></div><div id="'+ pluginName +'_modal_inner"></div></div>')
                                    .appendTo($flexbox);
            }else
                self.$modal = $("#"+ pluginName +"_modal");

            $modalInner = self.$modal.find("#"+ pluginName +"_modal_inner");
            $modalHeader = self.$modal.find("#"+ pluginName +"_modal_header");
        }
        function bindModalEvents(){
            $modalClose = self.$modal.find('#'+ pluginName +'_modal_close').click(function (e) {
                e.stopPropagation();
                e.preventDefault();
                $(this).trigger(pluginName +":Modal:cancel");
                self.close();
            });
            self.$overlay.click(function(e){
                e.stopPropagation();
                e.preventDefault();
                self.$modal.trigger(pluginName +":Modal:cancel");
                self.close();
            });
        }

        function closeModal(callback){

            $flexbox.addClass("modal--close").removeClass("modal--open");
            self.$modal.trigger(pluginName +":Modal:close");
            callback(self);
            return self;
        }

        function showModal(title, templateId, handler, scroll){

            if(null === cache.selection)
                cache.selection = utils.selection.save();
            $flexbox.addClass("modal--open").removeClass("modal--close");
            self.$modal.css({
                width: size.width +"%",
                height: (size.height == "auto") ? size.height : size.height +"%"
            });

            $modalHeader.text(title);

            $modalInnerContent = $(getModalContent(templateId));
            $modalInner.html($modalInnerContent);


            return handler(self, $modalHeader, $modalInnerContent);

            function getModalContent(templateId){
                return $("#"+ templateId).html();
            }

        }

        function setSize(width, height){
            width = !isNaN(parseInt(width, 10)) ? width : 50;
            height = (!isNaN(parseInt(height, 10)) || height == "auto") ? height : "auto";
            if(null !== width)
                size.width = width;
            if(null !== height)
                size.height = height;
            return self;
        }

        function getSize(dim){
            if(dim == "width" || dim == "height")
                return size[dim];
            else
                return size;
        }

        function restoreDefaultSize(){
            size.width = 50;
            size.height = 30;
            return self;
        }

    };

    var Toolbar = function (BluRedactor) {
        this.$toolbar = BluRedactor.$toolbar;
        this.$mediaToolbar = BluRedactor.$mediaToolbar;

        this.update = updateToolbar;
        this.updateMediaToolbar = updateMediaToolbar;
        this.showMediaToolbar = showMediaToolbar;
        this.hideMediaToolbar = hideMediaToolbar;

        var self = this;

        // Toolbar Events Init
        launchToolbarEvents();
        lauchMediaToolbarEvents();

        function updateMediaToolbar(mediaMarker){
            //BluRedactor.$mediaToolbar.css('left', 0);

            var wrapperWidth = BluRedactor.$wrapper[0].innerWidth,
                range = cache.focused ? utils.selection.save() : cache.selection,
                boundary = range.getBoundingClientRect(),
                middleBoundary = (boundary.right + boundary.left) / 2,
                mediaToolbar = BluRedactor.$mediaToolbar[0],
                mediaToolbarHeight = mediaToolbar.offsetHeight,
                mediaToolbarWidth = mediaToolbar.offsetWidth,
                halfOffsetWidth = mediaToolbarWidth / 2;

            BluRedactor.$mediaToolbar[0].style.top = boundary.top - mediaToolbarHeight - 12 - BluRedactor.$wrapper[0].offsetTop + document.body.scrollTop + 'px';
            BluRedactor.$mediaToolbar[0].style.left = middleBoundary - halfOffsetWidth - BluRedactor.$wrapper[0].offsetLeft + 'px';

            console.log('boundary ', boundary);
            console.log('middle ', middleBoundary);
            console.log('scrolltop ', document.body.scrollTop);
            BluRedactor.$mediaToolbar.attr('rel', mediaMarker);
        }

        function showMediaToolbar(){
            BluRedactor.$mediaToolbar[0].style.display = "inline-block";
        }

        function hideMediaToolbar(){
            BluRedactor.$mediaToolbar[0].style.display = "none";


        }

        function lauchMediaToolbarEvents(){
            var $mediaToolbar = self.$mediaToolbar;

            if(!$mediaToolbar.length){
                console.log(pluginName +" error:", "MediaToolbar has never been initialized");
                return alert("MediaToolbar has never been init");
            }
            $mediaToolbar.find('a').each(function () {
                $(this).click(function (e) {
                    e.preventDefault();
                    var action = $(this).attr('data-action');

                    var $media = $("#"+ $mediaToolbar.attr('rel'));

                    switch (action){
                        case 'align-left':
                            $media.removeClass('alignjustify alignright aligncenter').addClass('alignleft');
                            updateMediaToolbar($mediaToolbar.attr('rel'));
                            break;
                        case 'align-justify':
                            $media.removeClass('alignleft alignright aligncenter').addClass('alignjustify');
                            updateMediaToolbar($mediaToolbar.attr('rel'));
                            break;
                        case 'align-right':
                            $media.removeClass('alignleft alignjustify aligncenter').addClass('alignright');
                            updateMediaToolbar($mediaToolbar.attr('rel'));
                            break;
                        case 'align-center':
                            $media.removeClass('alignleft alignjustify alignright').addClass('aligncenter');
                            updateMediaToolbar($mediaToolbar.attr('rel'));
                            break;
                        case 'action-edit':
                            alert('edit');
                            break;
                        case 'action-remove':
                            alert('remove');
                            break;
                    }
                })
            })
        }



        function launchToolbarEvents(){
            var $toolbar = self.$toolbar;
            if(!$toolbar.length){
                console.log(pluginName +" error:", "Toolbar has never been initialized");
                return alert("Toolbar has never been init");
            }
            $toolbar.find('button').click(function (e) {
                e.preventDefault();
                var cmd = $(this).attr(BluRedactor.options.buttonAttr.value),
                    cmdType = $(this).attr(BluRedactor.options.buttonAttr.type);

                if("dropdown" === cmdType){
                    BluRedactor.Command[cmdType](this);

                    var $sublist = $(this).next('.sublist');
                    
                    $sublist.find('.sublist-actions').click(function (e) {
                        e.preventDefault();
                        cmd = $(this).attr(BluRedactor.options.buttonAttr.value);
                        cmdType = $(this).attr(BluRedactor.options.buttonAttr.type);

                        BluRedactor.Command[cmdType](cmd);
                        BluRedactor.Toolbar.$toolbar.find('button').each(function () {
                            $(this).parent().removeClass('open');
                        });


                    })
                        .mousedown(function (e) {
                            e.preventDefault();
                    })
                }else
                    BluRedactor.Command[cmdType](cmd);

                updateToolbar();

                return false;
            })
                .mousedown(function (e) {
                    e.preventDefault();
            })
        }

        function updateToolbar(){
            var $toolbar = self.$toolbar;
            $toolbar.find('button').each(function () {
                var cmd = $(this).attr(BluRedactor.options.buttonAttr.value);
                if(BluRedactor.Command.isQueryCommand(cmd)){
                    if(d.queryCommandState(cmd)){
                        $(this).parent().addClass("active");
                        console.log(cmd);
                    }
                    else
                        $(this).parent().removeClass("active");

                }else {
                    var el = null;
                    if(cache.focused)
                        el = utils.selection.getContainer(utils.selection.save());
                    else
                        el = utils.selection.getContainer(cache.selection);
                    var elTagName = el ? utils.html.getElementTagName(el) : null;
                    //console.log(cmd, elTagName);
                    if(elTagName){
                        if(BluRedactor.Command.isObservedCommand(cmd, elTagName))
                            $(this).parent().addClass("active");
                        else
                            $(this).parent().removeClass("active");
                    }
                    if(BluRedactor.Command.isUndoCommand(cmd)){

                        if(BluRedactor.Editor.UndoManager.index > 0 && cmd == "undo")
                            this.disabled = false;
                        else if(BluRedactor.Editor.UndoManager.index == 0 && cmd == "undo")
                            this.disabled = true;

                        var redo = BluRedactor.Editor.UndoManager.total - BluRedactor.Editor.UndoManager.index;

                        if(redo > 0 && cmd == "redo")
                            this.disabled = false;
                        else if(redo == 0 && cmd == "redo")
                            this.disabled = true;
                    }
                }
            })
        }
    };

    var RawEvents = function (BluRedactor) {
        this.keydown = keydown;
        this.keyup = keyup;
        this.focus = focus;
        this.mouseClick = mouseClick;
        this.mouseUp = mouseUp;
        this.mouseMove = mouseMove;
        this.blur = blur;
        this.paste = paste;


        function keydown(e){
            utils.keyboard.isCommand(e, function () {
                cache.command = true;
            }, function(){
                cache.command = false;
            });
            utils.keyboard.isShift(e, function () {
                cache.shift = true;
            }, function () {
                cache.shift = false;
            });
            utils.keyboard.isModifier.call(this, e, function (modifier) {
                if(cache.command)
                    BluRedactor.Command.inline.call(this, modifier);
            });

            if(e.which === 13)
                BluRedactor.Editor.enterKey(e);
            if(e.which === 86 && cache.command)
                paste.call(this, e);
            if(e.which === 90 && cache.command)
                BluRedactor.Command.undo.call(this, e);

            utils.keyboard.isArrow(e, function (isArrow) {
                if("left" === isArrow || "right" === isArrow){
                    var target = utils.selection.getContainer(utils.selection.save());

                    console.log("keydown ", target);
                }
            })

        }
        function keyup(e){
            var elem = BluRedactor.Editor.$editor,
                container,
                $container;
            utils.keyboard.isCommand(e, function () {
                cache.command = false;
            }, function () {
                cache.command = true;
            });
            BluRedactor.Editor.preserveFocus();

            var el = utils.selection.getContainer(utils.selection.save());
            var firstParagraph = elem.find('p#'+ cache.marker);

            //console.log("children ", );
            if(/^\s*$/.test(elem.text()) && firstParagraph.children().length == 0){
                console.log("Empty text reload");
                elem.empty();
                utils.html.addTag(elem, 'p', true, true, true);
            }
            //console.log("target ", e.target)

            if(cache.focused)
                container = utils.selection.getContainer(utils.selection.save());
            else
                container = utils.selection.getContainer(cache.selection);

            $container = $(container);

            /*
            utils.keyboard.isArrow(e, function (isArrow) {
                if(isArrow && $container.prop('tagName').toUpperCase() == "A" && $container.hasClass('insert-media')){
                    var $img = $container.find('img'),
                        sel;

                    $img.addClass('bluredactor_selected');
                    sel = utils.selection.save();
                    sel.selectNode($img.parent()[0]);

                    var selection = utils.selection.getSelection();

                    selection.removeAllRanges();
                    selection.addRange(sel);
                }
            });*/
            BluRedactor.Toolbar.hideMediaToolbar();
            BluRedactor.Editor.$editor.find('img').removeClass('bluredactor_selected');
            BluRedactor.Editor.syncCode();

            utils.keyboard.isArrow(e, function (isArrow) {
                if(!isArrow){

                    if(e.which == 8 && BluRedactor.Editor.UndoManager.cache !== 2){
                        BluRedactor.Editor.UndoManager.recache("backspace");

                    }else if(BluRedactor.Editor.UndoManager.cache !== 1 && e.which !== 8)
                        BluRedactor.Editor.UndoManager
                            .incrementIndex()
                            .recache("writing");

                    BluRedactor.Toolbar.update();
                    cache.selection = utils.selection.save();
                }
            });


        }
        function focus(e){
            cache.command = false;
            cache.shift = false;
            cache.focused = true;
            BluRedactor.Toolbar.$toolbar.find('button').each(function () {
                $(this).parent().removeClass('open');
            });
        }
        function mouseClick(e){
            BluRedactor.Toolbar.$toolbar.find('button').each(function () {
                $(this).parent().removeClass('open');
            });
            cache.isSelecting = true;
            var $target = $(e.target);
            if($target.prop('tagName').toUpperCase() === 'IMG'){
                $target.addClass('bluredactor_selected');

                var sel;
                if(cache.focused)
                    sel = utils.selection.save();
                else
                    sel = cache.selection;

                utils.selection.restore(sel);

                sel.selectNode($target[0]);

                var selection = utils.selection.getSelection();

                selection.removeAllRanges();
                selection.addRange(sel);

                cache.selection = utils.selection.save();

                BluRedactor.Toolbar.showMediaToolbar();
                BluRedactor.Toolbar.updateMediaToolbar($target.attr('id'));


                //console.log(sel)
            }else{
                BluRedactor.Toolbar.hideMediaToolbar();
                BluRedactor.Editor.$editor.find('img').removeClass('bluredactor_selected');
            }

        }
        function mouseUp(e){
            cache.isSelecting = false;
            BluRedactor.Toolbar.update();
            cache.selection = utils.selection.save();
        }

        function mouseMove(e){}

        function blur(e){
            cache.selection = utils.selection.save();
            cache.focused = false;
        }

        function paste(e){
            BluRedactor.Editor.syncCode();
        }
    };

    var Editor = function (BluRedactor) {
        this.$editor = BluRedactor.$editor;

        this.preserveFocus = preserveFocus;
        this.enterKey = enterKey;
        this.syncCode = syncCode;
        this.UndoManager = new UndoManager();

        var self = this;

        this.Events = new RawEvents(BluRedactor);

        bindEvents(self.$editor);

        function UndoManager(){
            this.cache = 0;
            this.index = 0;
            this.total = 0;
            this.incrementIndex = incrementIndex;
            this.decrementIndex = decrementndex;
            this.recache = recache;
            this.uncache = uncache;
            this.getState = getState;

            var self = this;


            function incrementIndex(){
                self.index++;
                self.total++;

                return self;
            }
            function decrementndex(){
                if(self.index > 0)
                    self.index--;

                return self;
            }
            function recache(lvl){
                switch(lvl){
                    case "writing":
                        self.cache = 1;
                        break;
                    case "backspace":
                        self.cache = 2;
                        break;
                    case "toolbar":
                        self.cache = 3;
                        break;
                    case "media":
                        self.cache = 4;
                        break;
                }
                console.log("UndoManager ", { index: self.index, cache: self.cache})
                return self;
            }
            function uncache(){
                self.cache = 0;
                console.log("UndoManager ", { index: self.index, cache: self.cache})
                return self;
            }
            function getState(){
                switch (self.cache){
                    case 0:
                        return "default";
                    case 1:
                        return "writing";
                    case 2:
                        return "backspace";
                    case 3:
                        return "toolbar";
                    case 4:
                        return "media";
                }
            }
        }

        function bindEvents(elem){
            self.$editor.keydown(self.Events.keydown);
            self.$editor.keyup(self.Events.keyup);
            self.$editor.focus(self.Events.focus);
            self.$editor.bind('paste', self.Events.paste);
            self.$editor.mousedown(self.Events.mouseClick);
            self.$editor.mouseup(self.Events.mouseUp);
            self.$editor.mousemove(self.Events.mouseMove);
            self.$editor.blur(self.Events.blur);
            body.mouseup(function (e) {
                if(e.target == e.currentTarget && cache.isSelecting)
                    self.Events.mouseUp.call(elem, e);
            });
        }

        function syncCode(){
            BluRedactor.$element.val(self.$editor.html());
            //console.log("val ", BluRedactor.$element.val())
        }

        function preserveFocus(){
            var anchorNode = utils.selection.getAnchorNode();
            if(anchorNode){
                var current = anchorNode.parentNode,
                    diff = current != cache.focusedElement,
                    children = self.$editor[0].children,
                    elementIndex = 0;
                if(current === self.$editor[0])
                    current = anchorNode;
                for(var i = 0; i < children.length; i++){
                    if(current == children[i]){
                        elementIndex = i;
                        break;
                    }
                }
                if(diff){
                    cache.focusedElement = current;
                    cache.focusedElementIndex = elementIndex;
                }
            }
        }

        function enterKey(e){

            var el;
            if(cache.focused)
                el = utils.selection.getContainer(utils.selection.save());
            else
                el = utils.selection.getContainer(cache.selection);

            if(el){
                var $el = $(el.parentElement),
                    $elem = $el.prop('tagName').toUpperCase() === 'LI' ? $el : $el.parent();

                if($elem.prop('tagName').toUpperCase() === 'LI'){
                    console.log("enterkey ", 'Li');
                    console.log("enterkey children ", $elem.children('span'))
                    if(/^\s*$/.test($elem.text()) && !$elem.find('.insert-media').length){
                        e.preventDefault();
                        e.stopPropagation();
                        $elem.remove();
                        utils.html.addTag(self.$editor, 'p', true, true);
                    }
                }
            }
        }
    };

    var BluRedactor = function (element, options) {
        this.$element = element;
        this.options = options;
        this.originalContent = null;
        this.editorId = editorId++;

        var self = this;

        /******** jQuery objects *********/
        this.$toolbar = null;
        this.$editor = null;
        this.$mediaToolbar = null;
        this.$wrapper = null;
        this.$box = null;

        /******** Init ************/
        init();

        /******** Class objects **********/
        this.Toolbar = new Toolbar(this);
        this.Command = new Command(this);
        this.Editor = new Editor(this);
        this.Modal = new Modal(this);

        self.Toolbar.update();


        /******** Private methods *********/
        function getOriginalContent(){
            self.originalContent = self.$element.val();
        }
        function hideElement(){
            self.$element.hide();
        }
        function createBox(){
            self.$box = $('<div/>').addClass(pluginName +"_box").attr('id', pluginName +"_"+ self.editorId);
            self.$element.before(self.$box);
        }
        function createToolbar(){
            var $wrapper = $('<div/>').addClass(pluginName +"_toolbar_wrapper"),
                $texture = $('<div/>').addClass(pluginName +"_texture_overlay"),
                $toolbar = $('<ul/>').addClass(pluginName +"_toolbar"),
                toolbarBtns = options.toolbarBtns;

            for(var i = 0; i < toolbarBtns.length; i++){
                var $li = $('<li/>');

                if("divider" === toolbarBtns[i])
                    $li.addClass('divider');
                else {
                    if(toolbarBtns[i].pull_right)
                        $li.addClass('pull-right');

                    var $btn = $('<button/>')
                        .attr('type', 'button')
                        .attr('title', toolbarBtns[i].title)
                        .append($('<i/>').addClass(toolbarBtns[i].fi));

                    $li.append($btn);

                    if(toolbarBtns[i].dropdown){
                        $btn
                            .append('<i class="caret"></i>')
                            .attr('editor-command-type', 'dropdown');

                        var $sublist = $('<ul/>').addClass('sublist');

                        $li.append($sublist);

                        for(var ii = 0; ii < toolbarBtns[i].dropdowns.length; ii++){
                            var dropdown = toolbarBtns[i].dropdowns[ii],
                                $subLi = $('<li/>'),
                                $subBtn = $('<a/>')
                                    .addClass(dropdown.class)
                                    .addClass('sublist-actions')
                                    .attr('editor-command', dropdown.command)
                                    .attr('editor-command-type', dropdown.command_type)
                                    .append('<i>'+ dropdown.text +'</i>');

                            $sublist.append($subLi.append($subBtn));
                        }
                    }else{
                        $btn.attr('editor-command-type', toolbarBtns[i].command_type);

                        if(toolbarBtns[i].command)
                            $btn.attr('editor-command', toolbarBtns[i].command);
                    }

                    if(toolbarBtns[i].unactivated)
                        $btn[0].disabled = true;

                }
                $toolbar.append($li);
            }

            $wrapper
                .append($toolbar)
                .append($texture);

            self.$box.append($wrapper);

            self.$toolbar = $toolbar;
        }
        function createEditor(){
            var $wrapper = $('<div/>').addClass(pluginName +"_editor_wrapper"),
                $editor = $('<div/>').addClass(pluginName +"_editor");

            $wrapper.append($editor);
            self.$box.append($wrapper);

            $editor.prop('contenteditable', true);

            self.$editor = $editor;
            self.$wrapper = $wrapper;
        }

        function createMediaToolbar(){
            var mediaToolbar = d.createElement('div'),
                toolbarActions = d.createElement('ul'),
                hightlight = d.createElement('div'),
                downArrow = d.createElement('div');

            mediaToolbar.className = "bluredactor-image-toolbar clearfix";
            toolbarActions.className = "bluredactor-image-toolbar-actions horizontal-list";
            hightlight.className = "highlight";
            downArrow.className = "arrow down";

            mediaToolbar.appendChild(toolbarActions);
            mediaToolbar.appendChild(hightlight);
            hightlight.appendChild(downArrow);

            self.$mediaToolbar = $(mediaToolbar);

            self.$editor.after(self.$mediaToolbar);

            for(var i = 0; i < defaults.mediaToolbarBtns.length; i++){
                var actionBtn = d.createElement('a'),
                    ii = d.createElement('i'),
                    li = d.createElement('li');

                actionBtn.href = "javascript:;";
                ii.className = defaults.mediaToolbarBtns[i].fi;
                actionBtn.setAttribute('data-action', defaults.mediaToolbarBtns[i].action);

                actionBtn.appendChild(ii);
                li.appendChild(actionBtn);
                toolbarActions.appendChild(li);
            }

        }

        function init(){
            getOriginalContent();
            hideElement();
            createBox();
            createToolbar();
            createEditor();
            createMediaToolbar();
            if('' == self.originalContent)
                utils.html.addTag(self.$editor, 'p', true, true, true);
            else {
                var html = self.originalContent;

                html = utils.encoding.stripTags(html);
                html = utils.encoding.savePreCode(html);
                html = utils.encoding.paragraphy(html);

                self.$editor.html(html);
            }
            cache.selection = utils.selection.save();
        }
    };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.$element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this.BluRedactor = null;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            //alert(this.$element)
            this.BluRedactor = new BluRedactor(this.$element, this.options);
            console.log(pluginName +" msg:", "initialized")
        }

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin( $(this), options ));
            }
        });
    };

})( jQuery, window, document );