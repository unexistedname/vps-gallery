<script>
    import Card from "./Card.svelte";
    import './style/filecontent.css';
      import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function openViewer() {
    dispatch('open');
  }
</script>

<div class="border border-1 border-light rounded p-3 mt-4 mb-5 container-fluid" id="file-container">
    <Card onclick={openViewer}/>
    <Card />
    <Card />
    <Card />
    <Card />
</div>