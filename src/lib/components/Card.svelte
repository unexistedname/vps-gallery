<script>
  import { onMount } from "svelte";
  import "./style/card.css";

  let {
    isFolder = true,
    title = "Unknown ddwdwwd dddd",
    img = "https://picsum.photos/200/300",
    onclick
  } = $props();

  onMount(() => {
    let tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]'),
    );
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  });
  function download() {
    // TODO
  }

  function confirmDelete() {
    confirm(`Delete ${title}?`);
  }
  function confirmRename() {
    prompt("New Name: ", title);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="card pt-2" onclick={onclick}>
<!-- Card Icon -->
  <div
    class="card-img-container position-relative d-flex justify-content-center align-items-center"
    style:background-image={!isFolder ? `url(${img})` : ``}
  >
    <button
      type="button"
      aria-label="Delete"
      class="position-absolute btn btn-delete"
      onclick={(e) => e.stopPropagation(confirmDelete())}
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
        <button type="button" aria-label="Rename" class="btn btn-primary" onclick={(e) => e.stopPropagation(confirmRename())}>
            <i class="bi bi-pencil-square"></i>
        </button>
        <button type="button" aria-label="Download" class="btn btn-success" onclick={(e) => e.stopPropagation(download())}>
            <i class="bi bi-download"></i>
        </button>
    </div>
  </div>
</div>
