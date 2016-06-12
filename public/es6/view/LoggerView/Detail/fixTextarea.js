/**
 * Created by Ellery1 on 16/6/11.
 */
export default function () {

    setTimeout(()=> {

        var bodyTextArea = $(".body-textarea"),
            scrollHeight = bodyTextArea.prop('scrollHeight');

        bodyTextArea.css("height", scrollHeight === 0 ? "auto" : scrollHeight);
    }, 100);
}