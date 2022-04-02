<!--
 - 通用 select
 - 原 el-select 属性均适用
 - author: liuchenghui
-->
<template>
  <el-select
    ref="select"
    v-model="mutableValue"
    :remote-method="remoteQuery"
    :remote="remote"
    :loading="loading"
    v-bind="$attrs"
    v-on="$listeners"
    @change="change"
    @clear="handleSelectClear"
    @remove-tag="handleRemoveTag"
  >
    <el-option
      v-for="(item, i) in options"
      :key="getKey(item, i)"
      :label="item[labelName]"
      :value="item[valueName]"
      :disabled="item[disabledName]"
    >
      <slot :data="item" :index="i" />
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'CommonSelect',
  props: {
    // Note: list/action/api三选一
    // 直接赋予列表数据
    list: {
      type: Array,
      default: () => []
    },
    // vuex dispatch 名（适用于通用且需缓存的情况，教务系统这边直接走api模式）
    action: {
      type: String,
      default: ''
    },
    // 拉数据的接口（适用于高度定制化场景）
    api: {
      type: Function,
      default: undefined
    },
    // 拉数据的参数（配合api使用）
    params: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: [String, Number, Array],
      default: '',
      required: true
    },
    // 初始化立即拉取数据
    fetchDataImmediately: {
      type: Boolean,
      default: true
    },
    // 接口字段个性化命名场景使用
    valueName: {
      type: String,
      default: 'id'
    },
    // 接口字段个性化命名场景使用
    labelName: {
      type: String,
      default: 'name'
    },
    // 决定选项被禁用的字段名
    disabledName: {
      type: String,
      default: 'disabled'
    },
    // 用于配置类似全选的项
    defaultItem: {
      type: Object,
      default: undefined
    },
    // 远程查询
    remote: {
      type: Boolean,
      default: false
    },
    // 远程查询 key
    remoteQueryKey: {
      type: String,
      default: 'keyword'
    },
    // 用于处理预数据
    formatList: {
      type: Function,
      default: list => list
    },
    // 远程查询时限制输入关键字长度，0 表示不限制
    maxlength: {
      type: Number,
      default: 0,
      validator: val => val >= 0
    },
    // 1班课，2一对一
    source: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      options: [],
      loading: false,
      selectList: [], // 已选择的
      prevSelect: [] // 记录上次选的（多选且存在 `全部` 时用）
    }
  },
  computed: {
    mutableValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
      }
    }
  },
  watch: {
    list(val) {
      if (!this.action && typeof this.api !== 'function') {
        this.options = val
      }
    },
    value(val) {
      if (Array.isArray(val) && val.includes('-1')) {
        this.prevSelect = ['-1']
      }
    }
  },
  created() {
    this.prevSelect = this.value
    this.fetchDataImmediately && this.fetchData()
  },
  methods: {
    findItem(id) {
      const valueName = this.valueName
      return this.options.find(item => id === item[valueName])
    },
    includes(list, id) {
      const valueName = this.valueName

      return !!list.find(item => id === item[valueName])
    },
    async fetchData({ params = {}, query = '' } = {}) {
      let list
      if (typeof this.api === 'function') {
        if (this.remoteQueryKey === 'teacherName') {
          params.type = this.source
        }
        list = await this.api({ ...this.params, ...params, [this.remoteQueryKey]: this.remote ? query : undefined })
        this.loading = false
      } else if (this.action) {
        list = await this.$store.dispatch(`common/${this.action}`)
      } else {
        list = this.list
      }
      // 先格式化，在拼接 defaultItem
      list = this.formatList(list)
      if (this.defaultItem && this.defaultItem[this.labelName] != null) {
        list.unshift(this.defaultItem)
      }

      const valueName = this.valueName
      const _list = this.selectList.filter(item => !this.includes(list, item[valueName]))
      this.options = list.concat(_list)
      return list
    },
    remoteQuery(query) {
      if (!this.remote) return
      query = this.noEmoji(query)
      // 限制长度，避免超出数据库限制导致异常
      if (this.maxlength > 0 && query.length > this.maxlength) {
        query = query.slice(0, this.maxlength)
      }
      if (query !== '') {
        this.loading = true
        this.fetchData({ query })
      } else {
        this.options = []
      }
    },
    getKey(item, index) {
      const id = item[this.valueName]
      return !id || id === 0 ? id : `item-${index}`
    },
    reset() {
      this.options = []
      this.$emit('update:value', '')
    },
    handleSelectClear() {
      this.selectList = []
    },
    handleRemoveTag(id) {
      const valueName = this.valueName
      const index = this.selectList.findIndex(item => id === item[valueName])
      index > -1 && this.selectList.splice(index, 1)
    },
    restPrevSelect() {
      this.prevSelect = []
    },
    change(id) {
      const $select = this.$refs.select
      const valueName = this.valueName
      const labelName = this.labelName
      let index
      let data
      let name

      if ($select.multiple) {
        if (id.length === 0) {
          this.selectList = []
        } else {
          const arr = []
          id.forEach(item => {
            const elem = this.findItem(item)
            if (elem) arr.push(elem)
          })
          this.selectList = arr
        }
        // 多选且有 `全部` 的情况下，处理一下
        if (this.defaultItem) {
          const allIdKey = this.defaultItem[valueName]
          const allIndex = id.indexOf(allIdKey)
          const selectAll = this.prevSelect.indexOf(allIdKey) === -1 && allIndex > -1
          if (selectAll) {
            id.splice(0, id.length, allIdKey)
            this.selectList = []
          } else {
            allIndex > -1 && id.splice(allIndex, 1)
          }

          this.prevSelect = [...id]
        }

        data = []
        name = []
        this.options.forEach(item => {
          if (id.includes(item[valueName])) {
            data.push(item)
            name.push(item[labelName])
          }
        })
      } else {
        index = this.options.findIndex(item => item[valueName] === id)
        data = index > -1 ? this.options[index] : {}
        name = data[labelName]
      }
      this.$nextTick(() => {
        this.$emit('select-change', {
          [valueName]: id,
          [labelName]: name,
          data,

          // 给出标准字段，方便取用
          id,
          name
        })
      })
    }
  }
}
</script>
