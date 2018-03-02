<template>
    <div class="image-uploader" :id="uploaderId" :style="'width:' + width + 'px; height:' + height + 'px'">
        <img v-show="status != 0" class="delete-image" src="../../assets/close_icon.png" :width="sizeForDeleteBtn" :height="sizeForDeleteBtn" @click="deleteImage">
        <img v-show="status == 0" class="center" src="../../assets/upload_image_icon.png" :width="sizeForCenter" :height="sizeForCenter">
        <el-progress v-show="status == 1" class="center" type="circle" :percentage="percentage" :width="sizeForCenter"></el-progress>
        <img v-show="status == 2" :src="imageSrc" :width="width" :height="height">
    </div>
</template>

<script>
import { resultCode, apiCallback } from '../../utils/common'
import plupload from '../../utils/util-plupload'

export default {
    name: 'ImageUploader',
    props: ['uploaderId', 'width', 'height', 'imageSrc'],
    data () {
        return {
            percentage: 0,
            status: 0,
            uploaderHanlder: {
            },
        }
    },
    created() {
        
    },
    watch: {
        imageSrc() {
            this.imageSrcChange();
        }
    },
    computed: {
        sizeForDeleteBtn() {
            var result = this.width > this.height ? this.height : this.width;
            result = result / 3;
            if (result > 50) {
                result = 50;
            }
            return result;
        },
        sizeForCenter() {
            var result = this.width > this.height ? this.height : this.width;
            result = result * 0.6;
            if (result > 200) {
                result = 200;
            }
            return result;
        }
    },
    mounted() {
        var self = this;
        this.uploaderHanlder = plupload(this.uploaderId, {
            start() {
                self.status = 1;
                self.percentage = 0;
            },
            updateProgress(percent) {
                self.percentage = percent;
            },
            fileUploaded(responseObject) {
                if (responseObject.status == 200) {
                    responseObject.response = JSON.parse(responseObject.response);
                    if (responseObject.response.resultCode === resultCode.SUCCESS) {
                        self.status = 2;
                        self.$emit('update:imageSrc', responseObject.response.data);
                    } else {
                        apiCallback.success(responseObject.response, self.$message);
                        self.imageSrcChange();
                    }
                }
            },
            error(errObject) {
                switch (errObject.code) {
                    case -600: 
                        self.$message.error('图片过大');
                        break;
                    case -601: 
                        self.$message.error('图片类型有误');
                        break;
                    case -602: 
                        self.$message.error('图片重复');
                        break;
                    case -200: 
                        self.$message.error(errObject.code + ' ' + errObject.message);
                        break;
                    default:
                        self.$message.error(errObject.code + ' ' + errObject.message);
                }
                self.imageSrcChange();
            }
        });
        this.imageSrcChange();
    },
    methods: {
        imageSrcChange() {
            if (this.imageSrc) {
                this.uploaderHanlder.resetUpload(true);
                this.status = 2;
            } else {
                this.uploaderHanlder.resetUpload(false);
                this.status = 0;
            }
        },
        deleteImage() {
            this.$emit('update:imageSrc', '');
        }
    }
}
</script>

<style scoped>
.image-uploader {
    background-color: #EDEEF2;
    position: relative;
    cursor: pointer;
}

.image-uploader .delete-image {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;
}

.image-uploader .center {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    z-index: 10;
}
</style>