export default {
  methods: {
      filterEmpty(params) {
          for (const key in params) {
              let param = params[key]
              let type = typeof param
              let isEmpty = (type == 'undefined') || (type == null)
              if (isEmpty) {
                  delete params[key]
              } else {
                  param.length == 0 && delete params[key]
              }

          }
          return params
      }
  }
}
