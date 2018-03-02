export default function(id, callBack) {
    var uploader = new plupload.Uploader({
        browse_button: id, //触发文件选择对话框的按钮，为那个元素id
        url: '/IPTVEMall/common/image-upload', //服务器端的上传页面地址
        flash_swf_url : './static/js/plupload-2.3.6/js/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
        silverlight_xap_url : './static/js/plupload-2.3.6/js/Moxie.xap', //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
        filters: {
            mime_types: [ //只允许上传图片和zip文件
                { title: "Image files", extensions: "jpg,png" }
            ],
            max_file_size: '1000kb', //最大只能上传400kb的文件
            prevent_duplicates: true, //不允许选取重复文件
        },
        multi_selection: false,
        file_data_name: 'pictureFile',
    });

    //在实例对象上调用init()方法进行初始化
    uploader.init();

    uploader.bind('FilesAdded', function(uploader, files) {
        uploader.start();
        uploader.disableBrowse(true);
        if (callBack.start) {
            callBack.start();
        }
    });
    uploader.bind('UploadProgress', function(uploader, file) {
        if (callBack.updateProgress) {
            callBack.updateProgress(file.percent);
        }
    });

    uploader.bind('FileUploaded', function(uploader, file, responseObject) {
        if (callBack.fileUploaded) {
            callBack.fileUploaded(responseObject);
        }
    });

    uploader.bind('Error', function(uploader, errObject) {
        if (callBack.error) {
            callBack.error(errObject);
        }
        uploader.disableBrowse(false);
    });

    return {
        resetUpload(disable) {
            uploader.disableBrowse(disable);
            uploader.stop();
            uploader.splice(0, uploader.files.length);
        }
    };
}