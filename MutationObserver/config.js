$(function () {

    window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    // Find the element that you want to "watch"
    var 
        target = document.querySelector('#soc-page-selector'),
        contentNodeSelector = null,
        // create an observer instance
        observer = new MutationObserver(function (mutation) {
            if (mutation[0].attributeName === "data-value") {
                contentNodeSelector = document.getElementById('soc-content-node-selector');
                if (typeof (contentNodeSelector) != 'undefined' && contentNodeSelector != null) {
                    contentNodeSelector.parentNode.parentNode.parentNode.remove();
                }
                if (target.hasAttribute("data-value")) {
                    requester.doGet({
                        route: '/get-content-areas',
                        data: {
                            value: target.getAttribute("data-value")
                        }
                    }).done(function (res) {
                        var el =
                            '<div class="panel-body"><div class="form-group">' +
                            '<label>Välj innehållsyta</label>' +
                            '<select id="soc-content-node-selector" name="single" class="form-control" name="myCustomName">';
                            for(var i = 0; i < res.value.length; i++){
                                el += res.value;
                            }
                            el += '</select>'+
                            '</div></div>';

                        $('.panel').append($(el));
                        $('body').trigger('setup-component', '#soc-content-node-selector');
                    });
                }
                else {
                    contentNodeSelector = document.getElementById('soc-content-node-selector');
                    if (typeof (contentNodeSelector) != 'undefined' && contentNodeSelector != null) {
                        contentNodeSelector.parentNode.parentNode.parentNode.remove();
                    }
                }
            }
        }),
        config = {
            attributes: true // this is to watch for attribute changes.
        };

    observer.observe(target, config);

});
