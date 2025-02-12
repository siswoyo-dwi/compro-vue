<template>
  <div :class="['overflow-x-auto w-full', tableWrapperClass]">
    <table :class="['min-w-full border-collapse border w-full', tableClass]">
      <!-- Table Header -->
      <thead>
        <tr :class="['bg-gray-50 text-left', headerRowClass]">
          <th
            v-for="(column, index) in columns"
            :key="index"
            :style="getHeaderCellStyle(column)"
            :class="['border border-gray-300 text-sm font-medium', headerCellClass]"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <!-- Table Body -->
      <tbody>
        <template v-for="(row, rowIndex) in flatRows" :key="row.id">
          <tr
            :class="[getRowStyle(row), rowClass]"
            :style="{ marginLeft: `${row.level * indentSize}px` }"
          >
            <td
              v-for="(column, colIndex) in columns"
              :key="`${row.id}-${colIndex}`"
              :style="getCellStyle(column)"
              :class="['border border-gray-300 text-sm', cellClass]"
            >
              <div class="flex items-center">
                <button
                  v-if="column.field === treeColumn && row.hasChildren"
                  @click="toggle(row.id)"
                  class="mr-2 focus:outline-none"
                >
                  <span v-if="row.expanded" class="text-gray-600">➖</span>
                  <span v-else class="text-gray-600">➕</span>
                </button>
                {{ row[column.field] }}
              </div>
            </td>
          </tr>
          <template v-if="row.children && row.expanded">
            <template v-for="(child, childIndex) in row.children" :key="child.id">
              <tr
                :class="[getRowStyle(child), rowClass]"
                :style="{ marginLeft: `${(row.level + 1) * indentSize}px` }"
              >
                <td
                  v-for="(column, colIndex) in columns"
                  :key="`${child.id}-${colIndex}`"
                  :style="getCellStyle(column)"
                  :class="['border border-gray-300 text-sm', cellClass]"
                >
                  <div class="flex items-center">
                    <button
                      v-if="column.field === treeColumn && child.hasChildren"
                      @click="toggle(child.id)"
                      class="mr-2 focus:outline-none"
                    >
                      <span v-if="child.expanded" class="text-gray-600">➖</span>
                      <span v-else class="text-gray-600">➕</span>
                    </button>
                    {{ child[column.field] }}
                  </div>
                </td>
              </tr>
              <template v-if="child.children && child.expanded">
                <template v-for="(grandChild, grandChildIndex) in child.children" :key="grandChild.id">
                  <tr
                    :class="[getRowStyle(grandChild), rowClass]"
                    :style="{ marginLeft: `${(row.level + 2) * indentSize}px` }"
                  >
                    <td
                      v-for="(column, colIndex) in columns"
                      :key="`${grandChild.id}-${colIndex}`"
                      :style="getCellStyle(column)"
                      :class="['border border-gray-300 text-sm', cellClass]"
                    >
                      {{ grandChild[column.field] }}
                    </td>
                  </tr>
                </template>
              </template>
            </template>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
    default: () => [],
  },
  rows: {
    type: Array,
    required: true,
    default: () => [],
  },
  treeColumn: {
    type: String,
    required: true,
    default: "name",
  },
  // Styling Props
  tableWrapperClass: {
    type: String,
    default: "",
  },
  tableClass: {
    type: String,
    default: "bg-white",
  },
  headerRowClass: {
    type: String,
    default: "",
  },
  headerCellClass: {
    type: String,
    default: "text-gray-500",
  },
  rowClass: {
    type: String,
    default: "",
  },
  cellClass: {
    type: String,
    default: "text-gray-700",
  },
  indentSize: {
    type: Number,
    default: 1000, 
  },
  headerStyle: {
    type: Object,
    default: () => ({}),
  },
  cellStyle: {
    type: Object,
    default: () => ({}),
  },
  rowStyle: {
    type: Function,
    default: () => (row) => ({}),
  },
});

const expandedRows = ref(new Set());

const flatRows = computed(() => {
  const flattenRows = (rows, level = 0) => {
    const flat = [];
    rows.forEach((row) => {
      const newRow = { ...row, level, expanded: expandedRows.value.has(row.id) };
      newRow.hasChildren = row.children && row.children.length > 0;

      flat.push(newRow);

      if (newRow.hasChildren && newRow.expanded) {
        flat.push(...flattenRows(row.children, level + 1));
      }
    });
    return flat;
  };

  return flattenRows(props.rows);
});

const getHeaderCellStyle = (column) => {
  return { ...props.headerStyle, ...column.headerStyle };
};

const getCellStyle = (column) => {
  return { ...props.cellStyle, ...column.cellStyle };
};

const getRowStyle = (row) => {
  return props.rowStyle(row);
};

const toggle = (id) => {
  if (expandedRows.value.has(id)) {
    expandedRows.value.delete(id);
  } else {
    expandedRows.value.add(id);
  }
};
</script>

<style scoped>
table {
  width: 100%; /* Ensures the table takes the full width of its container */
}

th,
td {
  width: auto; /* Allows columns to adjust based on content */
  min-width: 120px; /* Optional: Set a minimum width for columns */
}
</style>
