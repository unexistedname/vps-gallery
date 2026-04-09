<script>
  import "./style/imageviewer.css";
  let { img = "https://picsum.photos/1920/1080" } = $props();

  let viewMode = $state("og");

  function setView(mode) {
    viewMode = mode;
  }
</script>

<div id="viewer-container">
  <div id="info" class="viewer-tools">
    <span id="current">13</span>
    /
    <span id="max">222</span>
  </div>

  <div id="image-viewport">
    <img src={img} alt="Preview" srcset="" 
    class:original={viewMode === "og"}
    class:fwidth={viewMode === "fw"}
    class:fheight={viewMode === "fh"}
    class:fscreen={viewMode === "fs"}
    />
  </div>

  <div class="btn m-4 viewer-tools" id="btn-exit">
    <i class="bi bi-x-lg fw-bolder"></i>
  </div>
  <div class="btn-slider viewer-tools" id="btn-prev">
    <i class="bi bi-chevron-left"></i>
  </div>
  <div class="btn-slider viewer-tools" id="btn-next">
    <i class="bi bi-chevron-right"></i>
  </div>

  <div id="viewmode-group" class="btn-group viewer-tools">
    <button type="button" class="btn" onclick={() => setView("og")}>Original</button>
    <button type="button" class="btn" onclick={() => setView("fw")}>Fit Width</button>
    <button type="button" class="btn" onclick={() => setView("fh")}>Fit Height</button>
    <button type="button" class="btn" onclick={() => setView("fs")}>Fit Screen</button>
  </div>
</div>
