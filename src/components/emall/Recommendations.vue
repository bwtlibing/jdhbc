<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>
        <div class="content-container">
            <el-row :gutter="30">
                <el-col :span="5">
                    <el-select v-model="queryParams.pageId" filterable placeholder="全部页面" :clearable="true" @change="changePage">
                        <el-option
                          v-for="item in pages"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-select v-model="queryParams.areaId" filterable placeholder="全部推荐位" :clearable="true" @change="changeArea">
                        <el-option
                          v-for="item in areas"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-select v-model="queryParams.contentType" filterable placeholder="全部推荐类型" :clearable="true" @change="changeContentType">
                        <el-option
                          v-for="item in contentTypes"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="9" class="add-recommendation">
                    <el-button class="button" type="primary" size="medium" @click="showAddRecommendationDialog()">添加</el-button>
                </el-col>
            </el-row>
            <div style="margin-top:20px;">
                <el-tabs v-model="queryParams.status" type="card" @tab-click="tabClick">
                    <el-tab-pane label="推荐中" name="onlyRecommending"></el-tab-pane>
                    <el-tab-pane label="全部" name="all"></el-tab-pane>
                </el-tabs>
            </div>
            <table class="emall-table">
                <thead>
                    <tr class="head-row">
                        <th style="width:35%;">图片 描述</th>
                        <th style="width:14%;">推荐位</th>
                        <th style="width:10%;">推荐类型</th>
                        <th style="width:10%;">创建时间</th>
                        <th style="width:8%;">点击量</th>
                        <th style="width:8%;">排序值</th>
                        <th style="width:15%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in recommendationList" class="content-row">
                        <td class="image-and-description">
                                <img v-if="item.recommendationType == 0" src="../../assets/video_image.png">
                                <img v-else :src="item.imageUrl">
                                <router-link v-if="item.contentType == 0" :to="'/emall/productinfo/' + item.idContent" target="_blank">{{item.description}}</router-link>
                                <router-link v-else-if="item.contentType == 1" to="/" target="_blank">{{item.description}}</router-link>
                                <a v-else :href="item.urlContent" target="_blank">{{item.description}}</a>
                            </td>
                        <td>{{item.recommendationArea.name}}</td>
                        <td>{{item.contentType | recommendationContentTypeFilter}}</td>
                        <td>{{item.createTime | dateFormat('toSecond')}}</td>
                        <td>{{item.clicks}}</td>
                        <td>{{item.position}}</td>
                        <td>
                            <a class="btn-link" @click="showEditRecommendationDialog(item)">编辑</a>
                            <a class="btn-link" v-if="item.open" @click="cancelRecommendation(item, index)">取消推荐</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <a class="btn-link more" v-show="hasMoreRecommendation" @click="queryRecommendation(true)">更多</a>
        </div>
        <el-dialog
            :title="dataForRecommendationDialog.recommendationId ? '编辑推荐' : '添加推荐'"
            :visible.sync="dataForRecommendationDialog.visible"
            width="700px">
            <el-row class="recommendation-row">
                <el-col :span="4" class="text-label">推荐位：</el-col>
                <el-col :span="20">
                    <el-select v-model="dataForRecommendationDialog.pageId" filterable placeholder="请选择页面" @change="changeDialogPage">
                        <el-option
                          v-for="item in pages"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="dataForRecommendationDialog.areaId" filterable placeholder="请选择推荐位" @change="changeDialogArea">
                        <el-option
                          v-for="item in dataForRecommendationDialog.areas"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                    <div v-show="dataForRecommendationDialog.areaDetail.areaType !== ''" class="area-info">
                        <div>推荐位类型：{{dataForRecommendationDialog.areaDetail.areaType | areaTypeFilter}}</div>
                        <div>最大推荐数：{{dataForRecommendationDialog.areaDetail.maxSize}}&nbsp;&nbsp;最小推荐数：{{dataForRecommendationDialog.areaDetail.minSize}}</div>
                        <div>描述：{{dataForRecommendationDialog.areaDetail.description}}</div>
                    </div>
                </el-col>
            </el-row>
            <el-row class="recommendation-row">
                <el-col :span="4" class="text-label">推荐内容：</el-col>
                <el-col :span="20">
                    <el-radio-group v-model="dataForRecommendationDialog.type">
                        <div class="recommendation-type">
                            <el-radio :label="1" class="radio">图片</el-radio>
                            <image-uploader class="image-uploader" uploader-id="recommendation_image_uploader" :width="70" :height="70" :image-src.sync="dataForRecommendationDialog.imageUrl"></image-uploader>
                        </div>
                        <div class="recommendation-type">
                            <el-radio :label="0" :disabled="dataForRecommendationDialog.areaDetail.areaType !== 0" class="radio">视频</el-radio>
                            <el-input v-model="dataForRecommendationDialog.videoCodeHd" :disabled="dataForRecommendationDialog.type != 0" class="video-code-input" placeholder="请输入高清视频码"></el-input>
                            <el-input v-model="dataForRecommendationDialog.videoCode" :disabled="dataForRecommendationDialog.type != 0" class="video-code-input" placeholder="请输入标清视频码"></el-input>
                        </div>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row class="recommendation-row">
                <el-col :span="4" class="text-label">推荐内容：</el-col>
                <el-col :span="20">
                    <el-select v-model="dataForRecommendationDialog.contentType" filterable placeholder="请选择推荐内容类型">
                        <el-option
                          v-for="item in contentTypes"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                    </el-select>
                    <el-input v-model="dataForRecommendationDialog.contentIdOrUrl" placeholder="根据推荐内容类型，对应输入商品ID、商家ID、活动页面网址" style="margin-top:10px;"></el-input>
                </el-col>
            </el-row>
            <el-row class="recommendation-row">
                <el-col :span="4" class="text-label">排序值：</el-col>
                <el-col :span="8">
                    <el-input v-model.number="dataForRecommendationDialog.position" placeholder="取值范围为1-10，默认为5"></el-input>
                </el-col>
            </el-row>
            <el-row class="recommendation-row">
                <el-col :span="4" class="text-label">推荐描述：</el-col>
                <el-col :span="20">
                    <el-input v-model="dataForRecommendationDialog.description"></el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dataForRecommendationDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="addOrEditRecommendationSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import BreadCrumbs from '../base/BreadCrumbs'
import ImageUploader from '../base/ImageUploader'
import { resultCode, apiCallback } from '../../utils/common'
import { recommendationValidator } from '../../utils/dataValidator.js'

export default {
    name: 'EMallRecommendations',
    components: {
        BreadCrumbs,
        ImageUploader,
    },
    data () {
        return {
            dataForBreadCrumbs: [
                '翼商城管理', '推荐管理'
            ],
            queryParams: {
                pageId: '',
                areaId: '',
                contentType: '',
                status: 'onlyRecommending',
                pageNum: 1,
                pageSize: 20,
            },
            pages: [
            ],
            areas: [
            ],
            contentTypes: [{
                code: 0,
                name: '商品'
            }, {
                code: 1,
                name: '商家'
            }, {
                code: 2,
                name: '活动'
            }],
            dataForRecommendationDialog: {
                visible: false,
                recommendationId: '',
                pageId: '',
                areaId: '',
                type: 1,
                imageUrl: '',
                videoCode: '',
                videoCodeHd: '',
                contentType: '',
                contentIdOrUrl: '',
                position: '',
                description: '',
                areas: [],
                areaDetail: {
                    areaType: '',
                    description: '',
                    minSize: '',
                    maxSize: '',
                }
            },
            hasMoreRecommendation: true,
            recommendationList: [],
        }
    },
    created () {
        this.initData();
    },
    watch: {
        '$route': 'initData()'
    },
    methods: {
        initData() {
            this.queryRecommendation(false);
            this.queryPage();
        },
        queryRecommendation(more) {
            if (more) {
                this.queryParams.pageNum++;
            } else {
                this.queryParams.pageNum = 1;
                this.hasMoreRecommendation = true;
            }
            var url = '/IPTVEMall/admin/recommendation/list?page=' + this.queryParams.pageNum + '&limit=' + this.queryParams.pageSize;
            if (this.queryParams.pageId) {
                url += '&page_id=' + this.queryParams.pageId;
            }
            if (this.queryParams.areaId) {
                url += '&area_id=' + this.queryParams.areaId;
            }
            if (this.queryParams.contentType !== '') {
                url += '&content_type=' + this.queryParams.contentType;
            }
            if (this.queryParams.status != 'onlyRecommending') {
                url += '&only_recommending=false';
            }
            this.$http.get(url)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {
                    if (response.data.data.length < this.queryParams.pageSize || this.queryParams.status == 'onlyRecommending') {
                        this.hasMoreRecommendation = false;
                    }
                    if (more) {
                        this.recommendationList = this.recommendationList.concat(response.data.data);
                    } else {
                        this.recommendationList = response.data.data;
                    }
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        },
        queryPage() {
            var url = '/IPTVEMall/admin/recommendation/page-list';
            this.$http.get(url)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {
                    this.pages = response.data.data;
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        },
        queryArea(pageId, inDialog) {
            var url = '/IPTVEMall/admin/recommendation/area-list?page_id=' + pageId;
            this.$http.get(url)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {
                    if (inDialog) {
                        this.dataForRecommendationDialog.areas = response.data.data;
                    } else {
                        this.areas = response.data.data;
                    }
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        },
        queryAreaDetail(areaId) {
            var url = '/IPTVEMall/admin/recommendation/area-detail?area_id=' + areaId;
            this.$http.get(url)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {
                    this.dataForRecommendationDialog.areaDetail = response.data.data;
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        },
        changePage(pageId) {
            if (!pageId) {
                this.areas = [];
            } else {
                this.queryArea(pageId, false);
            }
            this.queryParams.areaId = '';
            this.queryRecommendation(false);
        },
        changeArea() {
            this.queryRecommendation(false);
        },
        changeContentType() {
            this.queryRecommendation(false);
        },
        tabClick(tab, event) {
            this.queryRecommendation(false);
        },
        cancelRecommendation(recommendationItem, index) {
            this.$confirm('确定取消推荐?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var url = '/IPTVEMall/admin/recommendation/cancel?recommendation_id=' + recommendationItem.id;
                this.$http.post(url)
                .then((response) => {
                    if (response.data.resultCode === resultCode.SUCCESS) {
                        this.$message.success('取消推荐成功');
                        if (this.queryParams.status == 'onlyRecommending') {
                            this.recommendationList.splice(index, 1);
                        } else {
                            recommendationItem.open = false;
                        }
                    } else {
                        apiCallback.success(response.data, this.$message);
                    }
                },(response) => {
                    apiCallback.error(response);
                })
            }).catch(() => {
            });
        },
        setEmptyAreaDetail() {
            this.dataForRecommendationDialog.areaDetail = {
                areaType: '',
                description: '',
                minSize: '',
                maxSize: '',
            };
        },
        showAddRecommendationDialog() {
            this.dataForRecommendationDialog.visible = true;
            this.dataForRecommendationDialog.recommendationId = '';
            this.dataForRecommendationDialog.pageId = '';
            this.dataForRecommendationDialog.areas = [];
            this.dataForRecommendationDialog.areaId = '';
            this.setEmptyAreaDetail();
            this.dataForRecommendationDialog.type = 1;
            this.dataForRecommendationDialog.imageUrl = '';
            this.dataForRecommendationDialog.videoCode = '';
            this.dataForRecommendationDialog.videoCodeHd = '';
            this.dataForRecommendationDialog.contentType = '';
            this.dataForRecommendationDialog.contentIdOrUrl = '';
            this.dataForRecommendationDialog.position = '';
            this.dataForRecommendationDialog.description = '';
        },
        showEditRecommendationDialog(recommendationItem) {
            this.dataForRecommendationDialog.visible = true;
            this.dataForRecommendationDialog.recommendationId = recommendationItem.id;
            this.dataForRecommendationDialog.pageId = recommendationItem.recommendationArea.pageId;
            this.dataForRecommendationDialog.areas = [];
            this.changeDialogPage(recommendationItem.recommendationArea.pageId);
            this.dataForRecommendationDialog.areaId = recommendationItem.recommendationArea.id;
            this.setEmptyAreaDetail();
            this.queryAreaDetail(recommendationItem.recommendationArea.id);
            this.dataForRecommendationDialog.type = recommendationItem.recommendationType;
            this.dataForRecommendationDialog.imageUrl = recommendationItem.imageUrl;
            this.dataForRecommendationDialog.videoCode = recommendationItem.videoCode;
            this.dataForRecommendationDialog.videoCodeHd = recommendationItem.videoCodeHd;
            this.dataForRecommendationDialog.contentType = recommendationItem.contentType;
            this.dataForRecommendationDialog.contentIdOrUrl = recommendationItem.contentType == 2 ? recommendationItem.urlContent : recommendationItem.idContent;
            this.dataForRecommendationDialog.position = recommendationItem.position;
            this.dataForRecommendationDialog.description = recommendationItem.description;
        },
        changeDialogPage(pageId) {
            if (!pageId) {
                this.dataForRecommendationDialog.areas = [];
            } else {
                this.queryArea(pageId, true);
            }
            this.dataForRecommendationDialog.areaId = '';
            this.setEmptyAreaDetail();
        },
        changeDialogArea() {
            this.setEmptyAreaDetail();
            this.queryAreaDetail(this.dataForRecommendationDialog.areaId);
        },
        validateParams() {
            var result;
            if (!this.dataForRecommendationDialog.pageId) {
                return '请选择推荐页';
            }
            if (!this.dataForRecommendationDialog.areaId) {
                return '请选择推荐位';
            }
            if (this.dataForRecommendationDialog.type == 1) {
                if (this.dataForRecommendationDialog.imageUrl.indexOf("http") != 0) {
                    return '请上传推荐图片素材';
                }
            } else {
                result = recommendationValidator.validateVideoCode(this.dataForRecommendationDialog.videoCodeHd, this.dataForRecommendationDialog.videoCode);
                if (!result.ok) {
                    return result.errorMsg;
                }
            }
            result = recommendationValidator.validateContent(this.dataForRecommendationDialog.contentType, this.dataForRecommendationDialog.contentIdOrUrl);
            if (!result.ok) {
                return result.errorMsg;
            }
            result = recommendationValidator.validatePosition(this.dataForRecommendationDialog.position);
            if (!result.ok) {
                return result.errorMsg;
            }
            result = recommendationValidator.validateDescription(this.dataForRecommendationDialog.description);
            if (!result.ok) {
                return result.errorMsg;
            }
        },
        addOrEditRecommendationSubmit() {
            var result = this.validateParams();
            if (result) {
                this.$message.error(result);
                return;
            }
            var data = {
                recommendationType: this.dataForRecommendationDialog.type,
                areaId: this.dataForRecommendationDialog.areaId,
                imageUrl: this.dataForRecommendationDialog.imageUrl,
                videoCode: this.dataForRecommendationDialog.videoCode,
                videoCodeHd: this.dataForRecommendationDialog.videoCodeHd,
                contentType: this.dataForRecommendationDialog.contentType,
                idContent: this.dataForRecommendationDialog.contentType != 2 ? this.dataForRecommendationDialog.contentIdOrUrl : '',
                urlContent: this.dataForRecommendationDialog.contentType == 2 ? this.dataForRecommendationDialog.contentIdOrUrl : '',
                description: this.dataForRecommendationDialog.description,
                position: this.dataForRecommendationDialog.position === '' ? 5 : this.dataForRecommendationDialog.position,
            };
            if (this.dataForRecommendationDialog.recommendationId) {
                this.editRecommendation(this.dataForRecommendationDialog.recommendationId, data);
            } else {
                this.addRecommendation(data);
            }
        },
        addRecommendation(data) {
            var url = '/IPTVEMall/admin/recommendation/add';
            this.$http.post(url, data)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {
                    this.$message.success('添加推荐成功');
                    this.dataForRecommendationDialog.visible = false;
                    this.queryRecommendation(false);
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        },
        editRecommendation(id, data) {
            var url = '/IPTVEMall/admin/recommendation/edit';
            data.id = id;
            this.$http.post(url, data)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {
                    this.$message.success('编辑推荐成功');
                    this.dataForRecommendationDialog.visible = false;
                    this.queryRecommendation(false);
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        }
    },
}
</script>

<style scoped>
.content-container {
    background-color: white;
    margin-top: 20px;
    padding: 20px;
}


.add-recommendation .button {
    float: right;
}

.emall-table td.image-and-description {
    padding: 10px 20px;
    text-align: left;
    vertical-align: middle;
}

.image-and-description img {
    height: 70px;
    width: 70px;
    vertical-align: middle;
}

.image-and-description a {
    vertical-align: middle;
    display: inline-block;
    width: 220px;
    margin-left: 10px;
}

.emall-table .btn-link:last-child {
    margin-left: 20px;
}

.recommendation-row {
    margin-bottom: 20px;
}

.recommendation-row .text-label {
    text-align: right;
    line-height: 40px;
    font-size: 15px;
}

.area-info {
    margin-top: 10px;
}

.recommendation-type {
    margin-top: 20px;
}

.recommendation-type .radio {
    vertical-align: top;
}

.recommendation-type .image-uploader {
    display: inline-block;
    margin: -10px 0 0 10px;
}

.recommendation-type .video-code-input {
    width: 200px;
    margin: -10px 0 0 10px;
}

.more {
    display: inline-block;
    margin: 10px 0;
}
</style>