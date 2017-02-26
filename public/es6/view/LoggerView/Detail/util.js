/**
 * Created by Ellery1 on 16/6/14.
 */
export function parseCookie(cookieStr) {
    return cookieStr
        .split(';')
        .reduce((acc, cookie) => {

            var cookiePair = cookie.split('=');
            acc[cookiePair[0]] = cookiePair[1] || "";
            return acc;
        }, {});
}

export function fixTextarea() {
    setTimeout(() => {
        var bodyTextArea = $(".body-textarea");
        bodyTextArea.each((i, ta) => {
            var scrollHeight = $(ta).prop('scrollHeight');
            $(ta).css("height", scrollHeight === 0 ? "auto" : scrollHeight);
        });
    }, 100);
}