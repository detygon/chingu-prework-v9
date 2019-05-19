<template>
  <section class="data-table">
    <div class="main-table-wrapper">
      <table class="main-table-content">
        <thead class="data-table-header">
          <tr class="data-table-row">
            <td
              class="table-datacell"
              v-for="column in columns"
              :key="column.name"
            >
              {{ column.label }}
            </td>
          </tr>
        </thead>
        <tbody class="data-table-content">
          <tr
            class="data-table-row"
            v-for="(datum, index) in results"
            :key="index"
          >
            <td
              class="table-datacell"
              v-for="column in columns"
              :key="column.name"
            >
              {{ itemValue(datum, column) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer class="main-table-footer">
      <span class="rows-selection">
        <span class="rows-selection-label">Rows per page:</span>
        <span class="rows-selection-dropdown">
          {{ perPage }} <i class="material-icons">arrow_drop_down</i>
        </span>
      </span>
      <span class="rows-amount">
        {{ this.rowStart }}-{{ this.rowStart + this.perPage }} of
        {{ totalItems }}
      </span>
      <span class="table-pagination">
        <i class="material-icons" @click="showPrevious">keyboard_arrow_left</i>
        <i class="material-icons" @click="showMore">keyboard_arrow_right</i>
      </span>
    </footer>
  </section>
</template>

<script>
import formatDate from '../utils/format-date'

export default {
  name: 'MeteoriteList',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    disableFetch: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    perPage: 10,
    currentPage: 0,
    columns: [
      { name: 'id', label: 'ID' },
      { name: 'name', label: 'Name' },
      { name: 'nametype', label: 'Name Type' },
      { name: 'recclass', label: 'Rect Class' },
      { name: 'mass', label: 'Mass (g)' },
      { name: 'fall', label: 'Fell' },
      { name: 'year', label: 'Year' },
      { name: 'geolocation', label: 'Geolocation' }
    ]
  }),
  computed: {
    hasNext() {
      const start = (this.currentPage + 1) * this.perPage
      return !!this.data.slice(start, this.perPage + start).length
    },
    hasPrevious() {
      const start = (this.currentPage - 1) * this.perPage
      return !!this.data.slice(start, this.perPage + start).length
    },
    rowStart() {
      return this.currentPage * this.perPage
    },
    totalItems() {
      return this.data.length
    },
    results() {
      const start = this.currentPage * this.perPage
      return this.data.slice(start, this.perPage + start)
    }
  },
  methods: {
    itemValue(item, column) {
      const columnName = column.name.toLowerCase()

      if (typeof item[columnName] === 'object') {
        return Object.values(item[columnName]).join(',')
      }

      if (columnName === 'year') {
        return formatDate(item[columnName])
      }

      return item[columnName]
    },
    showMore() {
      // Disable data fetch if the user has run a search
      if (!this.hasNext && !this.disableFetch) {
        this.$emit('showMore', { offset: this.totalItems, limit: this.perPage })
      }

      this.currentPage += 1
    },
    showPrevious() {
      if (!this.hasPrevious) {
        return
      }

      this.currentPage -= 1
    }
  }
}
</script>

<style lang="scss" scoped>
.data-table {
  background: #fff;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  font-weight: 400;
  width: auto;
  margin-bottom: 1rem;
}

.main-table-wrapper {
  display: block;
  max-width: 100%;
  overflow-x: auto;
}

.main-table-content {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  overflow: hidden;

  tr {
    border-bottom: 1px solid #e0e0e0;
    td {
      text-overflow: ellipsis;
      padding: 0 56px 0 0;
      &:first-child {
        padding: 0 56px 0 24px;
      }
      &:last-child {
        padding: 0 24px 0 0;
      }
      &.datatype-string {
        text-align: left;
      }
      &.datatype-numeric {
        text-align: right;
      }
    }
  }
}

.data-table-header {
  tr {
    height: 64px;
    padding: 0 24px;

    td {
      color: rgba(0, 0, 0, 0.54);
      font-size: 12px;
      font-weight: 500;
      vertical-align: middle;

      .material-icons {
        font-size: 18px;
        vertical-align: middle;
        padding-right: 8px;
      }
    }
  }
}

.data-table-content {
  tr {
    height: 48px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }

    td {
      color: rgba(0, 0, 0, 0.87);
      font-weight: 500;
    }
  }
}

.main-table-footer {
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
  text-align: right;
  padding: 22px 0;
  span {
    vertical-align: middle;
    .material-icons {
      font-size: 24px;
      vertical-align: middle;
      cursor: pointer;
    }
    &.rows-selection {
      padding-right: 32px;
      .rows-selection-label {
        padding-right: 38px;
      }
    }

    &.rows-amount {
      padding-right: 32px;
    }

    &.table-pagination {
      padding-right: 14px;
      .material-icons:first-child {
        padding-right: 24px;
      }
    }
  }
}
</style>