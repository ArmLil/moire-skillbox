<template lang="html">
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === 1 }"
        aria-label="Предыдущая страница"
        @click.prevent="paginate(page - 1, page > 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li
      class="pagination__item"
      style="cursor: pointer"
      v-for="pageNumber in pages"
      :key="pageNumber"
    >
      <a
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNumber === page }"
        @click.prevent="paginate(pageNumber, true)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === pages }"
        aria-label="Следующая страница"
        @click.prevent="paginate(page + 1, page < pages)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "BasePagination",
  model: {
    prop: "page",
    event: "paginate",
  },
  props: {
    page: Number,
    count: Number,
    perPage: Number,
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page, letEmit) {
      if (letEmit) this.$emit("paginate", page);
    },
  },
});
</script>

<style lang="css" scoped></style>
