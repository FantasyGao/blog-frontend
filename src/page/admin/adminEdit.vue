<template>
    <div class="index">
        <div class="choose">
          <saveOption option="time" >
            <DatePicker type="datetime" v-model="subInfo.time" placeholder="选择日期和时间" style="width: 200px"></DatePicker>
          </saveOption>
          <saveOption option="class" >
            <select v-model="subInfo.classic" class="form-control classic">
              <option v-for="classItem in classList" v-bind:value="classItem.name">{{classItem.name}}</option>
            </select>
          </saveOption>
          <saveOption option="title" >
            <input type="text" v-model="subInfo.title" class="form-control classic" placeholder="title">
          </saveOption>
          <saveOption option="Tag">
            <multiselect
              v-model="subInfo.tag" 
              :options="tagOptions"
              label="tagName" 
              track-by="tagId"
              :multiple="true">
            </multiselect>
          </saveOption>
          <saveOption>
            <div class="btn btn-default" @click="render()">添加标签</div>
          </saveOption>
          <saveOption option="img" >
            <div class="demo-upload-list" v-for="item in uploadList">
                <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
            <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png','gif']"
                :max-size="2048"
                :multiple="true"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                type="drag"
                name="articleImage"
                action="../../api/api/upload"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="查看图片" v-model="visible">
                <img :src="baseUrl+imgName" v-if="visible" style="width: 100%">
            </Modal>
            <Input class="classic" v-model="subInfo.imgUrl" placeholder="图片路径...">
            </Input>
          </saveOption>
          <saveOption option="file">
            <Upload
                multiple
                name="articleImage"
                :max-size="5130"
                :on-success="filehandleSuccess"
                :on-exceeded-size="filehandleMaxSize"
                action="../../api/api/upload">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
            <Input class="classic" v-model="fileUrl" placeholder="文件路径..." >
            </Input>
          </saveOption> 
        </div>
        <div class="Editor">
          <mavon-editor
            v-model="subInfo.markdown"
            :toolbars="toolbars" 
            :code-style="'code-hybrid'"
            @change="htmlcode()" 
            @save="addArticle()"
            style="height: 100%"
          ></mavon-editor>
        </div>
        <div class="submit">
            <Button @click='addArticle' type="success" class="btn btn-default form-control" long>添加新版本</Button>
            <Button @click='mergeArticle' type="success" style="margin-top:15px" class="btn btn-default form-control"  long>保存</Button>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Multiselect from 'vue-multiselect'
import saveOption from '../../components/saveOption.vue'
import { mavonEditor } from 'mavon-editor'
// import MarkdownIt from 'markdown-it'
import 'mavon-editor/dist/css/index.css'

export default {
  components: {
    Datepicker,
    Multiselect,
    saveOption,
    mavonEditor
  },
  data () {
    return {
      selected: null,
      tagOptions: [],
      addTagValue: '',
      classList: [
        {id: 1, name: '技术'},
        {id: 2, name: '生活'},
        {id: 3, name: '梦想'},
        {id: 4, name: '创作'},
        {id: 5, name: '精品摘抄'},
        {id: 6, name: '杂七杂八'}
      ],
      defaultList: [],
      subInfo: {
        time: '',
        title: '',
        author: '',
        classic: '',
        tag: '',
        imgUrl: '',
        content: '',
        markdown: ''
      },
      fileUrl: '',
      imgName: '',
      visible: false,
      uploadList: [],
      baseUrl: 'http://127.0.0.1:7000/uploads/',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        preview: true,
        navigation: true,
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 新增 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true // 保存（触发events中的save事件）
      }
    }
  },
  methods: {
    htmlcode () {
      let htmlContent = document.getElementsByClassName('v-show-content-html')[0].innerText
      // console.log(htmlContent)
      // let md = new MarkdownIt() // MarkdownIt取到的html与原来有差异
      // let result = md.render(this.subInfo.markdown)
      // console.log(result)
      this.subInfo.content = htmlContent
    },
    handleRemove (file) {
      // 从 upload 实例删除数据
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      if (res.status === 1) {
        // 因为上传过程为实例，这里模拟添加 url
        this.subInfo.imgUrl = this.baseUrl + res.data.fileName
        file.name = res.data.fileName
        file.url = this.baseUrl + res.data.fileName
      } else {
        this.$Notice.warning({
          title: '上传失败',
          desc: res.msg
        })
      }
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg,jpeg,gif,png 格式的图片。'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 3
      if (!check) {
        this.$Notice.warning({
          title: '最多只能上传 3 张图片。'
        })
      }
      return check
    },
    filehandleSuccess (res, file) {
      if (res.status === 1) {
        this.fileUrl = this.baseUrl + res.data.fileName
      } else {
        this.$Notice.warning({
          title: '上传失败',
          desc: res.msg
        })
      }
    },
    filehandleMaxSize (file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 5M。'
      })
    },
    render () {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.addTagValue,
              autofocus: true,
              placeholder: 'Please enter new tag...'
            },
            on: {
              input: (val) => {
                this.addTagValue = val
              }
            }
          })
        },
        onOk: () => {
          let n = this.tagOptions.length
          this.tagOptions.push({
            id: n + 1,
            value: this.addTagValue
          })
        }
      })
    },
    addArticle () {
      this.subInfo.author = window.localStorage.getItem('adminName')
      console.log(this.subInfo)
      this.$Modal.confirm({
        title: '保存草稿',
        content: '<p>确认保存新版本？</p>',
        okText: 'OK',
        loading: true,
        cancelText: 'Cancel',
        onOk: () => {
          this.axios('addArticle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            data: this.subInfo
          })
          .then(data => {
            this.$Modal.remove()
            if (data.data.status !== 1) {
              this.$Message.warning(data.data.msg)
              return
            }
            this.$Notice.success({
              title: '保存成功'
            })
          })
          .catch(data => {
            console.log('error')
          })
        }
      })
    },
    mergeArticle () {
      this.subInfo.author = window.localStorage.getItem('adminName')
      console.log(this.subInfo)
      this.$Modal.confirm({
        title: '保存草稿',
        content: '<p>确认与上一个版本合并？</p>',
        okText: 'OK',
        loading: true,
        cancelText: 'Cancel',
        onOk: () => {
          this.axios('editArticle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            data: this.subInfo
          })
          .then(data => {
            this.$Modal.remove()
            if (data.data.status !== 1) {
              this.$Message.warning(data.data.msg)
              return
            }
            this.$Notice.success({
              title: '保存成功'
            })
          })
          .catch(data => {
            console.log('error')
          })
        }
      })
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
    this.axios.get('searchAllTags')
    .then((data) => {
      if (data.data.status === 1) {
        console.log(data.data.data)
        this.tagOptions = data.data.data
      }
    })
    .catch((e) => {
      console.log(e)
    })
    let id = this.$route.params.id
    this.axios.get('searchOne', {
      params: {
        id: id
      }
    })
    .then((data) => {
      if (data.data.status === 1) {
        console.log(data.data.data)
        this.subInfo = data.data.data
      }
    })
    .catch((e) => {
      console.log(e)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.multiselect,.classic{
   width: 600px;
}
.vdp-datepicker input{
    display: block;
    width: 600px;
    height: 34px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.Editor .v-note-wrapper {
    position: static;
}
.ivu-input-wrapper {
    display: block;
    position: relative;
    vertical-align: middle;
}
.markdown-editor .CodeMirror,
.markdown-editor .CodeMirror-scroll {
    min-height: 1000px;
    min-width: 500px;
    font-size: 16px;
    z-index:0;
}
.ivu-upload-list{
  width: 200px;
}
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
<style scoped>
.index{
    background:#f5f5d5;
    width: 100%;
    clear: both;
    display: inline-block;
    margin-top: 0px;
}
.choose{
    margin-bottom: 45px;
    margin-left:15%;
}
.Editor{
    width:70%;
    height:500px;
    min-width: 660px;
    margin-left:15%;
    overflow-y: hidden;
}
.submit{
    height:100px;
    width:35%;
    margin-left:15%;
    margin-top:20px;
}
</style>
