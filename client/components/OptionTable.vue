<script lang="ts" setup>
const properties = defineProps({
  options: { type: Object, required: true }
})

const tableContainer = ref<HTMLDivElement>()
const tableOptions = ref<HTMLTableElement>()

function objectToTable (options: Record<string, string>) {
  const table = document.createElement('table')

  for (const [key, value] of Object.entries(options)) {
    const row = document.createElement('tr')
    const keyCell = document.createElement('th')

    keyCell.textContent = key
    row.append(keyCell)

    if (typeof value === 'object') {
      const nestedTable = objectToTable(value)
      const valueCell = document.createElement('td')
      valueCell.append(nestedTable)
      row.append(valueCell)
    } else {
      const valueCell = document.createElement('td')
      valueCell.textContent = value
      row.append(valueCell)
    }

    table.append(row)
  }

  return table
}

watchEffect(() => {
  if (tableOptions.value) {
    tableOptions.value.remove()
  }

  tableOptions.value = objectToTable(properties.options)

  tableContainer.value?.append(tableOptions.value)
})
</script>

<template>
  <div class="options-table">
    <h1>
      Your GTM configuration:
    </h1>

    <div ref="tableContainer" class="table-options-container" />
  </div>
</template>

<style lang="postcss">
  .options-table h1 {
    @apply text-lg;

    font-weight: 600;
  }
  .table-options-container > table {
    @apply mt-4;
  }

  .table-options-container table {
    @apply w-full text-sm;
  }

  .table-options-container table tr th {
    @apply p-2 bg-gray-100 border border-gray-200 text-semibold text-left;
  }
  .table-options-container table tr td {
    @apply border border-gray-200 p-2;
  }

  .table-options-container tr,
  .table-options-container td,
  .table-options-container th {
    vertical-align: middle;
  }
</style>
