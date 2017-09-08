<template>
    <div id="index">
        <div class="myContent">
          <div class="chartContent">
            <div class="chart">
              <schart 
                  :canvasId="readObj.canvasId"
                  :type="readObj.type"
                  :width="readObj.width"
                  :height="readObj.height"
                  :data="readObj.data"
                  :options="readObj.options"
              ></schart>
            </div>
          </div>
          <div class="chartContent">
            <div class="chart">
              <schart 
                  :canvasId="readArtObj.canvasId"
                  :type="readArtObj.type"
                  :width="readArtObj.width"
                  :height="readArtObj.height"
                  :data="readArtObj.data"
                  :options="readArtObj.options"
              ></schart>
            </div>
          </div>
          <div class="chartContent">
            <div class="chart">
              <schart 
                  :canvasId="markNumObj.canvasId"
                  :type="markNumObj.type"
                  :width="markNumObj.width"
                  :height="markNumObj.height"
                  :data="markNumObj.data"
                  :options="markNumObj.options"
              ></schart>
            </div>
          </div>
          </div>
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart'
export default {
  name: 'index',
  data () {
    return {
      readObj: {
        canvasId: 'readNum',
        type: 'line',
        width: '800',
        height: '398',
        data: [],
        options: {
          title: '近十天网站浏览量',
          bgColor: '#829dba',
          titleColor: '#ffffff',
          fillColor: '#e2f362',
          axisColor: '#eeeeee',
          contentColor: '#bbbbbb'
        }
      },
      readArtObj: {
        canvasId: 'readArt',
        type: 'bar',
        width: '800',
        height: '398',
        data: [],
        options: {
          title: '浏览量前十的文章',
          bgColor: '#829dba',
          titleColor: '#ffffff',
          fillColor: '#06abd0',
          axisColor: '#eeeeee',
          contentColor: '#bbbbbb'
        }
      },
      markNumObj: {
        canvasId: 'markNum',
        type: 'pie',
        width: '800',
        height: '398',
        data: [],
        options: {
          title: '评论量前十的文章',
          bgColor: '#829dba',
          titleColor: '#ffffff',
          legendColor: '#ffffff'
        }
      }
    }
  },
  components: {
    Schart
  },
  methods: {
    dealData (data) {
      let markNum = []
      let readArt = []
      let siteread = []
      data.TopMarksInfo.forEach((item, i) => {
        let obj = {}
        obj.name = item.title
        obj.value = item.markNum
        markNum.push(obj)
      })
      data.TopReadInfo.forEach((item, i) => {
        let obj = {}
        obj.name = item.title
        obj.value = item.pv
        readArt.push(obj)
      })
      data.TopReadSiteInfo.forEach((item, i) => {
        let obj = {}
        obj.name = item.time
        obj.value = item.dayViews
        siteread.push(obj)
      })
      this.readObj.data = siteread
      this.readArtObj.data = readArt
      this.markNumObj.data = markNum
    }
  },
  mounted () {
    this.axios.get('chartData')
    .then(data => {
      this.$Modal.remove()
      if (data.data.status !== 1) {
        this.$Message.warning(data.data.msg)
        return
      }
      this.dealData(data.data.data)
    })
    .catch(data => {
      console.log('error')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#index{
    background-color: #f5f5d5;
    font-family: Georgia, serif;
    letter-spacing: -0.01em;
    word-spacing: 0.2em;
    width: 100%;
    height:100%;
}
.myContent{
    width:90%;
    margin-left:5%;
    background:white;
    padding:50px;
}
.chartContent{
    height:440px;
    width:100%;
    margin-bottom:15px;
    padding-top:20px;
    box-shadow:1px 1px 1px 1px #c3c39e;
}
.chartContent:hover{
    box-shadow:3px 2px 3px 3px #c3c39e;
}
.chart{
    margin:0 auto;
    width:800px;
    height:400px;
}
</style>
