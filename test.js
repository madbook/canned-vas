(function (exports) {

    exports.describe = describe
    exports.it = it
    exports.show = show

    var describes = []
    var testCanvasSize = { width: 100, height: 100 }

    function describe (title, runner) {
        var testElem = document.createElement('div')
        testElem.className = 'describe-block'
        describes.push(testElem)

        var descriptionElem = document.createElement('div')
        descriptionElem.innerHTML = title
        descriptionElem.className = 'describe-title'
        testElem.appendChild(descriptionElem)

        try {
            runner()
        }
        catch (err) {
            console.trace()
            var errElem = document.createElement('div')
            errElem.innerHTML = err
            errElem.className = 'it-error'
            testElem.appendChild(errElem)
        }

        describes.pop()

        show(testElem)
    }

    function it (description, runner) {
        var testElem = document.createElement('div')
        testElem.className = 'it-block'
        describes.push(testElem)
        var descriptionElem = document.createElement('div')
        descriptionElem.innerHTML = description
        descriptionElem.className = 'it-description'

        testElem.appendChild(descriptionElem)
        var can = CannedVas.create().size(testCanvasSize)
        try {
            runner(can)
        }
        catch (err) {
            console.trace()
            var errElem = document.createElement('div')
            errElem.innerHTML = err
            errElem.className = 'it-error'
            testElem.appendChild(errElem)
        }
        show(can.vas)
        var codeElement = document.createElement('div')
        codeElement.innerHTML = "<pre><code>" + runner.toString() + "</code></pre>"
        codeElement.className = 'source'
        show(codeElement)
        describes.pop()
        show(testElem)
    }

    function show (elem) {
        var parent = (describes.length)
            ? describes[describes.length-1] : document.body

        parent.appendChild(elem)
    }
})(this)
