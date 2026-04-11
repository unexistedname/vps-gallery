<!-- 
 
TODO:
- Image loading (important)
- Prelaod

-->



<script>
  import "./style/imageviewer.css";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let {
    img = [
      "https://picsum.photos/1920/1080",
      "https://picsum.photos/1080/1080",
      "https://picsum.photos/1080/1920",
    ],
    visibility
  } = $props();



  let viewMode = $state("og");
  let toolVisibility = $state(true);
  let imagePos = $state(0);

  function handleSlide(num) {
    let max = img.length - 1;
    let next = imagePos + num;
    if (next < 0) next = max;
    if (next > max) next = 0;
    console.log("bluiwddww");
    
    imagePos = next;
  }
  function handleClose() {
    dispatch('close');    
  }
  function setVisibility() {
    toolVisibility = !toolVisibility;
  }
  function setView(mode) {
    viewMode = mode;
  }

  function hideTimer() {
    clearTimeout(tempTimer);

    tempTimer = setTimeout(() => (toolVisibility = false), AUTO_HIDE_DURATION);
  }

  function handleHide(event) {
    if (event.target.closest(".btn-slider")) return;
    setVisibility();
  }
</script>

<div id="viewer-container">
  <div id="info" class="viewer-tools" class:tools-hidden={!toolVisibility}>
    <span id="current">{imagePos + 1}</span>
    /
    <span id="max">{img.length}</span>
  </div>

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div id="image-viewport" onclick={handleHide}>
    <img
      src={img[imagePos]}
      alt="Preview"
      srcset=""
      class:original={viewMode === "og"}
      class:fwidth={viewMode === "fw"}
      class:fheight={viewMode === "fh"}
      class:fscreen={viewMode === "fs"}
    />
  </div>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="btn m-4 viewer-tools"
    id="btn-exit"
    class:tools-hidden={!toolVisibility}
    onclick={handleClose}
  >
    <i class="bi bi-x-lg fw-bolder"></i>
  </div>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="btn-slider viewer-tools"
    id="btn-prev"
    class:tools-hidden={!toolVisibility}
    onclick={() => handleSlide(-1)}
  >
    <i class="bi bi-chevron-left"></i>
  </div>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="btn-slider viewer-tools"
    id="btn-next"
    class:tools-hidden={!toolVisibility}
    onclick={() => handleSlide(1)}
  >
    <i class="bi bi-chevron-right"></i>
  </div>

  <div
    id="viewmode-group"
    class="btn-group viewer-tools"
    class:tools-hidden={!toolVisibility}
  >
    <button type="button" class="btn" onclick={() => setView("og")}
      >Original</button
    >
    <button type="button" class="btn" onclick={() => setView("fw")}
      >Fit Width</button
    >
    <button type="button" class="btn" onclick={() => setView("fh")}
      >Fit Height</button
    >
    <button type="button" class="btn" onclick={() => setView("fs")}
      >Fit Screen</button
    >
  </div>
</div>
