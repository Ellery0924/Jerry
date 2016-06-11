/**
 * Created by Ellery1 on 16/6/11.
 */
export default function () {

    setTimeout(()=> {

        var bodyTextArea = $(".body-textarea");
        bodyTextArea.css("height", bodyTextArea.prop("scrollHeight"), 10);
    }, 100);
}