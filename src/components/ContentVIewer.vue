<template>
  <div
    class="hide-overflow viewer-container"
    style="position: relative;"
    :style="{ 'background-color':setBackColor }"
  >
    <v-toolbar
      :style="{ 'background-color':setBackColor }"
      :dark="setDarkTheme"
      dense
      flat
    >
        <v-spacer></v-spacer>
        <v-toolbar-title color="transparent">{{ contentInfo.title }}</v-toolbar-title>
        <template v-slot:extension>
            <v-layout justify-center align-center>
                <div>
                    <v-select
                        v-model="curContent.subtitle"
                        :items="contentInfo.subtitle"
                        item-value="value"
                        item-text="text"
                        dense
                        single-line
                        solo
                        background-color="transparent"
                        flat
                        :dark="setDarkTheme"
                        hide-details
                        autowidth
                    >
                        <template slot="selection" slot-scope="data">
                            <v-card-text class="caption">
                                {{ data.item.text }}
                            </v-card-text>
                        </template>
                    </v-select>
                </div>
            </v-layout>
        </template>


      <v-spacer></v-spacer>

      <v-btn icon @click="expandSetting = !expandSetting">
        <v-icon>mdi-settings-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-expand-transition>
      <div v-show="expandSetting">
        <v-layout row wrap align-center>
            <v-layout row wrap align-center>
                <v-flex>
                    <v-subheader :dark="setDarkTheme">폰트</v-subheader>
                </v-flex>
                <v-flex>
                    <v-select
                        v-model="curSetting.fontfamily"
                        :items="settings.fontfamily"
                        item-value="value"
                        item-text="text"
                        dense
                        single-line 
                        :dark="setDarkTheme"
                    >
                        <template slot="selection" slot-scope="data">
                            <div :style="{ 'font-family': data.item.value }">
                                {{ data.item.text }}
                            </div>
                        </template>
                        <template slot="item" slot-scope="data">
                            <div :style="{ 'font-family': data.item.value }">
                                {{ data.item.text }}
                            </div>
                        </template>
                    </v-select>
                </v-flex>
            </v-layout>
            <v-layout row wrap align-center>
                <v-flex>
                    <v-subheader :dark="setDarkTheme">폰트 크기</v-subheader>
                </v-flex>
                <v-flex>
                    <v-btn fab small @click="minusFontSize">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex>
                    <v-subheader class="ma-1 pa-1" :dark="setDarkTheme">{{ curSetting.size }}</v-subheader>
                </v-flex>
                <v-flex>
                    <v-btn fab small @click="plusFontSize">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout row wrap align-center>
                <v-flex class="ma-0">
                    <v-subheader class="ma-1 pa-1" :dark="setDarkTheme">줄 간격</v-subheader>
                </v-flex>
                <v-flex class="ma-0"> 
                    <v-btn fab small class="ma-1 pa-1" @click="minusLineHeight">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex class="ma-0">
                    <v-subheader class="ma-1 pa-1" :dark="setDarkTheme">{{ curSetting.lineheight }}</v-subheader>
                </v-flex>
                <v-flex class="ma-0">
                    <v-btn fab small class="ma-1 pa-1" @click="plusLineHeight">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout row wrap align-center>
                <v-flex>
                    <v-subheader :dark="setDarkTheme">밝기</v-subheader>
                </v-flex>
                <v-flex>
                    <v-slider
                        v-model="curSetting.bright"
                        :dark="setDarkTheme"
                        thumb-label
                    ></v-slider>
                </v-flex>
            </v-layout>
            <v-layout row wrap align-center>
                <v-flex>
                    <v-subheader :dark="setDarkTheme">색상</v-subheader>
                </v-flex>
                <v-flex>
                    <v-item-group mandatory v-model="selColor" @change="chgBackColor">
                        <v-item>
                            <v-btn 
                                slot-scope="{ active, toggle }"
                                fab small 
                                class="ma-1 pa-1"
                                color="#f5f5f5" 
                                @click="toggle">
                                <v-icon v-if="active">mdi-check</v-icon>
                            </v-btn>
                        </v-item>
                        <v-item>
                            <v-btn 
                                slot-scope="{ active, toggle }"
                                fab small 
                                class="ma-1 pa-1"
                                color="#ECE6CC" 
                                @click="toggle">
                                <v-icon v-if="active">mdi-check</v-icon>
                            </v-btn>
                        </v-item>
                        <v-item>
                            <v-btn 
                                slot-scope="{ active, toggle }"
                                fab small 
                                class="ma-1 pa-1"
                                color="#A3CCA3" 
                                @click="toggle">
                                <v-icon v-if="active">mdi-check</v-icon>
                            </v-btn>
                        </v-item>
                        <v-item>
                            <v-btn 
                                slot-scope="{ active, toggle }"
                                fab small 
                                class="ma-1 pa-1"
                                color="#D6E6F0" 
                                @click="toggle">
                                <v-icon v-if="active">mdi-check</v-icon>
                            </v-btn>
                        </v-item>
                        <v-item>
                            <v-btn 
                                slot-scope="{ active, toggle }"
                                fab small dark  
                                class="ma-1 pa-1"
                                color="#0C374D" 
                                @click="toggle">
                                <v-icon v-if="active">mdi-check</v-icon>
                            </v-btn>
                        </v-item>
                        <v-item>
                            <v-btn 
                                slot-scope="{ active, toggle }"
                                fab small dark  
                                class="ma-1 pa-1"
                                color="#2D2D2D" 
                                @click="toggle">
                                <v-icon v-if="active">mdi-check</v-icon>
                            </v-btn>
                        </v-item>
                    </v-item-group>
                </v-flex>
            </v-layout>
        </v-layout>
      </div>
    </v-expand-transition>
    <v-container>
        <v-layout>
            <v-card
                flat
                id="content-container"
                color="transparent"
                :dark="setDarkTheme"
                :style="{ 'line-height':setLineHeight, 
                          'font-size':setFontSize, 
                          'font-family':setFontFamily }">
                <div v-html="setContent"/>
            </v-card>
        </v-layout>
    </v-container>
    <div class="bright-cover" :style="{ 'opacity':setBright }"/>
  </div>
</template>

<script>
  const MarkdownIt = require('markdown-it')
  export default {
    name: 'ContentViewer',
    data() {
        return {
            contentInfo: {
                title: "제목", 
                subtitle: [
                    {value:'1', text:'소제목1'},
                    {value:'2', text:'소제목2소제목2'},
                    {value:'3', text:'소제목3소제목3소제목3소제목3'}
                ]
            },
            curContent: {
                subtitle: "1"
            },
            expandSetting: false,
            curSetting: {
                fontfamily: 'NanumMyeongjoRegular',
                size: '4',
                lineheight: '1',
                color: '',
                dark: '',
                bright: '100'
            },
            settings: {
                fontfamily: [{value:'NanumMyeongjoRegular',text:'나눔명조'},
                            {value:'NanumGothicRegular',text:'나눔고딕'},
                            {value:'KoPubWorldBatangMedium',text:'Kopub바탕'},
                            {value:'KoPubWorldDotumMedium',text:'Kopub돋움'},
                            {value:'NotoSerifKRRegular',text:'본명조'},
                            {value:'NotoSansKRRegular',text:'본고딕'}],
                size: {'1':'x-small', 
                        '2':'small', 
                        '3':'medium',
                        '4':'large',
                        '5':'x-large',
                        '6':'xx-large'},
                lineheight: {'1':'1.5em', 
                            '2':'2em',
                            '3':'2.5em', 
                            '4':'3em', 
                            '5':'3.5em'},
                color: ['color1', 'color2', 'color3', 'color4']
            },
            pickedCol: 'color1',
            selColor: null,
            content: '',
            md: null,
            mdattrs: null
      }
    },
    created() {
        this.$EventBus.$on('setMarkDownText', this.setContentText)
    },
    mounted() {
        this.md = new MarkdownIt()
        this.md.use(require('markdown-it-attrs')).use(require('@/plugins/markdown-it-span'))
    },
    methods: {
        chgBackColor() {
            let backColor = ''
            let darkTheme = ''
            switch (this.selColor) {
                case 0:
                    backColor = '#f5f5f5'
                    darkTheme = false
                    break
                case 1:
                    backColor = '#ECE6CC'
                    darkTheme = false
                    break
                case 2:
                    backColor = '#A3CCA3'
                    darkTheme = false
                    break
                case 3:
                    backColor = '#D6E6F0'
                    darkTheme = false
                    break
                case 4:
                    backColor = '#0C374D'
                    darkTheme = true
                    break
                case 5:
                    backColor = '#2D2D2D'
                    darkTheme = true
                    break
                default:
                    backColor = '#f5f5f5'
                    darkTheme = false
                    break
            }
            this.curSetting.color = backColor
            this.curSetting.dark = darkTheme
        },
        plusFontSize() {
            if(this.curSetting.size < 7) {
                this.curSetting.size++
            }
        },
        minusFontSize() {
            if(this.curSetting.size > 1) {
                this.curSetting.size--
            }
        },
        plusLineHeight() {
            if(this.curSetting.lineheight < 5) {
                this.curSetting.lineheight++
            }
        },
        minusLineHeight() {
            if(this.curSetting.lineheight > 1) {
                this.curSetting.lineheight--
            }
        },
        setContentText(text) {
            this.content = text
        }
    },
    computed: {
        setContent() {
            if(this.md){
                return this.md.render(this.content)
            } else {
                return this.content
            }
        },
        setBackColor() {
            return this.curSetting.color
        },
        setDarkTheme() {
            return this.curSetting.dark
        },
        setFontSize() {
            return this.settings.size[this.curSetting.size]
        },
        setLineHeight() {
            return this.settings.lineheight[this.curSetting.lineheight]
        },
        setFontFamily() {
            return this.curSetting.fontfamily
        },
        setBright() {
            let brightness = ( ( 100 - parseInt(this.curSetting.bright, 10) ) / 130 )
            return brightness
        }
    }
  }
</script>

<style lang="scss" scoped>
    .viewer-container {
        .bright-cover {
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            position: fixed;
            z-index: 9999;
            pointer-events: none;
            background: #000;
        };
        /deep/ p {
            margin-bottom: 0;
        };
    }
</style>
