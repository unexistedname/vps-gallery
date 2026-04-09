<script>
  import { onMount } from "svelte";
  import "./style/card.css";

  let {
    isFolder = false,
    title = "Unknown ddwdwwd dddd",
    img = "https://picsum.photos/200/300",
  } = $props();

  onMount(() => {
    let tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]'),
    );
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  });

  function confirmDelete() {
    confirm(`Delete ${title}?`);
  }
  function confirmRename() {
    prompt("New Name: ", title);
  }
</script>

<div class="card pt-2">
<!-- Card Icon -->
  <div
    class="card-img-container position-relative d-flex justify-content-center align-items-center"
    style:background-image={!isFolder ? `url(${img})` : ``}
  >
    <button
      type="button"
      aria-label="Delete"
      class="position-absolute btn btn-delete"
      onclick={confirmDelete}
    >
      <i class="bi bi-x"></i>
    </button>
    {#if isFolder}
      <i class="bi bi-folder2 fw-semibold"></i>
    {/if}
  </div>
<!-- Card Content -->
  <div class="card-body d-flex justify-content-center flex-column">
    <p
      class="card-title"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={title}
    >
      {title}
    </p>
    <div class="btn-group">
        <button type="button" aria-label="Rename" class="btn btn-primary" onclick={confirmRename}>
            <i class="bi bi-pencil-square"></i>
        </button>
        <button type="button" aria-label="Download" class="btn btn-success">
            <i class="bi bi-download"></i>
        </button>
    </div>
  </div>
</div>
