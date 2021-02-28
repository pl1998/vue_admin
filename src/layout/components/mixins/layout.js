export default {
	data() {
		return {
			total: 100,
			listLoading: true,
			listQuery: {
				page: 1,
				pageSize:2,
				importance: undefined,
				title: undefined,
				type: undefined,
				sort: '+id'
			},
			name: undefined,
			content: '222',
			dialogHtmlVisible: false,
			header: undefined
		}
	},
	methods: {
		/**
         * 是否确认关闭
         * @param {*} done
         */
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then((_) => {
					done()
				})
				.catch((_) => {})
		},

		/**
         * 重置列表
         */
		resetForm() {
			this.filter = this.$options.data().filter
			this.getList()
		},


    /**
     * 清除空参数
     * @param {*} params
     */
		filterEmpty(params) {
			for (const key in params) {
				let param = params[key]
				let type = typeof param
				let isEmpty = type == 'undefined' || type == null
				if (isEmpty) {
					delete params[key]
				} else {
					param.length == 0 && delete params[key]
				}
			}
			return params
		},

	/**
   * 处理验证器
   * @param {*} formName
   */
		validateForm(formName) {
			return new Promise((resolve, reject) => {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						resolve(true)
					} else {
						reject()
					}
				})
			})
		},

		/**
         * 从编辑器中取出来前获取一下参数
         */
		setInput(field) {
			this.form[field] = this.$refs.editorForm.getHtml()
		},

		/**
         * 查看富文本
         */
		showHtml(name, content) {
			this.name = name
			this.content = content
			this.dialogHtmlVisible = true
		},

		/**
         * 二次确认框
         * @param {*} message
         */
		confirmOk(message = '是否确认', title = '提示') {
			return new Promise((resolve, reject) => {
				this.$confirm(message, title, {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						resolve()
					})
					.catch(() => {
						reject()
					})
			})
		},

		/**
         * 提示
         * @param {*} message
         */
		message(message = 'success', type = 'success', duration = 2000) {
			this.$message({
				type: type,
				message: message,
				duration: duration
			})
		},

		errMessage(message = 'error', type = 'error', duration = 2000) {
			this.$message({
				type: type,
				message: message,
				duration: duration
			})
		},

		/**
         * 刷新当前路由
         */
		reloadUrl() {
			history.go(0)
		}
	}
}
