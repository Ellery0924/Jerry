/**
 * Created by Ellery1 on 16/6/11.
 */
export default function () {

    setTimeout(()=> {

        var bodyTextArea = $(".body-textarea");

        bodyTextArea.each((i, ta)=> {

            var scrollHeight = $(ta).prop('scrollHeight');
            $(ta).css("height", scrollHeight === 0 ? "auto" : scrollHeight);
        });
    }, 100);
}