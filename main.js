// Client id is get from here: https://dev.twitch.tv/dashboard/apps/create
const twitchClientId = "dpvcdi494b1va7xqdj3nop2lklwweb";
const twitchChannel = "adowtatepbr";
const videoUrls = [
    "https://www.youtube.com/embed/y7rEMNNcLTw", // Liga 2 apresentação
    "https://www.youtube.com/embed/5PwtlO1UyrU", // Liga 1
    "https://www.youtube.com/embed/NHXSbXOfJ-E", // Liga 1 premiação
    "https://www.youtube.com/embed/xfN8SWWucro?list=PLDHLJyB4TxYOC7MPLGL0iTMxC-JmnbBZ6", // Liga 2 final
    "https://www.youtube.com/embed/zHLLbY936UQ", // Video do alax randor
    "https://www.youtube.com/embed/bwpIC4_R2dw" // highlight do averez
]

// Make a get httprequest  as a promise, also setting its headers
const getAsync = (url, headers) => {
    return new Promise((resolve, reject) => {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", url, true); // true for asynchronous 

        if (headers) {
            for (key in headers) {
                xmlHttp.setRequestHeader(key, headers[key])
            }
        }

        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                resolve(xmlHttp.responseText);
            else if (xmlHttp.status != 200)
                reject(xmlHttp);
        }

        xmlHttp.send(null);
    });
}

// Turn on twitch embed library
const enablePreview = (id, twitchChannel) => {
    var stream = document.getElementById(id);
    stream.style.display = "block";

    new Twitch.Embed(`twitch-embed-${id}`, {
        width: stream.clientWidth,
        height: 580,
        channel: twitchChannel
    });
}

// If the window is resized we create a new iframe, so we need to remove the previous one
const removeTwitchIframe = (id) => {
    const element = document.getElementById(id);

    // Only removes if found anything(won't iterate if there's nothing )
    element.querySelectorAll("iframe").forEach(iframe => {
        iframe.parentNode.removeChild(iframe);
    });
}

// Display the stream on the top if it is on, if not, let it on the bottom
const toggleTwitchPositions = (twitchClientId, twitchChannel) => {
    removeTwitchIframe("streamTop");
    removeTwitchIframe("streamBottom");

    const headers = []
    headers['Client-ID'] = twitchClientId;
    getAsync(`https://api.twitch.tv/helix/streams?user_login=${twitchChannel}`, headers)
        .then((result) => {
            var streams = JSON.parse(result);

            // If we are live, display the streamtop and hide the streambottom
            if (streams.data && streams.data.length > 0) {
                enablePreview("streamTop", twitchChannel);
            }
            else {
                enablePreview("streamBottom", twitchChannel);
            }
            // If not, streamtop will not be visible and the bottom will anyway
        })
        .catch((error) => {
            console.error(error);
            enablePreview("streamBottom", twitchChannel);
        });
}

// Debouncing prevents the function of being called at each milisecond that the event is called
var debounceIds = [];
const debounce = (func, debounceName, delayMs) => {
    clearTimeout(debounceIds[debounceName]);
    debounceIds[debounceName] = setTimeout(func, delayMs);
}

// Init media masonry(grid wall), I could've done it with flex
var msnry = null;
const initMasonry = () => {
    var elem = document.querySelector('.grid');
    msnry = new Masonry('.grid', {
        // options
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });
}

// Reset video height based on masonry's/window's width
const refreshAspect = () => {
    var items = document.querySelectorAll('.grid-item');
    items.forEach((element, i) => {
        // width*9/16
        element.style.height = element.clientWidth * 9 / 16 + "px";

        if (i == items.length - 1 && msnry) {
            msnry.layout();
        }
    });
}

// Programmatically insert elements onto media grid
const insertVideos = () => {
    const mediaHtml = (videoUrl) => {
        return `<div class="grid-item">
    <iframe src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
</div>`;
    }

    var media = document.querySelector('.media');
    var grid = media.querySelector('.grid');
    videoUrls.forEach(url => {
        var e = document.createElement('div');
        e.innerHTML = mediaHtml(url);
        grid.appendChild(e);
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
    const reToggle = (delay) => {
        debounce(() => { toggleTwitchPositions(twitchClientId, twitchChannel); }, "twitch", delay);
    }

    const reRefresh = (delay) => {
        debounce(() => { refreshAspect(); }, "media", delay);
    }

    window.addEventListener('orientationchange', function (event) {
        reToggle(400);
        reRefresh(400);
    });

    window.addEventListener('resize', function (event) {
        reToggle(400);
        reRefresh(400);
    });

    insertVideos();

    reToggle(100);

    initMasonry();

    reRefresh(100);
});