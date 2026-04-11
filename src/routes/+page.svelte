<script>
  import FileContent from "../lib/components/FileContent.svelte";
  import ImageViewer from "$lib/components/ImageViewer.svelte";

  let imageVieverVisibility = $state(false);

  function viewerHandle() {
    imageVieverVisibility = true;
  }
</script>

<main class="container">
  <nav class="navbar navbar-expand-sm lead">
    <div class="container-fluid">
      <div class="d-flex">
        <button aria-label="Go to previous directory" class="btn btn-light">
          <div class="fw-semibold">Back</div>
        </button>

        <div class="mx-3">Directory:</div>
      </div>
      <div class="fw-bold " style="overflow-wrap: anywhere;">/app/aaaqssqqs/sqsqsqsq/qs/sqsqqsqssq/sq</div>
    </div>
  </nav>

  <hr />

  <div class="row">
    <div class="col-sm-6">
      <div class="btn btn-light p-1 my-1 w-100">Upload File(s)</div>
    </div>
    <div class="col-sm-6">
      <div class="btn btn-outline-light p-1 my-1 w-100">Upload Folder</div>
    </div>
  </div>

  <FileContent on:open = {viewerHandle}/>

  <footer class="text-white text-center">
    <p>© 2026-2999 unexistedname. All Rights Reserved.</p>
    <p>Powered by <span><a href="http://google.com" target="_blank" class="text-white-50">Hollow Gallery</a></span></p>
  </footer>
</main>

{#if imageVieverVisibility}
<ImageViewer
  on:close = {() => imageVieverVisibility = false}
/>
{/if}
